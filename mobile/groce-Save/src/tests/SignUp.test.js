const testFunctions = require('./testFunctions')

test("Sign Up", ()=>{
  let payload = {
    username: "Chibu@bu.edu",
    password: "chibu123$",
    zipcode: "02115",
    address: "Boston University",
    name: "Chibundom"
  }
  expect(testFunctions.submitSignUp(payload.username, payload.password, payload.zipcode, payload.address, payload.name)).toBe(true)
});