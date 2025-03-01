"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown"
interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export function TypingAnimation({
  text,
  duration = 50,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [text,duration, i]);

  return (
    <h1
      className={cn(
        "",
        className,
      )}
    >
      
      <ReactMarkdown>{displayedText ? displayedText : text}</ReactMarkdown>
    </h1>
  );
}
