function logoutBtnOnclick(e) {
  let divMessage = document.querySelector('detail-info').shadowRoot.querySelector('#div-message');

  fetch('/o', {
    method: "POST",
    credentials: "include"
  })
      .then(response => {
        switch (response.status) {
          case 200:
            let mainMenu = document.querySelector('main-menu');
            mainMenu.off();
            divMessage.textContent = "Ok!";
            setTimeout(() => {
              hideDetail();
              window.location.reload();
            }, 250);
            break;
          default:
            throw new Error();
        }
      })
      .catch(() => {
        divMessage.textContent = "Something wrong! Please press 'Log Out' again...";
      });

  e.preventDefault();
}