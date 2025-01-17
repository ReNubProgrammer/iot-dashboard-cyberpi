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

  const router = useRouter(); // Next.js router for navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("user_id", response.data.user_id);
        router.push("/dashboard"); // Navigate to the dashboard page
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else if (error.response && error.response.status === 404) {
        setError("User not found");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
                Login
              </Button>
            </div>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
