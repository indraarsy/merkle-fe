import { Sidebar } from '@/components/Sidebar'
import React from 'react'
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
  return (
    <>
      <div className="grid grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="col-span-4 lg:border-l w-full flex min-h-screen flex-col items-center pt-4">
          <h1 className="text-left text-xl font-bold ">Users</h1>
          <Button variant="secondary" className="ml-10 mb-4 self-start">Add User</Button>
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
