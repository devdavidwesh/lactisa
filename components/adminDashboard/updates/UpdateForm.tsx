'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { UpdateFormSchema } from '@/schemas/updates';
import { createAdminUpdate } from '@/actions/admindashboard';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof UpdateFormSchema>;

export default function AdminUpdateForm() {
  const [serverResponse, setServerResponse] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      content: '',
      isImage: true,
    },
  });

  const isImage = watch('isImage');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerResponse(null);
    
      const result = await createAdminUpdate(data);
      if (result.success) {
        setIsSubmitting(false);
        reset();
        toast.success("Update created successfuly");
        router.push("/api/v1/admin/dashboard/updates");
      }
      if (result.error) {
        setServerResponse({
          success: false,
          error: result.error
        })
      }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Create New Update</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            {isImage ? 'Image URL (Google Drive)' : 'Content'}
          </label>
          <textarea
            id="content"
            {...register('content')}
            rows={3}
            className={`mt-1 block w-full rounded-md border p-2 shadow-sm sm:text-sm ${
              errors.content
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-primary'
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
          {isImage && (
            <p className="mt-1 text-xs text-yellow-500">
              Please provide a publicly accessible Google Drive URL
            </p>
          )}
        </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isSubmitting
              ? 'bg-primary hover:bg-primaryFade'
              : 'bg-primary hover:bg-primaryFade'
          }`}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Image'}
        </button>

        {serverResponse?.success && (
          <p className="text-sm text-green-600">Update published successfully!</p>
        )}
        {serverResponse?.error && (
          <p className="text-sm text-red-600">{serverResponse.error}</p>
        )}
      </form>
    </div>
  );
}