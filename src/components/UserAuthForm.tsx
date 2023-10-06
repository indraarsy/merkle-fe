import * as React from "react"

import useSWR from 'swr'

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "./ui/use-toast"
import { User } from "@/lib/types"
import { useRouter } from "next/router"

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then(res => res.json())

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data, error } = useSWR<User[]>('https://fakestoreapi.com/users', fetcher)

  const { toast } = useToast()
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (data) {
        const checkEmail = data.find((item) => item.email === formData.email)
        if (!checkEmail) {
          toast({
            title: "Email tidak ditemukan",
          })
        }

        if (checkEmail) {
          const checkPassword = checkEmail.password

          if (formData.password !== checkPassword) {
            toast({
              title: "Password salah",
            })
          }

          if (formData.password === checkPassword) {
            router.push('/admin')
          }

        }
      }

      setIsLoading(false)
    }, 500)
  }

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.currentTarget.value })}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.currentTarget.value })}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}
