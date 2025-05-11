import { z } from "zod";

export const AnnouncementSchema = z.object({
    title: z.string().min(3),
    type: z.string(),
    content: z.string().min(5),
    visibleFrom: z.string().min(1, "First Date is required"),
    visibleTo: z.string().min(1, "Final Date is required"),
  });