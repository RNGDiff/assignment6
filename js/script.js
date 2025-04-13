


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
        delBtn.textContent = '❌';

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


const ApiNews = '2LDOGS28CCUJNLWF';

function grabData(){
    fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=${ApiNews}`)
    .then(response => response.json())
    .then(data => getNews(data))
    .catch(error=> console.error('Error', error));
}

function getNews(data){
    console.log(data);
    const title = document.querySelector('.title-url');
    title.textContent = data.feed[0].title;
    const url = document.querySelector('.url');
    url.href = data.feed[0].url;
    const summary = document.querySelector('.summary');
    summary.textContent = data.feed[0].summary;
    const time = document.querySelector('.time-published');
    time.textContent = data.feed[0].time_published;
    const author = document.querySelector('.author');
    author.textContent = data.feed[0].authors;
}
