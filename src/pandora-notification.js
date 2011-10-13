var check = false;

function Delay() {
    _song = document.getElementsByClassName("playerBarSong")[0].textContent;
    _art = document.getElementsByClassName("playerBarArt")[0].getAttribute("src");
    _artist = document.getElementsByClassName("playerBarArtist")[0].textContent;
    _album = document.getElementsByClassName("playerBarAlbum")[0].textContent;

    chrome.extension.sendRequest({greeting: "song-change", art : _art, artist : _artist, album : _album, song : _song}, function(response) {
        console.log(response.farewell);
    });
}


function OnMutation () {

    //Prevent DOMSubtreeModified calling this twice due to text node insertion and removal

    if(check){
        setTimeout("Delay()", 2000);
        check = false;
    }else{
        check = true;
    }
}

function CheckForPlayerBar() {
       container = document.getElementsByClassName("playerBarSong")[0]
       if(container != null){
           clearInterval ( checkTimer );
           container.addEventListener ('DOMSubtreeModified', OnMutation, false);
           console.log("Successfully bound event listener");
       }else{
           console.log("Track info not found, checking again in 2 seconds");
       }
}

checkTimer = setInterval ( "CheckForPlayerBar()", 2000 );