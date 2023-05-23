// Third-party dependencies
import { SnackbarProvider } from "notistack"
import { Provider } from "react-redux"

// Current project dependencies
import { AppMessageContextProvider } from "./AppMessageContext"
import { IContextChildrenProps } from "@/ts/interfaces/context"
import { AppThemeContextProvider } from "./AppThemeContext"
import { store } from "@/app/store"

/**
 * App Global context, wrap all the contexts provider
 * @param props React Node
 * @returns All the contexts
 */
export const AppGlobalContext = (props: IContextChildrenProps) => {
  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} style={{ backgroundColor: "black" }}>
          <AppMessageContextProvider>
            <AppThemeContextProvider>{props.children}</AppThemeContextProvider>
          </AppMessageContextProvider>
        </SnackbarProvider>
      </Provider>
    </>
  )
}
