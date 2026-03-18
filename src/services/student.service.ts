import { supabase } from '@/lib/supabase';

export interface Student {
    id: string;
    name: string;
    group_id: number | null;
    group_name?: string;
}

export const studentService = {
    async getAllStudents(): Promise<Student[]> {
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
        
        return (data || []).map((s: any) => ({
            id: s.id,
            name: s.name,
            group_id: s.group_id,
            group_name: s.groups?.name || 'No Group'
        }));
    },

    async updateStudent(id: string, updates: Partial<Omit<Student, 'id'>>): Promise<{ error: Error | null }> {
        const { error } = await supabase
            .from('students')
            .update(updates)
            .eq('id', id);
        return { error };
    },

    async deleteStudent(id: string): Promise<{ error: Error | null }> {
        // Supposing cascade delete is handled or we delete results first
        const { error } = await supabase
            .from('students')
            .delete()
            .eq('id', id);
        return { error };
    },

    async createStudent(student: Student): Promise<{ error: Error | null }> {
        const { error } = await supabase
            .from('students')
            .insert(student);
        return { error };
    }
};
