"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy data
const data = [
  {
    message: "menyala abangku",
  },
];

export function Postman() {
  const [textData, setTextData] = useState(
    JSON.stringify(data, null, 2) // Format the initial data as JSON
  );
  const [deviceIp, setDeviceIp] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("")

  // Load the device IP from localStorage when the component mounts
  React.useEffect(() => {
    const savedIp = localStorage.getItem("device_ip") || "";
    setDeviceIp(savedIp); // Set initial value from localStorage
  }, []);

  // Handle textarea changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
  };

  // Handle Tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Prevent default Tab behavior (focus shifting)
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const tabSpace = "    ";
      const updatedText =
        textData.substring(0, start) + tabSpace + textData.substring(end);

      setTextData(updatedText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabSpace.length;
      }, 0);
    }
  };

  const handleSend = async () => {
    if (selectedMethod === "get") {
      const response = await axios.get(`http://${deviceIp}`);
      setTextData(JSON.stringify(response.data, null, 2));
      toast.success("GET Request Successfully Sent!", {
        duration: 4000,
      });

    } else if (selectedMethod === "post") {
      const jsonData = JSON.parse(textData); 
      const response = await axios.post(`http://${deviceIp}`, jsonData);
      toast.success("POST Request Successfully Sent!", {
        duration: 4000,
      });
    } else {
      alert("Select Method First!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-gray-50 rounded-md">
      <div className="flex items-center py-4 space-x-4">
        {/* Select Dropdown */}
        <Select onValueChange={(value) => setSelectedMethod(value)}>
          <SelectTrigger id="request" className="h-8 w-46 text-sm">
            <SelectValue placeholder="Select Method " />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="get">GET</SelectItem>
            <SelectItem value="post">POST</SelectItem>
          </SelectContent>
        </Select>
        {/* Editable IP Address */}
        <Input
          value={deviceIp} // Display the current value
          onChange={(e) => setDeviceIp(e.target.value)} // Allow editing
          placeholder="Enter Device IP"
          className="max-w-sm h-8 text-sm"
        />
        {/* Send Button */}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
      {/* Textarea */}
      <div className="rounded-md border p-4 bg-white">
        <Textarea
          value={textData}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown} // Handle Tab key for indentation
          rows={15} // Large textarea
          className="w-full"
        />
      </div>
    </div>
  );
}