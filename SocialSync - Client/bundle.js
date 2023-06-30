(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//Get the data from back end

async function displayEvents() {
  let url = "https://socialsync-api.onrender.com/events"
  // let url = 'http://localhost:3000/events/'
  let events = []
  let response = []

  const searchBtn = document.querySelector('#search-btn')

  searchBtn.addEventListener('click', async function () {
    return search()
  })

    response = await fetch(url);
    events = await response.json();
    let card = document.querySelector('.allEvents');

    let fullUsers = events.map(function(event) {
        const name = event.event_name;
        const place = event.place;
        const about = event.about;
        const username = event.creator;
        const timeDate = event.even_date; //Typo in server side
        const id = event.id;

        return [name, place, about, username, timeDate, id]
    })


    fullUsers.forEach(user => {
        let names = user[0];
        let places = user[1];
        let about = user[2];
        let username = user[3];
        let timeDate = user[4];
        let event_id = user[5]

        //Getting the date
        const date = new Date(timeDate)
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let monthName = month[date.getMonth()]
        let dayName = day[date.getDay()]
        let dateName = date.getDate().toString();

        //Getting the date
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();

        let createSelect = document.createElement('section');
        createSelect.classList = 'event-container';

        let createDivEvent = document.createElement('div');
        createDivEvent.classList = 'event';

        let createEventSelect = document.createElement('section');
        createEventSelect.classList = 'event-info-container';

        let createName = document.createElement('h6');
        createName.innerText = names;

        let createPlace = document.createElement('h6');
        createPlace.innerText = places;

        let createDate = document.createElement('h6');
        createDate.innerText = `When: ${dateName}th ${dayName} ${monthName}`;

        let createTime = document.createElement('h6');
        createTime.innerText = `Time: ${hours}:${minutes}`;

        card.appendChild(createSelect)
        createSelect.appendChild(createDivEvent)
        createDivEvent.appendChild(createEventSelect)
        createEventSelect.append(createName, createPlace, createDate, createTime)

        let aboutSection = document.createElement('section');
        aboutSection.classList = 'about-event';

        let createAbout = document.createElement('p');
        createAbout.classList = 'about-section';
        createAbout.innerText = about;
        let createUsername = document.createElement('p');
        createUsername.classList = 'posted-by';
        createUsername.innerText = `Posted by: ${username}`;

        const eventButton = document.createElement('button');
        eventButton.classList.add('btn', 'btn-primary', 'socialBtn', 'button-style');
        eventButton.textContent = 'Select Event';

        eventButton.addEventListener('click', () => {
            const selectedEventParams = new URLSearchParams();
            selectedEventParams.append('name', names);
            selectedEventParams.append('about', about);
            selectedEventParams.append('date', timeDate);
            selectedEventParams.append('place', places);
            selectedEventParams.append('event_id', event_id);

            const showEventURL = `showEvent.html?${selectedEventParams.toString()}`;
            sessionStorage.setItem('selectedEvent', JSON.stringify(user));
            window.location.href = showEventURL;
        });

        let btnUsernameSection = document.createElement('section');
        btnUsernameSection.classList = 'btnUsername';

        createDivEvent.appendChild(aboutSection)
        aboutSection.appendChild(createAbout)

        createDivEvent.appendChild(btnUsernameSection)
        btnUsernameSection.appendChild(eventButton)
        btnUsernameSection.appendChild(createUsername)


    })
  /*
    //PAGINATION
    const pagination = document.querySelector('.pagination-ul');
    let id = document.querySelectorAll('.id');
    let paginationLimit = 3;
    let currentPageNum = 0;
    let currPage = 0;

    //Pages needed
    let pageCounter = Math.round(fullUsers.length / paginationLimit)


    for(let i = 0; i < pageCounter; i++)
    {
        //Making the pagination links
        let currentPage = currentPageNum++
        //console.log(currentPage)
       let paginationLi = document.createElement('li');
       let paginationLink = document.createElement('a');
       const node = document.createTextNode(currentPage);
       paginationLink.appendChild(node);
       pagination.appendChild(paginationLi)
       paginationLi.appendChild(paginationLink);

    }

    for(let j = 0; j < id.length ; j++) {
    //Current active page
    let currPages = currPage++
       const prevRange = (currPages -1) * paginationLimit;
       const currRange = currPages + paginationLimit;
       console.log(prevRange, currRange)

       //console.log(currPages)
       //console.log(card.children[i])
        //console.log(currentPageNum)
       console.log(id[j].innerHTML)
       if(id[j].innerHTML >= prevRange && id[j].innerHTML < currRange)
       {
        card.children[j].classList.remove('hidden');
       } else {
        card.children[j].classList.add('hidden');
       }
    }

console.log(card)*/
}

const search = async (catQuery) => {
  let url = "https://socialsync-api.onrender.com/events"
  // let url = 'http://localhost:3000/events/'
  let events = []
  let response
  let query
  const searchBar = document.querySelector('#search-bar')
  if (!catQuery) {
    query = searchBar.value
  } else {
    query = catQuery
  }
  if (!query) {
    response = await fetch(url);
    events = await response.json();
  } else {
    url = `https://socialsync-api.onrender.com/events/search/${query}`
    // url = `http://localhost:3000/events/search/${query}`;
    response = await fetch(url);
    if (response.status === 404) {
      alert('entry not found')
    }
    if (response.status === 200) {
      events = await response.json();
    }
  }

  let card = document.querySelector('.allEvents');
  card.innerHTML = ""

  let fullUsers = events.map(function(event) {
      const name = event.event_name;
      const place = event.place;
      const about = event.about;
      const username = event.creator;
      const timeDate = event.even_date; //Typo in server side
      const id = event.id;

      return [name, place, about, username, timeDate, id]
  })


  fullUsers.forEach(user => {
      let names = user[0];
      let places = user[1];
      let about = user[2];
      let username = user[3];
      let timeDate = user[4];
      let event_id = user[5]

      //Getting the date
      const date = new Date(timeDate)
      const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      let monthName = month[date.getMonth()]
      let dayName = day[date.getDay()]
      let dateName = date.getDate().toString();

      //Getting the date
      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();

      let createSelect = document.createElement('section');
      createSelect.classList = 'event-container';

      let createDivEvent = document.createElement('div');
      createDivEvent.classList = 'event';

      let createEventSelect = document.createElement('section');
      createEventSelect.classList = 'event-info-container';

      let createName = document.createElement('h6');
      createName.innerText = names;

      let createPlace = document.createElement('h6');
      createPlace.innerText = places;

      let createDate = document.createElement('h6');
      createDate.innerText = `When: ${dateName}th ${dayName} ${monthName}`;

      let createTime = document.createElement('h6');
      createTime.innerText = `Time: ${hours}:${minutes}`;

      card.appendChild(createSelect)
      createSelect.appendChild(createDivEvent)
      createDivEvent.appendChild(createEventSelect)
      createEventSelect.append(createName, createPlace, createDate, createTime)

      let aboutSection = document.createElement('section');
      aboutSection.classList = 'about-event';

      let createAbout = document.createElement('p');
      createAbout.classList = 'about-section';
      createAbout.innerText = about;
      let createUsername = document.createElement('p');
      createUsername.classList = 'posted-by';
      createUsername.innerText = `Posted by: ${username}`;

      const eventButton = document.createElement('button');
      eventButton.classList.add('btn', 'btn-primary', 'socialBtn', 'button-style');
      eventButton.textContent = 'Select Event';

      eventButton.addEventListener('click', () => {
          const selectedEventParams = new URLSearchParams();
          selectedEventParams.append('name', names);
          selectedEventParams.append('about', about);
          selectedEventParams.append('date', timeDate);
          selectedEventParams.append('place', places);
          selectedEventParams.append('event_id', event_id)

          const showEventURL = `showEvent.html?${selectedEventParams.toString()}`;
          sessionStorage.setItem('selectedEvent', JSON.stringify(user));
          window.location.href = showEventURL;
      });

      let btnUsernameSection = document.createElement('section');
      btnUsernameSection.classList = 'btnUsername';

      createDivEvent.appendChild(aboutSection)
      aboutSection.appendChild(createAbout)
      createDivEvent.appendChild(btnUsernameSection)
      btnUsernameSection.appendChild(eventButton)
      btnUsernameSection.appendChild(createUsername)
  })
}

const cateNode = document.querySelectorAll('.cat-search')
const catArray = Array.from(cateNode)


catArray.map(c => c.addEventListener('click', async function () {
  const catQuery = c.outerText
  search(catQuery)
}))

module.exports = { displayEvents };

},{}],2:[function(require,module,exports){
const {displayEvents} = require('./displayEvents');
const {showEvent} = require('./showEvent');
const loggedin = require('./is_loggedin');
const {postEvent} = require('./postEvent');

displayEvents();
loggedin();
showEvent();
postEvent();

},{"./displayEvents":1,"./is_loggedin":3,"./postEvent":4,"./showEvent":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
//Get the data from back end

async function showEvent() {
    console.log(window.location.search, 'location')
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event_id')
    console.log(eventId,'location')
    const url = `https://socialsync-api.onrender.com/events/${eventId}`;

    const response = await fetch(url);
    const events = await response.json();
    let selectingCard = document.querySelector('.oneEvent');

    let fullUsers = {
        name: events.event_name,
        place: events.place,
        about: events.about,
        username: events.creator,
        timeDate: events.even_date, //Typo in server side
        id: events.id
    }

        //Getting the date
        const date = new Date(fullUsers.timeDate)
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let monthName = month[date.getMonth()]
        let dayName = day[date.getDay()]
        let dateName = date.getDate().toString();

        //Getting the date
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();

        let showSelected = document.createElement('section');
        showSelected.classList = 'event-container';

        let showDiv = document.createElement('div');
        showDiv.classList = 'event';

        let showEventSelected = document.createElement('section');
        showEventSelected.classList = 'event-info-container';

        let name = document.createElement('h6');
        name.innerText = fullUsers.name;

        let place = document.createElement('h6');
        place.innerText = fullUsers.place

        let dates = document.createElement('h6');
        dates.innerText = `When: ${dateName}th ${dayName} ${monthName}`;

        let time = document.createElement('h6');
        time.innerText = `Time: ${hours}:${minutes}`;

        selectingCard.appendChild(showSelected)
        showSelected.appendChild(showDiv)
        showDiv.appendChild(showEventSelected)
        showEventSelected.append(name, place, dates, time)


        let section = document.createElement('section');
        section.classList = 'about-event';

        let about = document.createElement('p');
        about.classList = 'about-section';
        about.innerText = fullUsers.about;
        let username = document.createElement('p');
        username.classList = 'posted-by';
        username.innerText = fullUsers.username

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'socialBtn', 'button-style');
        button.textContent = 'Back';

        button.addEventListener('click', () => {
            history.back()
        })

        let btnusername = document.createElement('section');
        btnusername.classList = 'btnUsername';


        showDiv.appendChild(section)
        section.appendChild(about)
        showDiv.appendChild(btnusername)
        btnusername.appendChild(button)
        btnusername.appendChild(username) 

}
module.exports = { showEvent }

},{}]},{},[2]);
