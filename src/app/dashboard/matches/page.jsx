"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Matches from "@/components/Matches/Matches";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwHLb8w5xrnRTTTTgIUpJzL4r9qj8_okjBGLrf60oP7s-Sihj9cU0zs_EOvqM3Uqo17/exec",
        { cache: "no-store" }
      );
      const data = await res.json();
      console.log({ data });

      // Map your sheet data directly without filtering
      const formattedData = data.map((item, index) => ({
        id: index + 1,
        sport: item.sport,
        date: item.date,
        timeSlot: item.timeSlot,
        name: item.name,
        phone: item.phone,
        email: item.email,
        address: item.address,
        paymentAmount: item.paymentAmount,
        totalAmount: item.totalAmount,
        dueAmount: item.dueAmount,
        referenceNumber: item.referenceNumber,
        paymentMethod: item.paymentMethod,
      }));

      setBookings(formattedData);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  console.log({ bookings });

  return (
    <DashboardLayout>
      <Matches bookings={bookings} loading={loading} />
    </DashboardLayout>
  );
}
