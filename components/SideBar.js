"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Home,
  RefreshCw,
  Settings,
  User,
  LogOut,
  BookText,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./ModeToggle"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { SignOutAction } from "@/actions/UsersActions"
import { toast } from "sonner"

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Learn",
    href: "/learn",
    icon: BookOpen,
  },
  {
    title: "Review",
    href: "/review",
    icon: RefreshCw,
  },
  {
    title: "Mastery",
    href: "/mastery",
    icon: BarChart3,
  },
  {
    title: "Overview",
    href: "/overview",
    icon: BookText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSideBar({ user }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const response = await SignOutAction()
      if (response.error) {
        toast.error("Failed to sign out", {
          description: response.error.message,
        })
      } else {
        toast.success("Signed out successfully")
        router.push("/sign-in")
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: error.message,
      })
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="bg-secondary rounded-full font-bold">
            <Image src="/logo.png" width={40} height={40} alt="Logo Picture" />
          </div>
          <span className="text-xl font-bold">Recallio</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer">
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div>
                  <p className="max-w-[150px] truncate text-sm font-medium">
                    {user?.email || "User"}
                  </p>
                  <p className="text-muted-foreground text-xs">Premium</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleSignOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
