class WorkSpace extends HTMLElement {
  constructor() {
    super();

    let svgns = 'http://www.w3.org/2000/svg';

    window.inFullScreenMode = false;

    let shadow = this.attachShadow({mode: 'open'});

    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-song');

    let hat = document.createElement('div');
    hat.classList.add('hat');

    let songTitle = document.createElement('div');
    songTitle.classList.add('song-title');

    let artist = document.createElement('span');
    artist.innerHTML = `<b>${this.getAttribute('artist')}</b>`;

    let delimiterSong = document.createElement('span');
    delimiterSong.innerHTML = `&nbsp;‒&nbsp;`;

    let title = document.createElement('span');
    title.innerHTML = `<b>${this.getAttribute('song-title')}</b>`;

    let delimiterBy = document.createElement('span');
    delimiterBy.innerHTML = `&nbsp;by&nbsp;`;

    let user = document.createElement('span');
    let userName = this.getAttribute('name');
    let userTag = this.getAttribute('tag');
    if (userTag && userTag.length > 0) {
      userTag = `(<strong>${userTag}</strong>)`;
    } else {
      userTag = "";
    }
    user.innerHTML = `<strong>${userName}</strong>&nbsp;${userTag}`;

    songTitle.appendChild(artist);
    songTitle.appendChild(delimiterSong);
    songTitle.appendChild(title);
    songTitle.appendChild(delimiterBy);
    songTitle.appendChild(user);

    let helpBtn = document.createElement('div');
    helpBtn.classList.add('help-btn');

    let helpImg = document.createElementNS(svgns, 'svg');
    helpImg.setAttributeNS(null, 'width', "30");
    helpImg.setAttributeNS(null, 'height', "30");
    helpImg.setAttributeNS(null, 'viewBox', "0 0 30 30");

    let hText = document.createElementNS(svgns, 'text');
    hText.setAttributeNS(null, 'id', "helpTxt");
    hText.setAttributeNS(null, 'x', "10");
    hText.setAttributeNS(null, 'y', "25");

    let hTspan = document.createElementNS(svgns, 'tspan');
    hTspan.setAttributeNS(null, 'id', "helpSpan");
    hTspan.setAttributeNS(null, 'font-size', "25px");
    hTspan.setAttributeNS(null, 'stroke', "rgb(255, 255, 255)");
    hTspan.setAttributeNS(null, 'stroke-opacity', ".3");
    hTspan.setAttributeNS(null, 'stroke-width', "2.5");
    hTspan.setAttributeNS(null, 'fill-opacity', "0");

    hTspan.innerHTML = "?";

    hText.appendChild(hTspan);
    helpImg.appendChild(hText);

    helpBtn.addEventListener('mouseover', (e) => {
      let target = e.target.closest('.help-btn');
      if (!target) return;

      if (e.relatedTarget !== null) {
        let relatedTarget = e.relatedTarget.closest('.help-btn');

        if (relatedTarget !== null) return;
      }

      let btnTxt = target.querySelector('#helpTxt');
      let btnSpan = target.querySelector('#helpSpan');

      animate({
        duration: 300,
        timing: makeEaseOutTimingF(quadTiming),
        draw: (progress) => {
          let step = progress * 5;

          btnTxt.setAttributeNS(null, 'y', `${25 + step}`);
          btnSpan.setAttributeNS(null, 'font-size', `${25 + step * 3}`);

          btnSpan.setAttributeNS(null, 'stroke', `rgb(${255 - step * 20}, ${255 - step * 10}, 255)`);
          btnSpan.setAttributeNS(null, 'stroke-opacity', `${.3 + step / 10}`);
          btnSpan.setAttributeNS(null, 'stroke-width', `${2.5 - step / 2}`);
          btnSpan.setAttributeNS(null, 'rotate', `${step * 3}`);
        },
        complete: () => {
          animate({
            duration: 200,
            timing: quadTiming,
            draw: (progress) => {
              let step = progress * 5;

              btnTxt.setAttributeNS(null, 'y', `${30 - step}`);
              btnSpan.setAttributeNS(null, 'font-size', `${35 - step * 3}`);

              btnSpan.setAttributeNS(null, 'stroke', `rgb(${155 + step * 20}, ${205 + step * 10}, 255)`);
              btnSpan.setAttributeNS(null, 'stroke-opacity', `${.8 - step / 10}`);
              btnSpan.setAttributeNS(null, 'stroke-width', `${step / 2}`);
              btnSpan.setAttributeNS(null, 'rotate', `${15 - step * 3}`);
            },
            complete: () => {
              btnTxt.setAttributeNS(null, 'y', "25");
              btnSpan.setAttributeNS(null, 'font-size', "25");

              btnSpan.setAttributeNS(null, 'stroke', "rgb(255, 255, 255)");
              btnSpan.setAttributeNS(null, 'stroke-opacity', ".3");
              btnSpan.setAttributeNS(null, 'stroke-width', "2.5");
              btnSpan.setAttributeNS(null, 'rotate', `0`);
            }
          });
        }
      });
    });

    helpBtn.addEventListener('click', () => {
      showDetail({type: "help"});
    });

    helpBtn.appendChild(helpImg);


    let fullScreenBtn = document.createElement('div');
    fullScreenBtn.classList.add('full-screen-btn');

    let fullScreenImg = document.createElementNS(svgns, 'svg');
    fullScreenImg.setAttributeNS(null, 'width', "30");
    fullScreenImg.setAttributeNS(null, 'height', "30");
    fullScreenImg.setAttributeNS(null, 'viewBox', "0 0 30 30");

    let fPath = document.createElementNS(svgns, 'path');
    fPath.setAttributeNS(null, 'id', "fullScr");
    fPath.setAttributeNS(null, 'd', "m 10 5 h 15 v 15 m -5 5 h -15 v -15");
    fPath.setAttributeNS(null, 'stroke', "rgb(255, 255, 255)");
    fPath.setAttributeNS(null, 'stroke-opacity', ".3");
    fPath.setAttributeNS(null, 'stroke-width', "3");
    fPath.setAttributeNS(null, 'fill', "none");

    fullScreenImg.appendChild(fPath);

    fullScreenBtn.addEventListener('mouseover', (e) => {
      let target = e.target.closest('.full-screen-btn');
      if (!target) return;

      if (e.relatedTarget !== null) {
        let relatedTarget = e.relatedTarget.closest('.full-screen-btn');

        if (relatedTarget !== null) return;
      }

      let btnImg = target.querySelector('#fullScr');

      animate({
        duration: 300,
        timing: makeEaseOutTimingF(quadTiming),
        draw: (progress) => {
          let step = progress * 3;

          if (!window.inFullScreenMode) {
            btnImg.setAttributeNS(null, 'd', `m ${10 + step} ${5 - step} 
              h 15 v 15 
              m ${-5 - 2 * step} ${5 + 2 * step} 
              h -15 v -15`);
          } else {
            btnImg.setAttributeNS(null, 'd', `m ${20 - 2 * step} ${2 * step} 
              v 10 h 10 
              m ${-20 + 4 * step} ${20 - 4 * step} 
              v -10 h -10`);
          }

          btnImg.setAttributeNS(null, 'stroke', `rgb(${255 - step * 30}, ${255 - step * 10}, 255)`);
          btnImg.setAttributeNS(null, 'stroke-opacity', `${.3 + step / 10}`);
          btnImg.setAttributeNS(null, 'stroke-width', `${3 - step}`);
        },
        complete: () => {
          animate({
            duration: 200,
            timing: quadTiming,
            draw: (progress) => {
              let step = progress * 3;

              if (!window.inFullScreenMode) {
                btnImg.setAttributeNS(null, 'd', `m ${13 - step} ${2 + step} 
                  h 15 v 15 
                  m ${-11 + 2 * step} ${11 - 2 * step} 
                  h -15 v -15`);
              } else {
                btnImg.setAttributeNS(null, 'd', `m ${14 + 2 * step} ${6 - 2 * step} 
                  v 10 h 10 
                  m ${-8 - 4 * step} ${8 + 4 * step} 
                  v -10 h -10`);
              }


              btnImg.setAttributeNS(null, 'stroke', `rgb(${165 + step * 30}, ${225 + step * 10}, 255)`);
              btnImg.setAttributeNS(null, 'stroke-opacity', `${.6 - step / 10}`);
              btnImg.setAttributeNS(null, 'stroke-width', `${step}`);
            },
            complete: () => {
              if (!window.inFullScreenMode) {
                btnImg.setAttributeNS(null, 'd', "m 10 5 h 15 v 15 m -5 5 h -15 v -15");
              } else {
                btnImg.setAttributeNS(null, 'd', "m 20 0 v 10 h 10 m -20 20 v -10 h -10");
              }
            }
          });
        }
      });
    });

    fullScreenBtn.addEventListener('click', () => {
      if (!wrapper.classList.contains('wrapper-full-screen')) {
        let requestMethod = wrapper.requestFullScreen ||
            wrapper.webkitRequestFullScreen ||
            wrapper.mozRequestFullScreen ||
            wrapper.msRequestFullScreen;
        requestMethod.call(wrapper);

      } else {
        let requestMethod = document.cancelFullScreen ||
            document.webkitCancelFullScreen ||
            document.mozCancelFullScreen ||
            document.msCanceFullScreen;
        requestMethod.call(document);
      }
    });

    let fullScreenEvent = (document.onfullscreenchange === null) ? 'onfullscreenchange' :
        ((document.onwebkitfullscreenchange === null) ? 'onwebkitfullscreenchange' :
            ((document.onmozfullscreenchange === null) ? 'onmozfullscreenchange' :
                'onmsfullscreenchange'));

    document[fullScreenEvent] = () => {
      wrapper.classList.toggle('wrapper-full-screen');
      window.inFullScreenMode = !window.inFullScreenMode;

      wrapper.addEventListener('transitionend', (e) => {
        if (e.target.closest('.hat')) return;

        guitarWorkspace.drawGuitar();
        guitarWorkspace.focus();
      });

      let btnImg = wrapper.querySelector('#fullScr');

      if (!window.inFullScreenMode) {
        btnImg.setAttributeNS(null, 'd', "m 10 5 h 15 v 15 m -5 5 h -15 v -15");
        helpBtn.style.display = "inline-block";
        songTitle.style.width = "calc(100% - 100px)";
      } else {
        btnImg.setAttributeNS(null, 'd', "m 20 0 v 10 h 10 m -20 20 v -10 h -10");
        helpBtn.style.display = "none";
        songTitle.style.width = "calc(100% - 60px)";
      }
    };

    window.addEventListener('resize', () => {
      guitarWorkspace.drawGuitar();
      guitarWorkspace.focus();
    });

    fullScreenBtn.appendChild(fullScreenImg);


    hat.appendChild(songTitle);
    hat.appendChild(helpBtn);
    hat.appendChild(fullScreenBtn);


    let guitarWorkspace = document.createElement('guitar-workspace');
    window.guitar = guitarWorkspace;
    guitarWorkspace.tabIndex = 0;

    setTimeout(() => {
      guitarWorkspace.drawGuitar();
      guitarWorkspace.focus();
    }, 5);

    guitarWorkspace.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 80:
          guitarWorkspace.playString(0);
          break;
        case 79:
          guitarWorkspace.playString(1);
          break;
        case 73:
          guitarWorkspace.playString(2);
          break;
        case 76:
          guitarWorkspace.playString(3);
          break;
        case 75:
          guitarWorkspace.playString(4);
          break;
        case 77:
          guitarWorkspace.playString(5);
          break;

        case 38:
          guitarWorkspace.playStringsAll({mode: 'up'});
          break;
        case 40:
          guitarWorkspace.playStringsAll({mode: 'down'});
          break;

        case 32:
          guitarWorkspace.muteStringsAll();
          break;

        case 8:
        case 46:
          guitarWorkspace.chord = null;
          guitarWorkspace.drawChord();
          break;

      }

