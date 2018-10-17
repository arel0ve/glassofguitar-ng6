class DetailInfo extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({mode: 'open'});

    let opacityWrapper = document.createElement('div');
    opacityWrapper.classList.add('opacity-wrapper');

    opacityWrapper.addEventListener('click', (e) => {
      let target = e.target;

      if (target.closest('.wrapper-detail') !== null) return;

      hideDetail();
    });

    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-detail');

    let hat = document.createElement('div');
    hat.classList.add('hat');

    this.__userName = document.createElement('div');
    this.__userName.classList.add('user-name');

    let tagUser = document.createElement('span');

    let fullNameUser = document.createElement('span');

    this.__userName.appendChild(tagUser);
    this.__userName.appendChild(fullNameUser);

    let closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');

    closeBtn.addEventListener('click', (e) => {
      let target = e.target.closest('.close-btn');

      if (!target) return;

      hideDetail();
    });

    hat.appendChild(this.__userName);
    hat.appendChild(closeBtn);

    this.__infoBlock = document.createElement('div');
    this.__infoBlock.classList.add('info-block');

    let style = document.createElement('style');
    style.textContent = `.opacity-wrapper { 
          position: fixed;
          top: 0px;
          height: 100%;
          left: 0px;
          width: 100%;
          background-color: rgb(0, 0, 0, .0);
        }
          
        .wrapper-detail {
          position: fixed;
          display: inline-block;
          top: 3%;
          height: 95%;
          left: 20%;
          width: 60%;
          box-shadow: inset 0px -5px 12px 7px rgba(49, 54, 49, .5);
          border-radius: 10px;
          background-color: rgb(121, 132, 127);
          color: rgb(207, 227, 254);
          font-family: "Ubuntu Regular", sans-serif;
        }
        
        .wrapper-detail b {
          color: rgb(77, 81, 89);
        }
        
        .hat {
          height: 30px;
        }
        
        .user-name {
          display: inline-block;
          width: calc(100% - 50px);
          text-align: center;
          text-transform: uppercase;
          font-kerning: normal;
          font-size: 1.2em;
          margin-left: 12px;
          padding-top: 5px;
          border-bottom: thick dotted rgba(77, 81, 89, .7);
        }
        
        .close-btn {
          display: inline-block;
          width: 30px;
          height: 100%;
          text-align: center;
          font-size: 1.5em;
          vertical-align: middle;
          cursor: pointer;
          color: rgb(127, 81, 77);
        }
        
        .close-btn::before {
          content: "✗";
        }
        
        .close-btn:hover {
          color: rgb(181, 81, 77);
        }
        
        .close-btn:active {
          color: rgb(127, 49, 54);
        }
        
        .info-block {
          margin-left: 12px;
          margin-right: 12px;
          margin-top: 6px;
          margin-bottom: 6px;
          max-height: calc(100% - 42px);
          text-align: center; 
          overflow-x: hidden;
          overflow-y: auto;
        }
               
        .info-block::-webkit-scrollbar {
          width: 6px;
        }

        .info-block::-webkit-scrollbar-track-piece {
          background-color: rgba(0, 0, 0, .0);
        }

        .info-block::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, .5);
          border-radius: 50% / 4px;
        }

        .info-block::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, .7);
        }
        
        .increased-text {
          display: inline-block;
          color: rgb(0, 0, 0);
          text-align: justify;
        }
        
        .increased-text p {
          text-indent: 5%;
        }
               
        .increased-text hr {
          border: none;
          border-top: 3px double rgba(0, 0, 0, .7);
          color: rgba(0, 0, 0, .9);
          overflow: visible;
          text-align: center;
          height: 5px;
          margin: 0 5%;
        }
        
        .increased-text hr:after {
          background-color: rgb(121, 132, 127);
          content: '⋱☘⋰';
          padding: 0 4px;
          position: relative;
          top: -14px;
        }
        
        .increased-text strong {
          color: rgb(181, 81, 77);
          text-shadow: 1px 1px rgba(0, 0, 0, .7);
        }
        
        .increased-text kbd {
          background-color: rgb(107, 112, 109);
          border-style: solid;
          border-width: 1px 2px 2px 1px;
          padding: 0 1px;
        }
        
        .increased-photo { 
          width: 100%;
          height: calc(100% - 6px);
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
        
        .increased-login {
          text-align: center;
        }
        
        fieldset {
          background: rgba(0, 0, 0, .2);
          width: 50%;
          position: relative;
          left: calc(25% - 12px);
        }
        
        legend {
          background: rgba(0, 0, 0, .8);
          padding: 3px 6px;
          border-radius: 5px;
          text-align: left;
        }
        
        fieldset > div {
          margin: 10px 0px;
          text-align: center;
        }
        
        label > span {
          position: absolute;
          right: calc(60% + 5px);
        }
        
        label > input {
          width: 50%;
          position: relative;
          left: 15%;
        } 
        
        input:invalid:not(:focus) {
          outline: 1px solid #f00;
        }
        
        .btn-div {
          margin-top: 25px;
          display: flex;
          justify-content: space-between; 
        }
        
        button {
          cursor: pointer;
          font-family: "Ubuntu Regular", sans-serif;
          color: rgba(0, 0, 0, .7);
        }
        
        .active-btn {
          color: rgb(0, 0, 0);
          text-decoration: underline rgba(0, 0, 0, .3);
        }
        
        .bio-input {
          background: rgba(7, 9, 7, .7);
          color: rgb(177, 207, 227);
          caret-color: rgba(177, 207, 227, .3); 
          font-family: "Ubuntu Regular", sans-serif;
          font-size: 1.1em;
          position: absolute;
          height: calc(100% - 53px);
          top: 36px;
          width: calc(100% - 29px);
          left: 12px;
          resize: none;
        }
        
        .bio-input::-webkit-scrollbar {
          width: 6px;
        }

        .bio-input::-webkit-scrollbar-track-piece {
          background-color: rgba(0, 0, 0, .0);
        }

        .bio-input::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, .5);
          border-radius: 50% / 4px;
        }

        .bio-input::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, .7);
        }
        
        .bio-saved {
          color: rgb(177, 227, 207);
          caret-color: rgb(127, 254, 181);
        }
        
        .bio-not-saved {
          color: rgb(227, 177, 207);
          caret-color: rgb(254, 127, 181);
        }
        `;

    shadow.appendChild(style);
    shadow.appendChild(opacityWrapper);

    opacityWrapper.appendChild(wrapper);
    wrapper.appendChild(hat);
    wrapper.appendChild(this.__infoBlock);
  }

  showInfo() {
    let increasedInfo = null;

    let user = window.location.href.slice(7);
    user = user.slice(user.indexOf('/') + 1);
    if (~user.indexOf('/')) {
      user = user.slice(0, user.indexOf('/'));
    }

    switch (this.getAttribute('type')) {
      case "photo":
        increasedInfo = document.createElement('div');
        increasedInfo.classList.add('increased-photo');

        fetch('/i', {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          credentials: "include",
          body: JSON.stringify({
            user: user
          })
        })
            .then(response => {
              switch (response.status) {
                case 200:
                  let iPhoto = document.createElement('input');
                  iPhoto.type = 'file';
                  iPhoto.accept = "image/png, image/jpeg";

                  iPhoto.addEventListener('change', function() {
                    let reader = new FileReader();

                    reader.onload = function(e) {
                      let img = document.createElement('img');

                      img.onload = function() {
                        let canv = document.createElement('canvas');
                        canv.width = 640;
                        canv.height = 640;
                        let ctx = canv.getContext('2d');

                        let width = this.width;
                        let height = this.height;

                        if (width > height) {
                          width = height;
                        } else {
                          height = width;
                        }

                        ctx.drawImage(img, 0, 0, width, height, 0, 0, canv.width, canv.height);
                        increasedInfo.style.backgroundImage = `url(${canv.toDataURL()})`;

                        canv.toBlob(function (blob) {

                          let formData = new FormData();
                          formData.append("fileUploaded", blob, "pic.png");

                          iPhoto.style.color = "rgb(207, 207, 207)";

                          fetch('/p', {
                            method: "POST",
                            credentials: "include",
                            body: formData
                          })
                              .then(response => {
                                switch (response.status) {
                                  case 200:
                                    iPhoto.style.color = "rgb(177, 227, 207)";
                                    hideDetail();
                                    window.location.reload();
                                    break;
                                  default:
                                    throw new Error();
                                }
                              })
                              .catch(() => {
                                iPhoto.style.color = "rgb(227, 177, 207)";
                              });

                        });

                      };
                      img.src = e.target.result;
                    };

                    reader.readAsDataURL(this.files[0]);

                  });

                  this.__infoBlock.appendChild(iPhoto);

                  increasedInfo.style.height = "calc(100% - 25px)";
                  return response.json();

                case 203:
                  return response.json();
                default:
                  throw new Error();
              }
            })
            .then(message => {
              let picUrl = message.photo + "" === "" ? "../images/no-photo.png" : message.photo + "";

              increasedInfo.style.backgroundImage = `url(${picUrl})`;
              this.__userName.children[0].innerHTML = `<b>${message.tag}</b>&nbsp;`;
              this.__userName.children[1].innerHTML = message.name;
              this.__infoBlock.style.height = "100%";
            })
            .catch(() => {
              increasedInfo.style.backgroundImage = "url(../images/no-photo.png)";
              this.__infoBlock.style.height = "100%";
            });
        break;

      case "bio":
        increasedInfo = document.createElement('div');
        increasedInfo.classList.add('increased-text');
        let iBio = null;

        fetch('/b', {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          credentials: "include",
          body: JSON.stringify({
            type: "get",
            user: user
          })
        }).then(response => {
          switch(response.status) {
            case 200:
              iBio = document.createElement('textarea');
              iBio.classList.add('bio-input');
              iBio.maxLength = 10000;
              increasedInfo.style.width = "100%";
              increasedInfo.style.textAlign = "center";
              iBio.textContent = "Ok!";
              return response.json();
            case 203:
            case 403:
              iBio = document.createElement('div');
              return response.json();
            default:
              throw new Error();
          }

        })
            .then(message => {
              if (iBio.textContent === "Ok!") {
                iBio.textContent = "";
                iBio.value = message.biography;

                iBio.addEventListener('keyup', () => {
                  let textBio = iBio.value;

                  fetch('/b', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      type: "post",
                      user: user,
                      bio: textBio
                    })
                  })
                      .then((response) => {
                        switch (response.status) {
                          case 200:
                            iBio.classList.remove('bio-not-saved');
                            iBio.classList.add('bio-saved');
                            break;
                          default:
                            throw new Error();
                        }
                  })
                      .catch(() => {
                        iBio.classList.remove('bio-saved');
                        iBio.classList.add('bio-not-saved');
                      });
                });

              } else {
                iBio.innerHTML = message.biography;
              }
              this.__userName.children[0].innerHTML = `<b>${message.tag}</b>&nbsp;`;
              this.__userName.children[1].innerHTML = message.name;
              increasedInfo.appendChild(iBio);
            })

            .catch(() => {
              iBio = document.createElement('div');
              iBio.textContent = "Sorry... We can not load data from server now.";
              increasedInfo.appendChild(iBio);
            });
        break;

      case "help":
        this.__userName.children[0].innerHTML = "<b>info</b>&nbsp;";
        this.__userName.children[1].innerHTML = "how to play";

        increasedInfo = document.createElement('div');
        increasedInfo.innerHTML = "Please wait... Tutorial still loading...";

        fetch('/data/how-to-play.html')
            .then(response => {
              return response.text();
            })
            .then(infoText => {
              increasedInfo.innerHTML = infoText;
            })
            .catch(e => {
              increasedInfo.innerHTML = "<p>Sorry... I can't load tutorial now.</p>" +
                  "<p>Try again after few seconds, maybe later it will be ok.</p>";
              console.log(e);
            });

        increasedInfo.classList.add('increased-text');
        break;

      case "login":
        this.__userName.children[0].innerHTML = "<b>authorization</b>&nbsp;";
        this.__userName.children[1].innerHTML = "";

        increasedInfo = document.createElement('form');
        increasedInfo.method = "post";
        increasedInfo.autocomplete = true;
        increasedInfo.classList.add('increased-login');

        fetch('/data/authorization.html')
            .then(response => {
              return response.text();
            })
            .then(authoHTML => {
              increasedInfo.innerHTML = authoHTML;
            })
            .catch(e => {
              increasedInfo.innerHTML = "<p>Sorry... I can't load tutorial now.</p>" +
                  "<p>Try again after few seconds, maybe later it will be ok.</p>";
              console.log(e);
            });

        break;

      case "logout":
        this.__userName.children[0].innerHTML = "<b>log</b>&nbsp;";
        this.__userName.children[1].innerHTML = "out";

        increasedInfo = document.createElement('form');
        increasedInfo.method = "post";

        increasedInfo.innerHTML = `<fieldset id='logout-field'>
            <legend>LOG OUT</legend>
            <label>Are you sure to exit?</label>
            <div id="div-message" style="margin-top: 1em"></div>
            <div class="btn-div">
              <button type="button" id="logout" class="new" onclick="logoutBtnOnclick(event);">Yes</button>
              <button type="submit" id="cancel" class="active-btn" onclick="hideDetail(); return false;">No</button>
            </div>
            </fieldset>`;

        break;

      case "new-song":
        this.__userName.children[0].innerHTML = "<b>new</b>&nbsp;";
        this.__userName.children[1].innerHTML = "song";

        increasedInfo = document.createElement('form');
        increasedInfo.classList.add('increased-login');

        increasedInfo.innerHTML = `<fieldset id='newsong-field'>
            <legend>NEW SONG</legend>
            <div>
              <label for="artist">
                <span>Artist:</span>
                <input type="text" id="artist" required>
              </label>
            </div>
            <div>
              <label for="title">
                <span>Title:</span>
                <input type="text" id="title" required>
              </label>
            </div>
            <div id="div-message" style="margin-top: 1em"></div>
            <div class="btn-div">
              <button type="button" id="cancel" class="new" onclick="hideDetail(); return false;">Cancel</button>
              <button type="submit" id="create" class="active-btn" onclick="createSongBtnOnclick(event);">Create</button>
            </div>
            </fieldset>`;

        break;

      case "404-user":
        this.__userName.children[0].innerHTML = `User <b>${this.getAttribute('login')}</b>&nbsp;`;
        this.__userName.children[1].innerHTML = "Not Found";

        increasedInfo = document.createElement('div');
        increasedInfo.style.backgroundImage = "url(images/no-photo.png)";
        this.__infoBlock.style.height = "100%";
        increasedInfo.classList.add('increased-photo');

        break;
    }

    this.__infoBlock.appendChild(increasedInfo);
  }
}
if (window.customElements) {
  customElements.define('detail-info', DetailInfo);
}
