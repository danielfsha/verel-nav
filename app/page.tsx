"use client";

import { Navbar } from "@/components/nav";
import useScrollProgress from "@/hooks/use-scroll-progress";

export default function Home() {
  const { scrollProgress } = useScrollProgress();

  console.log(scrollProgress);
  return (
    <div className="h-[200vh] bg-[#FAFAFA] text-[#666666]">
      <Navbar />
    </div>
  );
}
