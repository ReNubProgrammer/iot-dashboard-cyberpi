"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import axios from "axios";
import { cn } from "@/lib/utils"; // Update path based on your project structure
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: { className?: string }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isRegisterMode, setIsRegisterMode] = useState(false); // Toggle between login and register

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    const url = isRegisterMode
      ? "http://127.0.0.1:8000/register/"
      : "http://127.0.0.1:8000/login/";
  
    try {
      const response = await axios.post(url, {
        username,
        password,
      });

      console.log(response);
      
      if (response.status === 200) {
        if (isRegisterMode) {
          setMessage("Registration successful! You can now log in.");
          setIsRegisterMode(false); // Switch back to login mode after successful registration
        } else {
          setMessage("Login successful!");
          localStorage.setItem("user_id", response.data.user_id);
          router.push("/dashboard"); // Navigate to the dashboard page
        }
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("Invalid input. Please check your details.");
        } else if (error.response.status === 401) {
          setError("Invalid username or password");
        } else if (error.response.status === 404) {
          setError("User not found");
        } else {
          setError(`Error: ${error.response.data.error || "Unknown error"}`);
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isRegisterMode ? "Register" : "Login"}
          </CardTitle>
          <CardDescription>
            {isRegisterMode
              ? "Enter your details below to create an account"
              : "Enter your credentials below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isRegisterMode ? "Register" : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            {isRegisterMode ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegisterMode(false)}
                  className="text-blue-500 underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsRegisterMode(true)}
                  className="text-blue-500 underline"
                >
                  Register
                </button>
              </p>
            )}
          </div>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
