"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useEffect, useRef, useState } from "react";
import { BlurFade } from "./ui/blur-fade";
import { motion } from "framer-motion";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { TypingAnimation } from "./ui/typing-animation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function ChatUI() {
  const placeholders = [
    "Are there any tasks for today?",
    "Schedule a meeting with Alex on Monday",
    "Is there any task related to the project?",
    "What are the tasks for this week?",
  ];
  
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [placeHolderOn, setPlaceHolderOn] = useState<boolean>(true);
  const [tasks, setTasks] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if user is not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

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

  const handleTaskSubmit = async (task: string) => {
    if (task.trim()) {
      setTasks((prev) => [...prev, task.trim()]);
      setMessages((prev) => [...prev, { sender: "User", text: task.trim() }]);

      setIsLoading(true);
      setMessages((prev) => [...prev, { sender: "Bablue", text: "loading..." }]);

      try {
        setPlaceHolderOn(false);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, { message: task, user });
        // const res = await axios.post(`/api/tasks`, { message: task, user });

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { sender: "Bablue", text: res.data.reply },
        ]);
      } catch (error) {
        console.log("Error: ", error);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { sender: "Bablue", text: "Oops! Something went wrong." },
        ]);
      } finally {
        setIsLoading(false);
        setPlaceHolderOn(true);
      }
    }
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-screen flex flex-col justify-between items-center px-4 text-center">
      {tasks.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Hello {isLoaded ? user?.firstName : `User`} 👋
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
              Nice to meet you
            </span>
          </BlurFade>
        </div>
      )}

      {/* Chat Box */}
      {tasks.length > 0 && (
        <motion.div
          ref={chatContainerRef}
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="h-[85vh] w-full max-w-2xl mt-10 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg backdrop-saturate-150 p-6 flex flex-col overflow-y-auto border border-white/20 scrollbar-hide"
        >
          <div className="flex-1 space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}
              >
                {isLoading && msg.text === "loading..." ? (
                  <Skeleton className="w-full p-3 rounded-2xl shadow-md max-w-[75%] h-14" />
                ) : (
                  <div
                    className={`p-3 text-sm md:text-base rounded-2xl shadow-md w-fit max-w-[75%] break-words overflow-hidden ${
                      msg.sender === "User"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.sender !== "User" ? <TypingAnimation text={msg.text} /> : msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Bar */}
      <div className="w-full pb-4">
        <PlaceholdersAndVanishInput placeHolderOn={placeHolderOn} placeholders={placeholders} handleTaskSubmit={handleTaskSubmit} />
      </div>
    </div>
  );
}
