"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function Register_form() {
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Function to validate IP Address
  const validateIpAddress = (ip: string) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/;
    return ipRegex.test(ip);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate IP Address
    if (!validateIpAddress(ipAddress)) {
      setError("Please enter a valid IP Address.");
      return;
    }

    try {
      const currentUsername = localStorage.getItem("username");
      console.log("Current username:", currentUsername);
      // Send POST request to register the CyberPi
      const response = await axios.post("http://127.0.0.1:8000/register_cyberpi/", {
        ip_address: ipAddress,
        registered_by:currentUsername,
      });

      if (response.status === 201) {
        setMessage("CyberPi registered successfully!");
        setIpAddress(""); // Clear the input field
        router.push("/dashboard"); // Navigate to the dashboard
      } else {
        setError("Failed to register CyberPi. Please try again.");
      }
    } catch (error: any) {
      console.error("Error registering CyberPi:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register New Cyberpi</CardTitle>
        <CardDescription>Deploy your new Cyberpi in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ip_address">IP Address</Label>
              <Input
                id="ip_address"
                placeholder="192.168.0.1"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {message && <p className="text-green-500 text-sm">{message}</p>}
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">Register</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}


