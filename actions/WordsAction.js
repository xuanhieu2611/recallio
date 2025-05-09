"use server"

import { createClient } from "@/utils/supabase/server"

export const getAllWords = async () => {
  const supabase = await createClient()
  const { data: cardsData, error } = await supabase
    .from("words")
    .select("*")
    .order("id", { ascending: true })

  console.log("Cards data:", cardsData)
  if (error) {
    console.error("Error fetching cards:", error)
    throw new Error("Error fetching cards")
  }

  return cardsData
}

export const addWord = async (form) => {
  const supabase = await createClient()
  const newForm = {
    ...form,
    last_reviewed: new Date().toISOString(),
    score: 0,
  }
  const { data, error } = await supabase.from("words").insert([form]).select()

  if (error) {
    console.error("Error adding word:", error)
    return
  }

  return data
}
