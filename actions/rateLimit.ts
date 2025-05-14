'use server';

import { getClientIp } from '@/libs/getClientIp';
import { db } from '@/prisma';

export const checkRateLimit = async (email: string) => {
    const ip = await getClientIp();
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    // Check if this IP or email is blocked
    const existingBlock = await db.loginAttempt.findFirst({
      where: {
        OR: [
          { ipAddress: ip },
          { email: email }
        ],
        blockedUntil: { gt: now }
      }
    });

    if (existingBlock && existingBlock.blockedUntil) {
      const remainingTime = Math.ceil((existingBlock.blockedUntil.getTime() - now.getTime()) / (1000 * 60));
      return{ error:`Too many login attempts. Please try again in ${remainingTime} minutes.`};
    }

    // Count recent failed attempts
    const failedAttempts = await db.loginAttempt.count({
      where: {
        OR: [
          { ipAddress: ip },
          { email: email }
        ],
        createdAt: { gt: threeHoursAgo },
        success: false
      }
    });

    // Block if more than 5 failed attempts
    if (failedAttempts >= 5) {
      const blockedUntil = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      
      await db.loginAttempt.create({
        data: {
          ipAddress: ip,
          email: email,
          success: false,
          blockedUntil: blockedUntil
        }
      });
      
    }
};

export const recordLoginAttempt = async (email: string, success: boolean) => {
  try {
    const ip = await getClientIp();
    await db.loginAttempt.create({
      data: {
        ipAddress: ip,
        email: email,
        success: success
      }
    });
  } catch (error) {
    console.error('Failed to record login attempt:', error);
  }
};

export const clearFailedAttempts = async (email: string) => {
  try {
    const ip = await getClientIp();
    await db.loginAttempt.deleteMany({
      where: {
        OR: [
          { email: email, success: false },
          { ipAddress: ip, success: false }
        ]
      }
    });
  } catch (error) {
    console.error('Failed to clear failed attempts:', error);
  }
};