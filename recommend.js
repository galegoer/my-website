const KEY = "AIzaSyBkBVdemI8E-QQzmawYCzJe3UpzM3GaoPc";
const CSEKEY = "003439005731228878859:1n8kqownxko";

const tags = [" imdb", " Season 1", " Official Audio", " Goodreads"];

//Can update these later, issue with reading local text files so I just put them here
var movies = ["Back to the Future","Split","Joker","Uncut Gems","Parasite","Hereditary","A Quiet Place","Eigth Grade","Good Will Hunting","Shutter Island"];
var tvshows = ["The 100", "Sons of Anarchy","Money Heist", "The Walking Dead","The Office","Modern Family","Fresh Prince of Belair","Black Summer","Dark","Stranger Things"];
var songs = ["Cage The Elephant - Black Madonna","Raleigh Ritchie - Squares","Carly Rae Jepsen - Emotion","BENEE - Afterlife","BROCKHAMPTON - SUGAR","Mac Miller - Blue World","REO Speedwagon - Don't Let Him Go","The Glorious Sons = Sawed Off Shotgun","Joji - Slow Dancing In The Dark","Nelly - Just A Dream"]; 
var books = ["The Shining","Harry Potter and the Sorcerers Stone","The Hunger Games","Pet Sematary","The Rule Of 3","Scythe","Divergent","The 5th Wave","The Limit - Kristen Landon","Eragon"];

const categories = {"movie": movies, "show": tvshows, "song": songs, "book": books};
var MEDIANUM = 0;

function provideImg(category, url, alt) {

    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        let imgLink = document.getElementById(category+"Link");
        let img = document.getElementById(category+"Img");
        img.alt = alt;
        if('error' in data) {
            errMsg = document.getElementById("errMsg");
            if( errMsg == null) {
                let errMsg = document.createElement('p');
                errMsg.id = "errMsg";
                errMsg.style.color = "red";
                errMsg.innerHTML = "Error: " + data.error.message;
                imgLink.parentNode.insertBefore(errMsg, section.nextSibling);
            } else {
                errMsg.innerHTML = "Error: " + data.error.message;
            }
            throw new Error(data.error.message);
        } else {
            img.src = data.items[0].link;
            imgLink.href = data.items[0].image.contextLink;
        }
        
    })
    .catch(e => {
        console.log(e);
    })
}

function changeRecommend(mediaNum) {
    var categoryNum = 0;
    Object.keys(categories).forEach((category) => {
        if(mediaNum >= categories[category].length) {
            mediaNum = 0;
            MEDIANUM = 0;
        }
        let mediaTitle = categories[category][mediaNum];
        KEYWORD = mediaTitle + tags[categoryNum];
        var alt = mediaTitle;
        var url = "https://www.googleapis.com/customsearch/v1?key="+KEY+"&cx="+CSEKEY+"&q="+KEYWORD+"&searchType=image&num=3";
        let title = document.getElementById(category+"Summary");
        title.innerHTML = mediaTitle;
        provideImg(category, url, alt);
        categoryNum++;
    });
}

function changeTime(deadline) {
    let timer = document.getElementById("timer");

    var x = setInterval(function() {
        let date = new Date();
        var timeLeft = deadline - date; 
        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); 
        var hours = Math.floor((timeLeft%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); 
        timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 
        if (timeLeft < 0) { 
            clearInterval(x); 
            timer.innerHTML = "Time to update";
            MEDIANUM++;
            changeRecommend(MEDIANUM);
            changeTime(deadline.setDate(deadline.getDate()+7));
        } 
    }, 1000); 
}

window.onload = function() {
    var deadline = new Date("august 3, 2020 12:00:00");
    changeRecommend(MEDIANUM);
    changeTime(deadline);
}