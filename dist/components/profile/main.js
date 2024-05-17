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
console.log(profileid)
if (profileid == null) {
  profileid = getCookie('username') || 'user';
}

console.log(profileid)

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

    console.log(data)

    if (data.profilepic == "") {
      userProfilePic.setAttribute('src', 'http://localhost:5000/cdn/cat.png')
    } else {
      userProfilePic.setAttribute('src', 'http://localhost:5000/cdn/' + data['profilepic'])
    }

    if (data.feed) {
      userBio.innerText = data.feed;
    }
    else {
      userBio.innerText = "This hasnt set his bio yet."
    }
  });
});
