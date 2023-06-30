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
