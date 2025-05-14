'use client';

import { getAdminUpdates } from "@/actions/admindashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type UpdateType = {
    id: string;
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
                updates.map((update) => (
                  <tr key={update.id} className={updates.indexOf(update) % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 align-top">{update.creatorName || "Admin"}</td>
                    <td className="p-3 align-top max-w-[300px] truncate">
                      {update.isImage ? (
                        <a 
                          href={update.content} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Image
                        </a>
                      ) : (
                        update.content
                      )}
                    </td>
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
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdatesTable;