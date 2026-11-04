
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Leaf,
  Users,
  Users2,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Validation schema
const registerSchema = z.object({
 

  email: z.string().trim().min(1, "This field is required.").email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "This field is required.")
    .min(6, "Password must be at least 6 characters.")
    .regex(/[A-Z]/, "At least one uppercase letter is required.")
    .regex(/[a-z]/, "At least one lowercase letter is required."),
});
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router=useRouter()

    const form = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        
        email: "",
        
        password: "",
      },
    });
    const handleLogin=async(formData:RegisterFormValues)=>{
      console.log(formData, 'from login page');

          const{data,error}=await authClient.signIn.email({
       ...formData,
    })
    if (error) {
      toast.error(error.message || "Registration failed.");
      return;
    }

    if (data) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
      
    }

      const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid min-h-[85vh] max-w-5xl items-center gap-10 md:grid-cols-2">

        {/* Left Section */}
        <section className="hidden space-y-6 md:block">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="rounded-xl bg-primary p-2.5 text-primary-foreground">
              <Users size={28} />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Together<span className="text-primary">We</span>
            </span>
          </Link>

          <div className="space-y-4 pt-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-2 text-sm font-medium text-secondary">
              <Leaf size={16} />
              Make a difference together
            </span>

            <h1 className="text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              Small Actions.
              <br />
              <span className="text-primary">Big Changes.</span>
            </h1>

            <p className="max-w-md leading-7 text-muted-foreground">
              Join a community of people who care. Discover meaningful events
              and work together to create a better tomorrow.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="rounded-2xl bg-secondary/10 p-4">
              <Users className="mb-2 text-secondary" size={25} />
              <p className="font-semibold text-foreground">
                Stronger Together
              </p>
              <p className="text-xs text-muted-foreground">
                Build connections
              </p>
            </div>

            <div className="rounded-2xl bg-primary/10 p-4">
              <HeartHandshake className="mb-2 text-primary" size={25} />
              <p className="font-semibold text-foreground">
                Positive Impact
              </p>
              <p className="text-xs text-muted-foreground">
                Create real change
              </p>
            </div>
          </div>
        </section>

        {/* Login Form */}
        <Card className="w-full border-border bg-card shadow-xl shadow-primary/5">
          <CardContent className="space-y-6 p-6 sm:p-9">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="flex items-center justify-center gap-2 md:hidden"
            >
              <HeartHandshake className="text-primary" size={27} />
              <span className="text-xl font-bold text-foreground">
                Together<span className="text-primary">We</span>
              </span>
            </Link>

            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Welcome Back!
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in to continue making a difference.
              </p>
            </div>

            <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-5">
<FieldGroup>
              {/* Email */}
               <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email Address<span className="text-primary">*</span></FieldLabel>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="h-11 pl-10"
                          aria-invalid={fieldState.invalid}
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

              {/* Password */}
               <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">Password<span className="text-primary">*</span></FieldLabel>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="h-11 pl-10 pr-11"
                          aria-invalid={fieldState.invalid}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

             
</FieldGroup>
              <Button type="submit" className="h-11 w-full gap-2">
                Login
                <ArrowRight size={17} />
              </Button>
            </form>

            <div className="relative flex items-center">
              <div className="flex-1 border-t border-border" />
              <span className="px-3 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full gap-3"
              onClick={handleGoogleLogin}
            >
              <span className="font-bold text-lg">G</span>
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