      if (e.keyCode === 192 || e.keyCode === 96) {
        guitarWorkspace.capo = 0;
      } else if (e.keyCode > 48 && e.keyCode < 58) {
        guitarWorkspace.capo = e.keyCode - 48;
      } else if (e.keyCode === 48) {
        guitarWorkspace.capo = 10;
      } else if (e.keyCode === 45 || e.keyCode === 173 || e.keyCode === 189) {
        guitarWorkspace.capo = 11;
      } else if (e.keyCode === 61 || e.keyCode === 187) {
        guitarWorkspace.capo = 12;
      }

      if (e.keyCode > 47 && e.keyCode < 58 ||
          e.keyCode === 192 || e.keyCode === 96 ||
          e.keyCode === 45 || e.keyCode === 173 || e.keyCode === 189 ||
          e.keyCode === 61 || e.keyCode === 187) {
        guitarWorkspace.drawStrings()
            .then(() => {
              return guitarWorkspace.drawCapo();
            })
            .then(() => {
              guitarWorkspace.drawChord();
            });
      }

      if (e.keyCode > 64 && e.keyCode < 72) {
        let tempChord = String.fromCharCode(e.keyCode);

        if (e.shiftKey) {
          tempChord = tempChord + "d";
        }

        if (e.ctrlKey || e.metaKey) {
          tempChord = tempChord + "m";
        }

        if (e.altKey) {
          tempChord = tempChord + "7";
        }

        guitarWorkspace.chord = tempChord;

        guitarWorkspace.drawChord();

      }

