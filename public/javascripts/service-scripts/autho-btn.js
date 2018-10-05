function authoBtnOnclick(e) {
  let shadow = document.querySelector('detail-info').shadowRoot;

  let autho = shadow.querySelector('#autho');
  let divMessage = shadow.querySelector('#div-message');

  let login = shadow.querySelector('#login');
  let password = shadow.querySelector('#password');

  if (!login.validity.valid ||
      !password.validity.valid) return;

  fetch('/a', {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "include",
    body: JSON.stringify({
      login: login.value,
      password: password.value
    })
  })
      .then(response => {
        switch (response.status) {
          case 200:
            divMessage.textContent = "Ok!";
            return response.text();
          case 202:
            password.value = "";
            return response.text();
          case 203:
            let verifyBlock = shadow.querySelector('#verify-block');
            verifyBlock.style.display = "block";

            autho.style.display = "none";
            let hat = shadow.querySelector('.hat');
            hat.children[0].children[0].innerHTML = "<b>verifying</b>&nbsp;";

            let regBtn = autho.parentElement.children[0];
            regBtn.classList.remove('new');
            regBtn.classList.add('verify');
            regBtn.classList.add('active-btn');
            regBtn.textContent = "Verify";
            regBtn.type = "submit";
            return response.text();
          case 403:
            login.value = "";
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
          divMessage.innerHTML = message + "";
        }
      })
      .catch(() => {
        divMessage.textContent = "Something wrong! Please press 'Sign In' again...";
      });

  e.preventDefault();
}