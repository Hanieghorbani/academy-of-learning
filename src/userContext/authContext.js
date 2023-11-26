import { createContext } from "react"

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userInfos: {},
  login: () => {},
  logout: () => {},
})

export default AuthContext
