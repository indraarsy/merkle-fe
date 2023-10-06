import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/router"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Sidebar({ className }: SidebarProps) {

  const router = useRouter()

  return (
    <div className={cn("pb-12 h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              User
            </Button>
            <Button variant="ghost" onClick={() => router.push('/')} className="w-full justify-start">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
