import { supabase } from '@/lib/supabase';

export interface ExamSubmissionPayload {
    student_id: string;
    student_name: string;
    answers: Record<string, number>;
    category_scores: Record<string, number>;
    total_score: number;
}

export const examService = {
    async submitExam(payload: ExamSubmissionPayload): Promise<{ error: Error | null }> {
        const { error } = await supabase.from('exam_submissions').insert(payload);
        return { error };
    },

    async deleteSubmission(submissionId: string): Promise<{ error: Error | null }> {
        const { error } = await supabase.from('exam_submissions').delete().eq('id', submissionId);
        return { error };
    },

    async getPreviousSubmission(studentId: string): Promise<{ data: any | null; error: Error | null }> {
        const { data, error } = await supabase
            .from('exam_submissions')
            .select('student_name, answers, category_scores')
            .eq('student_id', studentId.trim())
            .order('submitted_at', { ascending: false })
            .limit(1);

        if (error) return { data: null, error };
        return { data: data && data.length > 0 ? data[0] : null, error: null };
    }
};
