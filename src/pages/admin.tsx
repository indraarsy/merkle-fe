import { Sidebar } from '@/components/Sidebar'
import React, { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { User } from '@/lib/types'
import { DataTable } from '@/components/datatable'
import useSWR from 'swr'
import { fetcher } from '@/components/UserAuthForm'

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const fullName = row.original.name.firstname + " " + row.original.name.lastname

      return <div>{fullName}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

type Props = {}

const admin = (props: Props) => {
  const { data, error, isLoading } = useSWR<User[]>('https://fakestoreapi.com/users', fetcher)
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  })

  return (
    <>
      <div className="grid grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="col-span-4 lg:border-l w-full flex min-h-screen flex-col items-center pt-4">
          <h1 className="text-left text-xl font-bold">Users</h1>
          <div className="flex self-start ml-10 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add user</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>
                  <DialogDescription>
                    Add data here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstname" className="text-right">
                      First name
                    </Label>
                    <Input
                      id="firstname"
                      className="col-span-3"
                      placeholder="First name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastname" className="text-right">
                      Last name
                    </Label>
                    <Input
                      id="lastname"
                      className="col-span-3"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      className="col-span-3"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">Password</Label>
                    <Input
                      id="password"
                      className="col-span-3"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {!isLoading ? (
            <DataTable columns={columns} data={data!} />
          ) : (
            <DataTable columns={columns} data={[]} />
          )}
        </div>
      </div>
    </>
  )
}

export default admin
