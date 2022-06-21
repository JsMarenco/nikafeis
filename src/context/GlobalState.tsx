/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useReducer, useState } from "react"

import IUser from "../components/layout/interfaces/IUser"

import { AppReducer } from "./UserReducer"

interface IProps {
  children: React.ReactNode
}

const initialState = {
  user: {
    id: "",

    name: "",
    lastName: "",

    email: "",
    description: "",

    avatar: "",
    cover: "",
    website: "",

    token: "",

    createdAt: "",
    updatedAt: "",
  } as IUser,
}

interface IContext {
  user: IUser
  setUser: (user: IUser) => void
  logout: () => void
  getUser: () => IUser
}

interface IAction {
  type: string,
  payload: IUser,
}

interface IState {
  user: IUser,
}

interface IUserReducer {
  (state: IState, action: IAction): IState,
}

export const GlobalContext = createContext(
  initialState as IContext
)

interface IUserContext {
  user: IUser
  setUser: (user: IUser) => void
  logout: () => void
  getUser: () => IUser
}

interface IInitialUser {
  user: IUser
}

export const GlobalProvider = ({ children }: IProps) => {
  const [initialUser, setInitialUser] = useState<IInitialUser>(initialState as IInitialUser)

  const [loading, setLoading] = useState(true)

  const [state, dispatch] = useReducer(
    AppReducer as IUserReducer,
    initialUser
  )

  const setUser = (user: IUser) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    })

    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: initialState.user,
    })

    localStorage.removeItem("user")
  }

  const getUser = () => {
    return state.user
  }

  useEffect(() => {
    const user = localStorage.getItem("user")

    if (user) {
      setUser(JSON.parse(user))

      setInitialUser(JSON.parse(user))
    } else {
      setUser(initialState.user)

      setInitialUser(initialState)
    }

    setLoading(false)
  }, [])


  return (
    <GlobalContext.Provider value={{
      user: state.user,
      setUser,
      logout,
      getUser,
    }}>
      {
        loading ? (
          <></>
        ) : (
          children
        )
      }
    </GlobalContext.Provider>
  )
}