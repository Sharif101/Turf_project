"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import turfPic from "../../images/turf.jpg";
import axios from "axios";
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

export default function BookingForm() {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    bookingAmount: "",
    referenceNumber: "",
  });

  // 90 min game + 30 min gap = 2 hr interval
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

  const handleBookNow = () => {
    if (!selectedSport || !selectedSlot || !date) {
      alert("Please select sport, date, and time slot!");
      return;
    }
    setStep(2); // go to next step
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      sport: selectedSport,
      date: format(date, "PPP"),
      timeSlot: selectedSlot,
      ...formData,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbySgBbrN9Cb73HTFoolJraykQAaV-h5XXSeP2a3R_gOUa3fCQR2UvZXlXC_ZE9MgiGD/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingDetails),
        }
      );

      toast.success("Booking submitted successfully!");
      setStep(1);
      setSelectedSlot(null);
      setSelectedSport("");
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
      toast.error("Failed to submit booking. Try again!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
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
          <CardTitle className="text-lg font-semibold">
            SBR Football Turf
          </CardTitle>
          <div className="flex items-center text-yellow-500 text-sm gap-1">
            <Star className="w-4 h-4" /> 4.8 (23 Reviews)
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>GTPL Road, Ahmedabad, Gujarat</span>
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

      {/* Step 1: Select Sport, Date & Slot */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Sport, Date & Time Slot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sport Selection */}
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

            {/* Date Picker */}
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

                <TabsContent
                  value="morning"
                  className="grid grid-cols-2 gap-2 mt-3"
                >
                  {morningSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-md border text-sm p-2 transition ${
                        selectedSlot === slot
                          ? "bg-green-600 text-white"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </TabsContent>

                <TabsContent
                  value="afternoon"
                  className="grid grid-cols-2 gap-2 mt-3"
                >
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-md border text-sm p-2 transition ${
                        selectedSlot === slot
                          ? "bg-green-600 text-white"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </TabsContent>

                <TabsContent
                  value="evening"
                  className="grid grid-cols-2 gap-2 mt-3"
                >
                  {eveningSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-md border text-sm p-2 transition ${
                        selectedSlot === slot
                          ? "bg-green-600 text-white"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Book Button */}
            <Button
              onClick={handleBookNow}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
              {selectedSlot && date
                ? `Book ${format(date, "MMM d")} • ${selectedSlot}`
                : "Book Now"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Personal Info & Payment */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">
              Complete Your Booking
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">
              {selectedSport
                ? `${selectedSport} • ${format(date, "PPP")} • ${selectedSlot}`
                : ""}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="bookingAmount">Booking Amount</Label>
                <Input
                  id="bookingAmount"
                  name="bookingAmount"
                  type="number"
                  value={formData.bookingAmount}
                  onChange={handleChange}
                  placeholder="Enter booking amount"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="referenceNumber">Reference Number</Label>
                <Input
                  id="referenceNumber"
                  name="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={handleChange}
                  placeholder="Transaction / Reference ID"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white mt-3"
              >
                Submit Booking
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
