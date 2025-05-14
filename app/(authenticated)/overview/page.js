import { getAllWords } from "@/actions/WordsAction"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function page() {
  const words = await getAllWords()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Word</TableHead>
          <TableHead>Meaning</TableHead>
          <TableHead>Sentence</TableHead>
          <TableHead>Last Reviewed</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {words?.map((word) => (
          <TableRow key={word.id}>
            <TableCell>{word.id}</TableCell>
            <TableCell>{word.word}</TableCell>
            <TableCell>{word.meaning}</TableCell>
            <TableCell>{word.sentence}</TableCell>
            <TableCell>
              {new Date(word.last_reviewed).toLocaleString()}
            </TableCell>
            <TableCell>{word.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
