var currentArtSRC;
var polledArtSRC;

function Request(artSRC) {
	
    _song = document.getElementsByClassName("playerBarSong")[0].textContent;
    _artist = document.getElementsByClassName("playerBarArtist")[0].textContent;
    _album = document.getElementsByClassName("playerBarAlbum")[0].textContent;

    chrome.extension.sendRequest({greeting: "song-change", art : artSRC, artist : _artist, album : _album, song : _song}, function(response) {
        console.log("Pandora Notifications - " + response.farewell);
    });
}

function CheckForChange() {
	var polledArt = document.getElementsByClassName("playerBarArt")[0]; // assumes only 1 element of that class on the page
		
	if(polledArt != null){
		var polledArtSRC = polledArt.getAttribute("src"); 
		if(polledArtSRC != currentArtSRC){
			console.log("Pandora Notifications - Song Change");
			currentArtSRC = polledArtSRC;
			Request(polledArtSRC);
		}
	}	
}

checkTimer = setInterval ( "CheckForChange()", 2000 );