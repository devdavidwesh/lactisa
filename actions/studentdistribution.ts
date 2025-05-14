'use server';

import { db } from "@/prisma";

export type DistributionData = {
  label: string;
  count: number;
};

// type StudentData = {
//   constituency: string;
//   schoolType: string;
//   year: string;
// };

export type DistributionResult = {
  constituency: DistributionData[];
  schoolType: DistributionData[];
  year: DistributionData[];
};

export const getStudentDistributions = async (): Promise<DistributionResult> => {
  try {
    const activeStudents = await db.user.findMany({
      where: { 
        role: 'USER',
        status: 'ACTIVE'
      },
      select: {
        constituency: true,
        schoolType: true,
        year: true
      }
    });

    if (!activeStudents || !Array.isArray(activeStudents)) {
      throw new Error("Invalid student data received");
    }

    if (activeStudents.length === 0) {
      console.warn("No active students found");
      return {
        constituency: [],
        schoolType: [],
        year: []
      };
    }

    const countDistribution = (items: string[]) => {
      return items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    };

    return {
      constituency: Object.entries(countDistribution(activeStudents.map(s => s.constituency)))
        .map(([label, count]) => ({ label, count })),
      schoolType: Object.entries(countDistribution(activeStudents.map(s => s.schoolType)))
        .map(([label, count]) => ({ label, count })),
      year: Object.entries(countDistribution(activeStudents.map(s => s.year)))
        .map(([label, count]) => ({ label, count }))
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch student distribution data");
  }
};













// "use server";

// import { db } from "@/prisma";
// import { LaikipiaConstituency, SchoolType, StudentYear } from "@prisma/client";

// export const getStudentDistributions = async () => {
//   try {
//     // Get all active students (non-admin, active status)
//     const activeStudents = await db.user.findMany({
//       where: { 
//         role: 'USER',
//         status: 'ACTIVE'
//       },
//       select: {
//         constituency: true,
//         schoolType: true,
//         year: true
//       }
//     });

//     // Count distributions
//     const constituencyCounts = activeStudents.reduce((acc, student) => {
//       acc[student.constituency] = (acc[student.constituency] || 0) + 1;
//       return acc;
//     }, {} as Record<LaikipiaConstituency, number>);

//     const schoolTypeCounts = activeStudents.reduce((acc, student) => {
//       acc[student.schoolType] = (acc[student.schoolType] || 0) + 1;
//       return acc;
//     }, {} as Record<SchoolType, number>);

//     const yearCounts = activeStudents.reduce((acc, student) => {
//       acc[student.year] = (acc[student.year] || 0) + 1;
//       return acc;
//     }, {} as Record<StudentYear, number>);

//     return {
//       constituency: Object.entries(constituencyCounts).map(([label, count]) => ({
//         label,
//         count
//       })),
//       schoolType: Object.entries(schoolTypeCounts).map(([label, count]) => ({
//         label,
//         count
//       })),
//       year: Object.entries(yearCounts).map(([label, count]) => ({
//         label,
//         count
//       }))
//     };
//   } catch (error) {
//     console.error("Student distribution error:", error);
//     throw new Error("Failed to fetch student distribution data");
//   }
// };