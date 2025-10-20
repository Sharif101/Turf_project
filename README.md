🏏 Turf Project Management Dashboard
📘 Overview

Turf Project Management is a web-based application built to manage turf bookings, schedules, and customer details efficiently.
Currently, all booking form submissions are stored in Excel / Google Sheets, making it simple and lightweight to maintain without a dedicated backend.

⚙️ Features

✅ Turf booking form to collect customer details
✅ Data automatically saved to Excel (Google Sheets)
✅ Admin dashboard to view all bookings
✅ Search and filter bookings by name, email, or sport
✅ Responsive table and mobile card view
✅ Clean UI using React, Tailwind CSS, and ShadCN/UI

🧩 Tech Stack
Layer Technology
Frontend React / Next.js
UI Components Tailwind CSS + ShadCN/UI
Icons Lucide React
Data Storage Excel / Google Sheets
Hosting (optional) Vercel or Netlify
🗂️ Data Flow

User fills the booking form

The form submission triggers a Google Apps Script (or backend endpoint)

The data is appended to an Excel/Google Sheet

The dashboard reads and displays this data in table format

---

---

🚀 How to Run Locally

Clone this repository

git clone https://github.com/yourusername/turf-project.git
cd turf-project

Install dependencies

npm install

Run the development server

npm run dev

Open your browser and visit
👉 http://localhost:3000

🔗 Connecting with Google Sheets

If you’re using Google Sheets as your database, follow these steps:

Go to Google Sheets

Create a new sheet and name it Bookings

Open Extensions → Apps Script

Paste your script that saves form data (example below):
