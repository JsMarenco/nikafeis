// Third-party dependenciesl
import type { AppProps } from "next/app"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

// Current project dependenciesl
import "@/styles/globals.css"
import { AppGlobalContext } from "@/context/AppGlobalContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppGlobalContext>
      <Component {...pageProps} />
    </AppGlobalContext>
  )
}
