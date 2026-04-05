
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import Link from "next/link";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import Loader from "./loader";
import { Label } from "@social-media/ui/components/label";
import { Input } from "@social-media/ui/components/input";
import { Checkbox } from '@social-media/ui/components/checkbox';
import { Button } from "@social-media/ui/components/button";

export default function SignUpForm({ onSwitchToSignIn }: { onSwitchToSignIn?: () => void }) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const [agreed, setAgreed] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (!agreed) {
        toast.error("Please agree to the terms & conditions");
        return;
      }

      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign up successful!");
          },
          onError: (error) => {
            toast.error(error.error.message || "Registration failed");
          },
        }
      );
    },
    validators: {
      onSubmit: z
        .object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          password: z.string().min(8, "Password must be at least 8 characters"),
          repeatPassword: z.string(),
        })
        .refine((data) => data.password === data.repeatPassword, {
          message: "Passwords do not match",
          path: ["repeatPassword"],
        }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bs-bg relative overflow-hidden font-[Poppins,sans-serif]">
      {/* Background Shape Decorations */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <img src="/assets/images/shape1.svg" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <img src="/assets/images/shape2.svg" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] pointer-events-none select-none opacity-40">
        <img src="/assets/images/shape3.svg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Main Container */}
      <div className="container max-w-6xl mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left — Illustration */}
          <div className="w-full lg:w-2/3 hidden lg:flex items-center justify-center">
            <img
              src="/assets/images/registration.png"
              alt="Registration Illustration"
              className="max-w-[520px] w-full h-auto object-contain"
            />
          </div>

          {/* Right — Form Card */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="bg-bg-card rounded-xl shadow-[7px_20px_60px_rgba(108,126,147,0.15)] p-8 w-full max-w-[420px]">
              {/* Logo */}
              <div className="mb-7">
                <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-10 w-auto object-contain" />
              </div>

              {/* Heading */}
              <p className="text-[#767676] text-sm mb-2">Get Started Now</p>
              <h4 className="text-[#1A202C] font-semibold text-[17px] mb-10">Registration</h4>

              {/* Google Sign-up */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-bs-border rounded-[6px] py-3 px-4 mb-8 hover:bg-[#f5f5f5] transition-all duration-300 text-bs-text text-sm font-medium"
              >
                <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5 object-contain" />
                <span>Register with google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center mb-8">
                <div className="flex-1 border-t border-bs-border" />
                <span className="mx-4 text-[#767676] text-sm">Or</span>
                <div className="flex-1 border-t border-bs-border" />
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-3"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Full Name</Label>
                  <form.Field name="name">
                    {(field) => (
                      <div>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter your full name"
                          className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                        />
                        {field.state.meta.errors.map((error, i) => (
                          <p key={i} className="text-red-500 text-sm mt-1">
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Email</Label>
                  <form.Field name="email">
                    {(field) => (
                      <div>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter your email"
                          className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                        />
                        {field.state.meta.errors.map((error, i) => (
                          <p key={i} className="text-red-500 text-sm mt-1">
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Password</Label>
                  <form.Field name="password">
                    {(field) => (
                      <div>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Create a password"
                          className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                        />
                        {field.state.meta.errors.map((error, i) => (
                          <p key={i} className="text-red-500 text-sm mt-1">
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Repeat Password */}
                <div className="space-y-1.5">
                  <Label className="text-bs-text text-sm font-medium">Repeat Password</Label>
                  <form.Field name="repeatPassword">
                    {(field) => (
                      <div>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Confirm your password"
                          className="h-11 rounded-[6px] border-bs-border bg-[#F5F5F5] focus:border-bs-primary focus:bg-white transition-all text-sm"
                        />
                        {field.state.meta.errors.map((error, i) => (
                          <p key={i} className="text-red-500 text-sm mt-1">
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(!!v)}
                    className="border-[#C4C4C4] data-[state=checked]:bg-bs-primary data-[state=checked]:border-bs-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-[#767676] cursor-pointer select-none">
                    I agree to terms &amp; conditions
                  </label>
                </div>

                {/* Submit Button */}
                <form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
                  {({ canSubmit, isSubmitting }) => (
                    <div className="pt-6 pb-4">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-bs-primary hover:bg-[#0d7de8] text-white font-medium text-base rounded-[6px] transition-all duration-300 hover:shadow-lg"
                        disabled={!canSubmit || isSubmitting || !agreed}
                      >
                        {isSubmitting ? "Registering..." : "Register now"}
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </form>

              {/* Bottom Link */}
              <p className="text-center text-sm text-[#767676]">
                Already have an account?{" "}
                {onSwitchToSignIn ? (
                  <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    className="text-bs-primary font-medium hover:underline"
                  >
                    Login
                  </button>
                ) : (
                  <Link href="/login" className="text-bs-primary font-medium hover:underline">
                    Login
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}