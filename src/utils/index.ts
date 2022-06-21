// generate a random username for the user
export const generateUsername = (name: string): string => {
  // random letters and numbers
  const randomLetters = Math.random().toString(36).substring(2, 15)
  const randomNumbers = Math.random().toString(36).substring(2, 15)
  const username = `${name}${randomLetters}${randomNumbers}`
  const deleteSpaces = username.replace(/\s/g, "")

  return deleteSpaces.toLowerCase()
}

export const validateSimpleEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(String(email).toLowerCase())
}