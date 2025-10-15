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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-2 gap-6 md:gap-8 overflow-x-hidden">
      {/* Turf Details */}
      <div className="space-y-6">
        <Card className="overflow-hidden shadow-lg border border-gray-200">
          <div className="relative w-full h-56">
            <Image
              src={turfPic}
              alt="Football Turf"
              fill
              className="object-cover"
              priority
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Mohakash Turf</CardTitle>
            <div className="flex items-center text-yellow-500 text-sm gap-1">
              <Star className="w-4 h-4" /> 4.8 (23 Reviews)
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>Mohakash Road, Bordmail, Borobanga, Demra, Dhaka</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span>Open 6:00 AM - 11:30 PM</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Washroom</Badge>
              <Badge variant="secondary">Parking</Badge>
              <Badge variant="secondary">Café</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Google Map Embed */}
        <Card className="overflow-hidden border border-gray-200">
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

      {/* Booking Section */}
      <div className="space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <Card className="p-4 sm:p-6 shadow-md border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Select Sport, Date & Time
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Sport */}
              <Select onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full text-sm sm:text-base">
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Badminton">Badminton</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Picker */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
                  Select Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal text-sm sm:text-base"
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
                <Label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
                  Select Time Slot
                </Label>
                <Tabs defaultValue="morning" className="w-full">
                  <TabsList className="grid grid-cols-3 text-xs sm:text-sm">
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
                      className="grid gap-3 mt-3"
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
                            className={`flex items-center justify-between rounded-md border text-sm sm:text-base p-2 sm:p-3 transition font-medium ${
                              isBooked
                                ? "bg-red-50 text-red-600 border-red-200 cursor-not-allowed"
                                : selectedSlot === slot
                                ? "bg-green-600 text-white border-green-600"
                                : "border-gray-300 hover:bg-green-50 text-gray-800"
                            }`}
                          >
                            <span>{slot}</span>
                            {isBooked ? (
                              <span className="text-red-500 font-semibold text-xs sm:text-sm">
                                Booked
                              </span>
                            ) : (
                              <span>৳{getDiscountedPrice(label)}</span>
                            )}
                          </button>
                        );
                      })}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {slotPrice > 0 && (
                <p className="text-xs sm:text-sm text-green-600 font-medium text-center">
                  {["Friday", "Saturday"].includes(format(date, "EEEE"))
                    ? `🎉 20% Discount Applied! Total: ৳${slotPrice}`
                    : `Total: ৳${slotPrice}`}
                </p>
              )}

              <Button
                onClick={handleBookNow}
                className="w-full max-w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm sm:text-lg py-3 sm:py-6 rounded-md"
              >
                {selectedSlot ? (
                  <>
                    <span className="inline sm:hidden">
                      {`Book • ৳${slotPrice}`}
                    </span>
                    <span className="hidden sm:inline">
                      {`Book ৳${slotPrice} • ${format(
                        date,
                        "MMM d"
                      )} • ${selectedSlot}`}
                    </span>
                  </>
                ) : (
                  "Book Now"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Card className="p-4 sm:p-8 shadow-md border border-gray-200">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Complete Your Booking
              </CardTitle>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                {`${selectedSport} • ${format(date, "PPP")} • ${selectedSlot}`}
              </p>
              <p className="text-green-600 font-medium text-sm sm:text-base mt-1">
                Total Slot Amount: ৳{slotPrice}
              </p>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
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

                <div className="md:col-span-2 flex gap-3 sm:gap-4 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-lg py-3 sm:py-6 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 sm:py-6 rounded-md"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invoice Popup */}
      {showInvoice && lastBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-auto max-h-[90vh]">
            <div className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
              <h2 className="text-lg font-bold">Booking Confirmation</h2>
              <button
                onClick={() => setShowInvoice(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries({
                  Sport: lastBooking.sport,
                  "Slot Date": lastBooking.date,
                  "Slot Time": lastBooking.timeSlot,
                  Name: lastBooking.name,
                  Phone: lastBooking.phone,
                  Email: lastBooking.email,
                  "Amount Paid": `৳${lastBooking.paymentAmount}`,
                  Total: `৳${lastBooking.totalAmount}`,
                  Due: `৳${lastBooking.dueAmount}`,
                  Reference: lastBooking.referenceNumber,
                }).map(([label, value]) => (
                  <React.Fragment key={label}>
                    <span className="font-semibold text-gray-600">
                      {label}:
                    </span>
                    <span className="text-gray-800">{value}</span>
                  </React.Fragment>
                ))}
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowInvoice(false)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
