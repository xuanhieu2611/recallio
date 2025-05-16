"use client"

import { deleteWord } from "@/actions/WordsAction"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { useWordsContext } from "@/contexts/WordsContext"

export default function Page() {
  const { words, setWords } = useWordsContext()
  const [wordToDelete, setWordToDelete] = useState(null)

  const handleDelete = async () => {
    if (!wordToDelete) return

    const result = await deleteWord(wordToDelete.id)
    if (result.error) {
      toast.error("Failed to delete word. Please try again.")
    } else {
      // Update the words list locally by filtering out the deleted word
      setWords(words.filter((word) => word.id !== wordToDelete.id))
      toast.success("Word deleted successfully.")
    }
    setWordToDelete(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Word</TableHead>
            <TableHead>Meaning</TableHead>
            <TableHead>Sentence</TableHead>
            <TableHead>Last Reviewed</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words?.map((word) => (
            <TableRow key={word.id} className="group relative">
              {/* <TableCell>{word.id}</TableCell> */}
              <TableCell className="relative">
                {word.word}
                <button
                  onClick={() => setWordToDelete(word)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                </button>
              </TableCell>
              <TableCell>{word.definition}</TableCell>
              <TableCell>{word.example}</TableCell>
              <TableCell>
                {new Date(word.last_reviewed).toLocaleString()}
              </TableCell>
              <TableCell>{word.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!wordToDelete}
        onOpenChange={() => setWordToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the word "{wordToDelete?.word}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
