// Map each step to the fields it contains
export const stepFields = {
  1: ["fullName", "email", "phone", "dob", "profilePicture"],
  2: [
    "department",
    "positionTitle",
    "startDate",
    "jobType",
    "salary",
    "manager",
  ],
  3: [
    "primarySkills",
    "skillExperience",
    "preferredHours",
    "remotePreference",
    "extraNotes",
  ],
  4: [
    "emergencyName",
    "relationship",
    "emergencyPhone",
    "guardianName",
    "guardianPhone",
  ],
  5: ["confirmInfo"],
};

// export const managerOptions = [
//   "Alice Johnson",
//   "Tanvir Ahamed",
//   "Lisa Wong",
//   "Sarah Kim",
//   "John Patel",
//   "Nina Roy",
//   "David Lee",
//   "Maria Gomez",
//   "Rahul Sinha",
//   "Emma Brown",
//   "Hasan Chowdhury",
//   "Olivia Green",
//   "Jake Turner",
//   "Nadia Rahman",
// ];

export const managerOptions = [
  { id: "ENG001", name: "Alice Johnson", department: "Engineering" },
  { id: "ENG002", name: "Tanvir Ahamed", department: "Engineering" },
  { id: "ENG003", name: "Lisa Wong", department: "Engineering" },
  { id: "MKT001", name: "Sarah Kim", department: "Marketing" },
  { id: "MKT002", name: "John Patel", department: "Marketing" },
  { id: "MKT003", name: "Nina Roy", department: "Marketing" },
  { id: "SAL001", name: "David Lee", department: "Sales" },
  { id: "SAL002", name: "Maria Gomez", department: "Sales" },
  { id: "SAL003", name: "Rahul Sinha", department: "Sales" },
  { id: "HR001", name: "Emma Brown", department: "HR" },
  { id: "HR002", name: "Hasan Chowdhury", department: "HR" },
  { id: "FIN001", name: "Olivia Green", department: "Finance" },
  { id: "FIN002", name: "Jake Turner", department: "Finance" },
  { id: "FIN003", name: "Nadia Rahman", department: "Finance" },
];

export const availableSkills = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "SQL",
  "AWS",
  "Docker",
  "Git",
  "Project Management",
  "Data Analysis",
  "Machine Learning",
  "UI/UX Design",
  "Marketing",
  "Sales",
  "Customer Service",
  "Leadership",
  "Communication",
];

export const skillsByDepartment = {
  Engineering: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "GraphQL",
    "Docker",
    "CI/CD",
    "Microservices",
    "Unit Testing",
  ],
  Marketing: [
    "SEO",
    "Content Writing",
    "Google Ads",
    "Social Media Marketing",
    "Email Marketing",
    "Brand Management",
    "Copywriting",
    "Video Editing",
  ],
  Sales: [
    "CRM Software",
    "Lead Generation",
    "Cold Calling",
    "Upselling",
    "Negotiation",
    "Client Relationship Management",
    "B2B Sales",
    "Territory Management",
  ],
  HR: [
    "Recruitment",
    "Onboarding",
    "Conflict Resolution",
    "Payroll Management",
    "Compliance",
    "Employee Training",
    "Performance Review",
  ],
  Finance: [
    "Budgeting",
    "Financial Analysis",
    "Accounting",
    "Bookkeeping",
    "Payroll Processing",
    "Tax Compliance",
    "Expense Reporting",
    "Cash Flow Management",
  ],
};

export const experienceLevels = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (2-4 years)" },
  { value: "advanced", label: "Advanced (5-7 years)" },
  { value: "expert", label: "Expert (8+ years)" },
];

export const workingHoursOptions = [
  { value: "standard", label: "Standard (9 AM - 5 PM)" },
  { value: "early", label: "Early (7 AM - 3 PM)" },
  { value: "late", label: "Late (11 AM - 7 PM)" },
  { value: "flexible", label: "Flexible Hours" },
];

export const remoteOptions = [
  { value: "onsite", label: "On-site only" },
  { value: "hybrid", label: "Hybrid (2-3 days remote)" },
  { value: "remote", label: "Fully remote" },
  { value: "no-preference", label: "No preference" },
];

export const relationshipOptions = [
  "Spouse",
  "Parent",
  "Sibling",
  "Child",
  "Friend",
  "Colleague",
  "Other",
];
