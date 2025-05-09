"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { addWord } from "@/actions/WordsAction"
import { toast } from "sonner"
import { Input } from "./ui/input"

export default function AddWordForm() {
  const [form, setForm] = useState({
    word: "",
    meaning: "",
    sentence: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addWord(form)
      setForm({
        word: "",
        meaning: "",
        sentence: "",
      })
      toast.success("Word added successfully!")
    } catch (error) {
      console.error("Error adding word:", error)
      toast.error("Failed to add word. Please try again.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex min-w-md flex-col gap-4 rounded-md bg-white p-6 shadow-md"
    >
      <div className="flex flex-col">
        <label htmlFor="word" className="text-sm font-medium text-gray-700">
          Word
        </label>
        <Input
          id="word"
          className="mt-1 rounded border p-2"
          placeholder="Enter the word"
          value={form.word}
          onChange={(e) => setForm({ ...form, word: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="meaning" className="text-sm font-medium text-gray-700">
          Definition
        </label>
        <Input
          id="meaning"
          className="mt-1 rounded border p-2"
          placeholder="Enter the definition"
          value={form.meaning}
          onChange={(e) => setForm({ ...form, meaning: e.target.value })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sentence" className="text-sm font-medium text-gray-700">
          Example Sentence
        </label>
        <Input
          id="sentence"
          className="mt-1 rounded border p-2"
          placeholder="Enter an example sentence"
          value={form.sentence}
          onChange={(e) => setForm({ ...form, sentence: e.target.value })}
        />
      </div>
      <Button variant="default">Save Word</Button>
    </form>
  )
}
