/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useState } from "react"
import IUser from "../../src/interfaces/user"

type TokensType = {
  refreshToken: string
  accessToken: string
}

type UserInit = (user: NonNullable<IUser & TokensType>) => void
type UserClear = () => void
type UserHandlers =
  | {
      init: UserInit
      clear: UserClear
    }
  | undefined

type UserContextType = Readonly<
  [(IUser & TokensType) | undefined, UserHandlers]
>
const UserContext = createContext<UserContextType>([undefined, undefined])

const makeInitialUser = (): (IUser & TokensType) | undefined => {
  let userString
  if (typeof window !== "undefined") {
    userString = window.localStorage.getItem("user")
  }
  const user = userString
    ? (JSON.parse(userString) as IUser & TokensType)
    : undefined
  return user
}

const initializeLocalStorage = (user: NonNullable<IUser & TokensType>) => {
  const userString = JSON.stringify(user)
  if (typeof window !== "undefined") {
    window.localStorage.setItem("user", userString)
  }
}

const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("user")
  }
}

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<(IUser & TokensType) | undefined>(makeInitialUser)

  const init: UserInit = useCallback((auth) => {
    initializeLocalStorage(auth)
    setUser(auth)
  }, [])

  const clear: UserClear = useCallback(() => {
    clearLocalStorage()
    setUser(undefined)
  }, [])

  const contextValue: UserContextType = [
    user,
    {
      init,
      clear,
    },
  ]

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("Hook cannot be implemented outside of UserContext.")
  }
  return context
}

export { UserContext, useUser }
export default UserProvider
