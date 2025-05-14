'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { DistributionData, getStudentDistributions } from '@/actions/studentdistribution';
import { AlertTriangle, Search, Loader2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartDataType = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

interface ChartDataProps {
  title: string;
  data: ChartDataType;
}

const colorPalettes = {
  constituency: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
  schoolType: ['#4BC0C0', '#9966FF', '#FF9F40', '#8AC249', '#FFD700'],
  year: ['#8AC249', '#FFD700', '#CD5C5C', '#9370DB', '#20B2AA', '#FF6347']
};

export default function StudentDistributionChart() {
  const [data, setData] = useState<{
    constituency: ChartDataType;
    schoolType: ChartDataType;
    year: ChartDataType;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getStudentDistributions();
        
        if (!result) throw new Error("No data returned");
        
        const transformData = (items: DistributionData[], type: keyof typeof colorPalettes): ChartDataType => {
          const labels = items.map(item => item.label.replace(/_/g, ' '));
          const dataValues = items.map(item => item.count);
          
          // Dynamically extend colors if needed
          const backgroundColors = items.map((_, index) => 
            colorPalettes[type][index % colorPalettes[type].length]
          );

          return {
            labels,
            datasets: [{
              data: dataValues,
              backgroundColor: backgroundColors,
              borderColor: ['#ffffff'],
              borderWidth: 1
            }]
          };
        };

        setData({
          constituency: transformData(result.constituency, 'constituency'),
          schoolType: transformData(result.schoolType, 'schoolType'),
          year: transformData(result.year, 'year')
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return (
    <div className="p-8 text-center">
      <Loader2 className="inline-block h-8 w-8 animate-spin text-blue-500" />
      <p className="mt-2">Loading data...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center text-red-500">
      <AlertTriangle className="mx-auto h-12 w-12" />
      <p className="mt-2 font-medium">Error: {error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  if (!data) return (
    <div className="p-8 text-center">
      <Search className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-gray-500">No student distribution data available</p>
    </div>
  );

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Distribution Analytics</h1>
        <p className="mt-2 text-gray-600">Student demographics</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ChartCard 
          title="By Constituency" 
          data={data.constituency} 
        />
        <ChartCard 
          title="By School Type" 
          data={data.schoolType} 
        />
        <ChartCard 
          title="By Year" 
          data={data.year} 
        />
      </div>
    </div>
  );
}

function ChartCard({ title, data }: ChartDataProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">{title}</h2>
      <div className="h-64 relative">
        <Doughnut 
          aria-label={`Chart showing ${title}`}
          role="img"
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { 
                position: 'right',
                labels: {
                  padding: 20,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || '';
                    const value = context.raw as number;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                  }
                }
              }
            },
            cutout: '60%'
          }}
        />
      </div>
    </div>
  );
}