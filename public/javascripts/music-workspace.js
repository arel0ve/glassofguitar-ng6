class Notes {
  constructor(wrapperElem = document.getElementById('notes-block'),
              speedElem = document.getElementById('speed'),
              numeratorElem = document.getElementById('numerator'),
              denominatorElem = document.getElementById('denominator'),
              plusBtnElem = document.getElementById('plus-btn'),
              infoNotesElem = document.getElementById('info-notes'),
              haveSavedElem = document.getElementById('have-saved'),
              inputFieldElem = document.getElementById('input-field'),
              inputAreaElem = document.getElementById('input-area'),
              addBtnElem = document.getElementById('add-btn'),
              playBtnElem = document.getElementById('play-btn'),
              stopBtnElem = document.getElementById('stop-btn')) {
    this.__columns = [];
    this.__divColumns = [];
    this.__barLength = 16;
    this.__delayBeforeNextNote = Math.round(60000 / (60 * 4));
    this.__timerPlay = null;
    this.__noteNumber = 0;

    this.__wrapper = wrapperElem;
    this.__speedElem = speedElem;
    this.__numerator = numeratorElem;
    this.__denominator = denominatorElem;
    this.__plusBtn = plusBtnElem;
    this.__infoNotes = infoNotesElem;
    this.__haveSaved = haveSavedElem;
    this.__inputField = inputFieldElem;
    this.__inputArea = inputAreaElem;

    this.__addBtn = addBtnElem;
    this.__playBtn = playBtnElem;
    this.__stopBtn = stopBtnElem;

    this.__plusBtn.addEventListener('click', () => {
      this.addNotesBar();
    });

    this.__inputArea.addEventListener('keydown', (e) => {
      if (!e.shiftKey && (e.code === 'Minus' ||
          e.code === 'Backspace' || e.code === 'Delete' ||
          e.which > 47 && e.which < 58 ||
          e.code === 'ArrowLeft' || e.code === 'ArrowRight')) return;

      if (e.code === 'Enter') {
        switch(this.__inputArea.pattern) {
          case '[1-9]|1[0-6]':
            this.saveChangedBar(true);
            break;
          case '2|4|8|16':
            this.saveChangedBar(false);
            break;
          case '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]':
            this.saveChangedSpeed();
            break;
          default:
            this.saveChangedNote();
            break;
        }
      }
      e.preventDefault();
    });


    this.__wrapper.addEventListener('click', (e) => {
      let target = e.target;
      if (this.__inputField.style.display === "inline-block" &&
          (!target || !target.closest('.input-area')) ) {
        switch(this.__inputArea.pattern) {
          case '[1-9]|1[0-6]':
            this.saveChangedBar(true);
            break;
          case '2|4|8|16':
            this.saveChangedBar(false);
            break;
          case '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]':
            this.saveChangedSpeed();
            break;
          default:
            this.saveChangedNote();
            break;
        }
      }

      if (!target) return;

      let mode = null;
      if (target.closest('.numerator')) {
        mode = "numerator";
      } else if (target.closest('.denominator')) {
        mode = "denominator";
      } else if (target.closest('.speed')) {
        mode = "speed";
      } else if (target.closest('.note')) {
        mode = "note";
      }

      if (mode === null) return;

      if (mode === "numerator") {
        this.__inputArea.pattern = '[1-9]|1[0-6]';
        this.__inputArea.maxLength = 2;
        this.__inputArea.value = this.__numerator.textContent;

      } else if (mode === "denominator") {
        this.__inputArea.pattern = '2|4|8|16';
        this.__inputArea.maxLength = 2;
        this.__inputArea.value = this.__denominator.textContent;

      } else if (mode === "speed") {
        this.__inputArea.pattern = '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]';
        this.__inputArea.maxLength = 3;
        this.__inputArea.value = this.__speedElem.textContent.slice(3);
      } else {
        this.__inputField.dataset.cell = `${target.id.slice(5)}`;

        let i = this.__inputField.dataset.cell.slice(0, this.__inputField.dataset.cell.indexOf('-'));
        let j = this.__inputField.dataset.cell.slice(this.__inputField.dataset.cell.indexOf('-') + 1);

        this.__inputArea.pattern = '-|[0-9]{0,1}|1[0-9]|20';
        this.__inputArea.maxLength = 2;
        this.__inputArea.value = this.__wrapper.querySelector(`#note-${i}-${j}`).textContent;
      }

      this.__inputField.style.left = `calc(${e.clientX}px - 1em)`;
      this.__inputField.style.top = `calc(${e.clientY}px - 1em)`;
      this.__inputField.style.display = "inline-block";

      this.__inputArea.select();

      this.__inputArea.focus();
    });

    this.__addBtn.addEventListener('click', () => {
      showDetail({type: "new-song"});
    });

    this.__playBtn.addEventListener('click', () => {
      if (this.__playBtn.classList.contains('pause-btn')) {
        clearInterval(this.__timerPlay);
        this.__playBtn.classList.remove('pause-btn');
        this.__playBtn.classList.add('play-btn');
        this.__timerPlay = null;
        return;
      }

      this.__playBtn.classList.remove('play-btn');
      this.__playBtn.classList.add('pause-btn');

      window.guitar.playStringsByNotes(this.__columns[this.__noteNumber]);

      this.__timerPlay = setInterval(() => {
        this.__noteNumber++;
        if (this.__noteNumber < this.__columns.length) {
          if (this.__noteNumber % this.__barLength === 0) {
            window.guitar.clearFingerBoard();
          }

          window.guitar.playStringsByNotes(this.__columns[this.__noteNumber]);
          this.selectColumn();

        } else {
          clearInterval(this.__timerPlay);
          this.__playBtn.classList.remove('pause-btn');
          this.__playBtn.classList.add('play-btn');
          this.__noteNumber = 0;
          this.__timerPlay = null;
          this.defaultSelection();
        }
      }, this.__delayBeforeNextNote);
    });

    this.__stopBtn.addEventListener('click', () => {
      clearInterval(this.__timerPlay);
      this.__playBtn.classList.remove('pause-btn');
      this.__playBtn.classList.add('play-btn');
      this.__noteNumber = 0;
      this.__timerPlay = null;
      this.defaultSelection();
    });
  }

  set speed(newSpeed) {
    newSpeed = !!newSpeed ? newSpeed : 60;
    newSpeed = +newSpeed;
    newSpeed = newSpeed < 1 ? 1 : newSpeed;
    newSpeed = newSpeed > 999 ? 999 : newSpeed;

    this.__delayBeforeNextNote = Math.round(60000 / (+newSpeed * 4));
    this.__speedElem.textContent = "" + newSpeed;
  }

  get speed() {
    return this.__speedElem.textContent;
  }

  set size(newBar) {
    if (!newBar || newBar.length < 3 || !~newBar.indexOf('/')) {
      newBar = '2/2';
    } else {
      newBar = '' + newBar;
    }

    this.__numerator.textContent = newBar.slice(0, newBar.indexOf('/'));
    this.__denominator.textContent = newBar.slice(newBar.indexOf('/') + 1);
    this.__barLength = 16 / +this.__denominator.textContent * +this.__numerator.textContent;
  }

  get size() {
    if (this.__numerator.textContent.length > 0 && this.__denominator.textContent.length > 0) {
      return this.__numerator.textContent + '/' + this.__denominator.textContent;
    }
    return null;
  }

  set notes(newNotes) {
    this.__columns = newNotes;
    this.paintAllNotes();
  }

  get notes() {
    return this.__columns;
  }

  addNotesBar() {
    for (let i = 0; i < this.__barLength; i++) {
      this.addNotesColumn();
    }
  }

  addNotesColumn(column = "------", repaint = false) {
    if (!column || column.length < 6) {
      column = "-------";
    }

    if (!repaint) {
      this.__columns.push(column);
    }

    let newColumn = document.createElement('div');
    newColumn.id = `div-column-${this.__divColumns.length}`;

    let replacer = document.createElement('i');
    replacer.classList.add('large');
    replacer.classList.add('material-icons');
    replacer.innerHTML = 'place';
    newColumn.appendChild(replacer);

    for (let i = 0; i < 6; i++) {
      let noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.id = `note-${this.__divColumns.length}-${5 - i}`;
      noteDiv.tabIndex = -1;
      noteDiv.textContent = column[5 - i] !== "-" ? Guitar.getNumByLetter(column[5 - i]) : "-";
      newColumn.appendChild(noteDiv);
    }

    newColumn.classList.add('column');

    if (this.__divColumns.length % this.__barLength === this.__barLength - 1) {
      newColumn.classList.add('last-column');
    }

    this.__divColumns.push(newColumn);
    this.__wrapper.insertBefore(this.__divColumns[this.__divColumns.length - 1], this.__infoNotes);
  }

  saveChangedNote() {
    if (this.__inputArea.matches('.input-area:invalid')) return;

    let i = this.__inputField.dataset.cell.slice(0, this.__inputField.dataset.cell.indexOf('-'));
    let j = this.__inputField.dataset.cell.slice(this.__inputField.dataset.cell.indexOf('-') + 1);

    let currNote = this.__wrapper.querySelector(`#note-${i}-${j}`);
    let newNote = this.__inputArea.value;
    newNote = ~newNote.indexOf('-') || newNote === "" ? "-" :
        +newNote > 20 ? "20" : newNote;

    currNote.textContent = newNote;

    newNote = (newNote !== "-") ? Guitar.getLetterByNum(+newNote) : "-";
    this.__columns[i] = this.__columns[i].slice(0, j) + newNote + this.__columns[i].slice(+j + 1, 6);

    this.__inputField.style.display = "none";
    this.saveAllNotes();
  }

  saveChangedBar(numerator = true) {
    if (this.__inputArea.matches('.input-area:invalid')) {
      this.__inputArea.focus();
      return;
    }

    if (this.__inputArea.value !== "") {
      if (numerator) {
        this.__numerator.textContent = this.__inputArea.value;
      } else {
        this.__denominator.textContent = this.__inputArea.value;
      }
    }

    this.__barLength = 16 / +this.__denominator.textContent * +this.__numerator.textContent;

    this.__inputField.style.display = "none";

    this.paintAllNotes();
    this.saveAllNotes();

  }

  saveChangedSpeed() {
    if (this.__inputArea.matches('.input-area:invalid')) return;

    if (this.__inputArea.value !== "") {
      this.__speedElem.textContent = this.__inputArea.value;
      this.__delayBeforeNextNote = Math.round(60000 / (+this.__inputArea.value * 4));
    }

    this.__inputField.style.display = "none";
    this.saveAllNotes();
  }

  saveAllNotes() {
    let user = window.location.href.slice(7);
    let songId = "";

    user = user.slice(user.indexOf('/') + 1);
    if (~user.indexOf('/')) {
      songId = user.slice(user.indexOf('/') + 1);
    }
    user = user.slice(0, user.indexOf('/'));

    if (user === "" || songId === "") return;

    fetch('/s', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({
        user: user,
        songId: songId,
        speed: this.speed,
        size: this.size,
        notes: this.notes
      })
    }).then(response => {
      switch (response.status) {
        case 200:
          this.__haveSaved.classList.remove("unsuccessful-saving");
          this.__haveSaved.classList.add("successful-saving");
          break;
        default:
          throw new Error();
      }
    }).catch(() => {
      this.__haveSaved.classList.remove("successful-saving");
      this.__haveSaved.classList.add("unsuccessful-saving");

    });
  }

  paintAllNotes() {
    for (let column of this.__divColumns) {
      this.__wrapper.removeChild(column);
    }

    this.__divColumns = [];

    for (let i = 0; i < this.__columns.length; i++) {
      this.addNotesColumn(this.__columns[i], true);
    }

    while (this.__columns.length % this.__barLength !== 0) {
      this.addNotesColumn();
    }
  }

  selectColumn(number = this.__noteNumber) {
    Animation.animate({
      duration: this.__delayBeforeNextNote,
      timing: Animation.linearTiming,
      draw: (progress) => {
        let step = Math.round(progress * 100);

        if (number > 0) {
          this.__divColumns[number - 1].style.background =
              `linear-gradient(to right, rgba(0, 0, 0, .0) ${step}%, rgba(27, 127, 42, .3))`;
        }

        this.__divColumns[number].style.background =
            `linear-gradient(to right, rgba(27, 127, 42, .3), rgba(27, 127, 42, .6) ${step}%, rgba(27, 127, 42, .3))`;

        if (number < this.__divColumns.length) {
          this.__divColumns[number].style.background =
              `linear-gradient(to right, rgba(27, 127, 42, .3), rgba(0, 0, 0, .0) ${step}%)`;
        }
      },
      complete: () => {
        if (number > 0) {
          this.__divColumns[number - 1].style.background = 'rgba(0, 0, 0, .0)';
          if (number === this.__divColumns.length - 1) {
            this.__divColumns[number].style.background = 'rgba(0, 0, 0, .0)';
            this.selectColumn(0);
          }
        }
      }
    });
  }

  defaultSelection() {
    for (let column of this.__divColumns) {
      setTimeout(() => {
        column.style.background = 'rgba(0, 0, 0, .0)';
        window.guitar.clearFingerBoard();
        this.selectColumn(0);
      }, this.__delayBeforeNextNote + 1);

    }
  }
}

window.notes = new Notes();

// class MusicWorkspace extends HTMLElement {
//   constructor() {
//     super();
//
//     this.__columns = [];
//     this.__barLength = 16;
//     this.__delayBeforeNextNote = Math.round(60000 / (60 * 4));
//     this.__timerPlay = null;
//     this.__noteNumber = 0;
//
//
//     let shadow = this.attachShadow({mode: 'open'});
//
//     this.__wrapper = document.createElement('div');
//     this.__wrapper.classList.add('wrapper-music');
//
//     this.__bar = document.createElement('div');
//     this.__bar.classList.add('bar');
//
//     this.__speedElem = document.createElement('span');
//     this.__speedElem.textContent = "♩=60";
//     this.__speedElem.classList.add('speed');
//     this.__bar.appendChild(this.__speedElem);
//
//     this.__numerator = document.createElement('span');
//     this.__numerator.textContent = "2";
//     this.__numerator.classList.add('numerator');
//     this.__bar.appendChild(this.__numerator);
//
//     this.__denominator = document.createElement('span');
//     this.__denominator.textContent = "2";
//     this.__denominator.classList.add('denominator');
//     this.__bar.appendChild(this.__denominator);
//
//     this.__wrapper.appendChild(this.__bar);
//
//     this.__infoNotes = document.createElement('div');
//     this.__infoNotes.classList.add('info-notes');
//
//     this.__plusBtn = document.createElement('div');
//     this.__plusBtn.classList.add('plus-btn');
//
//     this.__plusBtn.addEventListener('click', (e) => {
//       let target = e.target.closest('.plus-btn');
//       if (!target) return;
//
//       this.addNotesBar();
//     });
//
//     this.__infoNotes.appendChild(this.__plusBtn);
//
//     this.__haveSaved = document.createElement('div');
//     this.__infoNotes.appendChild(this.__haveSaved);
//
//     this.__wrapper.appendChild(this.__infoNotes);
//
//     this.__divColumns = [];
//
//     this.__inputField = document.createElement('div');
//     this.__inputField.classList.add('input-field');
//     this.__inputField.style.display = "none";
//
//     this.__inputArea = document.createElement('input');
//     this.__inputArea.classList.add('input-area');
//
//     this.__inputArea.type = 'text';
//     this.__inputArea.placeholder = "-";
//     this.__inputArea.maxLength = 2;
//     this.__inputArea.pattern = '-|[0-9]{0,1}|1[0-9]|20';
//
//     this.__inputArea.addEventListener('keydown', (e) => {
//       if (!e.shiftKey && (e.keyCode === 173 || e.keyCode === 189 || e.keyCode === 45 ||
//           e.keyCode === 46 || e.keyCode === 8 ||
//           e.keyCode > 47 && e.keyCode < 58 ||
//           e.keyCode === 37 || e.keyCode === 39)) return;
//
//       if (e.keyCode === 13) {
//         switch(this.__inputArea.pattern) {
//           case '[1-9]|1[0-6]':
//             this.saveChangedBar(true);
//             break;
//           case '2|4|8|16':
//             this.saveChangedBar(false);
//             break;
//           case '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]':
//             this.saveChangedSpeed();
//             break;
//           default:
//             this.saveChangedNote();
//             break;
//         }
//
//       }
//
//       e.preventDefault();
//     });
//
//     this.__inputField.appendChild(this.__inputArea);
//
//
//     this.__wrapper.addEventListener('click', (e) => {
//       if (this.__inputField.style.display === "inline-block" &&
//           !e.target.closest('.input-area')) {
//         switch(this.__inputArea.pattern) {
//           case '[1-9]|1[0-6]':
//             this.saveChangedBar(true);
//             break;
//           case '2|4|8|16':
//             this.saveChangedBar(false);
//             break;
//           case '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]':
//             this.saveChangedSpeed();
//             break;
//           default:
//             this.saveChangedNote();
//             break;
//         }
//       }
//
//       let target = e.target;
//       if (!target) return;
//
//       let mode = null;
//
//       if (target.closest('.numerator')) {
//         mode = "numerator";
//       } else if (target.closest('.denominator')) {
//         mode = "denominator";
//       } else if (target.closest('.speed')) {
//         mode = "speed";
//       } else if (target.closest('.note')) {
//         mode = "note";
//       }
//
//       if (mode === null) return;
//
//       if (mode === "numerator") {
//         this.__inputArea.pattern = '[1-9]|1[0-6]';
//         this.__inputArea.maxLength = 2;
//         this.__inputArea.value = this.__numerator.textContent;
//
//       } else if (mode === "denominator") {
//         this.__inputArea.pattern = '2|4|8|16';
//         this.__inputArea.maxLength = 2;
//         this.__inputArea.value = this.__denominator.textContent;
//
//       } else if (mode === "speed") {
//         this.__inputArea.pattern = '[1-9]|[1-9][0-9]|[1-9][0-9][0-9]';
//         this.__inputArea.maxLength = 3;
//         this.__inputArea.value = this.__speedElem.textContent.slice(3);
//       } else {
//         this.__inputField.dataset.cell = `${e.target.id.slice(5)}`;
//
//         let i = this.__inputField.dataset.cell.slice(0, this.__inputField.dataset.cell.indexOf('-'));
//         let j = this.__inputField.dataset.cell.slice(this.__inputField.dataset.cell.indexOf('-') + 1);
//
//         this.__inputArea.pattern = '-|[0-9]{0,1}|1[0-9]|20';
//         this.__inputArea.maxLength = 2;
//         this.__inputArea.value = this.__wrapper.querySelector(`#note-${i}-${j}`).textContent;
//       }
//
//       this.__inputField.style.left = `calc(${e.clientX}px - 1em)`;
//       this.__inputField.style.top = `calc(${e.clientY}px - 1em)`;
//       this.__inputField.style.display = "inline-block";
//
//       this.__inputArea.select();
//
//       this.__inputArea.focus();
//     });
//
//     let playMenu = document.createElement('div');
//     playMenu.classList.add('play-menu');
//
//     let addBtn = document.createElement('div');
//     addBtn.classList.add('add-btn');
//     playMenu.appendChild(addBtn);
//
//     let playBtn = document.createElement('div');
//     playBtn.classList.add('play-btn');
//     playMenu.appendChild(playBtn);
//
//     let stopBtn = document.createElement('div');
//     stopBtn.classList.add('stop-btn');
//     playMenu.appendChild(stopBtn);
//
//     this.__wrapper.appendChild(playMenu);
//
//     document.addEventListener('mousemove', (e) => {
//       if (e.clientX * 1.25 > document.documentElement.clientWidth &&
//           e.clientY * 2 > document.documentElement.clientHeight) {
//
//         if (window.inFullScreenMode) {
//           playMenu.classList.add('play-menu-show-fullscreen');
//         } else {
//           playMenu.classList.add('play-menu-show');
//         }
//
//       } else {
//         playMenu.classList.remove('play-menu-show');
//         playMenu.classList.remove('play-menu-show-fullscreen');
//       }
//     });
//
//     addBtn.addEventListener('click', () => {
//       showDetail({type: "new-song"});
//     });
//
//     playBtn.addEventListener('click', () => {
//       if (playBtn.classList.contains('pause-btn')) {
//         clearInterval(this.__timerPlay);
//         playBtn.classList.remove('pause-btn');
//         playBtn.classList.add('play-btn');
//         this.__timerPlay = null;
//         return;
//       }
//
//       playBtn.classList.remove('play-btn');
//       playBtn.classList.add('pause-btn');
//
//       window.guitar.playStringsByNotes(this.__columns[this.__noteNumber]);
//
//       this.__timerPlay = setInterval(() => {
//         this.__noteNumber++;
//         if (this.__noteNumber < this.__columns.length) {
//           if (this.__noteNumber % this.__barLength === 0) {
//             window.guitar.clearFingerBoard();
//           }
//
//           window.guitar.playStringsByNotes(this.__columns[this.__noteNumber]);
//           this.selectColumn();
//
//         } else {
//           clearInterval(this.__timerPlay);
//           playBtn.classList.remove('pause-btn');
//           playBtn.classList.add('play-btn');
//           this.__noteNumber = 0;
//           this.__timerPlay = null;
//           this.defaultSelection();
//         }
//       }, this.__delayBeforeNextNote);
//     });
//
//     stopBtn.addEventListener('click', () => {
//       clearInterval(this.__timerPlay);
//       playBtn.classList.remove('pause-btn');
//       playBtn.classList.add('play-btn');
//       this.__noteNumber = 0;
//       this.__timerPlay = null;
//       this.defaultSelection();
//     });
//
//     let style = document.createElement('style');
//     style.textContent = `.wrapper-music {
//           margin: 10px 5px 0;
//           background: linear-gradient(rgba(7, 9, 7, .5) 67%, rgba(7, 9, 7, .5), rgba(7, 9, 7, .0));
//           height: calc(60% - 45px);
//           width: calc(100% - 10px);
//           box-shadow: 1px -3px 2px 1px rgba(2, 3, 2, .7);
//           font-family: "Erika Monospace", monospace;
//           font-size: 1.2em;
//           overflow-x: hidden;
//           overflow-y: auto;
//         }
//
//         .wrapper-music::-webkit-scrollbar {
//           width: 6px;
//         }
//
//         .wrapper-music::-webkit-scrollbar-track-piece {
//           background-color: rgba(0, 0, 0, .0);
//         }
//
//         .wrapper-music::-webkit-scrollbar-thumb {
//           background-color: rgba(0, 0, 0, .5);
//           border-radius: 50% / 4px;
//         }
//
//         .wrapper-music::-webkit-scrollbar-thumb:hover {
//           background-color: rgba(0, 0, 0, .7);
//         }
//
//         .bar {
//           font-size: 2em;
//           color: rgba(144, 154, 163, .7);
//           vertical-align: top;
//           display: inline-block;
//         }
//
//         .bar span {
//           display: block;
//           text-align: center;
//         }
//
//         .bar .speed {
//           font-size: 0.5em;
//         }
//
//         .info-notes {
//           display: inline-block;
//           vertical-align: top;
//           margin-left: 5px;
//         }
//
//         .plus-btn {
//           color: rgba(107, 207, 127, .9);
//           padding: 2px;
//           cursor: pointer;
//         }
//
//         .plus-btn::before {
//           content: "+";
//         }
//
//         .plus-btn:hover {
//           color: rgb(107, 255, 127);
//         }
//
//         .plus-btn:active {
//           color: rgb(54, 127, 63);
//         }
//
//         .column {
//           color: rgb(127, 142, 154);
//           line-height: 1em;
//           display: inline-block;
//           margin-bottom: 1em;
//           padding: 0 2px;
//         }
//
//         .note {
//           text-align: center;
//           display: block;
//           width: 100%;
//         }
//
//         .end-of-bar {
//           display: inline-block;
//           padding: 0 2px;
//           border-left: solid 2px rgba(144, 154, 163, .7);
//           height: 5.5em;
//         }
//
//         .play-menu {
//           position: absolute;
//           top: calc(40% + 30px + 20%);
//           right: 2%;
//           width: 30px;
//           border-radius: 50% / 15px;
//           text-align: center;
//           background: rgba(7, 9, 7, .25);
//           box-shadow: 1px -2px 2px rgba(127, 254, 142, .5);
//           color: rgba(191, 214, 232, .15);
//           font-size: 1.5em;
//           transition: right .3s, background .3s, color .3s;
//         }
//
//         .play-menu-show {
//           right: -30px;
//           box-shadow: 1px -2px 2px rgba(127, 254, 142, .7);
//           background: rgba(7, 9, 7, .95);
//           color: rgba(191, 214, 232, 1);
//           transition: right .6s, background .6s, color .6s;
//         }
//
//         .play-menu-show-fullscreen {
//           right: 5px;
//           box-shadow: 1px -2px 2px rgba(127, 254, 142, .7);
//           background: rgba(7, 9, 7, .95);
//           color: rgba(191, 214, 232, 1);
//           transition: right .6s, background .6s, color .6s;
//         }
//
//         .play-menu div {
//           margin: 2px;
//           cursor: pointer;
//           text-shadow: 2px 2px 3px rgba(86, 107, 116, .0);
//           transition: text-shadow .3s;
//         }
//
//         .play-menu div:hover {
//           text-shadow: 2px 2px 3px rgba(86, 107, 116, .7);
//           transition: text-shadow .6s;
//         }
//
//         .add-btn::before {
//           content: "+";
//         }
//
//         .play-btn::before {
//           content: "▶";
//         }
//
//         .pause-btn::before {
//           content: "⏸";
//         }
//
//         .stop-btn::before {
//           content: "⏹";
//         }
//
//         .input-field {
//           background: rgba(0, 0, 0, .0);
//           position: fixed;
//           height: 1em;
//           width: 3em;
//         }
//
//         .input-area {
//           font-family: "Erika Monospace", monospace;
//           font-size: 1.4em;
//           width: 2.1em;
//           background: rgba(2, 3, 2, .9);
//           color: rgb(191, 214, 232);
//           border: none;
//           box-shadow: 1px -2px 1px rgb(2, 3, 2, .7);
//         }
//
//         .input-area:focus {
//           background: rgba(2, 3, 2, 1);
//           border: none;
//         }
//
//         .input-area:invalid {
//           color: rgb(232, 107, 95);
//         }
//
//         @keyframes hide-opacity {
//          0% {
//            opacity: .3;
//          }
//          1% {
//            opacity: 1;
//          }
//          50% {
//            opacity: .75;
//          }
//          100% {
//            opacity: .3;
//          }
//        }
//
//        @-webkit-keyframes hide-opacity {
//          0% {
//            opacity: .3;
//          }
//          1% {
//            opacity: 1;
//          }
//          50% {
//            opacity: .75;
//          }
//          100% {
//            opacity: .3;
//          }
//        }
//
//         .successful-saving::before {
//           display: block;
//           content: "🖫";
//           color: rgb(107, 255, 127);
//           opacity: .3;
//           animation: 1.8s 1 hide-opacity;
//           -webkit-animation: 1.8s 1 hide-opacity;
//         }
//
//         .unsuccessful-saving::before {
//           display: block;
//           content: "🖫";
//           color: rgb(255, 107, 127);
//           opacity: .3;
//           animation: 1.8s 1 hide-opacity;
//           -webkit-animation: 1.8s 1 hide-opacity;
//         }
//         `;
//
//     shadow.appendChild(style);
//     shadow.appendChild(this.__wrapper);
//
//     this.__wrapper.appendChild(this.__inputField);
//   }
//
//   set speed(newSpeed) {
//     newSpeed = !!newSpeed ? newSpeed : 60;
//     newSpeed = +newSpeed;
//     newSpeed = newSpeed < 1 ? 1 : newSpeed;
//     newSpeed = newSpeed > 999 ? 999 : newSpeed;
//
//     this.__delayBeforeNextNote = Math.round(60000 / (+newSpeed * 4));
//     this.__speedElem.textContent = `𝅘𝅥=${newSpeed}`;
//   }
//
//   get speed() {
//     return this.__speedElem.textContent.slice(this.__speedElem.textContent.indexOf('=') + 1);
//   }
//
//   set size(newBar) {
//     if (!newBar || newBar.length < 3 || !~newBar.indexOf('/')) {
//       newBar = '2/2';
//     } else {
//       newBar = '' + newBar;
//     }
//
//     this.__numerator.textContent = newBar.slice(0, newBar.indexOf('/'));
//     this.__denominator.textContent = newBar.slice(newBar.indexOf('/') + 1);
//     this.__barLength = 16 / +this.__denominator.textContent * +this.__numerator.textContent;
//   }
//
//   get size() {
//     if (this.__numerator.textContent.length > 0 && this.__denominator.textContent.length > 0) {
//       return this.__numerator.textContent + '/' + this.__denominator.textContent;
//     }
//     return null;
//   }
//
//   set notes(newNotes) {
//     this.__columns = newNotes;
//     this.paintAllNotes();
//   }
//
//   get notes() {
//     return this.__columns;
//   }
//
//   addNotesBar() {
//     for (let i = 0; i < this.__barLength; i++) {
//       this.addNotesColumn();
//     }
//
//     this.addEndOfBar();
//   }
//
//   addNotesColumn(column = "------", repaint = false) {
//     if (!column || column.length < 6) {
//       column = "-------";
//     }
//
//     if (!repaint) {
//       this.__columns.push(column);
//     }
//
//     let newColumn = document.createElement('div');
//     newColumn.id = `div-column-${this.__divColumns.length}`;
//
//     for (let i = 0; i < 6; i++) {
//       let noteSpan = document.createElement('span');
//       noteSpan.classList.add('note');
//       noteSpan.id = `note-${this.__divColumns.length}-${5 - i}`;
//       noteSpan.tabIndex = -1;
//       noteSpan.textContent = column[5 - i] !== "-" ? GuitarWorkspace.getNumByLetter(column[5 - i]) : "-";
//       newColumn.appendChild(noteSpan);
//     }
//
//     newColumn.classList.add('column');
//     this.__divColumns.push(newColumn);
//     this.__wrapper.insertBefore(this.__divColumns[this.__divColumns.length - 1], this.__infoNotes);
//   }
//
//   addEndOfBar() {
//     let endOfBar = document.createElement('div');
//     endOfBar.classList.add('end-of-bar');
//     this.__wrapper.insertBefore(endOfBar, this.__infoNotes);
//   }
//
//   saveChangedNote() {
//     if (this.__inputArea.matches('.input-area:invalid')) return;
//
//     let i = this.__inputField.dataset.cell.slice(0, this.__inputField.dataset.cell.indexOf('-'));
//     let j = this.__inputField.dataset.cell.slice(this.__inputField.dataset.cell.indexOf('-') + 1);
//
//     let currNote = this.__wrapper.querySelector(`#note-${i}-${j}`);
//     let newNote = this.__inputArea.value;
//     newNote = ~newNote.indexOf('-') || newNote === "" ? "-" :
//         +newNote > 20 ? "20" : newNote;
//
//     currNote.textContent = newNote;
//
//     newNote = (newNote !== "-") ? GuitarWorkspace.getLetterByNum(+newNote) : "-";
//     this.__columns[i] = this.__columns[i].slice(0, j) + newNote + this.__columns[i].slice(+j + 1, 6);
//
//     this.__inputField.style.display = "none";
//     this.saveAllNotes();
//   }
//
//   saveChangedBar(numerator = true) {
//     if (this.__inputArea.matches('.input-area:invalid')) return;
//
//     if (this.__inputArea.value !== "") {
//       if (numerator) {
//         this.__numerator.textContent = this.__inputArea.value;
//       } else {
//         this.__denominator.textContent = this.__inputArea.value;
//       }
//     }
//
//     this.__barLength = 16 / +this.__denominator.textContent * +this.__numerator.textContent;
//
//     this.__inputField.style.display = "none";
//
//     this.paintAllNotes();
//     this.saveAllNotes();
//
//   }
//
//   saveChangedSpeed() {
//     if (this.__inputArea.matches('.input-area:invalid')) return;
//
//     if (this.__inputArea.value !== "") {
//       this.__speedElem.textContent = "𝅘𝅥=" + this.__inputArea.value;
//       this.__delayBeforeNextNote = Math.round(60000 / (+this.__inputArea.value * 4));
//     }
//
//     this.__inputField.style.display = "none";
//     this.saveAllNotes();
//   }
//
//   saveAllNotes() {
//     let user = window.location.href.slice(7);
//     let songId = "";
//
//     user = user.slice(user.indexOf('/') + 1);
//     if (~user.indexOf('/')) {
//       songId = user.slice(user.indexOf('/') + 1);
//     }
//     user = user.slice(0, user.indexOf('/'));
//
//     if (user === "" || songId === "") return;
//
//     fetch('/s', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8"
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         user: user,
//         songId: songId,
//         speed: this.speed,
//         size: this.size,
//         notes: this.notes
//       })
//     }).then(response => {
//       switch (response.status) {
//         case 200:
//           this.__haveSaved.classList.remove("unsuccessful-saving");
//           this.__haveSaved.classList.add("successful-saving");
//           break;
//         default:
//           throw new Error();
//       }
//     }).catch(() => {
//       this.__haveSaved.classList.remove("successful-saving");
//       this.__haveSaved.classList.add("unsuccessful-saving");
//
//     });
//   }
//
//   paintAllNotes() {
//     for (let column of this.__divColumns) {
//       this.__wrapper.removeChild(column);
//     }
//
//     this.__divColumns = [];
//
//     let endOfBars = this.__wrapper.querySelectorAll('.end-of-bar');
//     for (let endOfBar of endOfBars) {
//       this.__wrapper.removeChild(endOfBar);
//     }
//
//     for (let i = 0; i < this.__columns.length; i++) {
//       this.addNotesColumn(this.__columns[i], true);
//
//       if (i % this.__barLength === this.__barLength - 1) {
//         this.addEndOfBar();
//       }
//     }
//
//     while (this.__columns.length % this.__barLength !== 0) {
//       this.addNotesColumn();
//
//       if (this.__columns.length % this.__barLength === 0) {
//         this.addEndOfBar();
//       }
//     }
//   }
//
//   selectColumn(number = this.__noteNumber) {
//     animate({
//       duration: this.__delayBeforeNextNote,
//       timing: linearTiming,
//       draw: (progress) => {
//         let step = Math.round(progress * 100);
//
//         if (number > 0) {
//           this.__divColumns[number - 1].style.background =
//               `linear-gradient(to right, rgba(0, 0, 0, .0) ${step}%, rgba(27, 127, 42, .3))`;
//         }
//
//         this.__divColumns[number].style.background =
//             `linear-gradient(to right, rgba(27, 127, 42, .3), rgba(27, 127, 42, .6) ${step}%, rgba(27, 127, 42, .3))`;
//
//         if (number < this.__divColumns.length) {
//           this.__divColumns[number].style.background =
//               `linear-gradient(to right, rgba(27, 127, 42, .3), rgba(0, 0, 0, .0) ${step}%)`;
//         }
//       },
//       complete: () => {
//         if (number > 0) {
//           this.__divColumns[number - 1].style.background = 'rgba(0, 0, 0, .0)';
//           if (number === this.__divColumns.length - 1) {
//             this.__divColumns[number].style.background = 'rgba(0, 0, 0, .0)';
//             this.selectColumn(0);
//           }
//         }
//       }
//     });
//   }
//
//   defaultSelection() {
//     for (let column of this.__divColumns) {
//       setTimeout(() => {
//         column.style.background = 'rgba(0, 0, 0, .0)';
//         window.guitar.clearFingerBoard();
//         this.selectColumn(0);
//       }, this.__delayBeforeNextNote + 1);
//
//     }
//   }
// }
//
// if (window.customElements) {
//   customElements.define('music-workspace', MusicWorkspace);
// }