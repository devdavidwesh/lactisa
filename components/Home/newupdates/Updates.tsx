'use client';
import { getLatestUpdates } from "@/actions/public";
import Container from "@/components/Container";
import Image from "next/image";
import { useEffect, useState } from "react";

type PublicUpdate = {
  content: string;
  isImage: boolean;
  creatorName: string;
  createdAt: Date;
  isValid?: boolean;
};

const PublicUpdatesGrid = () => {
  const [updates, setUpdates] = useState<PublicUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLatestUpdates();
        setUpdates(data);
      } catch {
        setError("Failed to load updates. Please try again later.");
        setUpdates([]);
      } finally {
        setLoading(false);
      }
    };
    
    const timer = setTimeout(fetchUpdates, 300);
    return () => clearTimeout(timer);
  }, []);

  // Custom Tailwind CSS Skeleton Loader
  if (loading) {
    return (
      <Container>
        <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
          Events and Updates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-video w-full bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-3 bg-gray-400 rounded-full animate-pulse w-1/3 mt-2"></div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
          Events and Updates
        </h2>
        <div className="text-center p-8">
          <p className="text-red-500 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryFade transition-colors"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  if (updates.length === 0) {
    return (
      <Container>
        <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
          Events and Updates
        </h2>
        <div className="text-center p-8 text-gray-500">
          No updates available
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
        Events and Updates
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4">
        {updates.filter(update => update.isValid !== false).map((update, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            {update.isImage ? (
              <div className="aspect-video bg-gray-50 flex items-center justify-center relative">
                <Image
                  src={update.content}
                  width={600}
                  height={400}
                  alt={`Update by ${update.creatorName}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  priority={index < 3}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                    (e.target as HTMLImageElement).className = 'w-full h-full object-contain p-4';
                  }}
                />
                {update.isValid === false && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4 text-center">
                    Image unavailable
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-line line-clamp-5">
                    {update.content}
                  </p>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {update.creatorName}
                </div>
              </div>
            )}
            <div className="p-3 bg-gray-50 text-xs text-gray-500 border-t border-primary">
              {new Date(update.createdAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default PublicUpdatesGrid;