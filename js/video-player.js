$(document).ready(function(){

	init();

	initStorage();

});


/**
 * Player initialization, include set the handlers of vedio and dom to variable
 * Add the required events for video
 * 1. timeupdate --> using for update progress bar
 * 2. play --> using for update the icon of button
 * 3. pause --> sing for update the icon of button
 * 4. volumechange --> change the volume of PC or device
 * 5. ended --> call the pause function
 */
function init() {

	// Get the handler for variable
	videoPlayer = document.getElementById('video-player');
    btn_play_pause = document.getElementById('btn_play_pause');
    icon_paly_pause = document.getElementById('icon_paly_pause');
    btn_mute = document.getElementById('btn_mute');
    icon_mute = document.getElementById('icon_mute');
	progressBar = document.getElementById('progress_bar');
	
	// video setting
	videoPlayer.controls = false;

	videoPlayer.addEventListener('timeupdate', updateProgressBar, false);	

	videoPlayer.addEventListener('play', function() {
		changeButtonIcon(icon_paly_pause, 'fa-play-circle', 'fa-pause-circle');
	}, false);

	videoPlayer.addEventListener('pause', function() {
		changeButtonIcon(icon_paly_pause, 'fa-pause-circle', 'fa-play-circle');
	}, false);

	videoPlayer.addEventListener('volumechange', function(e) { 
		if (videoPlayer.muted) changeButtonIcon(icon_mute, 'fa-volume-up', 'fa-volume-mute');
		else changeButtonIcon(icon_mute, 'fa-volume-mute', 'fa-volume-up');
	}, false);	

	videoPlayer.addEventListener('ended', function() { this.pause(); }, false);
	
}


/**
 * Initial web storage
 */
function initStorage() {

	like = document.getElementById('video_like');
	unlike = document.getElementById('video_unlike');
	volume = document.getElementById('video_volume');
	
	if ((localStorage.getItem('like') == undefined) && localStorage.getItem('unlike') == undefined){
		localStorage.setItem('like', 0);
		localStorage.setItem('unlike', 0)
		like.innerText = localStorage.getItem('like');
		unlike.innerText = localStorage.getItem('unlike');
	}else{
		like.innerText = localStorage.getItem('like');
		unlike.innerText = localStorage.getItem('unlike');
	}

	volume.innerText = videoPlayer.volume*10;

}


/**
 * Player switch and change the icon follow the status
 */
function togglePlayPause() {
	
	if (videoPlayer.paused || videoPlayer.ended) {
		changeButtonIcon(icon_paly_pause, 'fa-play-circle', 'fa-pause-circle');
		videoPlayer.play();

	}else {
		changeButtonIcon(icon_paly_pause, 'fa-pause-circle', 'fa-play-circle');
		videoPlayer.pause();

	}

}


/**
 *  Stop the current media from playing, and return it to the start position
 */
function stopPlayer() {

	videoPlayer.pause();
	videoPlayer.currentTime = 0;

}


/**
 * Changes the volume on the media player
 * @param {*} direction '+' or '-'
 */
function changeVolume(direction) {
	if (direction === '+') videoPlayer.volume += videoPlayer.volume == 1 ? 0 : 0.1;
	else videoPlayer.volume -= (videoPlayer.volume == 0 ? 0 : 0.1);
	videoPlayer.volume = parseFloat(videoPlayer.volume).toFixed(1);
	volume.innerText = videoPlayer.volume*10;

}


/**
 * Mute switch
 */
function toggleMute() {

	if (videoPlayer.muted) {
		changeButtonIcon(icon_mute, 'fa-volume-up', 'fa-volume-mute');
		videoPlayer.muted = false;
	} else {
		changeButtonIcon(icon_mute, 'fa-volume-mute', 'fa-volume-up');
		videoPlayer.muted = true;

	}

}


/**
 * Replays the movie
 */
function replayMedia() {

	resetPlayer();
	videoPlayer.play();

}


/**
 * Update the progress bar
 */
function updateProgressBar() {

	var percentage = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
    progressBar.setAttribute("style", "width: "+percentage + "%;");
    progressBar.setAttribute("aria-valuenow", percentage);
	progressBar.innerHTML = percentage + '% played';

}


// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonIcon(btnIcon, oldIcon, newIcon) {
    btnIcon.classList.remove(oldIcon);
    btnIcon.classList.add(newIcon);
}


// Loads a video item into the vedio player
function loadVideo() {
	for (var i = 0; i < arguments.length; i++) {
		var file = arguments[i].split('.');
        var ext = file[file.length - 1];
		// Check if this media can be played
		if (canPlayVideo(ext)) {  
			// Reset the player, change the source file and load it
			resetPlayer();
			videoPlayer.src = arguments[i];
            videoPlayer.load();
            changeButtonIcon(icon_paly_pause, 'fa-pause-circle', 'fa-play-circle');
			break;
		}
	}

	// change the video resource, the progress status can not change into 0 or null!
	progressBar.innerHTML = null;
}


// Checks if the browser can play this particular type of file or not
function canPlayVideo(ext) {
	var ableToPlay = videoPlayer.canPlayType('video/' + ext);
	return (ableToPlay == '') ? false : true;
}


/**
 * Resets the media player
 * Reset the time and progress status
 */
function resetPlayer() {

	progressBar.value = 0;
	videoPlayer.currentTime = 0;
	changeButtonIcon(icon_paly_pause, 'fa-play-circle', 'fa-pause-circle');
	
}


/**
 * Like video
 */
function likeVideo() {

	var c_number = localStorage.getItem('like');
	localStorage.setItem('like', parseInt(c_number)+1);
	like.innerText = localStorage.getItem('like');

}


/**
 * Unlike currently video
 */
function unlikeVideo() {
	var c_number = localStorage.getItem('unlike');
	localStorage.setItem('unlike', parseInt(c_number)+1)
	unlike.innerText = localStorage.getItem('unlike');

}