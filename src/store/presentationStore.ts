import { create } from 'zustand';

interface PresentationState {
    currentSlide: number;
    mode: 'talk' | 'exam';
    examStarted: boolean;
    examStartTime: number | null;
    examDuration: number; // in seconds
    isTimerEnabled: boolean;

    // Actions
    setSlide: (slide: number) => void;
    setMode: (mode: 'talk' | 'exam') => void;
    setTimerEnabled: (enabled: boolean) => void;
    startExam: (startTime?: number, timerEnabled?: boolean) => void;
    stopExam: () => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
    currentSlide: 0,
    mode: 'talk',
    examStarted: false,
    examStartTime: null,
    examDuration: 1200, // 20 minutes
    isTimerEnabled: true,

    setSlide: (slide) => set({ currentSlide: slide }),
    setMode: (mode) => set({ mode }),
    setTimerEnabled: (isTimerEnabled) => set({ isTimerEnabled }),
    startExam: (startTime, timerEnabled) => set((state) => ({
        examStarted: true,
        examStartTime: startTime || Date.now(),
        isTimerEnabled: timerEnabled !== undefined ? timerEnabled : state.isTimerEnabled
    })),
    stopExam: () => set({ examStarted: false, examStartTime: null }),
}));
