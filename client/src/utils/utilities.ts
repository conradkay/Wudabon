export const id = (
  arr: Array<any & { id: string }>,
  passedId: string
): number => {
  return arr.findIndex(item => item.id === passedId)
}

export const formalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/,/g, '')
    .replace(/ /g, '')
}

export const moveInArray = (element: any, index: number, offset: number) => {
  const newIndex = index + offset

  const newArr = [...element]

  if (newIndex > -1 && newIndex < newArr.length) {
    const removedElement = newArr.splice(index, 1)[0]
    newArr.splice(newIndex, 0, removedElement)
  }

  return newArr
}
