"use client";

import { useState, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { registerSchema } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterUser from "@/actions/Register";
import { FormSuccess } from "./formSuccess";
import { FormError } from "./formError";
import Select from "react-select";
import Container from "../Container";

type RegisterData = z.infer<typeof registerSchema>;

const Register = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setsuccess] = useState<string | undefined>("");

  const constituencyOptions = [
        { value: "LAIKIPIA_WEST", label: "Laikipia West" },
        { value: "LAIKIPIA_EAST", label: "Laikipia East" },
        { value: "LAIKIPIA_NORTH", label: "Laikipia North" },
    ];
  const schoolTypeOptions = [
        { value: "UNIVERSITY", label: "University" },
        { value: "COLLEGE", label: "College" },
        { value: "TVET", label: "Tvet" },
    ];
  const yearOptions = [
        { value: "FIRST", label: "First" },
        { value: "SECOND", label: "Second" },
        { value: "THIRD", label: "Third" },
        { value: "FOURTH", label: "Fourth" },
        { value: "FIFTH", label: "Fifth" },
        { value: "SIXTH", label: "Sixth" },
    ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      schoolType: "UNIVERSITY",
      constituency: "LAIKIPIA_EAST",
      registrationNumber: "",
      year: "FIRST",
      email: "",
      school: "",
      course: "",
      password: "",
      confirmPassword: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const onSubmit = (data: RegisterData) => {
      setError("");
      setsuccess("");
      startTransition(() => {
          RegisterUser(data)
          .then((data) => {
            if (data?.error){
              setError(data.error);
            }

            if (data?.success) {
              reset();
              setsuccess(data.success)
            }
          })


      })
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen p-4">
      <div className="fixed inset-0 -z-10">
          <Image 
            src="/aboutus.jpeg" 
            alt="Background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
      </div>
      <Container>
        <div className="">
           <div className="max-w-3xl w-full bg-white backdrop-blur-2xl shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Image src="/logo.jpeg" height={120} width={120} alt="logo" className="rounded-xl" />
            <p className="text-lg text-gray-800 text-center">
              Welcome to LACTISA,<br /> We are happy to have you.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
              <input type="text" disabled = {isSubmitting} id="firstName" {...register("firstName")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message}</span>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="secondName" className="text-sm font-medium text-gray-700">Second Name</label>
              <input type="text" disabled = {isSubmitting} id="secondName" {...register("secondName")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.secondName && <span className="text-sm text-red-500">{errors.secondName.message}</span>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel"  disabled = {isSubmitting}id="phone" {...register("phone")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input type="email" disabled = {isSubmitting} id="email" {...register("email")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            {/* constituency */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Constituency <span className="text-[12px] text-primary">{"("}your home{")"}</span></label>
              <Select
                id="businessType"
                options={constituencyOptions}
                isDisabled={isSubmitting}
                {...register("constituency")}
                classNamePrefix="react-select"
                onChange={(selectedOption) => setValue("constituency", selectedOption?.value as RegisterData["constituency"])}
                defaultValue={constituencyOptions[0]}
                classNames={{
                control: (state) =>
                  `p-1 ${state.isFocused ? 'border-primary ring-2 ring-primaryColor' : 'border-gray-300'}`,
                   input: () => 'py-1',
                }}
                  theme={(theme) => ({
                    ...theme,
                   borderRadius: 6,
                   colors: {
                    ...theme.colors,
                   primary: 'oklch(64.8% 0.2 131.684)',
                   primary25: 'oklch(0.705 0.213 47.604)'
                  }
                })}
            />
              {errors.constituency && <span className="text-sm text-red-500">{errors.constituency.message}</span>}
            </div>

            {/* schoolType */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">School Type</label>
              <Select
                id="businessType"
                options={schoolTypeOptions}
                isDisabled={isSubmitting}
                {...register("schoolType")}
                classNamePrefix="react-select"
                onChange={(selectedOption) => setValue("schoolType", selectedOption?.value as RegisterData["schoolType"])}
                defaultValue={schoolTypeOptions[0]}
                classNames={{
                control: (state) =>
                  `p-1 ${state.isFocused ? 'border-primary ring-2 ring-primaryColor' : 'border-gray-300'}`,
                   input: () => 'py-1',
                }}
                  theme={(theme) => ({
                    ...theme,
                   borderRadius: 6,
                   colors: {
                    ...theme.colors,
                   primary: 'oklch(64.8% 0.2 131.684)',
                   primary25: 'oklch(0.705 0.213 47.604)'
                  }
                })}
            />
              {errors.schoolType && <span className="text-sm text-red-500">{errors.schoolType.message}</span>}
            </div>


            <div className="flex flex-col space-y-2">
              <label htmlFor="school" className="text-sm font-medium text-gray-700">School</label>
              <input type="text" disabled = {isSubmitting} id="school" {...register("school")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.school && <span className="text-sm text-red-500">{errors.school.message}</span>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="course" className="text-sm font-medium text-gray-700">Course</label>
              <input type="text" disabled = {isSubmitting} id="course" {...register("course")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.course && <span className="text-sm text-red-500">{errors.course.message}</span>}
            </div>

            {/* regstartionNumber */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="registrationNumber" className="text-sm font-medium text-gray-700">Registration Number</label>
              <input type="text" disabled = {isSubmitting} id="registrationNumber" {...register("registrationNumber")} 
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
              {errors.registrationNumber && <span className="text-sm text-red-500">{errors.registrationNumber.message}</span>}
            </div>

            {/* year */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Year</label>
              <Select
                id="businessType"
                options={yearOptions}
                isDisabled={isSubmitting}
                {...register("year")}
                classNamePrefix="react-select"
                onChange={(selectedOption) => setValue("year", selectedOption?.value as RegisterData["year"])}
                defaultValue={yearOptions[0]}
                classNames={{
                control: (state) =>
                  `p-1 ${state.isFocused ? 'border-primary ring-2 ring-primaryColor' : 'border-gray-300'}`,
                   input: () => 'py-1',
                }}
                  theme={(theme) => ({
                    ...theme,
                   borderRadius: 6,
                   colors: {
                    ...theme.colors,
                   primary: 'oklch(64.8% 0.2 131.684)',
                   primary25: 'oklch(0.705 0.213 47.604)'
                  }
                })}
            />
              {errors.year && <span className="text-sm text-red-500">{errors.year.message}</span>}
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} disabled = {isSubmitting} id="password" {...register("password")} 
                  className="mt-1 p-2 pr-10 border rounded-md w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
                <button type="button" disabled = {isSubmitting} onClick={togglePasswordVisibility} 
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} disabled = {isSubmitting} id="confirmPassword" {...register("confirmPassword")} 
                  className="mt-1 p-2 pr-10 border rounded-md w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
                <button type="button" disabled = {isSubmitting} onClick={toggleConfirmPasswordVisibility} 
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}
            </div>

            <FormError message = {error} />
            <FormSuccess message = {success} />

            <div className="md:col-span-2 flex justify-center">
              <button type="submit" 
                disabled = {isSubmitting}
                className="md:w-1/2 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/60 hover:shadow-md transition">
                Register
              </button>
            </div>

          </form>
           </div>
        </div>
      </Container>
    </section>
  );
};

export default Register;
