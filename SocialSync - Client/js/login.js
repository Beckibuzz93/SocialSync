const formdata = document.getElementById("login-form")

formdata.addEventListener("submit", async (e) => {
  e.preventDefault()

  const form = new FormData(e.target)

  const options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: form.get("username"),
      password: form.get("password")
    })
  }
  const response = await fetch("https://socialsync-api.onrender.com/users/login", options)
  // const response = await fetch("http://localhost:3000/users/login", options)
  const data = await response.json()

  if (response.status == 200) {
    localStorage.setItem("token", data.token)
    localStorage.setItem("authenticated", data.authenticated)

    if (document.referrer.includes('events.html')) {
      window.location.href = 'events.html';
    } else {
      window.location.assign('index.html')
    }
  } else {
    alert(data.error)
  }
})
