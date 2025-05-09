"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  VolumeIcon as VolumeUp,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for review words
const reviewWords = [
  {
    id: 1,
    word: "Ephemeral",
    pronunciation: "/ɪˈfɛm(ə)rəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time.",
    example: "The ephemeral nature of fashion trends makes it hard to keep up.",
    mnemonic:
      "Think of 'ephemeral' as similar to 'fever' - both come quickly and don't last long.",
    lastReviewed: "3 days ago",
  },
  {
    id: 2,
    word: "Ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere.",
    example: "Mobile phones have become ubiquitous in modern society.",
    mnemonic:
      "Think 'ubi' (where in Latin) + 'quitous' (sounds like 'quite is') = 'where quite is everything'.",
    lastReviewed: "7 days ago",
  },
  {
    id: 3,
    word: "Sycophant",
    pronunciation: "/ˈsɪkəfənt/",
    partOfSpeech: "noun",
    definition:
      "A person who acts obsequiously toward someone important in order to gain advantage.",
    example:
      "The CEO surrounded himself with sycophants who never challenged his ideas.",
    mnemonic:
      "Think 'psycho' + 'fan' = someone who is crazy about pleasing important people.",
    lastReviewed: "14 days ago",
  },
]

export function FlashcardReview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentWord = reviewWords[currentIndex]

  const handleNextWord = () => {
    if (currentIndex < reviewWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
      setShowMnemonic(false)
      setProgress(((currentIndex + 1) / reviewWords.length) * 100)
    }
  }

  const handlePrevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
      setShowMnemonic(false)
      setProgress(((currentIndex - 1) / reviewWords.length) * 100)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          Word {currentIndex + 1} of {reviewWords.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevWord}
            disabled={currentIndex === 0}
          >
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Previous word</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextWord}
            disabled={currentIndex === reviewWords.length - 1}
          >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Next word</span>
          </Button>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {currentWord.partOfSpeech}
            </Badge>
            <div className="text-muted-foreground text-xs">
              Last reviewed: {currentWord.lastReviewed}
            </div>
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

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: showAnswer ? 1 : 0,
              height: showAnswer ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {showAnswer && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium">Definition</h3>
                  <p className="text-sm">{currentWord.definition}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-medium">Example</h3>
                  <p className="text-sm italic">{currentWord.example}</p>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: showMnemonic ? 1 : 0,
                    height: showMnemonic ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {showMnemonic && (
                    <div className="bg-muted rounded-md p-3">
                      <h3 className="mb-1 flex items-center gap-1 text-sm font-medium">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Memory Aid
                      </h3>
                      <p className="text-sm">{currentWord.mnemonic}</p>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </CardContent>

        <CardFooter className="bg-muted/50 flex flex-col gap-4 border-t p-4">
          {!showAnswer ? (
            <Button className="w-full" onClick={() => setShowAnswer(true)}>
              Show Answer
            </Button>
          ) : (
            <>
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowMnemonic(!showMnemonic)
                  }}
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {showMnemonic ? "Hide Hint" : "Show Hint"}
                </Button>
              </div>

              <div className="flex w-full gap-2">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleNextWord}
                >
                  <X className="mr-2 h-4 w-4" />
                  Forgot
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleNextWord}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Remembered
                </Button>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
