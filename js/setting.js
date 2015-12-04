$(function () {
  var auth = {}

  var saveToStrage = function () {
    var token = document.auth.token.value
    var userId = document.auth.userId.value
    var host = document.auth.host.value

    auth = {
      token: token,
      userId: userId,
      host: host
    }

    chrome.storage.local.set(auth, function(){
      console.log("saved")
    });
  }

  document.getElementById("update").addEventListener("click", saveToStrage)
});
