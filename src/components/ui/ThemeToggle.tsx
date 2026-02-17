import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark")

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    return (
        <div
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-muted/50 rounded-full p-1 cursor-pointer flex items-center border border-border/50 hover:bg-muted transition-colors"
        >
            <motion.div
                className="absolute w-5 h-5 bg-background rounded-full shadow-sm flex items-center justify-center border border-border/10"
                animate={{
                    x: theme === "dark" ? 0 : 28,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {theme === "dark" ? (
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                ) : (
                    <Moon className="h-3.5 w-3.5 text-blue-500" />
                )}
            </motion.div>

            {/* Background icons (optional, for aesthetics) */}
            <div className="flex justify-between w-full px-1.5 opacity-20 pointer-events-none">
                <Sun className="h-3 w-3" />
                <Moon className="h-3 w-3" />
            </div>

            <span className="sr-only">Toggle theme</span>
        </div>
    )
}
