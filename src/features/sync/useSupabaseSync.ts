import { useEffect, useRef } from 'react';
import { presentationService } from '@/services/presentation.service';
import { usePresentationStore } from '@/store/presentationStore';

export function useSupabaseSync(isPresenter: boolean) {
    const {
        setSlide, startExam, stopExam,
        currentSlide, examStarted, examStartTime, isTimerEnabled
    } = usePresentationStore();
    const channelRef = useRef<any>(null);

    // Initial fetch to find the singleton row ID
    useEffect(() => {
        const discoverRow = async () => {
            const { data, error } = await presentationService.fetchInitialState();

            if (data) {
                if (!isPresenter) setSlide(data.current_slide);
                if (data.is_exam_started) {
                    const timerEnabled = data.is_timer_enabled !== undefined ? data.is_timer_enabled : true;
                    startExam(data.exam_start_time, timerEnabled);
                }
            } else if (error && error.code === 'PGRST116') {
                console.log('No presentation state found. Presenter will initialize.');
            }
        };
        discoverRow();
    }, [isPresenter, setSlide, startExam]);

    // Subscribe to changes (everyone)
    useEffect(() => {
        // We know rowId is 1 for the singleton state
        const targetId = 1;

        const channel = presentationService.subscribeToChanges(targetId, (newState) => {
            console.log('Received update:', newState);

            if (newState.current_slide !== undefined) {
                if (!isPresenter) {
                    setSlide(newState.current_slide);
                }
            }

            if (newState.is_exam_started !== undefined) {
                if (newState.is_exam_started) {
                    const serverStartTime = newState.exam_start_time;
                    const timerEnabled = newState.is_timer_enabled;
                    startExam(serverStartTime, timerEnabled);
                } else if (!newState.is_exam_started) {
                    stopExam();
                }
            }
        });

        channelRef.current = channel;

        return () => {
            presentationService.unsubscribe(channelRef.current);
        };
    }, [isPresenter, setSlide, startExam, stopExam]);

    // Push changes (Presenter only)
    useEffect(() => {
        if (!isPresenter) return;

        const updateServer = async () => {
            const updatePayload: any = {
                current_slide: currentSlide,
                is_exam_started: examStarted,
                exam_start_time: examStartTime,
                is_timer_enabled: isTimerEnabled
            };

            const { error } = await presentationService.updateState(updatePayload);

            if (error) {
                // Fallback for missing column
                if (error.code === 'PGRST204') {
                    const { is_timer_enabled, ...fallbackPayload } = updatePayload;
                    await presentationService.updateStateFallback(fallbackPayload);
                } else {
                    console.error('Error updating state:', error);
                }
            }
        };

        updateServer();
    }, [currentSlide, examStarted, examStartTime, isTimerEnabled, isPresenter]);
}
