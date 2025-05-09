"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { VolumeIcon as VolumeUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for words
const words = [
  {
    id: 1,
    word: "Ephemeral",
    pronunciation: "/ɪˈfɛm(ə)rəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time.",
    example: "The ephemeral nature of fashion trends makes it hard to keep up.",
    difficulty: "advanced",
  },
  {
    id: 2,
    word: "Ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere.",
    example: "Mobile phones have become ubiquitous in modern society.",
    difficulty: "advanced",
  },
  {
    id: 3,
    word: "Serendipity",
    pronunciation: "/ˌsɛr(ə)nˈdɪpɪti/",
    partOfSpeech: "noun",
    definition:
      "The occurrence of events by chance in a happy or beneficial way.",
    example: "The discovery of penicillin was a serendipity.",
    difficulty: "advanced",
  },
]

export function WordSwipeCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDefinition, setShowDefinition] = useState(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

  const currentWord = words[currentIndex]

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      // Swiped right - learn word
      handleNextWord()
    } else if (info.offset.x < -100) {
      // Swiped left - skip word
      handleNextWord()
    }
  }

  const handleNextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowDefinition(false)
    }
  }

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className="cursor-grab touch-none"
    >
      <Card className="w-[300px] overflow-hidden shadow-lg">
        <div className="relative h-[400px]">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 p-6">
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {currentWord.partOfSpeech}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {currentWord.difficulty}
                </Badge>
              </div>

              <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold">{currentWord.word}</h2>
                <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                  <span>{currentWord.pronunciation}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <VolumeUp className="h-4 w-4" />
                    <span className="sr-only">Pronounce</span>
                  </Button>
                </div>
              </div>

              <div
                className={`transition-opacity duration-300 ${showDefinition ? "opacity-100" : "opacity-0"}`}
              >
                {showDefinition && (
                  <>
                    <div className="mb-4">
                      <h3 className="mb-1 text-sm font-medium">Definition</h3>
                      <p className="text-sm">{currentWord.definition}</p>
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-medium">Example</h3>
                      <p className="text-sm italic">{currentWord.example}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <CardFooter className="bg-muted/50 border-t p-4">
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={() => setShowDefinition(!showDefinition)}
              >
                {showDefinition ? "Hide Definition" : "Show Definition"}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
