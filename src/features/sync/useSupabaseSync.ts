import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { usePresentationStore } from '@/store/presentationStore';

export function useSupabaseSync(isPresenter: boolean) {
    const { setSlide, startExam, stopExam, currentSlide, examStarted, examStartTime } = usePresentationStore();
    const channelRef = useRef<any>(null);

    // Subscribe to changes (everyone)
    useEffect(() => {
        // Clean up previous subscription if exists
        if (channelRef.current) {
            supabase.removeChannel(channelRef.current);
        }

        const channel = supabase
            .channel('presentation_sync')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'presentation_state', filter: 'id=eq.1' },
                (payload) => {
                    const newState = payload.new;
                    console.log('Received update:', newState);

                    if (newState.current_slide !== undefined) {
                        if (!isPresenter) {
                            setSlide(newState.current_slide);
                        }
                    }

                    if (newState.is_exam_started !== undefined) {
                        if (newState.is_exam_started) {
                            const serverStartTime = newState.exam_start_time;
                            startExam(serverStartTime);
                        } else if (!newState.is_exam_started) {
                            stopExam();
                        }
                    }
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Realtime subscription active!');
                } else {
                    console.log('Realtime subscription status:', status);
                }
            });

        channelRef.current = channel;

        // Initial fetch
        const fetchState = async () => {
            const { data, error } = await supabase
                .from('presentation_state')
                .select('*')
                .eq('id', 1)
                .single();

            if (data && !error) {
                if (!isPresenter) setSlide(data.current_slide);
                if (data.is_exam_started) startExam(data.exam_start_time);
            }
        };

        fetchState();

        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
            }
        };
    }, [isPresenter, setSlide, startExam, stopExam]);

    // Push changes (Presenter only)
    useEffect(() => {
        if (!isPresenter) return;

        const updateServer = async () => {
            const { error } = await supabase
                .from('presentation_state')
                .update({
                    current_slide: currentSlide,
                    is_exam_started: examStarted,
                    exam_start_time: examStartTime
                })
                .eq('id', 1);

            if (error) console.error('Error updating state:', error);
        };

        updateServer();
    }, [currentSlide, examStarted, examStartTime, isPresenter]);
}
