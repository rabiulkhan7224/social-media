import { Button } from "@social-media/ui/components/button";
import { Input } from "@social-media/ui/components/input";
import { Label } from "@social-media/ui/components/label";
import { Checkbox } from "@social-media/ui/components/checkbox";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import Image from "next/image";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import Loader from "./loader";
import Link from "next/link";

export default function SignInForm({ onSwitchToSignUp }: { onSwitchToSignUp?: () => void }) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message || "Invalid email or password");
          },
          onSettled: () => setLoading(false),
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(2, "Password must be at least 2 characters"),
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
        <Image 
          src="/assets/images/shape1.svg" 
          alt="" 
          width={300} 
          height={300} 
          className="w-full h-full object-contain" 
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none select-none opacity-60">
        <Image 
          src="/assets/images/shape2.svg" 
          alt="" 
          width={300} 
          height={300} 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* Main Container */}
      <div className="container max-w-6xl mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
         
          {/* Left — Illustration */}
          <div className="w-full lg:w-2/3 hidden lg:flex items-center justify-center">
            <Image
              src="/assets/images/login.png"
              alt="Login Illustration"
              width={500}
              height={500}
              className="max-w-[500px] w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Right — Form Card */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="bg-bg-card rounded-xl shadow-[7px_20px_60px_rgba(108,126,147,0.15)] p-8 w-full max-w-[420px]">
              {/* Logo */}
              <div className="mb-7">
                <Image 
                  src="/assets/images/logo.svg" 
                  alt="Buddy Script" 
                  width={160} 
                  height={40} 
                  className="h-10 w-auto object-contain" 
                />
              </div>

              {/* Heading */}
              <p className="text-[#767676] text-sm mb-2">Welcome Back!</p>
              <h4 className="text-[#1A202C] font-semibold text-[17px] mb-10">Login to account</h4>

              {/* Google Sign-in */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-bs-border rounded-[6px] py-3 px-4 mb-8 hover:bg-[#f5f5f5] transition-all duration-300 text-bs-text text-sm font-medium"
              >
                <Image 
                  src="/assets/images/google.svg" 
                  alt="Google" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5 object-contain" 
                />
                <span>Login with google</span>
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
                className="space-y-4"
              >
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
                  <div className="flex justify-between items-center">
                    <Label className="text-bs-text text-sm font-medium">Password</Label>
                    <Link href="/"  className="text-xs text-bs-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
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
                          placeholder="Enter your password"
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

                {/* Remember Me */}
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(!!v)}
                    className="border-[#C4C4C4] data-[state=checked]:bg-bs-primary data-[state=checked]:border-bs-primary"
                  />
                  <label htmlFor="remember" className="text-sm text-[#767676] cursor-pointer select-none">
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
                <form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
                  {({ canSubmit, isSubmitting }) => (
                    <div className="pt-6 pb-4">
                      <Button
                        type="submit"
                        className="w-full h-12  bg-primary hover:bg-[#0d7de8] text-white font-medium text-base rounded-[6px] transition-all duration-300 hover:shadow-lg"
                        disabled={!canSubmit || isSubmitting || loading}
                        variant={'default'}
                      >
                        {isSubmitting || loading ? "Logging in..." : "Login now"}
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </form>

              {/* Bottom Link */}
              <p className="text-center text-sm text-[#767676]">
                Don't have an account?{" "}
                <Link href="/register">
                <button
                  type="button"
                  onClick={onSwitchToSignUp}
                  className="text-bs-primary font-medium hover:underline"
                >
                  Register
                </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}