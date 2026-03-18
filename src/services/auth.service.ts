import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export const authService = {
    async getSession(): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, user: session?.user ?? null, error };
    },

    onAuthStateChange(callback: (session: Session | null, user: User | null) => void) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            callback(session, session?.user ?? null);
        });
        return subscription;
    },

    async signInWithPassword(email: string, password: string): Promise<{ error: Error | null }> {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    },

    async signOut(): Promise<{ error: Error | null }> {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Student Authentication / Validation mapped here for simplicity
    async validateStudent(studentId: string): Promise<{ student: { name: string } | null; error: string | null }> {
        const { data, error } = await supabase
            .from('students')
            .select('name')
            .eq('id', studentId.trim())
            .single();

        if (error || !data) {
            return { student: null, error: 'Student ID not found. Please check your document number.' };
        }
        return { student: data, error: null };
    }
};
