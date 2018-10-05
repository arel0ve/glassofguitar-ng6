let userInfo = document.getElementById('user-info'),
    userTrackList = document.getElementById('songs');

userInfo.addEventListener('mouseenter', () => {
  userTrackList.classList.add('user-track-list-down');
});

userInfo.addEventListener('mouseleave', () => {
  userTrackList.classList.remove('user-track-list-down');
});
