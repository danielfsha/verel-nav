"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Search,
  Bell,
  Grid3x3,
  ChevronDown,
  ArrowUpDown,
  ChevronsUpDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useScrollProgress from "@/hooks/use-scroll-progress";

const navigationItems = [
  "Projects",
  "Integrations",
  "Deployments",
  "Activity",
  "Domains",
  "Usage",
  "Observability",
  "Storage",
  "Flags",
  "AI Gateway",
  "Agent",
  "Support",
  "Settings",
];

export function Navbar() {
  const { scrollProgress } = useScrollProgress();

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Motion values for active indicator
  const activeLeft = useMotionValue(0);
  const activeWidth = useMotionValue(0);
  // Motion values for hover indicator
  const hoverLeft = useMotionValue(0);
  const hoverWidth = useMotionValue(0);

  // Springs for smooth animation
  const springConfig = { stiffness: 380, damping: 30 };
  const springActiveLeft = useSpring(activeLeft, springConfig);
  const springActiveWidth = useSpring(activeWidth, springConfig);
  const springHoverLeft = useSpring(hoverLeft, springConfig);
  const springHoverWidth = useSpring(hoverWidth, springConfig);

  // Inside your Navbar component:
  const rawScrollProgress = scrollProgress; // scrollProgress is a number prop/state from your hook
  const scrollProgressMotion = useMotionValue(rawScrollProgress);

  // Sync scrollProgressMotion with raw number updates
  useEffect(() => {
    scrollProgressMotion.set(rawScrollProgress);
  }, [rawScrollProgress, scrollProgressMotion]);

  // Now create your transforms from scrollProgressMotion
  const navbarHeight = useTransform(scrollProgressMotion, [0, 0.1], [88, 45]);
  const topPartY = useTransform(scrollProgressMotion, [0, 0.1], [0, -45]);
  const bottomNavY = useTransform(scrollProgressMotion, [0, 0.1], [0, -45]);
  const bottomNavX = useTransform(scrollProgressMotion, [0, 0.1], [0, 65]);

  // Update active indicator whenever activeIndex changes
  useEffect(() => {
    if (activeIndex !== null && navItemsRef.current[activeIndex]) {
      const el = navItemsRef.current[activeIndex];
      activeLeft.set(el.offsetLeft);
      activeWidth.set(el.offsetWidth);
    }
  }, [activeIndex, activeLeft, activeWidth]);

  // Update hover indicator on hover or fallback to active indicator
  useEffect(() => {
    if (hoveredIndex !== null && navItemsRef.current[hoveredIndex]) {
      const el = navItemsRef.current[hoveredIndex];
      hoverLeft.set(el.offsetLeft);
      hoverWidth.set(el.offsetWidth);
    } else {
      // fallback to active indicator position and size
      hoverLeft.set(activeLeft.get());
      hoverWidth.set(activeWidth.get());
    }
  }, [hoveredIndex, hoverLeft, hoverWidth, activeLeft, activeWidth]);

  function handleClick(index: number) {
    setActiveIndex(index);
  }

  return (
    <motion.nav
      style={{ height: navbarHeight }}
      className="sticky top-0 z-50 w-full bg-white overflow-hidden border-b border-[#000000]/8 px-2"
    >
      <div className="flex h-12 space-x-3 items-center justify-between px-4">
        {/* Left Section - Logo */}
        <div className="flex h-10 w-10 items-center justify-center">
          <svg viewBox="0 0 76 65" fill="black" className="h-4 w-4">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
        </div>

        <motion.div
          style={{ y: topPartY }}
          className="flex-1 h-full flex items-center justify-between"
        >
          {/* Left side */}
          <div className="flex items-center gap-3">
            <h1>{" / "}</h1>
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
            <span className="text-sm font-medium">daniel's projects</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 gap-1 px-2 text-xs bg-zinc-200 text-black rounded-full"
            >
              Hobby
            </Button>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown />
            </Button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Find..."
                className="h-8 w-64 border-zinc-200 pl-9 pr-12 text-sm placeholder:text-zinc-500 focus-visible:ring-zinc-700"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-zinc-200 bg-zinc-200 px-1.5 py-0.5 text-xs text-zinc-700">
                F
              </kbd>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 text-sm hover:text-black"
            >
              Feedback
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="relative h-8 w-8 rounded-full"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>

            <Avatar className="h-7 w-7">
              <AvatarImage src="https://avatar.vercel.sh/daniel" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-xs">
                D
              </AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </div>

      {/* bottom nav */}
      <motion.div
        style={{ y: bottomNavY, x: bottomNavX }}
        className="px-2 relative h-10 flex items-center overflow-hidden"
      >
        {navigationItems.map((item, index) => (
          <Button
            key={item}
            ref={(el) => {
              navItemsRef.current[index] = el;
            }}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 text-sm font-normal text-zinc-400 hover:text-black hover:bg-transparent",
              index === activeIndex && "text-black"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(index)}
          >
            {item}
          </Button>
        ))}

        {/* Active Indicator */}
        <motion.div
          className="absolute bottom-[1px] h-[1px] bg-black"
          style={{ left: springActiveLeft, width: springActiveWidth }}
        />

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-1 h-[32px] rounded-sm bg-black/10 pointer-events-none"
          style={{
            left: springHoverLeft,
            width: springHoverWidth,
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.nav>
  );
}
