"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Trophy, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // ✅ Memoized to avoid dependency warnings
  const allMatches = useMemo(
    () => [
      {
        id: 1,
        team1: "Team Alpha",
        team2: "Team Beta",
        score: "3-2",
        date: "2025-10-15",
        status: "Completed",
        revenue: 1500,
      },
      {
        id: 2,
        team1: "Team Gamma",
        team2: "Team Delta",
        score: "1-1",
        date: "2025-10-14",
        status: "Completed",
        revenue: 1200,
      },
      {
        id: 3,
        team1: "Team Epsilon",
        team2: "Team Zeta",
        score: "2-1",
        date: "2025-10-12",
        status: "Completed",
        revenue: 1800,
      },
      {
        id: 4,
        team1: "Team Alpha",
        team2: "Team Gamma",
        score: "4-0",
        date: "2025-10-10",
        status: "Completed",
        revenue: 2000,
      },
      {
        id: 5,
        team1: "Team Beta",
        team2: "Team Delta",
        score: "2-2",
        date: "2025-10-08",
        status: "Completed",
        revenue: 1600,
      },
      {
        id: 6,
        team1: "Team Zeta",
        team2: "Team Alpha",
        score: "1-3",
        date: "2025-09-28",
        status: "Completed",
        revenue: 1400,
      },
      {
        id: 7,
        team1: "Team Gamma",
        team2: "Team Epsilon",
        score: "3-1",
        date: "2025-09-25",
        status: "Completed",
        revenue: 1700,
      },
      {
        id: 8,
        team1: "Team Delta",
        team2: "Team Beta",
        score: "0-2",
        date: "2025-09-20",
        status: "Completed",
        revenue: 1300,
      },
      {
        id: 9,
        team1: "Team Alpha",
        team2: "Team Zeta",
        score: "2-1",
        date: "2025-09-15",
        status: "Completed",
        revenue: 1900,
      },
      {
        id: 10,
        team1: "Team Epsilon",
        team2: "Team Gamma",
        score: "-",
        date: "2025-10-18",
        status: "Upcoming",
        revenue: 0,
      },
      {
        id: 11,
        team1: "Team Beta",
        team2: "Team Alpha",
        score: "-",
        date: "2025-10-20",
        status: "Upcoming",
        revenue: 0,
      },
    ],
    []
  );

  // 📅 Date range helper
  const getDateRanges = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() - 7);

    const thisMonthStart = new Date(currentYear, currentMonth, 1);

    const lastMonthStart = new Date(currentYear, currentMonth - 1, 1);
    const lastMonthEnd = new Date(currentYear, currentMonth, 0);

    return { thisWeekStart, thisMonthStart, lastMonthStart, lastMonthEnd, now };
  };

  // 🔍 Filtered matches by date
  const filteredMatches = useMemo(() => {
    const { thisWeekStart, thisMonthStart, lastMonthStart, lastMonthEnd, now } =
      getDateRanges();

    return allMatches.filter((match) => {
      const matchDate = new Date(match.date);

      switch (dateFilter) {
        case "week":
          return matchDate >= thisWeekStart && matchDate <= now;
        case "month":
          return matchDate >= thisMonthStart && matchDate <= now;
        case "lastMonth":
          return matchDate >= lastMonthStart && matchDate <= lastMonthEnd;
        case "custom":
          if (customStartDate && customEndDate) {
            const start = new Date(customStartDate);
            const end = new Date(customEndDate);
            return matchDate >= start && matchDate <= end;
          }
          return true;
        default:
          return true;
      }
    });
  }, [dateFilter, customStartDate, customEndDate, allMatches]);

  // 📊 Stats summary
  const stats = useMemo(() => {
    const { thisMonthStart, now } = getDateRanges();

    const completedMatches = filteredMatches.filter(
      (m) => m.status === "Completed"
    );
    const totalRevenue = completedMatches.reduce(
      (sum, m) => sum + m.revenue,
      0
    );

    const thisMonthMatches = allMatches.filter((m) => {
      const matchDate = new Date(m.date);
      return (
        matchDate >= thisMonthStart &&
        matchDate <= now &&
        m.status === "Completed"
      );
    });

    const thisMonthRevenue = thisMonthMatches.reduce(
      (sum, m) => sum + m.revenue,
      0
    );

    const allCompletedMatches = allMatches.filter(
      (m) => m.status === "Completed"
    );

    const allTimeRevenue = allCompletedMatches.reduce(
      (sum, m) => sum + m.revenue,
      0
    );

    return [
      {
        title: "Total Matches",
        value: allCompletedMatches.length.toString(),
        icon: Trophy,
        color: "bg-blue-500",
        subtitle: "All time",
      },
      {
        title: "This Month Matches",
        value: thisMonthMatches.length.toString(),
        icon: Calendar,
        color: "bg-green-500",
        subtitle: "Current month",
      },
      {
        title: "Total Revenue",
        value: `$${allTimeRevenue.toLocaleString()}`,
        icon: DollarSign,
        color: "bg-purple-500",
        subtitle: "All time",
      },
      {
        title: "This Month Revenue",
        value: `$${thisMonthRevenue.toLocaleString()}`,
        icon: TrendingUp,
        color: "bg-orange-500",
        subtitle: "Current month",
      },
    ];
  }, [filteredMatches, allMatches]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Date Filter */}
      <Card className="p-6 bg-white border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filter by Date
        </h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { key: "all", label: "All Time" },
            { key: "week", label: "This Week" },
            { key: "month", label: "This Month" },
            { key: "lastMonth", label: "Last Month" },
            { key: "custom", label: "Custom Range" },
          ].map((f) => (
            <Button
              key={f.key}
              variant={dateFilter === f.key ? "default" : "outline"}
              onClick={() => setDateFilter(f.key)}
              className={
                dateFilter === f.key ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              {f.label}
            </Button>
          ))}
        </div>

        {dateFilter === "custom" && (
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-white border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{stat.subtitle}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Match History */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Match History ({filteredMatches.length} matches)
          </h3>
        </div>
        <div className="space-y-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {match.team1} vs {match.team2}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{match.date}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-lg font-bold text-gray-900">
                    {match.score}
                  </p>
                  {match.revenue > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      ${match.revenue}
                    </p>
                  )}
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      match.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {match.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No matches found for the selected date range.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
