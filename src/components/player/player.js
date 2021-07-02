const Player = () => {
  const systemPlayers = document.getElementsByClassName('system-player');
  const durations = document.getElementsByClassName('duration');
  const playBtns = document.getElementsByClassName('play-pause');
  const inputRanges = document.getElementsByClassName('range')

  //function for make time from seconds
  String.prototype.toMMSS = function () {
    let sec_num = parseInt(this, 10);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
  }

  function updateProgress(e) {
    const{duration, currentTime} = e.target;
    e.target.parentNode.querySelector('.range').value = (currentTime / duration * 100);
    e.target.parentNode.querySelector('.current-time').innerHTML = currentTime.toString().toMMSS();
  }

  function endSong(e) {
    const player = e.target;
    const button = player.parentNode.querySelector('.play-pause')
    player.currentTime = 0;
    button.classList.remove('play');
  }

  function setProgress(e) {
    let player = e.target.parentNode.querySelector('.system-player');
    player.currentTime = e.target.value /  100 * player.duration;
  }

  for(let i=0; i<systemPlayers.length; i++) {
    if(systemPlayers[i].readyState === 4) durations[i].innerHTML = systemPlayers[i].duration.toString().toMMSS();
    inputRanges[i].addEventListener('change', setProgress);
    systemPlayers[i].addEventListener('timeupdate', updateProgress)
    playBtns[i].addEventListener('click', evt => {
      const playButton = evt.target;
      const systemPlayer = playButton.parentNode.querySelector('.system-player');
      const range = evt.target.parentNode.querySelector('.range');

      systemPlayer.addEventListener('timeupdate', updateProgress)
      systemPlayer.addEventListener('ended', endSong)
      range.addEventListener('change', setProgress)

      function playIt() {
        for(let j=0; j<playBtns.length; j++) {
          playBtns[j].classList.remove('play');
          systemPlayers[j].pause();
        }
        playButton.classList.add('play');
        systemPlayer.play();
      }
      function pauseIt() {
        playButton.classList.remove('play');
        systemPlayer.pause();
      }
      let isPlaying = playButton.classList.contains('play');
      isPlaying ? pauseIt() : playIt();

    })
  }
};
export default Player;