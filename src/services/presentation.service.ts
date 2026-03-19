import { supabase } from '@/lib/supabase';

export interface PresentationStatePayload {
    current_slide: number;
    is_exam_started: boolean;
    exam_start_time: number | null;
    is_timer_enabled: boolean;
}

export const presentationService = {
    async fetchInitialState(): Promise<{ data: any | null; error: any }> {
        const { data, error } = await supabase
            .from('presentation_state')
            .select('id, current_slide, is_exam_started, exam_start_time, is_timer_enabled')
            .limit(1)
            .maybeSingle();

        return { data, error };
    },

    async updateState(payload: PresentationStatePayload): Promise<{ data: { id: number } | null; error: any }> {
        // Force the use of ID 1 to maintain a singleton state
        const { data, error } = await supabase
            .from('presentation_state')
            .upsert({ id: 1, ...payload })
            .select('id')
            .single();

        return { data, error };
    },

    async updateStateFallback(fallbackPayload: any): Promise<{ data: { id: number } | null }> {
        const { data } = await supabase
            .from('presentation_state')
            .upsert({ id: 1, ...fallbackPayload })
            .select('id')
            .single();

        return { data };
    },

    subscribeToChanges(rowId: number, callback: (payload: any) => void) {
        return supabase
            .channel('presentation_sync')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'presentation_state', filter: `id=eq.${rowId}` },
                (payload) => callback(payload.new)
            )
            .subscribe();
    },

    unsubscribe(channel: any) {
        if (channel) {
            supabase.removeChannel(channel);
        }
    }
};
