function showDetail({login = "0000", type = "photo"}) {
  let elems = document.body.children;

  for (let i = 0; i < elems.length; i++ ) {
    if (elems[i].tagName !== 'SCRIPT' && elems[i].tagName !== 'AUDIO' && elems[i].shadowRoot) {
      elems[i].shadowRoot.children[1].style.filter = "brightness(.4) grayscale(.6) blur(3px)";
    }
  }

  let detailInfo = document.body.querySelector('detail-info');
  if (detailInfo !== null) {
    document.body.removeChild(detailInfo);
  }

  detailInfo = document.createElement('detail-info');
  detailInfo.setAttribute('login', login);
  detailInfo.setAttribute('type', type);

  detailInfo.showInfo();

  document.body.appendChild(detailInfo);
}

function hideDetail() {
  let elems = document.body.children;

  for (let i = 0; i < elems.length; i++ ) {
    if (elems[i].tagName !== 'SCRIPT' && elems[i].tagName !== 'AUDIO' && elems[i].shadowRoot) {
      elems[i].shadowRoot.children[1].style.filter = "";
    }
  }

  let detailInfo = document.body.querySelector('detail-info');
  if (!detailInfo) return;
  document.body.removeChild(detailInfo);
}