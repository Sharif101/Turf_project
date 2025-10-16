"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function Matches() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: "Team Alpha",
      team2: "Team Beta",
      score: "3-2",
      date: "2025-10-15",
      venue: "Stadium A",
      status: "Completed",
    },
    {
      id: 2,
      team1: "Team Gamma",
      team2: "Team Delta",
      score: "1-1",
      date: "2025-10-14",
      venue: "Stadium B",
      status: "Completed",
    },
    {
      id: 3,
      team1: "Team Epsilon",
      team2: "Team Zeta",
      score: "-",
      date: "2025-10-18",
      venue: "Stadium C",
      status: "Upcoming",
    },
    {
      id: 4,
      team1: "Team Theta",
      team2: "Team Iota",
      score: "2-0",
      date: "2025-10-13",
      venue: "Stadium D",
      status: "Completed",
    },
    {
      id: 5,
      team1: "Team Kappa",
      team2: "Team Lambda",
      score: "-",
      date: "2025-10-20",
      venue: "Stadium A",
      status: "Upcoming",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this match?")) {
      setMatches(matches.filter((match) => match.id !== id));
    }
  };

  const handleView = (id) => {
    alert(`Viewing match details for ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing match ID: ${id}`);
  };

  const filteredMatches = matches.filter(
    (match) =>
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Match List</h2>
          <p className="text-gray-500 mt-1">
            Manage all your matches in one place
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={18} className="mr-2" />
          Add Match
        </Button>
      </div>

      <Card className="p-6 bg-white border-gray-200">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search matches by team or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-gray-50 border-gray-300"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Team 1
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Team 2
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Score
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Venue
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMatches.map((match) => (
                <tr
                  key={match.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    #{match.id}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {match.team1}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {match.team2}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {match.score}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {match.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {match.venue}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        match.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {match.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(match.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(match.id)}
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(match.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No matches found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
