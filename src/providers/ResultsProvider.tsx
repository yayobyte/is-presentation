import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { MAX_POINTS_PER_CATEGORY, CATEGORIES } from '@/features/exam/questions';

export interface StudentResult {
    studentId: string;
    studentName: string;
    score: number;
    submissionId: string;
}

export interface GroupResult {
    groupId: number;
    groupName: string;
    studentCount: number;
    completedCount: number;
    averageScore: number;
    maxScore: number;
    students: StudentResult[];
}

interface ResultsContextType {
    groupResults: GroupResult[];
    isResultsVisible: boolean;
    loading: boolean;
    toggleResults: () => void;
    refreshResults: () => Promise<void>;
    deleteSubmission: (submissionId: string) => Promise<void>;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export function ResultsProvider({ children }: { children: ReactNode }) {
    const [groupResults, setGroupResults] = useState<GroupResult[]>([]);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleResults = () => setIsResultsVisible(prev => !prev);

    const refreshResults = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Fetch Students & their associated Group information
            const { data: studentsData, error: studentsError } = await supabase
                .from('students')
                .select(`
                    id,
                    name,
                    group_id,
                    groups (
                        name
                    )
                `);

            if (studentsError) throw studentsError;

            // 2. Fetch all Submissions
            const { data: submissionsData, error: submissionsError } = await supabase
                .from('exam_submissions')
                .select('id, student_id, total_score');

            if (submissionsError) throw submissionsError;

            // 3. Aggregate logic
            const groupMap = new Map<number, { name: string, studentCount: number, students: StudentResult[] }>();

            // Initialize all known groups from the student list
            studentsData?.forEach((student: any) => {
                const gId = student.group_id;
                // If a student doesn't have a group, skip or assign to a default. We assume all have groups now.
                if (!gId || !student.groups) return;
                
                if (!groupMap.has(gId)) {
                    groupMap.set(gId, { name: student.groups.name, studentCount: 0, students: [] });
                }
                const group = groupMap.get(gId)!;
                group.studentCount += 1;
            });

            // Map submissions against students
            const submissionsByStudent = new Map<string, any>();
            submissionsData?.forEach(sub => {
                submissionsByStudent.set(sub.student_id, sub);
            });

            studentsData?.forEach((student: any) => {
                const gId = student.group_id;
                if (!gId || !student.groups) return;
                
                const sub = submissionsByStudent.get(student.id);
                if (sub !== undefined) {
                    const group = groupMap.get(gId)!;
                    group.students.push({
                        studentId: student.id,
                        studentName: student.name,
                        score: sub.total_score,
                        submissionId: sub.id
                    });
                }
            });

            const results: GroupResult[] = Array.from(groupMap.entries()).map(([groupId, groupData]) => {
                const totalScore = groupData.students.reduce((acc, student) => acc + student.score, 0);
                const avg = groupData.students.length > 0 ? (totalScore / groupData.students.length) : 0;
                
                // Sort students by score descending
                const sortedStudents = [...groupData.students].sort((a, b) => b.score - a.score);

                return {
                    groupId,
                    groupName: groupData.name,
                    studentCount: groupData.studentCount,
                    completedCount: groupData.students.length,
                    averageScore: Number(avg.toFixed(1)), // Keep 1 decimal
                    maxScore: MAX_POINTS_PER_CATEGORY * CATEGORIES.length,
                    students: sortedStudents
                };
            });

            // Optional: Sort by Group ID
            results.sort((a, b) => a.groupId - b.groupId);
            
            setGroupResults(results);

        } catch (error) {
            console.error('Failed to refresh results:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch initially on mount
    useEffect(() => {
        refreshResults();
    }, [refreshResults]);

    const deleteSubmission = async (submissionId: string) => {
        try {
            setLoading(true);
            const { error } = await supabase.from('exam_submissions').delete().eq('id', submissionId);
            if (error) throw error;
            await refreshResults();
        } catch (err) {
            console.error('Failed to delete submission:', err);
            setLoading(false);
        }
    };

    return (
        <ResultsContext.Provider value={{ groupResults, isResultsVisible, loading, toggleResults, refreshResults, deleteSubmission }}>
            {children}
        </ResultsContext.Provider>
    );
}

export function useExamResults() {
    const context = useContext(ResultsContext);
    if (context === undefined) {
        throw new Error('useExamResults must be used within a ResultsProvider');
    }
    return context;
}
