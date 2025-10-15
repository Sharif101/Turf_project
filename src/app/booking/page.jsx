import BookingForm from "@/components/BookingForm/BookingForm";
import React from "react";

export default async function Page() {
  let bookedSlots = [];

  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxNyOOFSoEDEB0DcKhtEjVtcPdCpFV4_PRzZdM7AdF4yaC2uLvXQR27K6QRGVKsO70C/exec",
      { cache: "no-store" }
    );

    const data = await res.json();

    // Map into objects with proper Date
    bookedSlots = data
      .map((item) => ({
        sport: item.sport,
        date: item.date,
        timeSlot: item.timeSlot,
      }))
      .filter(Boolean);

    console.log("Booked slots:", bookedSlots);
  } catch (err) {
    console.error("Failed to fetch booked slots:", err);
  }

  return (
    <div className="light-theme min-h-screen">
      <BookingForm bookedSlots={bookedSlots} />
    </div>
  );
}
