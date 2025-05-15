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
import { checkRateLimit, clearFailedAttempts, recordLoginAttempt } from "@/actions/rateLimit";
import { Login } from "@/actions/login";

type LoginData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isTwoFactorSubmitting, setIsTwoFactorSubmitting] = useState(false);

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
      code: "", // Add code field for 2FA
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = async (data: LoginData) => { 
    setError("");
    setSuccess("");

    // Check rate limit
    const trails = await checkRateLimit(data.email);
    if (trails?.error) {
      setError(trails.error);
      return;
    }

    // Handle 2FA case
    if (showTwoFactor) {
      setIsTwoFactorSubmitting(true);
      const response = await Login({ ...data});
      setIsTwoFactorSubmitting(false);

      if (response?.error) {
        setError(response.error);
        return;
      }
    }

    // Normal login flow
    const response = await Login(data);
    if (response?.error) {
      setError(response.error);
      await recordLoginAttempt(data.email, false);
    }

    if (response?.showTwoFactor) {
      setShowTwoFactor(true);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    if (result?.error === "CredentialsSignin") {
      await recordLoginAttempt(data.email, false);
      setError("Invalid Credentials");
      return;
    }

    if (result?.error === "AccessDenied") {
      setError("Your account has not been activated!");
      return;
    }

    if (result?.error) {
      setError(result.error);
      return;
    }

    await clearFailedAttempts(data.email);
    reset();
    const updatedSession = await getSession();
    
    if (updatedSession?.user?.role === "ADMIN") {
      toast.success("Login successful");
      router.push("/api/v1/admin/dashboard");
    } else {
      toast.success("Login successful");
      router.push("/");
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

            {!showTwoFactor ? (
              <>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    disabled={isSubmitting} 
                    id="email" 
                    {...register("email")} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary disabled:cursor-not-allowed" 
                  />
                  {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col space-y-2 relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      disabled={isSubmitting} 
                      id="password" 
                      {...register("password")} 
                      className="mt-1 p-2 pr-10 border rounded-md w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary disabled:cursor-not-allowed" 
                    />
                    <button 
                      type="button" 
                      disabled={isSubmitting} 
                      onClick={togglePasswordVisibility} 
                      className="absolute inset-y-0 right-2 flex items-center text-gray-600 disabled:cursor-not-allowed"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <label htmlFor="code" className="text-sm font-medium text-gray-700">Verification Code</label>
                <input 
                  type="text" 
                  disabled={isTwoFactorSubmitting} 
                  id="code" 
                  {...register("code")} 
                  placeholder="Enter 6-digit code"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary disabled:cursor-not-allowed" 
                />
                {errors.code && <span className="text-sm text-red-500">{errors.code.message}</span>}
              </div>
            )}

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="md:col-span-2 flex justify-center">
              <button 
                type="submit" 
                disabled={isSubmitting || isTwoFactorSubmitting}
                className="md:w-1/2 w-full bg-primary text-white disabled:text-gray-400 py-2 rounded-md hover:bg-primary/90 disabled:bg-green-500 hover:shadow-md transition disabled:cursor-not-allowed"
              >
                {showTwoFactor ? "Verify Code" : "Login"}
              </button>
            </div>

            {showTwoFactor && (
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => setShowTwoFactor(false)}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Back to Login
                </button>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
};

export default LoginForm;