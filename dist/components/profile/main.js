function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let profileid = urlParams.get("n");
if(profileid == null && getCookie('username')){
  profileid = getCookie('username');
}else{
  profileid = 'user';
}

const userFriendsCount = document.getElementById("user-friends")
const userName = document.getElementById("user-name")
const userDisplayName = document.getElementById("user-display-name")
const userProfilePic = document.getElementById("user-profile-pic")
const userBio = document.getElementById("user-bio")

fetch(
  "http://localhost:5000/api/user/get/" + profileid || getCookie("username")
).then(function (res) {
  res.json().then(function (data) {
    userFriendsCount.innerText = data.friendscount;
    userDisplayName.innerText = data.displayname;
    userName.innerText = '@' + data.username;

    if (data.profilepic == ""){
      userProfilePic.setAttribute('src' , 'http://localhost:5000/cdn/cat.png')
    }else{
      userProfilePic.setAttribute('src', 'https://cdn.discordapp.com/attachments/1230500815131901952/1240193688735449110/IMG_1160.jpg?ex=6646fd61&is=6645abe1&hm=3333b0831b902e67e7c6a14ccc183e8a53e4f3d71e9d838ca90339e246aa33bd&')
    }
    
    if (data.feed) {
     userBio.innerText = data.feed; 
    }
    else {
      userBio.innerText = "This hasnt set his bio yet."
    }
  });
});
