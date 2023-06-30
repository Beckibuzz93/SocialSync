function postEvent() {

  const form = document.getElementById('create-event')
  const createBtn = document.getElementById('submit-event')
  const url = "https://socialsync-api.onrender.com/events"
  // const url = "http://localhost:3000/events"
  let token = localStorage.getItem('token')
  let origin = window.location.origin;

  createBtn.addEventListener('click', async function (event) {
    console.log('button woop')

      let eventName = document.getElementById('create-event-name').innerText
      let eventLocation = document.getElementById('create-event-location').value
      let eventAbout = document.getElementById('create-event-about').value
      let eventCategory = document.getElementById('create-event-category').value
      let eventDateTime = document.getElementById('create-event-datetime').value

      event.preventDefault();

      const newEvent = {
          event_name: eventName,
          about: eventAbout,
          place: eventLocation,
          category_name: eventCategory,
          event_date: eventDateTime,
          token: token
      };

      const options = {
          method: "POST",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify(newEvent)
      };

      const response = await fetch(url, options);
      if (response.status == 201) {
          alert("event added.");
          window.location.href = `${origin}/index.html`;
      }
  })

  if (!token) {
    console.log("no user");
    window.location.href = `${origin}/login.html`;
    // return;
  }
}
module.exports = {postEvent}
