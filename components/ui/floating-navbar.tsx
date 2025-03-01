"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "../toggleThemeButton";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./button";
import { LogIn } from "lucide-react";

interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-lg z-[5000] pr-6 pl-6 py-2 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map(({ name, link, icon }, idx) => (
          <Link
            key={`link-${idx}`}
            href={link}
            className="relative dark:text-neutral-50 flex items-center space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          >
            <span className="block sm:hidden">{icon}</span>
            <span className="hidden sm:block text-sm">{name}</span>
          </Link>
        ))}
        
        <div className="flex items-center space-x-3">
          <ModeToggle />

          <SignedIn>
            <UserButton  />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <div>
              <span className="block sm:hidden"><LogIn className="h-4 w-4 text-neutral-500 dark:text-white"/></span>
              <span className="hidden sm:block text-sm">
              <Button className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Sign In
              </Button>
              </span>
              
              </div>
            </SignInButton>
          </SignedOut>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
