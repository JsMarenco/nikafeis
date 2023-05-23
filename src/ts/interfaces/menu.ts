import { ReactNode } from "react"

// Third-party dependencies

// Current project dependencies

export interface CustomMenuItemProps {
  icon: ReactNode
  label: string
  link: string
}

export interface CustomMenuProps {
  items: CustomMenuItemProps[]
  label: string
}
