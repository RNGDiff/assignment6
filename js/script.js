


setInterval(()=>{
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    const date = now.getDate();
    const month = now.getMonth() + 1; 
    const year = now.getFullYear();

    const time = document.querySelector('.time');
    time.innerText = `${hours}:${minutes}:${seconds}`
    
    const dateToday = document.querySelector('.date');
    dateToday.innerText = `${year}-${month}-${date}`;
    console.log(dateToday.innerText);

},1000);

let links = [];


function createLink(){
    const name = prompt('Namnge din länk. Ex: Google');
    const url = prompt('URL till länken. Ex: Google.com');
    links.push({name, url});
    saveLinks();
    displayLinks();
}
function displayLinks(){
    const grabContainer = document.querySelector('.quick-links'); 
    grabContainer.innerHTML = '';
    links.forEach((link, index) => {
        const httpLink = 'https://www.';
        const favicon = '/favicon.ico';
        const createContainer = document.createElement('div');
        const createImg = document.createElement('img');
        const createLink = document.createElement('a');
        const delBtn = document.createElement('button');

        createImg.classList.add('icon');
        createContainer.classList.add('links');
        delBtn.classList.add(`del-link`);
        delBtn.classList.add(`del-link${index}`);

        createImg.src = `${httpLink}${link.url}${favicon}`;
        createLink.href = `${httpLink}${link.url}`;
        createLink.textContent = `${link.name}`;
        delBtn.textContent = '✖️';

        delBtn.addEventListener('click', ()=>{
            links.splice(index, 1);
            saveLinks();
            displayLinks();
        })

        grabContainer.appendChild(createContainer);
        createContainer.appendChild(createImg);
        createContainer.appendChild(createLink);
        createContainer.appendChild(delBtn)

    
    });
}

function saveLinks(){
    localStorage.setItem('links', JSON.stringify(links));
}
function displaySavedLinks(){
    let savedLinks = localStorage.getItem('links');
    links = JSON.parse(savedLinks);
    displayLinks();
}
displaySavedLinks();


const ApiKey = '8d4419ede8abd86d582d11b4d50c2762';
const units = 'metric';
const lang = 'sv';

navigator.geolocation.getCurrentPosition(position =>{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=${units}&lang=${lang}`)
    .then(response => response.json())
    .then(data => runData(data))
    .catch(error=> console.error('Error', error));

})

const c = '°C'

function runData(data){
    console.log(data);
    
    const city = document.querySelector('.city');
    city.textContent = data.name
    const temp = document.querySelector('.temperature');
    temp.textContent = `${data.main.temp}${c}`
    const weather = document.querySelector('.weather');
    weather.textContent = data.weather[0].description

}

// ^ NEWS SECTION // ^ NEWS SECTION


function grabData(){
    fetch(`https://api.mediastack.com/v1/news?access_key=7a1f01e3b78823fdafd6055489304000&limit=3`)
    .then(response => response.json())
    .then(data => getNews(data.data))
    .catch(error=> console.error('Error', error));
}

const newsContainer = document.querySelector('.news-container');

const clickNews = document.querySelector('.get-news-btn').addEventListener('click', () =>{grabData()})

function getNews(data){

    data.forEach(news => {
        const title = news.title;
        const url = news.url;
        const source = news.source;

        const container = document.createElement('div');
        container.classList.add('news-content');

        container.innerHTML = `
            <h3><a href='${url}'>${title}</a></h3>
            <p class='source'>
                Source: ${source}
            </p>
        `;

        newsContainer.appendChild(container);
    });
}


// !NOTES SECTION // !NOTES SECTION

const createNote = document.querySelector('.create-note');
const done = document.querySelector('.done-btn');
const textArea = document.querySelector('.text-area');
const notesContent = document.querySelector('.notes-content')

let textNotes = [];

// * REVEAL <TEXTAREA> AND DONE BTN
createNote.addEventListener('click', ()=>{
    done.style.display = 'block';
    textArea.style.display = 'block';
    textArea.value = '';
    hideNotes()
})
// !HIDE NOTES
function hideNotes(){
    const notes = document.querySelectorAll('.text-container');
    notes.forEach(note =>{
        note.style.display = 'none';
    })
}
// ~ HIDE TEXTAREA AND DONE BTN, TAKE OUR VALUE FROM TEXTAREA & PUSH IT TO ARRAY.
done.addEventListener('click', ()=>{
    done.style.display = 'none';
    textArea.style.display = 'none';
    textNotes.push({ text: textArea.value });
    saveNotes();
})
// ! SAVE OUR TEXT VALUE FROM OUR ARRAY IN LOCALSTORAGE.
function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(textNotes));
    displayNotes()
}
// ^ DISPLAY OUR TEXT VALUE FROM LOCALSTORAGE.
function displayNotes(){
    notesContent.innerHTML = '';
    textNotes.forEach((note,index) => {
        const notes = document.createElement('div');
        const text = document.createElement('p');
        const delBtn = document.createElement('button');
        delBtn.classList.add('del-note');
        delBtn.innerText = '✖️';
        delBtn.addEventListener('click',()=>{
            textNotes.splice(index, 1);
            saveNotes();
            displayNotes();
        })
        notes.classList.add('text-container');
        text.classList.add('text');
        text.innerText = note.text;
        
        notesContent.appendChild(notes);
        notes.appendChild(text);
        notes.appendChild(delBtn);
    });
}

window.onload = ()=>{
    const storage = localStorage.getItem('notes');
    textNotes = JSON.parse(storage);
    if (!textNotes){
        textNotes = [];
    }
    displayNotes();
}