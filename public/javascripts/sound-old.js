class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");

    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.preload = "auto";

    document.body.appendChild(this.sound);
  }

  set volume(v) {
    this.sound.volume = v;
  }

  get volume() {
    return this.sound.volume;
  }

  play() {
    this.sound.currentTime = 0;
    this.sound.play()
        .catch((e) => {
          console.log(`Error: ${e}`);
        });
  }

  stop() {
    this.sound.pause();
  }

}