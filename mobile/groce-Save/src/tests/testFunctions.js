//To run tests: npm run test..

let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
let passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
let zipCodeRegEx = /^[0-9]+$/

const testFunctions = {
    submitSignIn: (username, password) => emailRegEx.test(username) && passwordRegEx.test(password),
    submitSignUp: (username, password, zipCode, address, name) => emailRegEx.test(username) && passwordRegEx.test(password) && zipCodeRegEx.test(zipCode) && name != "" && address != ""
}

module.exports = testFunctions;