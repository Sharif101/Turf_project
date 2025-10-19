"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Trash2 } from "lucide-react";

export default function Matches({ bookings, loading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      // For demo, remove from local state
      bookings = bookings.filter((b) => b.id !== id);
    }
  };

  const handleView = (booking) => {
    alert(
      `Booking Details:\nName: ${booking.name}\nEmail: ${booking.email}\nSport: ${booking.sport}\nDate: ${booking.date}`
    );
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bookings</h2>
          <p className="text-gray-500 mt-1">Manage all your bookings here</p>
        </div>
      </div>

      <Card className="p-6 bg-white border-gray-200">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by name, email or sport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-gray-50 border-gray-300"
          />
        </div>

        {loading ? (
          <p className="text-center py-12 text-gray-500">Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No bookings found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Sport
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Time Slot
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Payment
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 text-sm">{b.id}</td>
                    <td className="py-2 px-4 text-sm">{b.name}</td>
                    <td className="py-2 px-4 text-sm">{b.email}</td>
                    <td className="py-2 px-4 text-sm">{b.phone}</td>
                    <td className="py-2 px-4 text-sm">{b.sport}</td>
                    <td className="py-2 px-4 text-sm">{b.date}</td>
                    <td className="py-2 px-4 text-sm">{b.timeSlot}</td>
                    <td className="py-2 px-4 text-sm">
                      {b.paymentAmount} / {b.totalAmount} (Due: {b.dueAmount})
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(b)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(b.id)}
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
        )}
      </Card>
    </div>
  );
}
