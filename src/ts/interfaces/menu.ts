import { ReactNode } from "react"

// Third-party dependencies

// Current project dependencies

export interface MenuSectionItemProps {
  icon: ReactNode
  label: string
  link: string
}

export interface MenuSectionProps {
  items: MenuSectionItemProps[]
  label: string
  children?: ReactNode
}
