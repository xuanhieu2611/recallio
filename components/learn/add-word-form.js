"use client"

import { useState, useEffect, useCallback } from "react"
import { Check, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { addWord } from "@/actions/WordsAction"

export function AddWordForm({ open, onOpenChange, onAddWord }) {
  const [formData, setFormData] = useState({
    word: "",
    partOfSpeech: "",
    pronunciation: "",
    definition: "",
    example: "",
    difficulty: "intermediate",
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchWordDetails = useCallback(async (word) => {
    if (!word) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      )
      if (!response.ok) {
        throw new Error("Word not found")
      }
      const data = await response.json()
      console.log("Call Dictionary API successfully")

      // Get the first entry
      const entry = data[0]

      // Find the first phonetics entry that has audio
      const audioPhonetic = entry.phonetics?.find(
        (phonetic) => phonetic.audio && phonetic.audio.length > 0,
      )

      // Update form data with fetched information
      setFormData((prev) => ({
        ...prev,
        pronunciation: entry.phonetics[0]?.text || "",
        partOfSpeech: entry.meanings[0]?.partOfSpeech || "",
        definition: entry.meanings[0]?.definitions[0]?.definition || "",
        example: entry.meanings[0]?.definitions[0]?.example || "",
        audio: audioPhonetic?.audio || "",
      }))
    } catch (error) {
      toast.error("Error fetching word details", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce the fetch function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.word) {
        fetchWordDetails(formData.word)
      }
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [formData.word, fetchWordDetails])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.word || !formData.definition) {
      toast({
        title: "Missing required fields",
        description: "Word and definition are required.",
        variant: "destructive",
      })
      return
    }

    const response = await addWord(formData)

    if (response?.error) {
      toast.error("Error adding word", {
        description: response.error.message,
      })
      return
    }

    // Reset form and close dialog
    setFormData({
      word: "",
      partOfSpeech: "",
      pronunciation: "",
      definition: "",
      example: "",
      difficulty: "intermediate",
    })

    onOpenChange(false)

    toast.success("Word added", {
      description: `"${formData.word}" has been added to your learning queue.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Word</DialogTitle>
          <DialogDescription>
            Enter the details of the word you want to learn.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="word" className="text-right">
                Word <span className="text-destructive">*</span>
              </Label>
              <Input
                id="word"
                name="word"
                value={formData.word}
                onChange={handleChange}
                className="col-span-3"
                required
              />
              {isLoading && (
                <Loader2 className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pronunciation" className="text-right">
                Pronunciation
              </Label>
              <Input
                id="pronunciation"
                name="pronunciation"
                value={formData.pronunciation}
                onChange={handleChange}
                placeholder="/prəˌnʌnsɪˈeɪʃ(ə)n/"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partOfSpeech" className="text-right">
                Part of Speech
              </Label>
              <Select
                value={formData.partOfSpeech}
                onValueChange={(value) =>
                  handleSelectChange("partOfSpeech", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select part of speech" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noun">Noun</SelectItem>
                  <SelectItem value="verb">Verb</SelectItem>
                  <SelectItem value="adjective">Adjective</SelectItem>
                  <SelectItem value="adverb">Adverb</SelectItem>
                  <SelectItem value="preposition">Preposition</SelectItem>
                  <SelectItem value="conjunction">Conjunction</SelectItem>
                  <SelectItem value="pronoun">Pronoun</SelectItem>
                  <SelectItem value="interjection">Interjection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="difficulty" className="text-right">
                Difficulty
              </Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  handleSelectChange("difficulty", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="definition" className="pt-2 text-right">
                Definition <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="definition"
                name="definition"
                value={formData.definition}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="example" className="pt-2 text-right">
                Example
              </Label>
              <Textarea
                id="example"
                name="example"
                value={formData.example}
                onChange={handleChange}
                placeholder="Use the word in a sentence"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />
              Add Word
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
