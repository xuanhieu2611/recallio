"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import DarkModeToggle from "./DarkModeToggle"
import Image from "next/image"
import { Button } from "./ui/button"
import { SignOutAction } from "@/actions/UsersActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogOut = async () => {
    startTransition(async () => {
      try {
        const { error } = await SignOutAction()
        if (error) {
          throw new Error(error)
        }
        toast.success("Logged out successfully")
        router.replace("/")
      } catch (error) {
        console.error("Error logging out:", error)
        toast.error("Failed to log out")
      }
    })
  }

  return (
    <nav className="bg-popover absolute w-full items-center justify-between border-gray-200 px-3 shadow-md">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2">
        <Link
          href="/"
          className="flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          <Image src="/logo.png" width={50} height={50} alt="Logo Picture" />
          Recallio
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:items-center`}
          id="navbar-default"
        >
          {user ? (
            <div className="flex flex-col items-center gap-4 border-4 border-red-500 md:flex-row md:items-center">
              <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
                <li>
                  {/* <Button ghost asChild> */}
                  <Link
                    href="/home"
                    className="block rounded py-2 pr-4 pl-3 text-gray-900 md:bg-transparent md:p-0 dark:text-white"
                  >
                    Home
                  </Link>
                  {/* </Button> */}
                </li>
                <li>
                  <Link
                    href="/add"
                    className="block rounded py-2 pr-4 pl-3 text-gray-900 md:bg-transparent md:p-0 dark:text-white"
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    href="/overview"
                    className="block rounded py-2 pr-4 pl-3 text-gray-900 md:bg-transparent md:p-0 dark:text-white"
                  >
                    Overview
                  </Link>
                </li>
              </ul>
              <Button
                onClick={handleLogOut}
                disabled={isPending}
                className="w-20"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Log out"}
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-4">
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
            </div>
          )}
          <div className="mt-4 md:mt-0 md:ml-4">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
