// Third-party dependencies
import { SnackbarProvider } from "notistack"

// Current project dependencies
import { AppMessageContextProvider } from "./AppMessageContext"
import { IContextChildrenProps } from "@/ts/interfaces/context"
import { AppThemeContextProvider } from "./AppThemeContext"

/**
 * App Global context, wrap all the contexts provider
 * @param props React Node
 * @returns All the contexts
 */
export const AppGlobalContext = (props: IContextChildrenProps) => {
  return (
    <>
      <SnackbarProvider maxSnack={3} style={{ backgroundColor: "black" }}>
        <AppMessageContextProvider>
          <AppThemeContextProvider>{props.children}</AppThemeContextProvider>
        </AppMessageContextProvider>
      </SnackbarProvider>
    </>
  )
}