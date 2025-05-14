"use server";

import { currentUser } from "@/libs/currentUser";
import { db } from "@/prisma";
import { AnnouncementSchema } from "@/schemas/announcements";
import { UpdateFormSchema } from "@/schemas/updates";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export async function getPaginatedUsers(
  page: number = 1, 
  pageSize: number = 10,
  filters?: {
    role?: "ADMIN" | "USER";
    status?: "ACTIVE" | "INACTIVE";
  }
) {
    const user = await currentUser();
    if (user?.role !== "ADMIN") return;

    const skip = (page - 1) * pageSize;

    const whereClause = {
      ...(filters?.role && { role: filters.role }),
      ...(filters?.status && { status: filters.status }),
    };

    const [users, totalUsers] = await Promise.all([
      db.user.findMany({
        skip,
        take: pageSize,
        where: whereClause,
        orderBy: { createdAt: "desc" }, 
      }),
      db.user.count({
        where: whereClause,
      }),
    ]);

    return {
      users,
      totalPages: Math.ceil(totalUsers / pageSize),
      currentPage: page,
    };
}


export async function getUserStats() {
      const user = await currentUser();
      if (user?.role !== "ADMIN") return
      const totalUsers = await db.user.count();
      const inactiveUsers = await db.user.count({
        where: { status: "INACTIVE" },
      });
      const totalAdmins = await db.user.count({
        where: { role: "ADMIN" },
      });
      const totalMessages = await db.message.count();
  
      return { totalUsers, inactiveUsers, totalAdmins, totalMessages };
  }


  export async function searchUsers(query: string) {
    const user = await currentUser();
    if (user?.role !== "ADMIN") return
    if (!query.trim()) return [];
  
      const users = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return users;
  }

  export async function activateUser(userId: string) {
      const sysUser = await currentUser();
      if (sysUser?.role !== "ADMIN") return
      await db.user.update({
        where: { id: userId },
        data: { status: "ACTIVE", activatedBy: sysUser.email },
      });
  
      return { success: `User Activated`};
  }


  export async function deactivateUser(userId: string) {
    const sysUser = await currentUser();
    if (sysUser?.role !== "ADMIN") return
      await db.user.update({
        where: { id: userId },
        data: { status: "INACTIVE", deactivatedBy: sysUser.email },
      });
  
      return { success: `User Deactivated`};
  }

  export async function createAnnouncement(data: z.infer<typeof AnnouncementSchema>) {
      const sysUser = await currentUser();
      if (sysUser?.role !== "ADMIN") return

      const validatedData = AnnouncementSchema.safeParse(data);
      if (!validatedData.success) {
        const errorMessages = validatedData.error.errors.map((err) => err.message).join(", ")
        return { error: `Validation failed ${errorMessages}` }
      }

      const { title, type, content, visibleFrom, visibleTo } = validatedData.data

      if (sysUser.name && sysUser.id) {
          await db.announcement.create({
            data: {
              title,
              type,
              content,
              visibleFrom: new Date(visibleFrom),
              visibleTo: new Date(visibleTo),
              creator: sysUser?.name,
              createdById: sysUser?.id
            },
          });
          return { success:`Announcement Created`  };
      }
      return { error: `Something went wrong!` }
    }


    export const getAnnouncements = async () => {
          const sysUser = await currentUser()
          if (sysUser?.role !== "ADMIN") return

          const announcements = await db.announcement.findMany({
              orderBy: {
                  createdAt: "desc",
              }
          });
          return announcements;
    } 


    export const getAdminMessages = async () => {
      const sysUser = await currentUser();
      if (sysUser?.role !== "ADMIN") return

      const messages = await db.message.findMany({
        select: {
          id: false,
          message: true,
          sender: true,
          userId: true,
          createdAt: true,
          user: false
        },
        orderBy: {
          createdAt: "desc",
        }
      });
      return messages;
    }


    type UpdateData = z.infer<typeof UpdateFormSchema>
    export async function createAdminUpdate(data: UpdateData) {
      const sysUser = await currentUser();
      
      if (!sysUser || sysUser.role !== 'ADMIN') {
        return {
          success: false,
          error: 'Unauthorized: Admin access required',
        };
      }
    
      // Validate the data with safeParse
      const validationResult = UpdateFormSchema.safeParse(data);
    
      if (!validationResult.success) {
        return {
          success: false,
          error: validationResult.error.errors[0]?.message || 'Validation failed',
        };
      }
    
      const { content, isImage } = validationResult.data;
    
      // Create the update in database
      const result = await db.update.create({
        data: {
          content,
          isImage,
          creatorId: sysUser.id,
          creatorName: sysUser.name || 'Admin',
        },
      });
    
      if (!result) {
        return {
          success: false,
          error: 'Something went wrong. Please try again.',
        };
      }
    
      // Revalidate paths
      revalidatePath('/updates');
      revalidatePath('/');
    
      return { success: true };
    }


  const ITEMS_PER_PAGE = 10;

export const getAdminUpdates = async (page: number = 1) => {
  const user = await currentUser();
  
  // Verify admin role
  if (user?.role !== "ADMIN") {
    return null;
  }

  const skip = (page - 1) * ITEMS_PER_PAGE;
  
  const [updates, totalCount] = await Promise.all([
    db.update.findMany({
      skip,
      take: ITEMS_PER_PAGE,
      select: {
        id: true,
        content: true,
        isImage: true,
        creatorId: true,
        creatorName: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.update.count(),
  ]);

  return {
    updates,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
    currentPage: page,
  };
};

    




