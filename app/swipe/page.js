import { getAllWords } from "@/actions/WordsAction"
import SwipeCard from "@/components/SwipeCard"

export default async function Review() {
  const cardsData = await getAllWords()

  return (
    <SwipeCard cards={cardsData} /> // Pass the fetched cards data to SwipeCard
  )
}
