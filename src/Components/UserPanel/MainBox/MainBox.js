import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../../userContext/authContext"

export default function IndexBox({ title, href }) {
const {setSubTitleInPUser} = useContext(AuthContext)
  return (
    <div className="col-4" onClick={()=>setSubTitleInPUser(title)}>
      <Link to={href} className="main__link" href="#">
        {title}
      </Link>
    </div>
  )
}
