"use client";

import * as React from "react";
import axios from "axios";
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  username: string;
  role: string;
  number_cyberpi: number;
};

export function AdminDashboard() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  // ✅ Fetch users only once (React Strict Mode can cause double-fetching in development)
  React.useEffect(() => {
    console.log("Fetching users...");
    async function fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // ✅ Memoize the filtered users to avoid unnecessary recalculations
  const filteredUsers = React.useMemo(() => {
    return users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  // ✅ Handle sorting state efficiently
  const handleSortingChange = React.useCallback((newSorting: SortingState) => {
    setSorting(newSorting);
  }, []);

  // ✅ Handle column visibility efficiently
  const handleColumnVisibilityChange = React.useCallback((newVisibility: VisibilityState) => {
    setColumnVisibility(newVisibility);
  }, []);

  // ✅ Delete user function
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}/delete/`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // ✅ Redirect to edit page
  const handleEditUser = (userId: string) => {
    router.push(`/edit-user/${userId}`);
  };

  // ✅ Table Columns
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Username <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
    },
    {
      accessorKey: "number_cyberpi",
      header: "CyberPis Registered",
      cell: ({ row }) => <div>{row.getValue("number_cyberpi")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-500">
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // ✅ React Table Hook
  const table = useReactTable({
    data: filteredUsers, // Use memoized filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting, // ✅ Ensure this function is set
    onColumnVisibilityChange: setColumnVisibility, // ✅ Ensure this function is set
  });

  // ✅ Component UI
  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-gray-50 rounded-md">
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Search username..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}