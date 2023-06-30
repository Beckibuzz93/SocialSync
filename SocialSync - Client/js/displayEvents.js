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
        const minutes = date.getMinutes();

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
