"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverButton } from "./hover-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-gray-300 to-white dark:from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-md dark:backdrop-blur-[2px] border border-gray-200 dark:border-red-800",
                        "shadow-lg dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "",
    title1 = "",
    title2 = "",
    className = "relative",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    className?: string;
}) {
    const pathName = usePathname();
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };
    const { userId } = useAuth();
    return (
        <div className={cn(" min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-pink-100 dark:from-indigo-500/[0.05] dark:via-transparent dark:to-rose-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-300 to-white dark:from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-pink-300 to-white dark:from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-purple-300 to-white dark:from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-green-300 to-white dark:from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-red-300 to-white dark:from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                {badge && (
                    <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/[0.03] border border-gray-300 dark:border-white/[0.08] mb-8 md:mb-12">
                    <Circle className="h-2 w-2 fill-blue-500 dark:fill-rose-500/80" />
                    <span className="text-sm text-gray-700 dark:text-white/60 tracking-wide">{badge}</span>
                </motion.div>
                )}

                {title1 && (
                    <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                    <h1 className="text-gray-900 dark:text-white text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/80">{title1}</span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-gray-900 to-pink-500 dark:from-indigo-300 dark:via-white/90 dark:to-rose-300">{title2}</span>
                    </h1>
                </motion.div>
                )}
                {pathName ==="/"&& (<>
                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white/60 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                        Stay organized, hands-free. Let AI handle your to-dos.
                    </p>

                </motion.div>
                <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                <Link href={`/chat/${userId}`}>
                <HoverButton className="hover:bg-gray-200 dark:hover:text-black ">Get Started</HoverButton>
                </Link>
                </motion.div>
                </>)}
                
            </div>
            <div>
            </div>
        </div>
    );
}

export { HeroGeometric };
