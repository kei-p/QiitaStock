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

  chrome.storage.local.get({
      token: null,
      userId: null,
      host: null
    },
    function(d) {
      var token = d.token
      var userId = d.userId
      var host = d.host
      document.auth.token.value = d.token
      document.auth.userId.value = d.userId
      document.auth.host.value = d.host
    });

  document.getElementById("update").addEventListener("click", saveToStrage)
});
