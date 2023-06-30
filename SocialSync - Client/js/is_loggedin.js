const loggedin = () => {
  const authenticated = localStorage.getItem("authenticated")
  const loginDiv =  document.getElementById("login")

  if (authenticated) {
    // const username = localStorage.getItem("username")
    // const alreadyLoggedIn = document.createElement("p")
    // alreadyLoggedIn.innerText = "you are logged in"
    // loginDiv.append(alreadyLoggedIn)
    logout(loginDiv)
  } else {
    const loginLink = document.createElement("a")
    loginLink.setAttribute('href', "../login.html")
    loginLink.innerText = "Login"
    loginDiv.append(loginLink)
  }

}

const logout = (loginDiv) => {

  const logoutLink = document.createElement('a')
  logoutLink.innerText = "Logout"
  logoutLink.setAttribute('id', 'logoutLink')
  logoutLink.addEventListener("click", function() {
    localStorage.clear()
    location.reload()
  })
  loginDiv.append(logoutLink)
}

module.exports = loggedin
