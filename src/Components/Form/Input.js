import React, { useEffect, useReducer } from "react"
import validator from "../../validators/validator"


const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      }
    }
    default: {
      return state
    }
  }
}

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  })

  const { value, isValid } = mainInput
  const { id, onInputHandler,validations,type,placeholder,className, } = props

  useEffect(() => {
    onInputHandler(id, value, isValid)
  }, [value])

  const onChangeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validations,
      isValid: true,
    })
  }

  const element =
    props.element === "input" ? (
      <input
        type={type}
        placeholder={placeholder}
        className={`${className} ${
          isValid ? "border-success" : "border-danger"
        }`}
        value={value}
        onChange={onChangeHandler}
      />
    ) : (
      <textarea
        placeholder={placeholder}
        className={`${className} ${
         isValid ? "border-success" : "border-danger"
        }`}
        onChange={onChangeHandler}
        value={value}
      />
    )

  return <div className="inputParnet">{element}</div>
}
