// ==UserScript==
// @name         OTAM Helper
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  try to take over the world!
// @author       ogw.tttt@gmail.com
// @match        https://*.o-tam.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=o-tam.jp
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const userStyleEl = document.createElement('style');
  userStyleEl.appendChild(document.createTextNode(`
#captureButton {
  margin: 0 auto;
  width: 100%;
}
`));
  document.getElementsByTagName('head')[0].appendChild(userStyleEl);
  const v = document.querySelector('video'), marker = document.getElementById('controller');
  if (v === null || v.style.display === 'none' || marker === null) return;
  const capture = function() {
    const playButton = document.getElementById('play');
    const isPlaying = playButton.querySelector('.fa-pause') !== null;
    if (isPlaying) {
      playButton.click(); // pause
    }
    const c = document.createElement('canvas'), a = document.createElement('a'), i = new Image();
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
    i.src = c.toDataURL('image/jpeg');
    if (i.src === 'data:,') return;
    const title = decodeURIComponent(location.search.split('title=')[1].split('&')[0]);
    const tc = document.querySelector('.irs-single').innerText;
    a.download = `${title}_${tc}.jpeg`;
    a.target = '_blank';
    a.href = i.src;
    a.click();
  }
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('input-group');
  buttonContainer.classList.add('mt-2');
  const captureButton = document.createElement('button');
  captureButton.id = 'captureButton';
  captureButton.innerText = 'スクショ';
  captureButton.classList.add('btn');
  captureButton.classList.add('btn-dark');
  captureButton.addEventListener('click', capture);
  buttonContainer.appendChild(captureButton);
  marker.appendChild(buttonContainer);
})();
