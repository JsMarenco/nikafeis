import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createRoot } from "react-dom/client"

import { GlobalProvider } from "./context/GlobalState"

import "./index.css"

import dark from "./theme/dark"
import Register from "./views/Register"
import Login from "./views/Login"
import ForgotPaassword from "./views/ForgotPassword"
import Home from "./views/Home"
import MyProfile from "./views/MyProfile"
import LogOut from "./views/LogOut"
import Friends from "./views/Friends"
import Post from "./components/layout/Posts"
import VideoSection from "./views/VideoSection"
import Account from "./views/Account"
import ResetPassword from "./views/ResetPassword"
import Settings from "./views/Settings"
import UserNotFound from "./components/layout/UserNotFound"
import ErrorPage from "./views/ErrorPage"
import { ThemeProvider } from "@mui/material"

const container = document.getElementById("root") as HTMLElement

const root = createRoot(container)

root.render(
  <ThemeProvider theme={dark}>
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPaassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/logout" element={<LogOut />} />

          <Route path="/profile/:userName" element={<MyProfile />} />

          <Route path="/user-not-found" element={<UserNotFound />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/posts/:postId" element={<Post />} />

          <Route path="/friends" element={<Friends />} />
          <Route path="/videos" element={<VideoSection />} />
          <Route path="/account" element={<Account />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  </ThemeProvider>
)