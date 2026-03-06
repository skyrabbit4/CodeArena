"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Swords, Brain, Trophy, Gamepad2 } from "lucide-react";

const NAV = [
  { href: "/arena", label: "Battle", icon: Swords },
  { href: "/problems", label: "Practice", icon: Brain },
  { href: "/leaderboard", label: "Ranks", icon: Trophy },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop — top bar */}
      <nav className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <span className="font-extrabold text-white">CodeArena</span>
          </Link>
          <div className="flex gap-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                  pathname === href
                    ? "bg-purple-500/15 text-purple-400"
                    : "text-gray-500 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile — bottom bar (game HUD style) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="flex items-center justify-around h-16 px-2">
          <Link href="/" className={cn(
            "flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors",
            pathname === "/" ? "text-purple-400" : "text-gray-600"
          )}>
            <Gamepad2 className="w-5 h-5" />
            Home
          </Link>
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors",
                pathname === href ? "text-purple-400" : "text-gray-600"
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
