"use server"
import { db } from "@/prisma";

const validateAndConvertUrl = (url: string): string | null => {
    // Basic validation
    if (!url || typeof url !== 'string') return null;
    
    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/file\/d\/([^\/]+)|id=([^&]+)/);
      const fileId = fileIdMatch?.[1] || fileIdMatch?.[2];
      return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;
    }
    
    // Validate other URLs (basic check)
    if (url.match(/^https?:\/\/.+\/.+$/)) {
      return url;
    }
    
    return null;
};

export const getLatestUpdates = async () => {
    const updates = await db.update.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        content: true,
        isImage: true,
        creatorName: true,
        createdAt: true,
      },
    });

    return updates.map(update => ({
      ...update,
      // Only convert URLs for images, and nullify invalid ones
      content: update.isImage 
        ? validateAndConvertUrl(update.content) || '/placeholder-image.jpg'
        : update.content,
      // Add validation flag for frontend
      isValid: update.isImage 
        ? !!validateAndConvertUrl(update.content) 
        : true
    }));
    return []; // Return empty array instead of crashing
};