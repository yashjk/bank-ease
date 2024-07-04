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
import { signIn, signUp } from "../lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

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

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const userData = {
			firstName: data.firstName!,
			lastName: data.lastName!,
			address1: data.address1!,
			city: data.city!,
			state: data.state!,
			postalCode: data.postalCode!,
			dateOfBirth: data.dateOfBirth!,
			ssn: data.ssn!,
			email: data.email,
			password: data.password,
		};
		try {
			if (type === "sign-in") {
				const response = await signIn({
					email: data.email,
					password: data.password,
				});
				if (response) router.push("/");
			}
			if (type === "sign-up") {
				const newUser = await signUp(userData);
				setUser(newUser);
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
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
				<div className="flex flex-col gap-4">
					<PlaidLink user={user} variant="primary" />
				</div>
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