      e.preventDefault();

    });

    guitarWorkspace.addEventListener('keyup', (e) => {
      if (e.keyCode > 64 && e.keyCode < 72) {
        guitarWorkspace.chord = null;

        guitarWorkspace.drawChord();
      }
    });

    function mouseMove(e) {
      let x = e.clientX - wrapper.offsetLeft;
      let y = e.clientY - wrapper.offsetTop - hat.clientHeight;

      let downInfo = guitarWorkspace.getStringAndChordByXY(x, y);

      if (~downInfo.mode.indexOf("none")) return;

      if (downInfo.mode === "string") {
        guitarWorkspace.playString(downInfo.string);
      }
    }

    guitarWorkspace.addEventListener('mousedown', (e) => {
      let x = e.clientX - wrapper.offsetLeft;
      let y = e.clientY - wrapper.offsetTop - hat.clientHeight;

      let downInfo = guitarWorkspace.getStringAndChordByXY(x, y);

      if (~downInfo.mode.indexOf("none")) return;

      if (downInfo.mode === "string") {
        guitarWorkspace.playString(downInfo.string);
      }

      if (downInfo.mode === "chord") {
        switch (e.which) {
          case 1:
            guitarWorkspace.standFingerOnBoard(downInfo.string, downInfo.chord);
            break;
          case 2:
            guitarWorkspace.playString(downInfo.string, "000000");
            break;
          case 3:
            guitarWorkspace.standFingerOnBoard(downInfo.string, downInfo.chord, true);
            let c = guitarWorkspace.capo;
            let tempChord = `${c}${c}${c}${c}${c}${c}`;
            tempChord = tempChord.slice(0, downInfo.string) + GuitarWorkspace.getLetterByNum(downInfo.chord - c) +
                tempChord.slice(downInfo.string + 1, 6);
            guitarWorkspace.playString(downInfo.string, tempChord);
            break;
        }
      }

      guitarWorkspace.addEventListener('mousemove', mouseMove);

      guitarWorkspace.addEventListener('mouseup', () => {
        guitarWorkspace.removeEventListener('mousemove', mouseMove);
      });

      guitarWorkspace.addEventListener('mouseout', () => {
        guitarWorkspace.removeEventListener('mousemove', mouseMove);
      });

      guitarWorkspace.focus();

      e.preventDefault();
    });

    guitarWorkspace.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    guitarWorkspace.addEventListener('wheel', (e) => {
      let x = e.clientX - wrapper.offsetLeft;
      let y = e.clientY - wrapper.offsetTop - hat.clientHeight;

      let wheelInfo = guitarWorkspace.getStringAndChordByXY(x, y);

      if (wheelInfo.mode === "up-none") {
        guitarWorkspace.volume -= e.deltaY / 20;
      }

      if (wheelInfo.mode === "down-none") {
        guitarWorkspace.speed -= e.deltaY / 20;
      }

      e.preventDefault();
    });


    let musicWorkspace = document.createElement('music-workspace');

    let notes = JSON.parse(this.getAttribute('notes'));
    musicWorkspace.speed = +notes.speed;
    musicWorkspace.size = notes.size;
    musicWorkspace.notes = notes.notes;

    let style = document.createElement('style');
    style.textContent = `.wrapper-song {
          background: linear-gradient(rgba(21, 27, 21, .7) 80%, rgba(21, 27, 21, .7), rgba(21, 27, 21, .1));
          position: absolute;
          top: 60px;
          left: calc(21.5% + 6px);
          height: calc(100% - 80px);
          max-height: calc(100% - 80px);
          width: calc(75% - 20px);
          margin: 10px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 1px -2px 3px 1px rgba(7, 9, 7, .7);
          font-family: "Ubuntu Regular", sans-serif;
          transition: box-shadow .3s, top .3s, left .3s, height .3s, width .3s, margin .3s, background .3s;
        } 
        
        .wrapper-full-screen {
          box-shadow: 0px 0px 0px 0px rgba(7, 9, 7, .9);
          top: 0px;
          left: 0px;
          max-height: 100%;
          height: 100%;
          width: 100%;
          margin: 0px;
          background: rgb(21, 27, 21);
          transition: box-shadow .3s, top .3s, left .3s, height .3s, width .3s, margin .3s, background .3s;
        }
        
        .hat {
          height: 30px;
        }
        
        .song-title {
          display: inline-block;
          width: calc(100% - 100px);
          margin-left: 12px;
          padding-top: 5px;
          padding-bottom: 6px;
          color: rgb(107, 121, 127);
          text-align: center;
          border-bottom: 0px dotted rgba(127, 144, 154, .7);
          transition: border-bottom .3s, padding-bottom .3s; 
        }
        
        .song-title:hover {
          border-bottom: thick dotted rgba(127, 144, 154, .7);
          padding-bottom: 1px;
          transition: border-bottom .6s, padding-bottom 0px;
        }
        
        .song-title b {
          color: rgb(177, 207, 227);
          
        }
        
        .song-title strong {
          color: rgb(127, 142, 154);
        }
        
        .help-btn {
          display: inline-block;
          width: 30px;
          height: 100%;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          margin: 0 5px;
        }
        
        .full-screen-btn {
          display: inline-block;
          width: 30px;
          height: 100%;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          margin: 0 5px;
        }
        
        #fullScr { 
          stroke-linecap: round;
          stroke-linejoin: round;
        }`;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    wrapper.appendChild(hat);
    wrapper.appendChild(guitarWorkspace);
    wrapper.appendChild(musicWorkspace);
  }
}
if (window.customElements) {
  customElements.define('song-workspace', WorkSpace);
} else {
  let songErr = document.querySelector('song-workspace');
  let songLoader = songErr.querySelector('.loader');
  songErr.removeChild(songLoader);
}