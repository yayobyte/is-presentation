import { supabase } from '@/lib/supabase';

export const resultService = {
    async fetchStudentsWithGroups(): Promise<any[]> {
        const { data, error } = await supabase
            .from('students')
            .select(`
                id,
                name,
                group_id,
                groups (
                    name
                )
            `);

        if (error) throw error;
        return data || [];
    },

    async fetchAllSubmissions(): Promise<any[]> {
        const { data, error } = await supabase
            .from('exam_submissions')
            .select('id, student_id, total_score');

        if (error) throw error;
        return data || [];
    }
};
