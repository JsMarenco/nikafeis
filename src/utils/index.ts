export const firstLetterUppercase = (string: string) => {
  return deleteSpaces(string.charAt(0).toUpperCase() + string.slice(1))
}

const deleteSpaces = (string: string) => {
  string = string.trim()

  return string.replace(/\s/g, "")
}

export const convertDate = (date: string) => {
  const dateObject = new Date(date)
  const now = new Date()

  const diff = now.getTime() - dateObject.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)
  const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30)
  const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else if (days < 30) {
    return `${days} days ago`
  } else if (months < 12) {
    return `${months} months ago`
  } else {
    return `${years} years ago`
  }
}

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window

  return {
    width,
    height,
  }
}

export const deleteSpacesAndReplaceWithUnderscore = (string: string) => {
  string = deleteSpaces(string)

  return string.replace(/\s/g, "-")
}