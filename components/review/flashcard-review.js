"use client"

import { useState, useCallback } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ChevronDown, ChevronUp, VolumeIcon as VolumeUp } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useWordsContext } from "@/contexts/WordsContext"

export function FlashcardReview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const { words: reviewWords } = useWordsContext()

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

  const currentWord = reviewWords?.[currentIndex]

  const playAudio = useCallback(() => {
    if (currentWord?.audio) {
      const audio = new Audio(currentWord.audio)
      audio.play().catch((error) => {
        toast.error("Error playing audio", {
          description: error.message,
        })
      })
    }
  }, [currentWord?.audio])

  const handleNextWord = () => {
    if (currentIndex < reviewWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
      setProgress(((currentIndex + 1) / reviewWords.length) * 100)
    } else {
      setIsCompleted(true)
      setProgress(100)
      handleBatchUpdateAfterReview()
    }
  }

  const handlePrevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
      setProgress(((currentIndex - 1) / reviewWords.length) * 100)
    }
  }

  const handleDragEnd = (event, info) => {
    const threshold = 100
    if (Math.abs(info.offset.x) > threshold) {
      handleNextWord()
    }
    x.set(0)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
    setProgress(0)
    setIsCompleted(false)
  }

  const handleBatchUpdateAfterReview = async () => {
    if (!reviewWords?.length) return
    const wordIds = reviewWords.map((w) => w.id)
    try {
      const { batchUpdateWordsAfterReview } = await import(
        "@/actions/WordsAction"
      )
      await batchUpdateWordsAfterReview(wordIds)
    } catch (err) {
      toast.error("Failed to update review info for all words", {
        description: err?.message,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          {!isCompleted
            ? `Word ${currentIndex + 1} of ${reviewWords.length}`
            : "Review Completed"}
        </div>
        {!isCompleted && (
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
        )}
      </div>

      <Progress value={progress} className="h-2" />

      {isCompleted ? (
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold">Great job! 🎉</h2>
              <p className="text-muted-foreground">
                You've completed reviewing all words.
              </p>
              <Button onClick={handleRestart} className="mt-4">
                Review Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          drag={showAnswer ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, rotate, opacity }}
          className="touch-none"
          onClick={() => !showAnswer && setShowAnswer(true)}
        >
          <Card className="cursor-pointer overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {currentWord?.partOfSpeech}
                </Badge>
                <div className="text-muted-foreground text-xs">
                  Last reviewed: {currentWord?.lastReviewed}
                </div>
              </div>

              <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold">{currentWord?.word}</h2>
                <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                  <span>{currentWord?.pronunciation}</span>
                  {currentWord?.audio && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={playAudio}
                    >
                      <VolumeUp className="h-4 w-4" />
                      <span className="sr-only">Pronounce</span>
                    </Button>
                  )}
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
                      <p className="text-sm">{currentWord?.definition}</p>
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-medium">Example</h3>
                      <p className="text-sm italic">{currentWord?.example}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
