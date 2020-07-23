const KEY = "AIzaSyBkBVdemI8E-QQzmawYCzJe3UpzM3GaoPc";

function provideVid(vidNum, counter, url, changeVideo) {

    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        // console.log(data);
        if('error' in data) {
            errMsg = document.getElementById("errMsg");
            if( errMsg == null) {
                let randButton = document.getElementById('randomizeVid');
                let errMsg = document.createElement('p');
                errMsg.id = "errMsg";
                errMsg.style.color = "red";
                errMsg.innerHTML = "Error: " + data.error.message;
                randButton.parentNode.insertBefore(errMsg, randButton.nextSibling);
            } else {
                errMsg.innerHTML = "Error: " + data.error.message;
            }
            throw new Error(data.error.message);
        }
        if(vidNum == -1) {
            //not randomized yet
            vidNum = Math.floor(Math.random() * data.pageInfo.totalResults);
        }
        resultsPerPage = data.pageInfo.resultsPerPage;
        for(var vid=0; vid < resultsPerPage; vid++) {
            if(counter == vidNum) {
                var vidId = data.items[vid]["contentDetails"]["videoId"];
                console.log(vidId);
                return changeVideo(vidId);
            }
            counter++;
        }       
        nextToken = data.nextPageToken;
        url = "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PLArQ6Xij15ikMnefk5BL5PwdTLfqmtMNz&pageToken="+nextToken+"&maxResults=50&key="+KEY;
        return provideVid(vidNum, counter, url, changeVideo); 
    })
    .catch(e => {
        console.log(e);
    })
} 

function changeVideo(vidId) {
    // const vidId = provideVid(-1, 0, url);
    // let vidId = provideVid(-1, 0, url);
    console.log('VIDID : '+ vidId);
    let vidFrame = document.getElementById('videoFrame');
    vidFrame.src = "https://www.youtube.com/embed/"+vidId;
}

window.onload = function() {
    var url="https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PLArQ6Xij15ikMnefk5BL5PwdTLfqmtMNz&maxResults=50&key="+KEY;
    document.getElementById('randomizeVid').onclick = function() {
        provideVid(-1, 0, url, function(vidId) {
            changeVideo(vidId);
        });
    }
}