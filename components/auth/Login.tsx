"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Container from "../Container";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "./formSuccess";
import { FormError } from "./formError";
import { LoginSchema } from "@/schemas/login";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type LoginData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);


  const onSubmit = async (data: LoginData) => { 
    setError("");
    setSuccess("");

    const result = await signIn("credentials", {
        redirect: false,
        ...data
    });

    if (result?.error === "CredentialsSignin") {
        setError("Invalid Credentials");
        return;
    } 
    if (result?.error === "AccessDenied"){
      setError("Your Account has not been activated!");
      return;
    }
    else {
        reset();
        const updatedSession = await getSession();
        if (updatedSession?.user?.role === "ADMIN") {
            toast.success("Login success");
            router.push("/api/v1/admin/dashboard");
            return;
        } else {
            toast.success("Login success");
            router.push("/");
            return;
        }
    }
};


  return (
    <section className="flex items-center justify-center min-h-screen p-4">
      <Container>
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Image src="/logo.jpeg" height={120} width={120} alt="logo" className="rounded-xl" />
            <p className="text-lg text-gray-800 text-center">
              Welcome back to LACTISA,<br /> Login to your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:gap-6">

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input type="email" disabled={isSubmitting} id="email" {...register("email")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primarydisabled:cursor-not-allowed" />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>


            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} disabled={isSubmitting} id="password" {...register("password")} 
                  className="mt-1 p-2 pr-10 border rounded-md w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary disabled:cursor-not-allowed" />
                <button type="button" disabled={isSubmitting} onClick={togglePasswordVisibility} 
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600 disabled:cursor-not-allowed">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            <FormError message = {error} />
            <FormSuccess message = {success} />

            <div className="md:col-span-2 flex justify-center">
              <button type="submit" 
                disabled={isSubmitting}
                className="md:w-1/2 w-full bg-primary text-white disabled:text-gray-400 py-2 rounded-md hover:bg-primary/90 disabled:bg-green-500 hover:shadow-md transition disabled:cursor-not-allowed">
                Login
              </button>
            </div>

          </form>
        </div>
      </Container>
    </section>
  );
};

export default LoginForm;
