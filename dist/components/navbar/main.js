{
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

  const navloginbut = document.getElementById("login-nav-button");
  const navuserprofile = document.getElementById("user-profile");
  const navuserprofileimg = navuserprofile.querySelector("img");
  const navusermessages = document.getElementById("user-messages");

  const usracctkn = getCookie("user_access_tkn");
  if (usracctkn) {
    navloginbut.style.display = "none";
    fetch("http://localhost:5000/api/user/get/" + getCookie("username")).then(
      function (res) {
        res.json().then(function (data) {
          if (data["profilepic"] == "") {
            navuserprofileimg.setAttribute(
              "src",
              "http://localhost:5000/cdn/cat.png"
            );
          } else {
            navuserprofileimg.setAttribute(
              "src",
              "http://localhost:5000/cdn/cat.png"
            );
          }
        });
      }
    );
  } else {
    navuserprofile.style.display = "none";
    navusermessages.style.display = "none";
  }
}
