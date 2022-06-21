/* eslint-disable indent */
import IUser from "../components/layout/interfaces/IUser"

interface IAction {
  type: string,
  payload: IUser,
}

interface IState {
  user: IUser,
}

export const AppReducer = (state: IState, action: IAction) => {
  const { type, payload } = action

  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload,
      }

    case "GET_USER":
      return {
        ...state,
      }

    case "LOGOUT":
      return {
        ...state,
        user: {
          id: "",
          name: "",
          lastName: "",
          email: "",
          description: "",
          avatar: "",
          cover: "",
          token: "",
          createdAt: "",
          updatedAt: "",
        },
      }

    default: 
      return state
    }
}