$(function () {
  var auth = {}

  var saveToStrage = function () {
    var token = document.auth.token.value
    var userId = document.auth.userId.value

    auth = {
      token: token,
      userId: userId
    }

    chrome.storage.local.set(auth, function(){
      fetchStock();
    });
  }

  document.getElementById("update").addEventListener("click", saveToStrage)
});
