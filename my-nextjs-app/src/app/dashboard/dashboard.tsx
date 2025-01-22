"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type Device = {
  id: string;
  ip_address: string;
  registered_by: string;
  status: "online" | "offline";
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Device[]>([]); // State to hold Cyberpi data
  const router = useRouter();

  // Function to check the online/offline status of devices
  const checkOnlineStatus = async (devices: Device[]): Promise<Device[]> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2-second timeout
  
    try {
      const requests = devices.map(async (device) => {
        try {
          const response = await fetch(`http://${device.ip_address}/check-online`, {
            signal: controller.signal,
          });
          const data = await response.json();
          return {
            ...device,
            status: data?.value === "online" ? "online" : "offline",
          };
        } catch {
          return { ...device, status: "offline" };
        }
      });
  
      const updatedDevices = await Promise.all(requests);
      return updatedDevices;
    } finally {
      clearTimeout(timeout);
    }
  };

  // Function to fetch data and update statuses
  const fetchAndUpdateData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/cyberpis/");
      setData(await checkOnlineStatus(response.data)); // Update status initially
    } catch (error) {
      console.error("Error fetching Cyberpis:", error);
    }
  };

  const deleteDevice = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete_cyberpi/${id}/`);
      setData((prevData) => prevData.filter((device) => device.id !== id)); // Update the state after deletion
      alert("Device deleted successfully!");
    } catch (error) {
      console.error("Error deleting device:", error);
      alert("Failed to delete device. Please try again.");
    }
  };


  // Initial data fetch on component mount
  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  // Function to refresh the data when the refresh button is clicked
  const refreshData = () => {
    fetchAndUpdateData();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-gray-50 rounded-md">
      <div className="flex items-center py-4 space-x-4">
        <Input placeholder="Filter by registered user..." className="max-w-sm" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/register_cyberpi")}
        >
          Register New CyberPi
        </Button>
        <Button variant="outline" size="sm" onClick={refreshData}>
          Refresh
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Registered By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.ip_address}</TableCell>
                <TableCell>{device.registered_by}</TableCell>
                <TableCell
                  className={
                    device.status === "online"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {device.status}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(device.ip_address)
                        }
                      >
                        Copy Device IP Address
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Manage Device</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:text-red-700 focus:bg-red-100"
                        onClick={() => deleteDevice(device.id)}
                      >
                        Delete Device
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;