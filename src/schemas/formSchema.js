import { z } from "zod";

// Helper: check if age >= 18
const isAdult = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

export const formSchema = z.object({
  // Step 1: Personal Info
  fullName: z.string().refine((val) => val.trim().split(" ").length >= 2, {
    message: "Full name must have at least 2 words",
  }),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(
      /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/,
      "Phone must be like +1-123-456-7890"
    ),
  dob: z.string().refine((val) => isAdult(val) >= 18, {
    message: "You must be at least 18 years old",
  }),
  profilePicture: z
    .any()
    .optional()
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true; // optional
      const file = fileList[0];
      return (
        ["image/jpeg", "image/png"].includes(file.type) &&
        file.size <= 2 * 1024 * 1024
      );
    }, "Profile picture must be JPG/PNG and max 2MB"),

  // Step 2: Job Details
  department: z.enum(["Engineering", "Marketing", "Sales", "HR", "Finance"]),
  positionTitle: z.string().min(3, "Position must be at least 3 characters"),
  startDate: z.string().refine((date) => {
    const d = new Date(date);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 90);
    return d >= today && d <= maxDate;
  }, "Start date must be within 90 days"),
  jobType: z.enum(["Full-time", "Part-time", "Contract"]),
  salary: z
    .number()
    .optional()
    .refine((val, ctx) => {
      const type = ctx?.parent?.jobType;
      if (!val) return true;
      if (type === "Full-time") return val >= 30000 && val <= 200000;
      if (type === "Contract") return val >= 50 && val <= 150;
      return true;
    }, "Salary out of range for selected job type"),
  manager: z.string().optional(),

  // Step 3: Skills & Preferences
  primarySkills: z.array(z.string()).min(3, "Select at least 3 skills"),
  skillExperience: z.record(
    z.string(),
    z.enum(["beginner", "intermediate", "advanced", "expert"], {
      errorMap: () => ({ message: "Select experience for each skill" }),
    })
  ),
  preferredHours: z.string().nonempty("Select preferred working hours"),
  remotePreference: z.string().nonempty("Select remote work preference"),
  extraNotes: z.string().max(500).optional(),

  // Step 4: Emergency Contact
  emergencyName: z.string().nonempty("Emergency contact name is required"),
  relationship: z.string().nonempty("Relationship is required"),
  emergencyPhone: z
    .string()
    .regex(
      /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/,
      "Phone must be like +1-123-456-7890"
    ),
  guardianName: z.string().optional(),
  guardianPhone: z
    .string()
    .regex(
      /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/,
      "Phone must be like +1-123-456-7890"
    )
    .optional(),

  // Step 5: Review
  confirmInfo: z
    .boolean()
    .refine((val) => val === true, "You must confirm the information"),
});
