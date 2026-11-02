"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Leaf,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  name: z.string().trim().min(3, "Name must be at least 3 characters."),

  email: z.string().trim().email("Please enter a valid email address."),

  image: z.union([
    z.literal(""),
    z.string().url("Please enter a valid image URL."),
  ]),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/[A-Z]/, "At least one uppercase letter is required.")
    .regex(/[a-z]/, "At least one lowercase letter is required."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
    },
  });

  const handleRegister = async (formData: RegisterFormValues) => {
    console.log(formData, "form data");
    const { data, error } = await authClient.signUp.email({
      ...formData,
    });

    if (error) {
      toast.error(error.message || "Registration failed.");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid min-h-[85vh] max-w-5xl items-center gap-10 md:grid-cols-2">
        {/* Left Section */}
        <section className="hidden space-y-6 md:block">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="rounded-xl bg-primary p-2.5 text-primary-foreground">
              <HeartHandshake size={28} />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Together<span className="text-primary">We</span>
            </span>
          </Link>

          <div className="space-y-4 pt-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-2 text-sm font-medium text-secondary">
              <Leaf size={16} />
              Be part of something meaningful
            </span>

            <h1 className="text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              Your Journey
              <br />
              <span className="text-primary">Starts Here.</span>
            </h1>

            <p className="max-w-md leading-7 text-muted-foreground">
              Connect with like-minded people, join community initiatives, and
              turn your good intentions into meaningful actions.
            </p>
          </div>

          <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-6">
            <HeartHandshake className="mb-3 text-secondary" size={30} />
            <p className="text-lg font-semibold text-foreground">
              Together, we can do more.
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Every small contribution can create a positive impact in
              someone&apos;s life.
            </p>
          </div>
        </section>

        {/* Register Form */}
        <Card className="w-full border-border bg-card shadow-xl shadow-primary/5">
          <CardContent className="space-y-5 p-6 sm:p-9">
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
                Join TogetherWe
              </h2>
              <p className="text-sm text-muted-foreground">
                Create an account and start making a difference.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <FieldGroup>
                {/* Full Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>

                      <div className="relative">
                        <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          id="name"
                          placeholder="Enter your full name"
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

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>

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

                {/* Profile Image */}
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="image">
                        Profile Image URL (Optional)
                      </FieldLabel>

                      <Input
                        {...field}
                        id="image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="h-11"
                        aria-invalid={fieldState.invalid}
                      />

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
                      <FieldLabel htmlFor="password">Password</FieldLabel>

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
                Create Account
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
            >
              <span className="font-bold text-lg">G</span>
              Sign up with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
