'use client';

import { getAdminUpdates } from "@/actions/admindashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UpdateType = {
    content: string;
    isImage: boolean;
    creatorId: string;
    creatorName: string;
    createdAt: Date;
    updatedAt: Date;
}

const UpdatesTable = () => {
  const [updates, setUpdates] = useState<UpdateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchUpdates = async (page: number = 1) => {
    setLoading(true);
    const result = await getAdminUpdates(page);
    if (result) {
      setUpdates(result.updates || []);
      setTotalPages(result.totalPages || 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUpdates(currentPage);
  }, [currentPage]);

  return (
    <div className="overflow-x-auto max-w-[400px] sm:max-w-[580px] lg:max-w-full">
      <div className="min-w-[600px] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Lactisa Updates</h2>
          <button
            onClick={() => router.push("/api/v1/admin/dashboard/updates/create")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryFade transition-colors"
          >
            Create New Update
          </button>
        </div>

        <div className="rounded-lg border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Creator</th>
                <th className="p-3">Content</th>
                <th className="p-3">Type</th>
                <th className="p-3">Created</th>
                <th className="p-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="p-3">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : updates.length > 0 ? (
                updates.map((update, i) => (
                  <tr key={update.creatorId + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 align-top">{update.creatorName || "Admin"}</td>
                    <td className="p-3 align-top max-w-[300px] truncate">{update.content}</td>
                    <td className="p-3 align-top">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            update.isImage 
                            ? "bg-orange-100 text-orange-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                            {update.isImage ? "Image" : "Text"}
                        </span>
                    </td>                    
                    <td className="p-3 align-top">
                      {new Date(update.createdAt).toLocaleString("en-KE", { 
                        timeZone: "Africa/Nairobi",
                        dateStyle: "short",
                        timeStyle: "short"
                      })}
                    </td>
                    <td className="p-3 align-top">
                      {new Date(update.updatedAt).toLocaleString("en-KE", { 
                        timeZone: "Africa/Nairobi",
                        dateStyle: "short",
                        timeStyle: "short"
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">No updates found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdatesTable;