import { usePresentationStore } from '@/store/presentationStore';
import { motion, AnimatePresence } from 'framer-motion';
// Slides
import ProfileSlide from './slides/ProfileSlide';
import CurrentSlide from './slides/CurrentSlide';
import IntroSlide from './slides/IntroSlide';
import CareerSlide from './slides/CareerSlide';
import DubaiSlide from './slides/DubaiSlide';
import ColombiaSlide from './slides/ColombiaSlide';

const SLIDES = [
    ProfileSlide,      // 0: Who I am
    CurrentSlide,      // 1: The Summit (overview)
    IntroSlide,        // 2: The Struggle
    CareerSlide,       // 3: How I Made It Possible (OPA & Endava)
    DubaiSlide,        // 4: The Dubai Chapter
    ColombiaSlide,     // 5: The Return to Colombia
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
