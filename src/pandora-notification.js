var currentArtSRC;
var polledArtSRC;
var pollInterval = 1000;
var i;

function Request(artSRC) {
	
    _song = document.getElementsByClassName("playerBarSong")[0].textContent;

    if(_song != "ad" && _song != "audioad"){

	    _artist = document.getElementsByClassName("playerBarArtist")[0].textContent;
	    _album = document.getElementsByClassName("playerBarAlbum")[0].textContent;
		classList = document.getElementsByClassName("thumbUpButton")[0].classList;
		_thumb = false;

		for(i=0; i < classList.length; i++ ){
			if(classList[i] === 'indicator'){
				_thumb = true;
			}
		}

	    chrome.extension.sendRequest({greeting: "song-change", art : artSRC, artist : _artist, album : _album, song : _song, thumb : _thumb}, function(response) {
	        console.log("Pandora Notifications - " + response.farewell);
	        pollInterval = (response.pollInterval * 1000);
	    });
	}
}

function CheckForChange() {

	var polledArt = document.getElementsByClassName("playerBarArt")[0]; // assumes only 1 element of that class on the page
			
		if(polledArt != null){
			var polledArtSRC = polledArt.getAttribute("src");

			if(polledArtSRC.charAt(0) === '/'){
					polledArtSRC = "http://www.pandora.com" + polledArtSRC; //handle images with local paths
			}
			if(polledArtSRC != currentArtSRC){
					console.log("Pandora Notifications - Song Change");			
					currentArtSRC = polledArtSRC;
					Request(polledArtSRC);
			}
		}
}
setInterval("CheckForChange()", pollInterval);