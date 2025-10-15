"use client"; // important to make it a Client Component
import BookingForm from "@/components/BookingForm/BookingForm";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookedSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxNyOOFSoEDEB0DcKhtEjVtcPdCpFV4_PRzZdM7AdF4yaC2uLvXQR27K6QRGVKsO70C/exec",
        { cache: "no-store" }
      );
      const data = await res.json();

      const slots = data
        .map((item) => ({
          sport: item.sport,
          date: item.date,
          timeSlot: item.timeSlot,
        }))
        .filter(Boolean);

      setBookedSlots(slots);
    } catch (err) {
      console.error("Failed to fetch booked slots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, []);

  return (
    <div className="light-theme min-h-screen">
      <BookingForm
        bookedSlots={bookedSlots}
        fetchBookedSlots={fetchBookedSlots}
      />
    </div>
  );
}
