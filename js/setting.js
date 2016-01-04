$(function () {
  var auth = {}

  var fqdn = function (teamId) {
    if(teamId) {
      return `${teamId}.qiita.com`
    } else {
      return "qiita.com"
    }
  }

  var authorize = function () {
    var token = document.auth.token.value
    var teamId = document.auth.teamId.value
    var f = fqdn(teamId)

    $.ajax({
      type: 'GET',
      url: `http://${f}/api/v2/authenticated_user`,
      dataType: 'json',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      success: function(d) {
        var userId = d.id;

        saveToStrage(token, userId, teamId)
      },
      error: function(r, s, e){
        $('#message').text(JSON.stringify(e));
      }
    });
  }

  var saveToStrage = function (token, userId, teamId) {
    auth = {
      token: token,
      userId: userId,
      teamId: teamId
    }

    chrome.storage.local.set(auth, function(){
      $('#message').text("Authorized");
    });
  }

  chrome.storage.local.get({
      token: null,
      userId: null,
      teamId: null
    },
    function(d) {
      document.auth.token.value = d.token
      document.auth.userId.value = d.userId
      document.auth.teamId.value = d.teamId
    });

  document.getElementById("update").addEventListener("click", authorize)
});
