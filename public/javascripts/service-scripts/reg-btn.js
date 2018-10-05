function regBtnOnclick(e) {
  let shadow = document.querySelector('detail-info').shadowRoot;

  let reg = shadow.querySelector('#reg');

  if (reg.classList.contains('new')) {
    reg.classList.remove('new');
    reg.classList.add('create');
    reg.classList.add('active-btn');
    reg.type = "submit";

    reg.textContent = "Create";

    let divs = reg.parentElement.parentElement.children;

    for (let div of divs) {
      if (div.id === "verify-block") continue;
      div.style.display = "block";
    }

    let authoBtn = reg.parentElement.children[1];
    authoBtn.classList.remove('active-btn');
    authoBtn.style.display = "none";

    let login = shadow.querySelector('#login');
    login.pattern = "[a-z]{2,}|[0-9]{2,}|[a-z0-9]{2,}";
    login.placeholder = "lower case letters and (or) numbers";

    let password = shadow.querySelector('#password');
    password.autocomplete = "new-password";
    password.pattern = "[0-9a-z]{6,}|[0-9A-Z]{6,}|[0-9a-zA-Z]{6,}";
    password.placeholder = "min 6 chars, letters and numbers";

    let hat = shadow.querySelector('.hat');
    hat.children[0].children[0].innerHTML = "<b>registration</b>&nbsp;";

    e.preventDefault();

  } else if (reg.classList.contains('create')) {
    let reqElems = shadow.querySelectorAll('input[required]');

    for (let reqElem of reqElems) {
      if (!reqElem.validity.valid && reqElem.id !== 'verify') return;
    }

    let divMessage = shadow.querySelector('#div-message');

    let login = shadow.querySelector('#login'),
        password = shadow.querySelector('#password'),
        passwordRepeat = shadow.querySelector('#password-repeat'),
        email = shadow.querySelector('#email'),
        tag = shadow.querySelector('#tag'),
        name = shadow.querySelector('#name'),
        birthday = shadow.querySelector('#birthday'),
        place = shadow.querySelector('#place'),
        country = shadow.querySelector('#country'),
        hatColor = shadow.querySelector('#hat-color');

    if (password.value !== passwordRepeat.value) {
      password.value = "";
      passwordRepeat.value = "";
      divMessage.textContent = "Passwords are different!";
      return;
    }

    fetch("/r", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({
        login: login.value,
        password: password.value,
        email: email.value,
        tag: tag.value,
        name: name.value,
        birthday: birthday.value,
        place: place.value,
        country: country.value,
        hatColor: hatColor.value
      })
    })
        .then(response => {
          switch (response.status) {
            case 500:
              return response.text();
            case 501:
              return response.text();
            case 400:
              divMessage.textContent = "Not unique!";
              return response.text();
            case 200:
              divMessage.textContent = "Ok!";
              return response.text();
            default:
              throw new Error();
          }
        })
        .then(message => {
          if (divMessage.textContent === "Not unique!") {
            if (message[0] === "L") {
              login.value = "";
            } else if (message[0] === "E") {
              email.value = "";
            }
            divMessage.textContent = message + " Change it to another one.";

          } else if (divMessage.textContent === "Ok!") {
            divMessage.innerHTML = `Registration has done successful. <br>
                Please, input verifying code (it was sent to your email).`;
            let verifyBlock = shadow.querySelector('#verify-block');
            verifyBlock.style.display = "block";
            reg.classList.remove('create');
            reg.classList.add('verify');
            reg.textContent = "Verify";

            let hat = shadow.querySelector('.hat');
            hat.children[0].children[0].innerHTML = "<b>verifying</b>&nbsp;";

            passwordRepeat.parentElement.style.display = "none";
            email.parentElement.style.display = "none";
            tag.parentElement.style.display = "none";
            name.parentElement.style.display = "none";
            birthday.parentElement.style.display = "none";
            place.parentElement.style.display = "none";
            country.parentElement.style.display = "none";
            hatColor.parentElement.style.display = "none";

          } else {
            divMessage.textContent = message + "";
          }

        })
        .catch(() => {
          divMessage.textContent = "Something wrong! Please press 'Create' again...";
        });

    e.preventDefault();
  } else if (reg.classList.contains('verify')) {

    let divMessage = shadow.querySelector('#div-message');

    let login = shadow.querySelector('#login');
    let password = shadow.querySelector('#password');
    let verify = shadow.querySelector('#verify');

    if (!login.validity.valid ||
        !password.validity.valid ||
        !verify.validity.valid) return;

    fetch('/v', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({
        login: login.value,
        password: password.value,
        verifyCode: verify.value
      })
    })
        .then((response) => {
          switch (response.status) {
            case 200:
              divMessage.textContent = "Ok!";
              return response.text();
            case 202:
              password.value = "";
              return response.text();
            case 203:
              verify.value = "";
              return response.text();
            case 403:
              login.value = "";
              return response.text();
            case 501:
              return response.text();
            default:
              throw new Error();
          }
        })
        .then(message => {
          if (divMessage.textContent === "Ok!") {
            let mainMenu = document.querySelector('main-menu');
            mainMenu.on();

            setTimeout(() => {
              hideDetail();
              window.location.replace(`/${message}`);
            }, 250);

          } else {
            divMessage.textContent = message + "";
          }
        })
        .catch(() => {
          divMessage.textContent = "Something wrong! Please press 'Verify' again...";
        });

    e.preventDefault();
  }
}
