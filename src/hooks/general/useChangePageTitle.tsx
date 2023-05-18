import { useEffect, useCallback } from "react"

export default function useChangePageTitle(title: string) {
  const changeTitle = useCallback((newTitle: string) => {
    document.title = newTitle
  }, [])

  useEffect(() => {
    changeTitle(title)
  }, [title, changeTitle])
}
