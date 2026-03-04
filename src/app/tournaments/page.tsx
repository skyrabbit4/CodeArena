"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Crown,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const TOURNAMENTS = [
  {
    id: "t1",
    name: "Weekly Blitz Championship",
    description: "Fast-paced 5-minute rounds. Top 16 players compete for glory.",
    type: "SINGLE_ELIMINATION",
    status: "REGISTRATION",
    maxPlayers: 16,
    currentPlayers: 12,
    prizePool: "$500",
    startDate: "2026-03-07T18:00:00Z",
    color: "from-arena-accent to-purple-600",
  },
  {
    id: "t2",
    name: "Algorithm Masters Cup",
    description: "The ultimate test of algorithmic prowess. 32 competitors, 5 rounds.",
    type: "SINGLE_ELIMINATION",
    status: "UPCOMING",
    maxPlayers: 32,
    currentPlayers: 0,
    prizePool: "$1,000",
    startDate: "2026-03-14T16:00:00Z",
    color: "from-arena-neon-yellow to-orange-500",
  },
  {
    id: "t3",
    name: "Team League Season 3",
    description: "Form a team of 3. Battle other teams in a round-robin league.",
    type: "ROUND_ROBIN",
    status: "IN_PROGRESS",
    maxPlayers: 8,
    currentPlayers: 8,
    prizePool: "$2,000",
    startDate: "2026-03-01T00:00:00Z",
    color: "from-arena-neon to-teal-500",
  },
  {
    id: "t4",
    name: "Beginner Friendly Cup",
    description: "Open to players under 1400 ELO. Great for newcomers!",
    type: "SWISS",
    status: "UPCOMING",
    maxPlayers: 64,
    currentPlayers: 0,
    prizePool: "Badges & XP",
    startDate: "2026-03-10T20:00:00Z",
    color: "from-arena-neon-pink to-pink-600",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "REGISTRATION":
      return { label: "Open for Registration", class: "bg-arena-success/20 text-arena-success" };
    case "UPCOMING":
      return { label: "Coming Soon", class: "bg-arena-accent/20 text-arena-accent-light" };
    case "IN_PROGRESS":
      return { label: "In Progress", class: "bg-arena-neon-yellow/20 text-arena-neon-yellow" };
    case "COMPLETED":
      return { label: "Completed", class: "bg-white/10 text-gray-400" };
    default:
      return { label: status, class: "bg-white/10 text-gray-400" };
  }
}

export default function TournamentsPage() {
  return (
    <div className="min-h-screen grid-bg py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="text-gradient">Tournaments</span>
          </h1>
          <p className="text-gray-400">
            Compete in organized events and prove your skills
          </p>
        </motion.div>

        {/* Featured Tournament */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden mb-8 neon-border"
        >
          <div className="relative p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-arena-accent/10 rounded-full blur-[80px]" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-arena-neon-yellow" />
                <span className="text-sm font-bold text-arena-neon-yellow uppercase tracking-wider">
                  Featured Event
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                {TOURNAMENTS[0].name}
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg">
                {TOURNAMENTS[0].description}
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Trophy className="w-4 h-4 text-arena-neon-yellow" />
                  Prize: {TOURNAMENTS[0].prizePool}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Users className="w-4 h-4 text-arena-neon" />
                  {TOURNAMENTS[0].currentPlayers}/{TOURNAMENTS[0].maxPlayers} Players
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-arena-accent-light" />
                  Mar 7, 2026 • 6:00 PM
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-arena-accent to-purple-500 rounded-xl font-bold text-white hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all">
                <Zap className="w-4 h-4" />
                Register Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="px-8 pb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Registration Progress</span>
              <span>{TOURNAMENTS[0].currentPlayers}/{TOURNAMENTS[0].maxPlayers}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-arena-accent to-arena-neon rounded-full transition-all"
                style={{ width: `${(TOURNAMENTS[0].currentPlayers / TOURNAMENTS[0].maxPlayers) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* All Tournaments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOURNAMENTS.slice(1).map((tournament, i) => {
            const status = getStatusBadge(tournament.status);
            return (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card p-6 hover:border-arena-accent/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center", tournament.color)}>
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <span className={cn("px-2.5 py-1 rounded-lg text-xs font-bold", status.class)}>
                    {status.label}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-arena-accent-light transition-colors">
                  {tournament.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{tournament.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> {tournament.prizePool}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {tournament.maxPlayers} max
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(tournament.startDate).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
