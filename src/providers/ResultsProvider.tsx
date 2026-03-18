import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export interface GroupResult {
    groupId: number;
    groupName: string;
    studentCount: number;
    completedCount: number;
    averageScore: number;
    maxScore: number;
}

interface ResultsContextType {
    groupResults: GroupResult[];
    isResultsVisible: boolean;
    loading: boolean;
    toggleResults: () => void;
    refreshResults: () => Promise<void>;
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
                    group_id,
                    groups (
                        name
                    )
                `);

            if (studentsError) throw studentsError;

            // 2. Fetch all Submissions
            const { data: submissionsData, error: submissionsError } = await supabase
                .from('exam_submissions')
                .select('student_id, total_score');

            if (submissionsError) throw submissionsError;

            // 3. Aggregate logic
            const groupMap = new Map<number, { name: string, studentCount: number, completedCount: number, totalScore: number }>();

            // Initialize all known groups from the student list
            studentsData?.forEach((student: any) => {
                const gId = student.group_id;
                // If a student doesn't have a group, skip or assign to a default. We assume all have groups now.
                if (!gId || !student.groups) return;
                
                if (!groupMap.has(gId)) {
                    groupMap.set(gId, { name: student.groups.name, studentCount: 0, completedCount: 0, totalScore: 0 });
                }
                const g = groupMap.get(gId)!;
                g.studentCount += 1;
            });

            // Map submissions against students
            const submissionScoresByStudent = new Map<string, number>();
            // If a student submitted multiple times, we might keep the latest or highest. 
            // In the actual app, we just keep whatever they submitted (or the last one).
            submissionsData?.forEach(sub => {
                submissionScoresByStudent.set(sub.student_id, sub.total_score);
            });

            studentsData?.forEach((student: any) => {
                const gId = student.group_id;
                if (!gId || !student.groups) return;
                
                const score = submissionScoresByStudent.get(student.id);
                if (score !== undefined) {
                    const g = groupMap.get(gId)!;
                    g.completedCount += 1;
                    g.totalScore += score;
                }
            });

            const results: GroupResult[] = Array.from(groupMap.entries()).map(([groupId, data]) => {
                const avg = data.completedCount > 0 ? (data.totalScore / data.completedCount) : 0;
                return {
                    groupId,
                    groupName: data.name,
                    studentCount: data.studentCount,
                    completedCount: data.completedCount,
                    averageScore: Number(avg.toFixed(1)), // Keep 1 decimal
                    maxScore: 27 // Hardcoded based on current MAX_POINTS_PER_CATEGORY * categories
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

    return (
        <ResultsContext.Provider value={{ groupResults, isResultsVisible, loading, toggleResults, refreshResults }}>
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
