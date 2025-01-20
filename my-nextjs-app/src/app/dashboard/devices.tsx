// src/data/devices.ts

export type Device = {
    id: string;
    ip_address: string;
    registered_by: string;
    status: "online" | "offline";
  };
  
  export const data: Device[] = [
    {
      id: "d1",
      ip_address: "192.168.0.101",
      registered_by: "admin",
      status: "online",
    },
    {
      id: "d2",
      ip_address: "192.168.0.102",
      registered_by: "admin",
      status: "offline",
    },
    {
      id: "d3",
      ip_address: "192.168.0.103",
      registered_by: "admin",
      status: "online",
    },
    {
      id: "d4",
      ip_address: "192.168.0.104",
      registered_by: "user",
      status: "offline",
    },
    {
      id: "d5",
      ip_address: "192.168.0.105",
      registered_by: "user",
      status: "online",
    },
  ];