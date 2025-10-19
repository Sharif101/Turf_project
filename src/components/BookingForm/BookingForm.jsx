"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
  Home,
  CreditCard,
  Hash,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export default function BookingForm({
  bookedSlots = [],
  fetchBookedSlots = null,
}) {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotPrice, setSlotPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    bookingAmount: "",
    referenceNumber: "",
    paymentMethod: "",
  });

  const [lastBooking, setLastBooking] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

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

  const slotPricing = {
    Football: { morning: 1500, afternoon: 2000, evening: 2500 },
    Cricket: { morning: 1200, afternoon: 1600, evening: 2000 },
    Badminton: { morning: 800, afternoon: 1000, evening: 1200 },
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(label);
    toast.success(`${label} number copied!`);
    setTimeout(() => setCopiedNumber(null), 2000);
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

    if (!formData.paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }

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
      paymentMethod: formData.paymentMethod,
    };

    // inside your handleSubmit
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwHLb8w5xrnRTTTTgIUpJzL4r9qj8_okjBGLrf60oP7s-Sihj9cU0zs_EOvqM3Uqo17/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingDetails),
        }
      );

      // Send invoice to user email if email exists
      if (formData.email) {
        const templateParams = {
          user_name: formData.name,
          user_email: formData.email,
          booking_details: `
            Sport: ${selectedSport}
            Date: ${format(date, "PPP")}
            Time: ${selectedSlot}
            Total Amount: ৳${slotPrice}
            Paid: ৳${formData.bookingAmount}
            Due: ৳${slotPrice - Number(formData.bookingAmount)}
            Payment Method: ${formData.paymentMethod}
            Reference: ${formData.referenceNumber}
          `,
        };

        await emailjs.send(
          "service_6jw6e1e",
          "template_fkrdp3q",
          templateParams,
          "WO8gFTDkjZ3VOI1oM"
        );
        toast.success("Invoice sent to your email!");
      }

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
        paymentMethod: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit booking or send invoice.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isWeekend = ["Friday", "Saturday"].includes(format(date, "EEEE"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            Premium Turf Booking
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Book Your Perfect Slot
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Experience world-class sports facilities at Mohakash Turf
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Turf Details */}
          <div className="space-y-6">
            {/* Main Turf Card */}
            <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur">
              <div className="relative w-full h-64 lg:h-72 bg-gradient-to-br from-green-400 to-emerald-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">4.8</span>
                  <span className="text-gray-600 text-sm">(23)</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-2">⚽</div>
                    <p className="text-sm opacity-90">
                      Premium Sports Facility
                    </p>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Mohakash Turf
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Professional Grade Sports Arena
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pb-6">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Mohakash Road, Bordmail, Borobanga, Demra, Dhaka
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">
                    Open 6:00 AM - 11:30 PM Daily
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-200 border-0 px-3 py-1"
                    >
                      🚻 Washroom
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 px-3 py-1"
                    >
                      🅿️ Parking
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0 px-3 py-1"
                    >
                      ☕ Café
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0 px-3 py-1"
                    >
                      🔒 Secure
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Map */}
            <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-900">
                  Location
                </CardTitle>
              </CardHeader>
              <div className="h-64 w-full">
                <iframe
                  title="Turf Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.1684406844192!2d90.48379877602203!3d23.70567819049058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b7007d96400d%3A0xb5721f9738f2cbfa!2sMohakash%20Turf!5e0!3m2!1sen!2sbd!4v1760522268691!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Section */}
          <div className="space-y-6">
            {/* Step 1 - Select Slot */}
            {step === 1 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader className="pb-4 border-b bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                        Select Your Slot
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Choose sport, date and time
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  {/* Sport Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      Select Sport
                    </Label>
                    <Select
                      value={selectedSport}
                      onValueChange={setSelectedSport}
                    >
                      <SelectTrigger className="w-full h-12 border-2 hover:border-green-400 transition-colors">
                        <SelectValue placeholder="Choose your sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Football">⚽ Football</SelectItem>
                        <SelectItem value="Cricket">🏏 Cricket</SelectItem>
                        <SelectItem value="Badminton">🏸 Badminton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      Select Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal border-2 hover:border-green-400 transition-colors bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-5 w-5 text-green-600" />
                          {date ? (
                            <span className="font-medium">
                              {format(date, "PPP")}
                            </span>
                          ) : (
                            <span className="text-gray-500">Pick a date</span>
                          )}
                          {isWeekend && (
                            <Badge className="ml-auto bg-orange-500 hover:bg-orange-600">
                              20% OFF
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date()}
                          initialFocus
                          className="rounded-lg border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      Select Time Slot
                    </Label>

                    <Tabs defaultValue="morning" className="w-full">
                      <TabsList className="grid grid-cols-3 h-11 bg-gray-100 p-1">
                        <TabsTrigger
                          value="morning"
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          🌅 Morning
                        </TabsTrigger>
                        <TabsTrigger
                          value="afternoon"
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          ☀️ Afternoon
                        </TabsTrigger>
                        <TabsTrigger
                          value="evening"
                          className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          🌙 Evening
                        </TabsTrigger>
                      </TabsList>

                      {[
                        { label: "morning", slots: morningSlots },
                        { label: "afternoon", slots: afternoonSlots },
                        { label: "evening", slots: eveningSlots },
                      ].map(({ label, slots }) => (
                        <TabsContent
                          key={label}
                          value={label}
                          className="space-y-3 mt-4"
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
                                className={`w-full flex items-center justify-between rounded-xl border-2 p-4 transition-all duration-200 font-medium group ${
                                  isBooked
                                    ? "bg-red-50 text-red-700 border-red-200 cursor-not-allowed opacity-60"
                                    : selectedSlot === slot
                                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600 shadow-lg scale-[1.02]"
                                    : "border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-800 hover:scale-[1.01]"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <Clock
                                    className={`w-5 h-5 ${
                                      isBooked
                                        ? "text-red-500"
                                        : selectedSlot === slot
                                        ? "text-white"
                                        : "text-gray-400 group-hover:text-green-600"
                                    }`}
                                  />
                                  <span className="text-sm sm:text-base">
                                    {slot}
                                  </span>
                                </div>
                                {isBooked ? (
                                  <span className="text-xs sm:text-sm font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                    Booked
                                  </span>
                                ) : (
                                  <span
                                    className={`text-sm sm:text-base font-bold ${
                                      selectedSlot === slot
                                        ? "text-white"
                                        : "text-green-600"
                                    }`}
                                  >
                                    ৳{getDiscountedPrice(label)}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>

                  {/* Price Summary */}
                  {slotPrice > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">
                          Total Amount:
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ৳{slotPrice}
                        </span>
                      </div>
                      {isWeekend && (
                        <div className="mt-2 pt-2 border-t border-green-200">
                          <p className="text-xs text-green-700 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Weekend Special - 20% Discount Applied!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Book Button */}
                  <Button
                    onClick={handleBookNow}
                    disabled={!selectedSlot}
                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selectedSlot ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Book Now - ৳{slotPrice}
                      </span>
                    ) : (
                      "Select a slot to continue"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2 - Booking Details */}
            {step === 2 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader className="pb-4 border-b bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">
                        Booking Details
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Complete your reservation
                      </p>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="mt-4 bg-white rounded-lg p-3 space-y-2 border-2 border-green-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sport:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedSport}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-gray-900">
                        {format(date, "PPP")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedSlot}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-bold text-green-600 text-lg">
                        ৳{slotPrice}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        Personal Information
                      </h3>

                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name *
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-11 pl-10 border-2 focus:border-green-400"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            👤
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-700"
                          >
                            Phone Number *
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="01XXXXXXXXX"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="h-11 pl-10 border-2 focus:border-green-400"
                            />
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                          >
                            Email Address
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="h-11 pl-10 border-2 focus:border-green-400"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="address"
                          className="text-sm font-medium text-gray-700"
                        >
                          Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            className="h-11 pl-10 border-2 focus:border-green-400"
                          />
                          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        Payment Information
                      </h3>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Send Money To:
                        </Label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {/* Bkash Number Card */}
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard("01234567890", "Bkash")
                            }
                            className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-lg p-3 hover:border-pink-400 hover:shadow-md transition-all duration-200 text-left group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center text-white font-bold text-xs">
                                  bK
                                </div>
                                <span className="font-semibold text-gray-900 text-xs">
                                  Bkash
                                </span>
                              </div>
                              {copiedNumber === "Bkash" ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </div>
                            <div className="font-mono font-bold text-pink-600 text-sm">
                              01234567890
                            </div>
                          </button>

                          {/* Nagad Number Card */}
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard("01234567890", "Nagad")
                            }
                            className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-3 hover:border-orange-400 hover:shadow-md transition-all duration-200 text-left group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
                                  N
                                </div>
                                <span className="font-semibold text-gray-900 text-xs">
                                  Nagad
                                </span>
                              </div>
                              {copiedNumber === "Nagad" ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </div>
                            <div className="font-mono font-bold text-orange-600 text-sm">
                              01234567890
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Select Payment Method *
                        </Label>
                        <div className="flex gap-3 flex-wrap">
                          {[
                            { value: "Bkash", label: "💳 Bkash" },
                            { value: "Nagad", label: "💳 Nagad" },
                            { value: "Other", label: "💳 Other" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                formData.paymentMethod === option.value
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 bg-white hover:border-green-400"
                              }`}
                            >
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={option.value}
                                checked={
                                  formData.paymentMethod === option.value
                                }
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    paymentMethod: e.target.value,
                                  })
                                }
                                className="w-4 h-4 cursor-pointer"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="bookingAmount"
                            className="text-sm font-medium text-gray-700"
                          >
                            Payment Amount *
                          </Label>
                          <div className="relative">
                            <Input
                              id="bookingAmount"
                              name="bookingAmount"
                              type="number"
                              placeholder="Enter paid amount"
                              value={formData.bookingAmount}
                              onChange={handleChange}
                              required
                              className="h-11 pl-10 border-2 focus:border-green-400"
                            />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="referenceNumber"
                            className="text-sm font-medium text-gray-700"
                          >
                            Reference Number *
                          </Label>
                          <div className="relative">
                            <Input
                              id="referenceNumber"
                              name="referenceNumber"
                              placeholder="Bkash/Nagad/Rocket Ref"
                              value={formData.referenceNumber}
                              onChange={handleChange}
                              required
                              className="h-11 pl-10 border-2 focus:border-green-400"
                            />
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {formData.bookingAmount && (
                        <div className="bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200 rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Due Amount:</span>
                            <span className="font-bold text-blue-600">
                              ৳{slotPrice - Number(formData.bookingAmount)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">
                              !
                            </span>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-amber-900 text-sm">
                              Important Notice
                            </h4>
                            <p className="text-amber-800 text-xs leading-relaxed">
                              Booking amount is{" "}
                              <span className="font-bold">non-refundable</span>.
                              Please review your booking details carefully
                              before confirming.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 h-12 border-2 hover:bg-gray-50"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Confirm Booking
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && lastBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6 px-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <button
                    onClick={() => setShowInvoice(false)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                <p className="text-white/90 text-sm mt-1">
                  Your slot has been reserved successfully
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Booking Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Booking Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sport:</span>
                    <span className="font-semibold text-gray-900">
                      {lastBooking.sport}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">
                      {lastBooking.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-900">
                      {lastBooking.timeSlot}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Customer Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold text-gray-900">
                      {lastBooking.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold text-gray-900">
                      {lastBooking.phone}
                    </span>
                  </div>
                  {lastBooking.email && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900 truncate ml-2">
                        {lastBooking.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Payment Summary
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 space-y-2.5 text-sm border-2 border-green-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Amount:</span>
                    <span className="font-semibold text-gray-900">
                      ৳{lastBooking.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Paid:</span>
                    <span className="font-semibold text-green-600">
                      ৳{lastBooking.paymentAmount}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-green-200">
                    <span className="text-gray-700 font-medium">Due:</span>
                    <span className="font-bold text-orange-600">
                      ৳{lastBooking.dueAmount}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-green-200">
                    <span className="text-gray-700">Reference:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      {lastBooking.referenceNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Method:</span>
                    <span className="font-semibold text-gray-900">
                      {lastBooking.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setShowInvoice(false)}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
