const testEmail = (value)=>{
    const emailPattern = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/g
      return emailPattern.test(value)
}

const testPhoneNumber = value=>{
    const phoneNumberPattern = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/g
    return phoneNumberPattern.test(value)
}

const testCodeMelli = (value)=>{
    const codeMelliPattern = /^[0-9]{10}$/g
    return codeMelliPattern.test(value)
}

const testPassword = (value)=>{
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g
    return passwordPattern.test(value)
}

export default{
    testEmail,
    testPhoneNumber,
    testCodeMelli,
    testPassword
}