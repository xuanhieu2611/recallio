export const getWords = () => {
  return JSON.parse(localStorage.getItem("vocabWords") || "[]")
}

export const saveWord = (wordObj) => {
  const words = getWords()
  words.push(wordObj)
  localStorage.setItem("vocabWords", JSON.stringify(words))
}

export const updateWord = (updatedWord) => {
  const words = getWords().map((w) =>
    w.id === updatedWord.id ? updatedWord : w
  )
  localStorage.setItem("vocabWords", JSON.stringify(words))
}
