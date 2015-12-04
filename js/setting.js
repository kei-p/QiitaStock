$(function () {
  var auth = {}

  var saveToStrage = function () {
    var token = document.auth.token.value
    var userId = document.auth.userId.value
    var fqdn = document.auth.fqdn.value

    auth = {
      token: token,
      userId: userId,
      fqdn: fqdn
    }

    chrome.storage.local.set(auth, function(){
      console.log("saved")
    });
  }

  chrome.storage.local.get({
      token: null,
      userId: null,
      fqdn: null
    },
    function(d) {
      var token = d.token
      var userId = d.userId
      var fqdn = d.fqdn
      document.auth.token.value = d.token
      document.auth.userId.value = d.userId
      document.auth.fqdn.value = d.fqdn
    });

  document.getElementById("update").addEventListener("click", saveToStrage)
});
