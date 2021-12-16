import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe, {
  id: 19231868,
  width: 1200,
});

const timeNeed = localStorage.getItem('time');
if (timeNeed) {
  onLoadTime();
}
player.on('timeupdate', throttle(timeTrottle, 1000));

function timeTrottle() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      // seconds = the current playback position
      const timeJson = JSON.stringify(seconds);
      console.log(timeJson);
      localStorage.setItem('time', timeJson);
    })
    .catch(function (error) {
      console.log('Error currentTime function');
    });
}

function onLoadTime() {
  console.log(JSON.parse(timeNeed));
  player.setCurrentTime(JSON.parse(timeNeed));
}
