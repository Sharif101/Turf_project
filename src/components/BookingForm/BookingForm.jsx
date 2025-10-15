"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import turfPic from "../../images/turf.jpg";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import Image from "next/image";
import { toast } from "react-toastify";

export default function BookingForm({ bookedSlots = [], fetchBookedSlots }) {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotPrice, setSlotPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    bookingAmount: "",
    referenceNumber: "",
  });

  // Invoice popup
  const [lastBooking, setLastBooking] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  // Time Slots
  const morningSlots = [
    "06:00 AM - 07:30 AM",
    "08:00 AM - 09:30 AM",
    "10:00 AM - 11:30 AM",
  ];
  const afternoonSlots = ["03:00 PM - 04:30 PM", "05:00 PM - 06:30 PM"];
  const eveningSlots = [
    "06:00 PM - 07:30 PM",
    "08:00 PM - 09:30 PM",
    "10:00 PM - 11:30 PM",
  ];

  // Slot pricing
  const slotPricing = {
    Football: { morning: 1500, afternoon: 2000, evening: 2500 },
    Cricket: { morning: 1200, afternoon: 1600, evening: 2000 },
    Badminton: { morning: 800, afternoon: 1000, evening: 1200 },
  };

  const getDiscountedPrice = (slotType) => {
    const day = format(date, "EEEE");
    if (day === "Friday" || day === "Saturday") return 4000 * 0.8;
    return slotPricing[selectedSport]?.[slotType] || 0;
  };

  const handleSlotSelect = (slotLabel, slotType) => {
    if (!selectedSport) return toast.error("Please select a sport first!");
    if (!date) return toast.error("Please select a date first!");
    setSelectedSlot(slotLabel);
    setSlotPrice(getDiscountedPrice(slotType));
  };

  const handleBookNow = () => {
    if (!selectedSport || !selectedSlot || !date) {
      return toast.error("Please select sport, date, and time slot!");
    }
    setStep(2);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const totalAmount = slotPrice;
    const paymentAmount = Number(formData.bookingAmount);
    const dueAmount = totalAmount - paymentAmount;

    const bookingDetails = {
      sport: selectedSport,
      date: date ? format(date, "PPP") : "",
      timeSlot: selectedSlot,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      paymentAmount,
      totalAmount,
      dueAmount,
      referenceNumber: formData.referenceNumber,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxNyOOFSoEDEB0DcKhtEjVtcPdCpFV4_PRzZdM7AdF4yaC2uLvXQR27K6QRGVKsO70C/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingDetails),
        }
      );

      toast.success("Booking submitted successfully!");

      if (fetchBookedSlots) fetchBookedSlots();

      setLastBooking(bookingDetails);
      setShowInvoice(true);

      setStep(1);
      setSelectedSlot(null);
      setSelectedSport("");
      setSlotPrice(0);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        bookingAmount: "",
        referenceNumber: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Turf Header */}
      <Card className="overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={turfPic}
            alt="Football Turf"
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mohakash Turf</CardTitle>
          <div className="flex items-center text-yellow-500 text-sm gap-1">
            <Star className="w-4 h-4" /> 4.8 (23 Reviews)
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Mohakash road, Bordmail, Borobanga, Demra, Dhaka</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Open 6:00 AM - 11:30 PM</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Washroom</Badge>
            <Badge variant="secondary">Parking</Badge>
            <Badge variant="secondary">Café</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Select sport/date/slot */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Sport, Date & Time Slot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={setSelectedSport}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Badminton">Badminton</SelectItem>
              </SelectContent>
            </Select>

            {/* Calendar */}
            <div className="space-y-1">
              <p className="font-medium text-sm mb-1">Select Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slots */}
            <div>
              <p className="font-medium mb-2">Select Time Slot</p>
              <Tabs defaultValue="morning" className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="morning">Morning</TabsTrigger>
                  <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
                  <TabsTrigger value="evening">Evening</TabsTrigger>
                </TabsList>

                {[
                  { label: "morning", slots: morningSlots },
                  { label: "afternoon", slots: afternoonSlots },
                  { label: "evening", slots: eveningSlots },
                ].map(({ label, slots }) => (
                  <TabsContent
                    key={label}
                    value={label}
                    className="grid gap-2 mt-3"
                  >
                    {slots.map((slot) => {
                      const isBooked = bookedSlots.some(
                        (b) =>
                          b?.sport === selectedSport &&
                          b?.date === format(date, "MMMM do, yyyy") &&
                          b?.timeSlot === slot
                      );
                      return (
                        <button
                          key={slot}
                          onClick={() =>
                            !isBooked && handleSlotSelect(slot, label)
                          }
                          disabled={isBooked}
                          className={`rounded-md border text-sm p-2 transition ${
                            isBooked
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : selectedSlot === slot
                              ? "bg-green-600 text-white"
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {slot} • ৳{getDiscountedPrice(label)}
                        </button>
                      );
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {slotPrice > 0 && (
              <p className="text-sm text-green-600 font-medium mt-1">
                {["Friday", "Saturday"].includes(format(date, "EEEE"))
                  ? `🎉 20% Discount Applied! Total: ৳${slotPrice}`
                  : `Total: ৳${slotPrice}`}
              </p>
            )}

            <Button
              onClick={handleBookNow}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
              {selectedSlot
                ? `Book ৳${slotPrice} • ${format(
                    date,
                    "MMM d"
                  )} • ${selectedSlot}`
                : "Book Now"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Booking form */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">
              Complete Your Booking
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">{`${selectedSport} • ${format(
              date,
              "PPP"
            )} • ${selectedSlot}`}</p>
            <p className="text-center text-green-600 font-medium mt-1">
              Total Slot Amount: ৳{slotPrice}
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="md:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="bookingAmount">Payment Amount</Label>
                <Input
                  id="bookingAmount"
                  name="bookingAmount"
                  type="number"
                  placeholder="Enter paid amount"
                  value={formData.bookingAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="referenceNumber">Reference Number</Label>
                <Input
                  id="referenceNumber"
                  name="referenceNumber"
                  placeholder="Bkash / Nagad / Rocket Ref"
                  value={formData.referenceNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Booking Invoice Popup */}
      {showInvoice && lastBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
              <h2 className="text-lg font-bold">Booking Confirmation</h2>
              <button
                onClick={() => setShowInvoice(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold text-gray-600">Sport:</span>
                <span className="text-gray-800">{lastBooking.sport}</span>

                <span className="font-semibold text-gray-600">Slot Date:</span>
                <span className="text-gray-800">{lastBooking.date}</span>

                <span className="font-semibold text-gray-600">Slot Time:</span>
                <span className="text-gray-800">{lastBooking.timeSlot}</span>

                <span className="font-semibold text-gray-600">Name:</span>
                <span className="text-gray-800">{lastBooking.name}</span>

                <span className="font-semibold text-gray-600">Phone:</span>
                <span className="text-gray-800">{lastBooking.phone}</span>

                <span className="font-semibold text-gray-600">Email:</span>
                <span className="text-gray-800">{lastBooking.email}</span>

                <span className="font-semibold text-gray-600">
                  Amount Paid:
                </span>
                <span className="text-gray-800">
                  ৳{lastBooking.paymentAmount}
                </span>

                <span className="font-semibold text-gray-600">Total:</span>
                <span className="text-gray-800">
                  ৳{lastBooking.totalAmount}
                </span>

                <span className="font-semibold text-gray-600">Due:</span>
                <span className="text-gray-800">৳{lastBooking.dueAmount}</span>

                <span className="font-semibold text-gray-600">Reference:</span>
                <span className="text-gray-800">
                  {lastBooking.referenceNumber}
                </span>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Footer / Close button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowInvoice(false)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
