"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function SwipeCard({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : 0,
    )
  }

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : cards.length - 1,
    )
  }

  const currentCard = cards[currentIndex]

  const variants = {
    enter: (direction) => ({
      x: direction === "left" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "left" ? -300 : 300,
      opacity: 0,
    }),
  }

  const handleDragEnd = (event, info) => {
    const threshold = 100 // Minimum distance to trigger a swipe
    if (info.offset.x > threshold) {
      handleSwipeRight("right")
    } else if (info.offset.x < -threshold) {
      handleSwipeLeft("left")
    }
  }

  return (
    <div
      //   {...handlers}
      className="flex min-h-screen items-center justify-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20"
    >
      <motion.div
        key={currentIndex}
        custom={swipeDirection}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className=""
      >
        <Card className="min-w-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {currentCard.word}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center font-normal text-gray-700 dark:text-gray-400">
              {currentCard.meaning}
            </p>
            {currentCard.sentence && (
              <p className="mb-4 text-gray-600 italic dark:text-gray-400">
                "{currentCard.sentence}"
              </p>
            )}
            {currentCard.synonyms?.length > 0 && (
              <div className="mb-2">
                <h6 className="font-semibold text-gray-900 dark:text-white">
                  Synonyms:
                </h6>
                <p className="text-gray-700 dark:text-gray-400">
                  {currentCard.synonyms.join(", ")}
                </p>
              </div>
            )}
            {currentCard.antonyms?.length > 0 && (
              <div>
                <h6 className="font-semibold text-gray-900 dark:text-white">
                  Antonyms:
                </h6>
                <p className="text-gray-700 dark:text-gray-400">
                  {currentCard.antonyms.join(", ")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
