import { useReducer } from "react"

const formReducer = (state, action) => {
  const { type, value, isValid, inputID } = action
  switch (type) {
    case "INPUT_CHANGE": {
      let isFormValid = true
      for (const stateInputId in state.inputs) {
        if (stateInputId === inputID) {
          isFormValid = isFormValid && isValid
        } else {
          isFormValid = isFormValid && state.inputs[stateInputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputID]: {
            value,
            isValid,
          },
        },
        isFormValid
      }
    }
    default: {
      return state
    }
  }
}

export const useForm = (initInputs, initFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isFormValid: initFormIsValid,
  })

  const onInputHandler = (id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      isValid,
      inputID: id,
    })
  }

  return [formState, onInputHandler]
}
