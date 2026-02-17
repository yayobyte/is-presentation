import { usePresentationStore } from '@/store/presentationStore';
import { motion, AnimatePresence } from 'framer-motion';
// Slides
import IntroSlide from './slides/IntroSlide';
import CareerSlide from './slides/CareerSlide';
import CurrentSlide from './slides/CurrentSlide';

const SLIDES = [
    IntroSlide,
    CareerSlide,
    CurrentSlide,
];

export default function SlideDeck() {
    const { currentSlide } = usePresentationStore();

    const CurrentSlideComponent = SLIDES[currentSlide] || (() => <div>End of Presentation</div>);

    return (
        <div className="w-full flex justify-center py-4 md:py-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full max-w-5xl mx-auto px-4"
                >
                    <CurrentSlideComponent />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
