import React, { useCallback, useEffect, useState } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"
import AuthContext from "./userContext/authContext"
import "./App.css"

export default function App() {
  const router = useRoutes(routes)
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const login = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem("user", JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  })

  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    if (localStorageToken) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Brearer ${localStorageToken.token}`,
        },
      })
        .then((res) => res.json())
        .then((userDatas) => {
          setIsLoggedIn(true)
          setUserInfos(userDatas)
        })
    }
  }, [token])
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  )
}
