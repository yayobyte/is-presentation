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

    async updateState(rowId: number | null, payload: PresentationStatePayload): Promise<{ data: { id: number } | null; error: any }> {
        const query = rowId
            ? supabase.from('presentation_state').update(payload).eq('id', rowId).select('id').maybeSingle()
            : supabase.from('presentation_state').upsert({ id: rowId || undefined, ...payload }).select('id').single();

        const { data, error } = await query as any;
        return { data, error };
    },

    async updateStateFallback(rowId: number | null, fallbackPayload: any): Promise<{ data: { id: number } | null }> {
        const fallbackQuery = rowId
            ? supabase.from('presentation_state').update(fallbackPayload).eq('id', rowId).select('id').maybeSingle()
            : supabase.from('presentation_state').upsert({ id: rowId || undefined, ...fallbackPayload }).select('id').single();

        const { data } = await fallbackQuery as any;
        return { data };
    },

    subscribeToChanges(rowId: number, callback: (payload: any) => void) {
        return supabase
            .channel('presentation_sync')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'presentation_state', filter: `id=eq.${rowId}` },
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
