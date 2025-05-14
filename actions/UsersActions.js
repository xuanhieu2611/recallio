"use server"

import { createClient } from "@/utils/supabase/server"

export const SignUpAction = async ({ email, password }) => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      console.error("Sign-up failed:", error.message)
      throw new Error(error)
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          email: email,
          uid: data.user.id,
          name: data.user?.name,
        },
      ])

    if (profileError) {
      console.error("Profile creation failed:", profileError.message)
      throw new Error(profileError)
    }

    console.log("A new user just signed up")
    return { data: data }
  } catch (error) {
    console.error(error)
    return {
      error: error,
    }
  }
}

export const SignInAction = async ({ email, password }) => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      console.error("Sign-in failed:", error.message)
      throw new Error(error)
    }

    console.log("A user just signed in")
    return { data: data }
  } catch (error) {
    console.error(error)
    return {
      error: error,
    }
  }
}

export const SignOutAction = async () => {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Sign-out failed:", error.message)
      throw new Error(error)
    }

    console.log("A user just signed out")
    return {}
  } catch (error) {
    console.error(error)
    return {
      error: error,
    }
  }
}
