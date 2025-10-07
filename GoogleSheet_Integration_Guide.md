# 🧾 How to Connect Google Sheets to a React / Next.js Project

## 🪜 Step 1: Create a Google Sheet

1. Go to **[Google Sheets](https://sheets.google.com/)**.
2. Click **Blank** to create a new spreadsheet.
3. Rename it — for example:
   ```
   Booking Data
   ```

## 🆔 Step 2: Get Your Sheet ID

1. Look at the URL in your browser.  
   Example:
   ```
   https://docs.google.com/spreadsheets/d/1AbCDEfGhiJkLMNOPQrsTUVWxyz1234567/edit#gid=0
   ```
2. The part between `/d/` and `/edit` is your **Sheet ID**.

✅ Example:

```
Sheet ID: 1AbCDEfGhiJkLMNOPQrsTUVWxyz1234567
```

## 📄 Step 3: Get Your Sheet Name

1. At the bottom of the Google Sheet, you’ll see a tab name (like **Sheet1**, **Data**, etc).
2. That is your **Sheet Name**.

✅ Example:

```
Sheet Name: Sheet1
```

## ⚙️ Step 4: Open Apps Script Editor

1. In your Google Sheet, click:
   ```
   Extensions → Apps Script
   ```
2. This will open the Google Apps Script editor in a new tab.

## 💻 Step 5: Paste the Script Code

Delete everything inside the script editor and paste the following code:

```js
// Google Apps Script

function doPost(e) {
  var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(
    "YOUR_SHEET_NAME_HERE"
  );

  // Parse the POST request
  var data = JSON.parse(e.postData.contents);

  // Append data in order (match your sheet columns)
  sheet.appendRow([
    new Date(), // Timestamp
    data.sport, // Sport
    data.date, // Date
    data.timeSlot, // Time Slot
    data.name, // Name
    data.phone, // Phone
    data.email, // Email
    data.address, // Address
    data.bookingAmount, // Amount
    data.referenceNumber, // Reference ID
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success", data: data })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## 🧩 Step 6: Replace IDs

Replace the placeholders:

```js
var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(
  "YOUR_SHEET_NAME_HERE"
);
```

✅ Example:

```js
var sheet = SpreadsheetApp.openById(
  "1AbCDEfGhiJkLMNOPQrsTUVWxyz1234567"
).getSheetByName("Sheet1");
```

## 🚀 Step 7: Deploy as Web App

1. Click **Deploy → New Deployment** (top-right corner).
2. Choose **Web App**.
3. Under **“Execute as”**, select:
   ```
   Me (your account)
   ```
4. Under **“Who has access”**, select:
   ```
   Anyone
   ```
5. Click **Deploy**.
6. It will ask for permissions → Click **Authorize** → **Allow**.
7. Copy the **Web App URL** you get after deployment.

✅ Example:

```
https://script.google.com/macros/s/AKfycbxsSjEVb_Jel_zkeFXm8nD5BxMlTro1y9RBwC3OzaFPU6ED3Bflv1THO_NlgH0kvnFI/exec
```

That’s your **API endpoint**!

## ⚡ Step 8: Connect From React / Next.js

Use `axios.post()` to send data to that URL:

```js
await axios.post(
  "https://script.google.com/macros/s/AKfycbxsSjEVb_Jel_zkeFXm8nD5BxMlTro1y9RBwC3OzaFPU6ED3Bflv1THO_NlgH0kvnFI/exec",
  bookingDetails
);
```

✅ `bookingDetails` should be an object like:

```js
{
  sport: "Football",
  date: "Oct 10, 2025",
  timeSlot: "06:00 PM - 07:30 PM",
  name: "Sharif",
  phone: "0123456789",
  email: "sharif@example.com",
  address: "Dhaka, Bangladesh",
  bookingAmount: "1200",
  referenceNumber: "TXN12345"
}
```

## 🧠 Step 9: Test It

1. Submit your form in the app.
2. Go to your Google Sheet.
3. You’ll see a new row added automatically 🎉

## ⚠️ Common Issues

| Problem                       | Cause                                           | Solution                                  |
| ----------------------------- | ----------------------------------------------- | ----------------------------------------- |
| **Network Error**             | Wrong script permissions or deployment settings | Re-deploy with “Anyone” access            |
| **CORS error**                | Using old deployment or “Only myself” access    | Ensure public access                      |
| **No data saved**             | Sheet name mismatch                             | Check `getSheetByName("Sheet1")` spelling |
| **Multiple submissions fail** | Sheet overloaded or rate-limited                | Use delays or batch writing if needed     |

<!-- ------------------------------------------------------ -->
