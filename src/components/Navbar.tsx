"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getRankColor } from "@/types";
import { useGameStore } from "@/store/game-store";
import {
  Swords,
  Trophy,
  Brain,
  BarChart3,
  Users,
  User,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/arena", label: "Arena", icon: Swords },
  { href: "/problems", label: "Questions", icon: Brain },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser } = useGameStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-arena-bg/80 backdrop-blur-xl border-b border-arena-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-arena-accent to-arena-neon flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(108,92,231,0.5)] transition-shadow">
              <Swords className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">CodeArena</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-arena-accent/20 text-arena-accent-light"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Info */}
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{currentUser.username}</p>
              <p
                className="text-xs font-mono font-bold"
                style={{ color: getRankColor(currentUser.rank) }}
              >
                {currentUser.rank} • {currentUser.elo} ELO
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-arena-accent to-arena-neon-pink flex items-center justify-center text-white font-bold text-sm">
              {currentUser.username[0]}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-arena-border/50 px-2 pb-2">
        <div className="flex items-center justify-around pt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all",
                  isActive
                    ? "text-arena-accent-light"
                    : "text-gray-500"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
