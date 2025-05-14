"use server"

import { headers } from "next/headers";

export async function getClientIp() {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  return ip.split(',')[0].trim();
}