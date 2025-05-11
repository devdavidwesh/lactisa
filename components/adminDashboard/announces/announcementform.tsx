'use client';

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { createAnnouncement } from "@/actions/admindashboard";
import { AnnouncementSchema } from "@/schemas/announcements";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AnnouncementData = z.infer<typeof AnnouncementSchema>;

const CreateAnnouncementForm = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<AnnouncementData>({
        resolver: zodResolver(AnnouncementSchema),
        defaultValues: {
            title: "",
            type: "",
            content: "",
        }
    });

    const [isSubmitting, startTransition] = useTransition();

    const onSubmit = (data: AnnouncementData) => {
        startTransition(() => {
            if (!session?.user?.id || !session?.user?.name) {
                toast.error("Please login to create the Announcement")
                return;
            }

            createAnnouncement(data)
            .then((res) => {
                if (res?.error) {
                    toast.error(res?.error)
                }
                if (res?.success) {
                    reset();
                    toast.success(res.success);
                    router.push("/api/v1/admin/dashboard/announcements")
                }
            });
        });
    };

    return (
        <section className="flex items-center justify-center min-h-screen p-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 space-y-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <Image src="/logo.jpeg" height={120} width={120} alt="logo" className="rounded-xl" />
                    <p className="text-lg text-gray-800 text-center">
                        Create an Announcement
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:grid md:grid-cols-2 md:gap-6">

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" disabled={isSubmitting} {...register("title")} className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
                        {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-gray-700">Type</label>
                        <input type="text" id="type" disabled={isSubmitting} {...register("type")} className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
                        {errors.type && <span className="text-sm text-red-500">{errors.type.message}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="visibleFrom" className="text-sm font-medium text-gray-700">Visible From</label>
                        <input type="datetime-local" id="visibleFrom" disabled={isSubmitting} {...register("visibleFrom")} className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
                        {errors.visibleFrom && <span className="text-sm text-red-500">{errors.visibleFrom.message}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="visibleTo" className="text-sm font-medium text-gray-700">Visible To</label>
                        <input type="datetime-local" id="visibleTo" disabled={isSubmitting} {...register("visibleTo")} className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
                        {errors.visibleTo && <span className="text-sm text-red-500">{errors.visibleTo.message}</span>}
                    </div>

                    <div className="flex flex-col space-y-2 md:col-span-2">
                        <label htmlFor="content" className="text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            disabled={isSubmitting}
                            {...register("content")}
                            rows={4}
                            className="mt-1 p-2 border rounded-md resize-y focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                            placeholder="Write announcement content here..."
                        />
                        {errors.content && <span className="text-sm text-red-500">{errors.content.message}</span>}
                    </div>


                    <div className="md:col-span-2 flex justify-center">
                        <button type="submit"
                            disabled={isSubmitting}
                            className="w-1/2 bg-primary text-white py-2 rounded-md hover:bg-primary/85 disabled:bg-primary/60 transition">
                            Create Announcement
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateAnnouncementForm;
