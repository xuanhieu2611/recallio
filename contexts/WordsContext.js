"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getAllWords, addWord as addWordAction } from "@/actions/WordsAction"
import { DIFFICULTY_MAP } from "@/constants/difficulty"

const WordsContext = createContext()

export function WordsProvider({ children }) {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWords = async () => {
    try {
      setLoading(true)
      const data = await getAllWords()
      if (data.error) {
        setError(data.error)
      } else {
        setWords(data)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  const value = {
    words,
    setWords,
    loading,
    error,
    refreshWords: fetchWords,
  }

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export function useWordsContext() {
  const context = useContext(WordsContext)
  if (context === undefined) {
    throw new Error("useWords must be used within a WordsProvider")
  }
  return context
}
