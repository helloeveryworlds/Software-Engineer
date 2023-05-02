const testFunctions = require('./testFunctions')

test("Sign In", ()=>{
  let payload = {
    username: "Chibu@bu.edu",
    password: "chibu123$"
  }
  expect(testFunctions.submitSignIn(payload.username, payload.password)).toBe(true)
});