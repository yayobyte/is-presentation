import { create } from 'zustand';

interface PresentationState {
    currentSlide: number;
    mode: 'talk' | 'exam';
    examStarted: boolean;
    examStartTime: number | null;
    examDuration: number; // in seconds

    // Actions
    setSlide: (slide: number) => void;
    setMode: (mode: 'talk' | 'exam') => void;
    startExam: (startTime?: number) => void;
    stopExam: () => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
    currentSlide: 0,
    mode: 'talk',
    examStarted: false,
    examStartTime: null,
    examDuration: 1200, // 20 minutes

    setSlide: (slide) => set({ currentSlide: slide }),
    setMode: (mode) => set({ mode }),
    startExam: (startTime?: number) => set({ examStarted: true, examStartTime: startTime || Date.now() }),
    stopExam: () => set({ examStarted: false, examStartTime: null }),
}));
