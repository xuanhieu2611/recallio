"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, BookOpen, Home, RefreshCw, Settings } from "lucide-react"

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

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/",
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
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSideBar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="bg-secondary rounded-md font-bold">
            <Image src="/logo.png" width={50} height={50} alt="Logo Picture" />
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
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src="/" /> */}
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-muted-foreground text-xs">Premium</p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
