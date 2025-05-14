"use client"

import { useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { SignInAction, SignUpAction } from "@/actions/UsersActions"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthForm({ isSignUp }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  let title = ""
  let description = ""

  const handleSubmit = async (e) => {
    startTransition(async () => {
      try {
        e.preventDefault()
        let error = null
        if (isSignUp) {
          if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return
          }
          const response = await SignUpAction({ email, password }) // Fix: Pass arguments as an object
          error = response.error
        } else {
          const response = await SignInAction({ email, password }) // Fix: Pass arguments as an object
          error = response.error
        }
        if (error) {
          toast.error("Error: ", {
            description: error.message,
          })
        } else {
          toast.success(
            isSignUp
              ? "Account created successfully!"
              : "Signed in successfully!",
          )
          router.replace("/")
        }
      } catch (error) {
        toast.error("Error: ", {
          description: error.message,
        })
      }
    })
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match")
    } else {
      setConfirmPasswordError("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {isSignUp && (
        <div className="mb-6">
          <label htmlFor="re-password" className="mb-2 block font-medium">
            Confirm Password
          </label>
          <Input
            id="re-password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className="mt-1 text-sm text-red-500">
            {confirmPasswordError && confirmPassword !== ""
              ? confirmPasswordError
              : ""}
          </div>
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : isSignUp ? (
          "Sign Up"
        ) : (
          "Sign In"
        )}
      </Button>
      {isSignUp ? (
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      )}
    </form>
  )
}
