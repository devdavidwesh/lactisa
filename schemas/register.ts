import z from 'zod';

export const registerSchema = z.object({
    firstName: z.string().min(3, "First Name must be at least 3 characters"),
    secondName: z.string().min(3, "Second Name must be at least 3 characters"),
    phone: z
    .string()
    .regex(/^0(1|7)\d{8}$/, "Phone number must start with 01 or 07 and be 10 digits"),
    schoolType: z.enum(['UNIVERSITY', 'TVET', 'COLLEGE'], {
    required_error: "School type is required"
  }),
  constituency: z.enum(['LAIKIPIA_WEST', 'LAIKIPIA_EAST', 'LAIKIPIA_NORTH'], {
    required_error: "Constituency is required"
  }),
  registrationNumber: z.string().min(2, "Registration number is required"),
  year: z.string().min(1, "Year is required"),
    email: z.string().email("Please provide a valid email address"),
    school: z.string().min(2, "School name is required"),
    course: z.string().min(2, "Course name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });