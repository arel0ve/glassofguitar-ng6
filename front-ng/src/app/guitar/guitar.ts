import { Sound } from '../sound';
import { Animation } from '../animation';
import * as chords from '../../assets/service/chords.json';

export class Guitar {
  private __guitarCanv: HTMLCanvasElement;
  private __stringsCanv: HTMLCanvasElement;
  private __infoCanv: HTMLCanvasElement;

  private readonly __sounds: Sound[];
  private __chordsList: object;
  private __currentChord: string;

  private readonly __stringsWidth: number[];
  private readonly __stringsTop: number[];
  private readonly __wallWidthPerc: number;
  private __shiftCapo: number;
  private __wallWidth: number;

  private readonly __shiftZeroLadPerc: number;

  private readonly __shiftLadsPx: number[];
  private readonly __lengthLadsPx: number[];

  private __shiftStartStrings: number[];

  private __stringLColor = null;
  private __stringBColor = null;

  private __fingerBoardTexture = null;
  private __soundBoardTexture = null;

  private __volume: number;
  private __speedPlayAll: number;

  private __wsPlay: WebSocket;
  private __wsListen: WebSocket;

  private __user: any;

  public class;

  static getNumByLetter(l): number {
    switch (l) {
      case 'a':
        return 10;
      case 'b':
        return 11;
      case 'c':
        return 12;
      case 'd':
        return 13;
      case 'e':
        return 14;
      case 'f':
        return 15;
      case 'g':
        return 16;
      case 'h':
        return 17;
      case 'i':
        return 18;
      case 'j':
        return 19;
      case 'k':
        return 20;
      case '~':
        return 21;
      default:
        return +l;
    }
  }

  static getLetterByNum(n): string {
    switch (n) {
      case 10:
        return 'a';
      case 11:
        return 'b';
      case 12:
        return 'c';
      case 13:
        return 'd';
      case 14:
        return 'e';
      case 15:
        return 'f';
      case 16:
        return 'g';
      case 17:
        return 'h';
      case 18:
        return 'i';
      case 19:
        return 'j';
      case 20:
        return 'k';
      case 21:
        return '~';
      default:
        return '' + n;
    }
  }

  constructor(guitarCanv: HTMLCanvasElement, stringsCanv: HTMLCanvasElement, infoCanv: HTMLCanvasElement) {
    this.__guitarCanv = guitarCanv;
    this.__stringsCanv = stringsCanv;
    this.__infoCanv = infoCanv;

    this.__sounds = [];
    this.__chordsList = {};
    this.__currentChord = '000000';

    this.__shiftCapo = 0;
    this.__stringsWidth = [1, 2, 3, 4, 5, 6];
    this.__stringsTop = [0, 0, 0, 0, 0, 0];
    this.__wallWidthPerc = 0.4;
    this.__wallWidth = 0;

    this.__shiftZeroLadPerc = 2;

    this.__shiftLadsPx = [];
    this.__lengthLadsPx = [];

    this.__shiftStartStrings = [];

    this.__stringLColor = null;
    this.__stringBColor = null;

    this.__fingerBoardTexture = null;
    this.__soundBoardTexture = null;

    this.__volume = 0;
    this.__speedPlayAll = 0;

    this.__wsPlay = null;
    this.__wsListen = null;

    this.__user = null;

    this.class = Guitar;

    this.__chordsList = chords;
  }

  drawGuitar(strings = [0, 1, 2, 3, 4, 5]) {
    this.guitarWidth = this.__guitarCanv.clientWidth;
    this.guitarHeight = this.__guitarCanv.clientHeight;

    this.capo = 0;
    this.chord = null;

    if (!this.__guitarCanv.getContext) {
      this.__guitarCanv.innerHTML = 'Canvas is not founded!';
      return;
    }

    this.clearGuitar()
      .then(() => {
        return this.drawSoundBoard();
      })
      .then(() => {
        return this.drawSoundHole();
      })
      .then(() => {
        return this.drawFingerBoard();
      })
      .then(() => {
        return this.drawLads();
      })
      .then(() => {
        return this.drawStringsCanv();
      })
      .then(() => {
        return this.drawStrings(strings);
      })
      .then(() => {
        return this.drawCapo();
      })
      .then(() => {
        return this.drawInfoCanv();
      });
  }

  set guitarHeight(height) {
    this.__guitarCanv.height = height;

    const space = height / 6;

    for (let i = 5; i >= 0; i--) {
      this.__stringsTop[i] = (space * (5.5 - i)) / height;
    }
  }

  get guitarHeight() {
    return this.__guitarCanv.height;
  }

  set guitarWidth(width) {
    this.__guitarCanv.width = width;

    this.__wallWidth = width * (this.__wallWidthPerc / 100);

    this.__shiftLadsPx[0] = width * (this.__shiftZeroLadPerc / 100) +
      width * (this.__wallWidthPerc / 100) / 2;
    width = width - this.__shiftLadsPx[0] - this.__wallWidth / 2;

    for (let i = 1; i <= 20; i++) {
      this.__shiftLadsPx[i] = this.__shiftLadsPx[i - 1] + (width / 17.817);
      width = width - (width / 17.817);
    }

    this.__shiftLadsPx[21] = this.__guitarCanv.width - this.__wallWidth;
  }

  get guitarWidth() {
    return this.__guitarCanv.width;
  }

  set capo(lad) {
    if (this.capo !== lad) {
      this.__shiftCapo = this.__shiftLadsPx[lad];
    } else {
      this.__shiftCapo = this.__shiftLadsPx[0];
    }
  }

  get capo() {
    if (!this.__shiftCapo) {
      return null;
    }

    return this.__shiftLadsPx.indexOf(this.__shiftCapo);
  }

  set chord(c) {
    if (!c) {
      this.__currentChord = '000000';
    } else {
      this.__currentChord = this.__chordsList[c];
    }
  }

  get chord() {
    for (const key in this.__chordsList) {
      if (this.__chordsList.hasOwnProperty(key) && this.__chordsList[key] === this.__currentChord) {
        return '' + key;
      }
    }

    return null;
  }

  set speed(s) {
    s = s < 100 ?
      s < 0 ? 0 : s
      : 100;
    this.__speedPlayAll = (100 - s) * 2 + 10;

    const ctx = this.__infoCanv.getContext('2d');
    ctx.clearRect(0, this.__infoCanv.height / 2, this.__infoCanv.width, this.__infoCanv.height / 2);

    ctx.textBaseline = 'bottom';
    ctx.fillText(`Speed: ${s}%`, 5, this.__infoCanv.height);
  }

  get speed() {
    return Math.round(100 - (this.__speedPlayAll - 10) / 2);
  }

  set volume(v) {
    v = v < 100 ?
      v < 0 ? 0 : v
      : 100;
    this.__volume = v / 100;
    for (let i = 0; i < 45; i++) {
      this.__sounds[i].volume = this.__volume;
    }

    const ctx = this.__infoCanv.getContext('2d');
    ctx.clearRect(0, 0, this.__infoCanv.width, this.__infoCanv.height / 2);

    ctx.textBaseline = 'top';
    ctx.fillText(`Volume: ${v}%`, 5, 5);
  }

  get volume() {
    return Math.round(this.__volume * 100);
  }

  get ws() {
    if (!!this.__wsPlay) {
      return {
        type: 'play',
        ws: this.__wsPlay
      };
    } else if (!!this.__wsPlay) {
      return {
        type: 'listen',
        ws: this.__wsListen
      };
    } else {
      return {
        type: '',
        ws: null
      };
    }
  }

  set ws(newWs) {
    this.__wsListen = null;
    this.__wsPlay = null;
    if (newWs.type === 'play') {
      this.__wsPlay = newWs.ws;
    } else if (newWs.type === 'listen') {
      this.__wsListen = newWs.ws;
      this.__wsListen.onmessage = (res) => {
        const msg = JSON.parse(res.data);
        if (msg.mode === 'listen' && this.__user && msg.user === this.__user) {
          let chord = msg.chord ? msg.chord : '000000';
          for (let i = 0; i < chord.length; i++) {
            if (chord[i] !== '0' || msg.string === i) {
              this.standFingerOnBoard(i, Guitar.getNumByLetter(chord[i]) + msg.capo, true);
            }
          }
          chord = chord.split('');
          chord[msg.string] = Guitar.getLetterByNum(Guitar.getNumByLetter(chord[msg.string]) + msg.capo);
          chord = chord.join('');
          this.playString(msg.string, chord);
        }
      };
    }
  }

  get user() {
    return this.__user;
  }

  set user(newUser) {
    this.__user = newUser;
  }


  loadSounds() {
    return new Promise(resolve => {
      if (this.__sounds.length < 7) {
        for (let i = 0; i < 45; i++) {
          this.__sounds[i] = new Sound(`assets/sounds/${i}.mp3`);
        }
      }
      if (!this.__speedPlayAll) {
        this.volume = 90;
        this.speed = 90;
      } else {
        this.volume = this.volume;
        this.speed = this.speed;
      }
      resolve();
    });
  }

  clearGuitar(height = this.__guitarCanv.height, width = this.__guitarCanv.width) {
    return new Promise((resolve) => {
      const ctxG = this.__guitarCanv.getContext('2d');

      ctxG.clearRect(0, 0, width, height);

      const ctxS = this.__stringsCanv.getContext('2d');

      ctxS.clearRect(0, 0, this.__stringsCanv.width, this.__stringsCanv.height);

      setTimeout(() => {
        resolve();
      }, 0);
    });
  }

  drawSoundBoard() {
    return new Promise((resolve) => {
      const ctx = this.__guitarCanv.getContext('2d');
      ctx.save();

      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(0, 0, 0, .5)';

      if (this.__soundBoardTexture === null) {
        this.__soundBoardTexture = document.createElement('img');
        this.__soundBoardTexture.src = 'assets/textures/red-oak.jpg';

        this.__soundBoardTexture.addEventListener('load', () => {
          ctx.fillStyle = ctx.createPattern(this.__soundBoardTexture, 'repeat');

          this.__drawSB(ctx);

          ctx.restore();
          resolve();
        });

        this.__soundBoardTexture.addEventListener('error', () => {
          ctx.fillStyle = 'rgb(227, 172, 54)';
          this.__soundBoardTexture = null;

          this.__drawSB(ctx);

          ctx.restore();
          resolve();
        });
      } else {
        ctx.fillStyle = ctx.createPattern(this.__soundBoardTexture, 'repeat');

        this.__drawSB(ctx);

        ctx.restore();
        resolve();
      }

    });
  }

  __drawSB(ctx) {
    const height = this.__guitarCanv.height;
    const width = this.__guitarCanv.width;

    ctx.beginPath();
    ctx.moveTo(width * .5, height * .5);
    ctx.quadraticCurveTo(width * .49, 0, width * .52, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(width * .6, height);
    ctx.quadraticCurveTo(width * .61, height * .6, width * .5, height * .5);
    ctx.fill();
  }

  drawSoundHole(height = this.__guitarCanv.height, width = this.__guitarCanv.width) {
    return new Promise((resolve) => {
      const ctx = this.__guitarCanv.getContext('2d');
      ctx.save();
      ctx.beginPath();

      const hole = {
        x: width * .8,
        y: height * .5,
        r: width * .1
      };

      ctx.arc(hole.x, hole.y, hole.r + 2, 0, Math.PI * 2);

      const holeWallGrad = ctx.createLinearGradient(hole.x - hole.r - 2, hole.y - hole.r - 2,
        hole.x - hole.r - 2, hole.y + hole.r + 2);
      holeWallGrad.addColorStop(0, 'rgba(0, 0, 0, .0)');
      holeWallGrad.addColorStop(1, 'rgba(72, 21, 14, .9');

      ctx.lineWidth = 5;
      ctx.strokeStyle = holeWallGrad;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);

      ctx.fillStyle = 'rgba(0, 0, 0, .8)';
      ctx.fill();

      ctx.restore();
      resolve();
    });
  }

  drawFingerBoard() {
    return new Promise((resolve) => {
      const ctx = this.__guitarCanv.getContext('2d');
      ctx.save();

      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(0, 0, 0, .9)';

      if (this.__fingerBoardTexture === null) {
        this.__fingerBoardTexture = document.createElement('img');
        this.__fingerBoardTexture.src = 'assets/textures/black-wood.jpg';

        this.__fingerBoardTexture.addEventListener('load', () => {
          ctx.fillStyle = ctx.createPattern(this.__fingerBoardTexture, 'repeat');

          this.__drawFB(ctx);

          ctx.restore();
          resolve();
        });

        this.__fingerBoardTexture.addEventListener('error', () => {
          ctx.fillStyle = 'rgb(27, 21, 14)';
          this.__fingerBoardTexture = null;

          this.__drawFB(ctx);

          ctx.restore();
          resolve();
        });
      } else {
        ctx.fillStyle = ctx.createPattern(this.__fingerBoardTexture, 'repeat');

        this.__drawFB(ctx);

        ctx.restore();
        resolve();
      }

    });
  }

  __drawFB(ctx) {
    const height = this.__guitarCanv.height;
    const width = this.__guitarCanv.width;

    ctx.beginPath();
    ctx.moveTo(0, height * .12);
    ctx.lineTo(this.__shiftLadsPx[0], height * .125);
    ctx.lineTo(this.__shiftLadsPx[20], 5);
    ctx.lineTo(this.__shiftLadsPx[20] + width * .025, 5);
    ctx.lineTo(this.__shiftLadsPx[20] + width * .005, height - 5);
    ctx.lineTo(this.__shiftLadsPx[0], height * .875);
    ctx.lineTo(0, height * .88);
    ctx.lineTo(0, height * .12);
    ctx.fill();
  }

  drawLads(height = this.__guitarCanv.height, width = this.__guitarCanv.width) {
    return new Promise((resolve) => {
      const ctx = this.__guitarCanv.getContext('2d');
      ctx.save();

      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(0, 0, 0, .7)';

      const zeroLadLength = this.__lengthLadsPx[0] = height * .75 - 10;
      const lastLadLength = height - 10;

      ctx.beginPath();
      ctx.moveTo(this.__shiftLadsPx[0], (height - zeroLadLength) / 2);
      ctx.lineTo(this.__shiftLadsPx[0], (zeroLadLength + height) / 2);
      const upNutsGradient = ctx.createLinearGradient(this.__shiftLadsPx[0] - this.__wallWidth / 2, 0,
        this.__shiftLadsPx[0] + this.__wallWidth / 2, 0);
      upNutsGradient.addColorStop(0.5, 'rgb(61, 43, 31)');
      upNutsGradient.addColorStop(1, 'rgb(31, 22, 16)');

      ctx.lineCap = 'round';
      ctx.lineWidth = this.__wallWidth;
      ctx.strokeStyle = upNutsGradient;

      ctx.stroke();

      const ladsGradient = [];
      const widthFingerBoard = this.__shiftLadsPx[20] - this.__shiftLadsPx[0];

      for (let i = 1; i <= 20; i++) {
        const shiftCurrFrom0 = this.__shiftLadsPx[i] - this.__shiftLadsPx[0];
        this.__lengthLadsPx[i] = ((widthFingerBoard - shiftCurrFrom0) * zeroLadLength + shiftCurrFrom0 * lastLadLength) /
          widthFingerBoard;

        ctx.beginPath();
        ctx.moveTo(this.__shiftLadsPx[i], (height - this.__lengthLadsPx[i]) / 2);
        ctx.lineTo(this.__shiftLadsPx[i], (this.__lengthLadsPx[i] + height) / 2);

        ladsGradient[i] = ctx.createLinearGradient(this.__shiftLadsPx[i] - this.__wallWidth / 2, 0,
          this.__shiftLadsPx[i] + this.__wallWidth / 2, 0);
        ladsGradient[i].addColorStop(0, 'rgb(161, 157, 150)');
        ladsGradient[i].addColorStop(0.5, 'rgb(214, 209, 200)');
        ladsGradient[i].addColorStop(1, 'rgb(107, 105, 100)');

        ctx.strokeStyle = ladsGradient[i];

        ctx.stroke();
      }

      const shiftLowNutFrom0 = this.__shiftLadsPx[21] - this.__shiftLadsPx[0];
      this.__lengthLadsPx[21] = (shiftLowNutFrom0 * this.__lengthLadsPx[20] -
        (shiftLowNutFrom0 - widthFingerBoard) * this.__lengthLadsPx[0]) / widthFingerBoard;

      ctx.beginPath();
      ctx.moveTo(width - this.__wallWidth, (height - this.__lengthLadsPx[21]) / 2);
      ctx.lineTo(width - this.__wallWidth, (this.__lengthLadsPx[21] + height) / 2);

      const lowNutsGradient = ctx.createLinearGradient(width - this.__wallWidth, 0,
        width, 0);
      lowNutsGradient.addColorStop(0.5, 'rgb(61, 43, 31)');
      lowNutsGradient.addColorStop(1, 'rgb(31, 22, 16)');

      ctx.strokeStyle = lowNutsGradient;

      ctx.stroke();

      ctx.restore();
      resolve();
    });
  }

  drawStringsCanv(height = this.__guitarCanv.height, width = this.__guitarCanv.width) {
    return new Promise((resolve) => {
      this.__stringsCanv.height = height;
      this.__stringsCanv.width = width;

      const ctx = this.__stringsCanv.getContext('2d');

      this.__shiftStartStrings = [
        height * -.03, height * -.015, height * -.005,
        height * .005, height * .015, height * .03
      ];

      this.__stringLColor = 'rgb(224, 229, 229)';

      const canvPtrn = document.createElement('canvas');
      canvPtrn.height = 6;
      canvPtrn.width = 6;

      const ctxPtrn = canvPtrn.getContext('2d');
      ctxPtrn.fillStyle = 'rgb(27, 21, 14)';
      ctxPtrn.fillRect(0, 0, 6, 6);

      const stringG = ctxPtrn.createLinearGradient(0, 0, 6, 0);
      stringG.addColorStop(0, 'rgb(103, 64, 25)');
      stringG.addColorStop(0.5, 'rgb(205, 127, 50)');
      stringG.addColorStop(1, 'rgb(51, 32, 13)');

      ctxPtrn.beginPath();
      ctxPtrn.moveTo(1, 0);
      ctxPtrn.lineTo(0, 6);
      ctxPtrn.lineTo(5, 6);
      ctxPtrn.lineTo(6, 0);
      ctxPtrn.closePath();
      ctxPtrn.fillStyle = stringG;
      ctxPtrn.fill();
      this.__stringBColor = ctx.createPattern(canvPtrn, 'repeat');

      resolve();
    });
  }


  drawStrings(numbers = [0, 1, 2, 3, 4, 5],
              height = this.__stringsCanv.height, width = this.__stringsCanv.width) {
    return new Promise((resolve) => {
      const ctx = this.__stringsCanv.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.save();

      for (const i of numbers) {
        this.__drawStringPlaying(i, this.capo);
      }

      ctx.restore();
      resolve();
    });
  }

  drawCapo(height = this.__stringsCanv.height) {
    return new Promise((resolve) => {
      if (!this.capo) {
        resolve();
        return;
      }

      const ctx = this.__stringsCanv.getContext('2d');
      ctx.save();

      const capoPos = {
        x: this.__shiftLadsPx[this.capo] - 3 * this.__wallWidth,
        y: (height - this.__lengthLadsPx[this.capo]) / 2
      };

      ctx.beginPath();
      ctx.moveTo(capoPos.x, capoPos.y);
      ctx.lineTo(capoPos.x, capoPos.y + this.__lengthLadsPx[this.capo]);

      ctx.lineWidth = this.__wallWidth * 4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgb(9, 7, 5)';

      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(capoPos.x, capoPos.y + height * .05);
      ctx.lineTo(capoPos.x, capoPos.y + this.__lengthLadsPx[this.capo] - height * .05);

      const capoInGradient = ctx.createRadialGradient(capoPos.x, capoPos.y + this.__lengthLadsPx[this.capo] / 2,
        (this.__lengthLadsPx[this.capo] - height * .1) / 10,
        capoPos.x, capoPos.y + this.__lengthLadsPx[this.capo] / 2,
        (this.__lengthLadsPx[this.capo] - height * .1) / 2);

      capoInGradient.addColorStop(0, 'rgb(54, 42, 28)');
      capoInGradient.addColorStop(1, 'rgb(9, 7, 5)');

      ctx.lineWidth = this.__wallWidth * 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = capoInGradient;

      ctx.stroke();

      ctx.restore();
      resolve();
    });
  }

  drawChord(chord = this.__currentChord) {

    if (!chord || chord.length !== 6) {
      return;
    }

    const ctx = this.__stringsCanv.getContext('2d');
    const height = this.__stringsCanv.height;
    const width = this.__stringsCanv.width;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < chord.length; i++) {
      let fingerPos = null;

      fingerPos = Guitar.getNumByLetter(chord[i]);
      if (fingerPos < 21) {
        fingerPos += this.capo;
        fingerPos = fingerPos > 20 ? 20 : fingerPos;
      }

      this.__drawStringPlaying(i, fingerPos);

      this.drawCapo().then(() => {
        this.__drawFingerOnChord(i, fingerPos);
      });
    }
  }

  drawInfoCanv(height = this.__guitarCanv.height, width = this.__guitarCanv.width) {
    return new Promise((resolve) => {
      this.__infoCanv.height = height;
      this.__infoCanv.width = width;

      const ctx = this.__infoCanv.getContext('2d');
      const h = Math.round(this.__infoCanv.height * .075);

      ctx.font = `${h}px sans-serif`;
      ctx.fillStyle = 'rgb(127, 142, 154)';

      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 1;
      ctx.shadowColor = 'rgba(27, 72, 77, .9)';

      resolve();
    });
  }

  playStringsAll({mode = 'down'}) {
    if (mode === 'down') {
      let i = 5;

      const playStringN = setInterval(() => {
        this.playString(i);
        i--;

        if (i < 0) {
          clearInterval(playStringN);
        }
      }, this.__speedPlayAll);
    } else if (mode === 'up') {
      let i = 0;

      const playStringN = setInterval(() => {
        this.playString(i);
        i++;

        if (i > 5) {
          clearInterval(playStringN);
        }
      }, this.__speedPlayAll);

    }
  }

  muteStringsAll() {
    for (let i = 0; i < 45; i++) {
      this.__sounds[i].stop();
    }
  }

  playStringsByNotes(notes = '------') {

    for (let i = 0; i < 6; i++) {
      if (notes[i] === '-') {
        continue;
      }

      this.capo = 0;

      let tempChord = '000000';
      tempChord = tempChord.slice(0, i) + notes[i] +
        tempChord.slice(i + 1, 6);
      this.standFingerOnBoard(i, Guitar.getNumByLetter(notes[i]), true);
      this.playString(i, tempChord);
    }
  }

  clearFingerBoard() {
    for (let i = 0; i < 6; i++) {
      this.standFingerOnBoard(i, 0, true);
    }
  }

  playString(num = 0, chord = this.__currentChord) {

    if (this.__wsPlay && this.__user) {
      this.__wsPlay.send(JSON.stringify({
        mode: 'play',
        user: this.__user,
        string: num,
        chord: chord,
        capo: this.capo
      }));
    }

    let shift = this.capo;

    if (chord !== null) {

      shift = Guitar.getNumByLetter(chord[num]);
      if (shift < 21) {
        shift += this.capo;
        shift = shift > 20 ? 20 : shift;
      }
    }

    if (shift !== 21) {

      switch (num) {
        case 5:
          this.__sounds[shift].play();
          break;
        case 4:
          this.__sounds[shift + 5].play();
          break;
        case 3:
          this.__sounds[shift + 10].play();
          break;
        case 2:
          this.__sounds[shift + 15].play();
          break;
        case 1:
          this.__sounds[shift + 19].play();
          break;
        case 0:
          this.__sounds[shift + 24].play();
          break;
      }
    }

    const ctx = this.__stringsCanv.getContext('2d');
    ctx.save();

    const strings = [];

    for (let i = 0; i < 6; i++) {
      if (i !== num) {
        strings.push(i);
      }
    }

    Animation.animate({
      duration: 25,
      timing: Animation.linearTiming,
      draw: (progress) => {
        const stepMoving = progress * (num  / 3 + 4);
        const stepAlpha = progress * .3;

        this.__drawStringPlaying(num, shift, stepMoving, stepAlpha, true);
      },
      complete: () => {
        Animation.animate({
          duration: 150 + (num * 10),
          timing: Animation.makeEaseOutTimingF(Animation.elasticTiming),
          draw: (progress) => {
            const stepMoving = -progress * (num / 3 + 4);
            const stepAlpha = progress * .3;

            this.__drawStringPlaying(num, shift, stepMoving, stepAlpha, true);
          },
          complete: () => {
            this.drawStrings([num])
              .then(() => {
                return this.drawCapo();
              })
              .then(() => {
                this.drawChord();
              });
          }
        });
      }
    });
  }

  standFingerOnBoard(num, shift, hiddenChord = false) {
    if (shift < this.capo) {
      return;
    }

    shift = shift - this.capo;

    shift = Guitar.getLetterByNum(shift);

    if (this.__currentChord[num] !== shift || hiddenChord) {
      this.__currentChord = this.__currentChord.slice(0, num) + `${shift}` +
        this.__currentChord.slice(num + 1, this.__currentChord.length);
    } else {
      this.__currentChord = this.__currentChord.slice(0, num) + '0' +
        this.__currentChord.slice(num + 1, this.__currentChord.length);
    }

    this.drawChord();
  }

  getStringAndChordByXY(x, y) {
    const height = this.__stringsCanv.height;

    let mode = null;
    let string = null;
    let chord = null;

    for (let i = 0; i < this.__shiftLadsPx.length; i++) {
      if (x <= this.__shiftLadsPx[i]) {
        chord = i;
        break;
      }
    }

    if (chord === null) {
      mode = 'none';
    } else if (chord <= 20) {
      mode = 'chord';
    } else {
      mode = 'string';
    }

    const fingerBoardY = (height - this.__lengthLadsPx[chord]) / 2;
    if (y < fingerBoardY) {
      mode = 'up-none';
    } else if ( y > height - fingerBoardY) {
      mode = 'down-none';
    } else {
      y -= fingerBoardY;

      for (let i = 5; i >= 0; i--) {
        if (y < (this.__lengthLadsPx[chord] / 6) * (6 - i)) {
          string = i;
          break;
        }
      }
    }

    return {
      mode,
      string,
      chord
    };
  }

  __drawStringPlaying(num, shift, stepMoving = 0, stepAlpha = .3, isAnimatable = false) {
    const width = this.__stringsCanv.width;

    const ctx = this.__stringsCanv.getContext('2d');
    ctx.save();

    ctx.globalCompositeOperation = 'destination-over';

    if (num < 2) {
      ctx.strokeStyle = this.__stringLColor;
    } else {
      ctx.strokeStyle = this.__stringBColor;
    }

    ctx.lineWidth = this.__stringsWidth[num];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const strPos = this.__calcStringPositionY(num, shift);

    if (!isAnimatable) {

      ctx.beginPath();
      ctx.moveTo(0, strPos.startCY + this.__shiftStartStrings[num]);
      ctx.lineTo(this.__shiftLadsPx[0], strPos.startCY);
      ctx.lineTo(this.__shiftLadsPx[shift], strPos.startCY + strPos.endCY);

      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 1;
      ctx.shadowColor = 'rgba(0, 0, 0, .8)';

      ctx.stroke();
    } else if (shift <= 20) {

      const upStrPos = this.__calcStringPositionY(num + 1, 0);
      const lowStrPos = this.__calcStringPositionY(num - 1, 0);

      let clearingY = num > 1 ? upStrPos.startOY : upStrPos.startOY + upStrPos.endOY ;
      let clearingW = num > 3 ? lowStrPos.startOY + lowStrPos.endOY - clearingY : lowStrPos.startOY - clearingY;

      switch (num) {
        case 0:
          clearingY += this.__stringsWidth[num + 1] + 2;
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          clearingY += this.__stringsWidth[num + 1] / 2 + 3;
          clearingW -= this.__stringsWidth[num + 1] + 2 + this.__stringsWidth[num - 1] / 2;
          break;
        case 5:
          clearingW -= this.__stringsWidth[num - 1] / 2;
          break;
      }

      ctx.clearRect(this.__shiftLadsPx[shift], clearingY, width - this.__shiftLadsPx[shift], clearingW);
    }

    if (shift <= 20) {

      ctx.beginPath();
      ctx.moveTo(this.__shiftLadsPx[shift], strPos.startOY);
      ctx.quadraticCurveTo((width + this.__shiftLadsPx[shift]) / 2, strPos.startOY + strPos.endOY / 2 + stepMoving,
        width - this.__wallWidth * 1.2, strPos.startOY + strPos.endOY);

      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
      ctx.shadowColor = 'rgba(0, 0, 0, .7)';

      ctx.globalAlpha = .7 + stepAlpha;

      ctx.stroke();
    }

    ctx.restore();
  }

  __calcStringPositionY(num, shift) {
    const height = this.__stringsCanv.height;

    if (num === 6) {
      return {
        startCY: 5, endCY: 5, startOY: 5, endOY: 5
      };
    } else if (num === -1) {
      return {
        startCY: height, endCY: height, startOY: height, endOY: height
      };
    }


    const startCY = this.__stringsTop[num] * this.__lengthLadsPx[0] + (height - this.__lengthLadsPx[0]) / 2;

    const endCY = -(startCY -
      (this.__stringsTop[num] * this.__lengthLadsPx[shift] + (height - this.__lengthLadsPx[shift]) / 2)) +
      shift / 4;

    const startOY = startCY + endCY;
    const endOY = -(startOY -
      (this.__stringsTop[num] * this.__lengthLadsPx[21] + (height - this.__lengthLadsPx[21]) / 2));

    return {
      startCY, endCY, startOY, endOY
    };
  }

  __drawFingerOnChord(num, shift) {
    const height = this.__stringsCanv.height;

    if (shift <= this.capo || shift > 20) {
      return;
    }

    const ctx = this.__stringsCanv.getContext('2d');
    ctx.save();

    const fingerPos = {
      x: this.__shiftLadsPx[shift] - 3 * this.__wallWidth,
      y: (height - this.__lengthLadsPx[shift]) / 2 + this.__lengthLadsPx[shift] / 6 * (5.5 - num) + shift / 3
    };

    ctx.beginPath();
    ctx.moveTo(fingerPos.x, fingerPos.y);
    ctx.lineTo(fingerPos.x, fingerPos.y + 1);

    ctx.lineWidth = this.__wallWidth * 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgb(200, 8, 21)';

    ctx.stroke();

    ctx.restore();
  }
}
