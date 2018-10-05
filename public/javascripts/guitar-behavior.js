let guitarElem = document.getElementById('guitar');

// prevent Defaults all mouse's and keyboard's events
['keydown', 'keypress', 'keyup', 'mousedown', 'mouseup', 'click', 'contextmenu', 'dblclick', 'wheel', 'mousemove']
    .forEach((eventName) => {
      guitarElem.addEventListener(eventName, (e) => {
        e.preventDefault();
      });
    });

guitarElem.addEventListener('mousedown', () => {
  guitarElem.focus();
});

// capo's keyboard event
guitarElem.addEventListener('keydown', (e) => {
  let isCapoKey = true;
  switch (e.code) {
    case 'Backquote':
      window.guitar.capo = 0;
      break;
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
    case 'Digit6':
    case 'Digit7':
    case 'Digit8':
    case 'Digit9':
      window.guitar.capo = e.code[5];
      break;
    case 'Digit0':
      window.guitar.capo = 10;
      break;
    case 'Minus':
      window.guitar.capo = 11;
      break;
    case 'Equal':
      window.guitar.capo = 12;
      break;
    default:
      isCapoKey = false;
  }

  if (isCapoKey) {
    window.guitar.drawStrings()
        .then(() => {
          return window.guitar.drawCapo();
        })
        .then(() => {
          window.guitar.drawChord();
        });
  }
});

// chord's keyboard event
guitarElem.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'Backspace':
    case 'Delete':
      window.guitar.chord = null;
      window.guitar.drawChord();
      break;
    case 'KeyA':
    case 'KeyB':
    case 'KeyC':
    case 'KeyD':
    case 'KeyE':
    case 'KeyF':
    case 'KeyG':
      let tempChord = e.code[3];
      if (e.shiftKey) {
        tempChord = tempChord + 'd';
      }
      if (e.ctrlKey || e.metaKey) {
        tempChord = tempChord + 'm';
      }
      if (e.altKey) {
        tempChord = tempChord + '7';
      }
      window.guitar.chord = tempChord;
      window.guitar.drawChord();
      break;
  }
});

guitarElem.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'KeyA':
    case 'KeyB':
    case 'KeyC':
    case 'KeyD':
    case 'KeyE':
    case 'KeyF':
    case 'KeyG':
      window.guitar.chord = null;
      window.guitar.drawChord();
      break;
  }
});

// string's keyboard event
guitarElem.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'KeyP':
      window.guitar.playString(0);
      break;
    case 'KeyO':
      window.guitar.playString(1);
      break;
    case 'KeyI':
      window.guitar.playString(2);
      break;
    case 'Period':
      window.guitar.playString(3);
      break;
    case 'Comma':
      window.guitar.playString(4);
      break;
    case 'KeyM':
      window.guitar.playString(5);
      break;
    case 'ArrowUp':
      window.guitar.playStringsAll({mode: 'up'});
      break;
    case 'ArrowDown':
      window.guitar.playStringsAll({mode: 'down'});
      break;
    case 'Space':
      window.guitar.muteStringsAll();
      break;
  }
});

// mouse's events
guitarElem.addEventListener('mousedown', (e) => {
  const downInfo = window.guitar.getStringAndChordByXY(e.offsetX, e.offsetY);

  if (downInfo.mode.includes('none')) {
    return;
  }

  if (downInfo.mode === 'string') {
    window.guitar.playString(downInfo.string);
  }

  if (downInfo.mode === 'chord') {
    switch (e.button) {
      case 0:
        window.guitar.standFingerOnBoard(downInfo.string, downInfo.chord);
        break;
      case 1:
        window.guitar.playString(downInfo.string, '000000');
        break;
      case 2:
        window.guitar.standFingerOnBoard(downInfo.string, downInfo.chord, true);
        const c = window.guitar.capo;
        let tempChord = `${c}${c}${c}${c}${c}${c}`;
        tempChord = tempChord.slice(0, downInfo.string) + Guitar.getLetterByNum(downInfo.chord - c) +
            tempChord.slice(downInfo.string + 1, 6);
        window.guitar.playString(downInfo.string, tempChord);
        break;
    }
  }
});

guitarElem.addEventListener('mousemove', (e) => {
  if (!e.buttons || Math.abs(+e.movementY) < window.guitar.guitarHeight / 35) {
    return;
  }

  const downInfo = window.guitar.getStringAndChordByXY(e.offsetX, e.offsetY);
  if (downInfo.mode === 'string') {
    window.guitar.playString(downInfo.string);
  }
});

guitarElem.addEventListener('wheel', (e) => {
  const wheelInfo = window.guitar.getStringAndChordByXY(e.offsetX, e.offsetY);

  switch (wheelInfo.mode) {
    case 'up-none':
      window.guitar.volume -= Math.round(e.deltaY / 20);
      break;

    case 'down-none':
      window.guitar.speed -= Math.round(e.deltaY / 20);
      break;

    case 'string':
      if (e.deltaY > 0) {
        window.guitar.playStringsAll({mode: 'down'});
      } else {
        window.guitar.playStringsAll({mode: 'up'});
      }
      break;

    case 'chord':
      window.guitar.capo = wheelInfo.chord;
      window.guitar.drawStrings()
          .then(() => {
            return window.guitar.drawCapo();
          })
          .then(() => {
            window.guitar.drawChord();
          });
      break;
  }
});
