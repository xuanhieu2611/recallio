"use server"

import { createClient } from "@/utils/supabase/server"
import { DIFFICULTY_MAP } from "@/constants/difficulty"

export const getAllWords = async () => {
  try {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()
    const uid = user.user.id

    const { data: wordsData, error } = await supabase
      .from("words")
      .select("*")
      .eq("uid", uid)
      .order("id", { ascending: true })

    console.log("Server action get all words successfully")
    if (error) {
      console.error("Error getting all words:", error.message)
      throw new Error(error)
    }

    return wordsData
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}

export const addWord = async (form) => {
  try {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()

    const newForm = {
      ...form,
      difficulty: DIFFICULTY_MAP[form.difficulty],
      uid: user.user.id,
      last_reviewed: new Date().toISOString(),
      score: 0,
    }

    const { data, error } = await supabase
      .from("words")
      .insert([newForm])
      .select()

    if (error) {
      console.error("Error adding word:", error.message)
      throw new Error(error)
    }

    return { data: data }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}

export const deleteWord = async (wordId) => {
  try {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()
    const uid = user.user.id

    const { error } = await supabase
      .from("words")
      .delete()
      .eq("id", wordId)
      .eq("uid", uid)

    if (error) {
      console.error("Error deleting word:", error.message)
      throw new Error(error)
    }

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
