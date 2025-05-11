"use server";

import { currentUser } from "@/libs/currentUser";
import { db } from "@/prisma";
import { MessageSchema } from "@/schemas/message";
import { z } from "zod";

export const getActiveUsers = async () => {
  const sysUser = await currentUser();
  if (sysUser?.role !== "USER") return
  
  const count = await db.user.count({
    where: { status: "ACTIVE" },
  });

  return { count };
};



export const getAnnouncements = async () => {
    const announcements = await db.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        announcementId: false,
        title: true,
        type: true,
        content: true,
        visibleFrom: false,
        visibleTo: true,
        createdById: false,
        creator: false,
        createdAt: true,
        updatedAt: false,
      },
    });
    
    return announcements;
};


type MessageData = z.infer<typeof MessageSchema>
export const sendMessage = async (messageData: MessageData) => {
  const sysUser = await currentUser();
  if (sysUser?.role !== "USER") return { error: `Admin cannot send messages!` }

  const validatedData = MessageSchema.safeParse(messageData);
  if (!validatedData.success) {
    const errorMessages = validatedData.error.errors.map((err) => err.message).join(", ")
    return { error: `Validation Failed: ${errorMessages}` }
  }

    const { message } = validatedData.data;
    if (sysUser.name && sysUser.id) {
      const newMessage = await db.message.create({
        data: {
              message,
              sender: sysUser.name,
              userId: sysUser.id,
        }
      });
      if (!newMessage) return { error: `Something went Wrong!` }
    }

    return { success: `Message sent.` }    
}


export async function getMessages(UserId: string) {
    const messages = await db.message.findMany({
      where: { userId: UserId },
      orderBy: { createdAt: "asc" },
    });
    return messages;
}
