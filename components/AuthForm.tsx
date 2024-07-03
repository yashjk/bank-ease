"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from '../lib/actions/user.action';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const formSchema = authFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsLoading(true);
		try {
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if (response) router.push('/');
      }
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="cursor-pointer flex items-center gap-1">
					<Image
						src="/icons/logo.svg"
						height={34}
						width={34}
						alt="BankEase Logo"
					/>
					<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
						BankEase
					</h1>
				</Link>
				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
					</h1>
					<p className="text-16 font-normal text-gray-600">
						{user
							? "Link your account to get started"
							: "Please enter your details"}
					</p>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4">{/* Plaid Link */}</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{type === "sign-up" && (
								<>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="firstName"
											type="text"
											label="First Name"
											placeholder="Enter your first name"
										/>
										<CustomInput
											control={form.control}
											name="lastName"
											type="text"
											label="Last Name"
											placeholder="Enter your last name"
										/>
									</div>
									<CustomInput
										control={form.control}
										name="address1"
										type="text"
										label="Address"
										placeholder="Enter your specific address"
									/>
									<CustomInput
										control={form.control}
										name="city"
										type="text"
										label="City"
										placeholder="Enter your city"
									/>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="state"
											type="text"
											label="State"
											placeholder="Example: NY"
										/>
										<CustomInput
											control={form.control}
											name="postalCode"
											type="text"
											label="Postal Code"
											placeholder="Example: 11101"
										/>
									</div>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="dateOfBirth"
											type="text"
											label="Date of Birth"
											placeholder="YYYY-MM-DD"
										/>
										<CustomInput
											control={form.control}
											name="ssn"
											type="text"
											label="SSN"
											placeholder="Example: 1234"
										/>
									</div>
								</>
							)}
							<CustomInput
								control={form.control}
								name="email"
								type="email"
								label="Email"
								placeholder="Enter your email"
							/>
							<CustomInput
								control={form.control}
								name="password"
								type="password"
								label="Password"
								placeholder="Enter your password"
							/>
							<div className="flex flex-col gap-4">
								<Button type="submit" disabled={isLoading} className="form-btn">
									{isLoading ? (
										<>
											<Loader2 size={20} className="animate-spin" /> &nbsp;
											Loading...
										</>
									) : type === "sign-in" ? (
										"Sign In"
									) : (
										"Sign Up"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<footer className="flex justify-center gap-1">
						<p className="text-14 font-normal text-gray-600">
							{type === "sign-in"
								? "Don't have an account?"
								: "Already have an account?"}
						</p>
						<Link
							className="form-link"
							href={type === "sign-in" ? "/sign-up" : "/sign-in"}
						>
							{type === "sign-in" ? "Sign Up" : "Sign In"}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
};

export default AuthForm;
