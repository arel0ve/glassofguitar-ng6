let loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
  if (loginBtn.classList.contains('log-in')) {
    showDetail({type: "login"});
  } else {
    showDetail({type: "logout"});
  }
});


let searchField = document.getElementById('search-field'),
    searchResult = document.getElementById('search-result'),
    searchBtn = document.getElementById('search-btn'),
    searchIco = document.getElementById('search-ico');

searchIco.addEventListener('click', () => {
  if (searchField.classList.contains('search-field-animation')) {
    searchField.classList.remove('search-field-animation');
    searchBtn.classList.remove('search-animation');
    searchField.blur();
  } else {
    searchField.classList.add('search-field-animation');
    searchBtn.classList.add('search-animation');
    searchField.focus();
  }
});

searchField.addEventListener('keyup', (e) => {
  if (e.keyCode === 16) return;

  let type = "song";
  if (e.shiftKey) {
    type = "author";
  }

  if (searchField.value === "") {
    searchResult.style.display = "none";
    return;
  }

  fetch('/q', {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "include",
    body: JSON.stringify({
      type: type,
      query: searchField.value.toLowerCase()
    })
  })
      .then(response => {
        searchResult.style.left = `${searchField.offsetLeft}px`;
        searchResult.style.top = `${searchField.offsetTop + searchField.offsetHeight}px`;

        switch(response.status) {
          case 200:
          case 202:
          case 203:
            return response.text();
          default:
            throw new Error();
        }
      })
      .then(message => {
        searchResult.innerHTML = "" + message;
        searchResult.style.display = "block";
        document.documentElement.appendChild(searchResult);
      })
      .catch(() => {
        searchResult.innerHTML = "<div>Bad connection... We can't find anything</div>";
        searchResult.style.display = "block";
        document.documentElement.appendChild(searchResult);
      });
});

document.addEventListener('click', (e) => {
  if (!!e.target.closest('.search-result')) return;
  searchResult.style.display = "none";
});
