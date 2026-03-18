import { supabase } from '@/lib/supabase';

export interface Group {
    id: number;
    name: string;
}

export const groupService = {
    async getAllGroups(): Promise<Group[]> {
        const { data, error } = await supabase
            .from('groups')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    async createGroup(name: string): Promise<{ data: Group | null; error: Error | null }> {
        const { data, error } = await supabase
            .from('groups')
            .insert({ name })
            .select();
        
        return { 
            data: data ? data[0] : null, 
            error 
        };
    },

    async updateGroup(id: number, name: string): Promise<{ error: Error | null }> {
        const { error } = await supabase
            .from('groups')
            .update({ name })
            .eq('id', id);
        return { error };
    },

    async deleteGroup(id: number): Promise<{ error: Error | null }> {
        const { error } = await supabase
            .from('groups')
            .delete()
            .eq('id', id);
        return { error };
    }
};
