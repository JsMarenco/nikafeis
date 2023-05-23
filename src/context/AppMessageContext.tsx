import React, { createContext } from "react"

// Third-party dependencies
import { VariantType, useSnackbar } from "notistack"

// Current project dependencies
import { IContextChildrenProps, IMessageContext } from "@/ts/interfaces/context"

export const AppMessageContext = createContext<IMessageContext>({
  handleMessage: () => console.log("handleMessage is not defined"),
})

/**
 * App message context
 * @param props ReactNode
 * @returns Message context provider
 */
export const AppMessageContextProvider = (props: IContextChildrenProps) => {
  const { enqueueSnackbar } = useSnackbar()

  /**
   * Create a new message
   * @param message The message that will be display
   * @param variant "default" | "error" | "success" | "warning" | "info"
   */
  const handleMessage = (message: string, variant?: VariantType) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: variant ? "default" : variant })
  }

  return (
    <>
      <AppMessageContext.Provider value={{ handleMessage }}>
        {props.children}
      </AppMessageContext.Provider>
    </>
  )
}
