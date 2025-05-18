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
      next_review_at: new Date().toISOString(),
      repetition: 0,
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

// Helper to get nth Fibonacci number (0-indexed)
function fibonacciDays(n) {
  if (n <= 1) return n
  let a = 0,
    b = 1
  for (let i = 2; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}

// Update a word after review: increment repetition, set next_review_at
export const updateWordAfterReview = async (wordId) => {
  try {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()
    const uid = user.user.id

    // Get current repetition
    const { data: wordData, error: fetchError } = await supabase
      .from("words")
      .select("repetition")
      .eq("id", wordId)
      .eq("uid", uid)
      .single()

    if (fetchError) {
      throw new Error(fetchError.message)
    }

    const currentRepetition = wordData?.repetition || 0
    const newRepetition = currentRepetition + 1
    const daysToAdd = fibonacciDays(newRepetition)
    const nextReviewAt = new Date()
    nextReviewAt.setDate(nextReviewAt.getDate() + daysToAdd)

    const { error: updateError } = await supabase
      .from("words")
      .update({
        repetition: newRepetition,
        next_review_at: nextReviewAt.toISOString(),
      })
      .eq("id", wordId)
      .eq("uid", uid)

    if (updateError) {
      throw new Error(updateError.message)
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating word after review:", error.message)
    return { error: error.message }
  }
}

// Batch update words after review
export const batchUpdateWordsAfterReview = async (wordIds) => {
  try {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()
    const uid = user.user.id

    for (const wordId of wordIds) {
      // Get current repetition
      const { data: wordData, error: fetchError } = await supabase
        .from("words")
        .select("repetition")
        .eq("id", wordId)
        .eq("uid", uid)
        .single()
      if (fetchError) throw new Error(fetchError.message)
      const currentRepetition = wordData?.repetition || 0
      const newRepetition = currentRepetition + 1
      const daysToAdd = fibonacciDays(newRepetition)
      const nextReviewAt = new Date()
      nextReviewAt.setDate(nextReviewAt.getDate() + daysToAdd)
      const { error: updateError } = await supabase
        .from("words")
        .update({
          repetition: newRepetition,
          next_review_at: nextReviewAt.toISOString(),
        })
        .eq("id", wordId)
        .eq("uid", uid)
      if (updateError) throw new Error(updateError.message)
    }
    return { success: true }
  } catch (error) {
    console.error("Error batch updating words after review:", error.message)
    return { error: error.message }
  }
}
