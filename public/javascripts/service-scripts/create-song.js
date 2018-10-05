function createSongBtnOnclick(e) {
  let shadow = document.querySelector('detail-info').shadowRoot;

  let artist = shadow.querySelector('#artist');
  let title = shadow.querySelector('#title');

  let divMessage = shadow.querySelector('#div-message');

  if (!artist.validity.valid ||
      !title.validity.valid) return;

  fetch('/n', {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "include",
    body: JSON.stringify({
      artist: artist.value,
      title: title.value
    })
  })
      .then(response => {
        switch (response.status) {
          case 200:
            divMessage.textContent = "Ok!";
            return response.text();
          case 203:
            artist.value = "";
            title.value = "";
            return response.text();
          default:
            throw new Error();
        }
      })
      .then(message => {
        if (divMessage.textContent === "Ok!") {

          setTimeout(() => {
            hideDetail();
            window.location.replace(`/${message}`);
          }, 250);

        } else {
          divMessage.textContent = "" + message;
        }
      })
      .catch(() => {
        divMessage.textContent = "Something wrong! Please press 'Create Song' again...";
      });

  e.preventDefault();
}