/* eslint-disable no-unused-vars */
import { ReactNode } from "react"

// Third-party dependencies

// Current project dependencies

/**
 * Context Children Props Interface
 */
export interface IContextChildrenProps {
  children: ReactNode
}

/**
 * App Theme Context interface
 */
export interface IAppThemeContext {
  handleChangeThemeApp: () => void
  currentThemeName: string
}
