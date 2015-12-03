$(function () {
  chrome.tabs.getSelected(null, function(tab) {
  });

  var loadStock = function() {
    var token = document.auth.token.value
    var userId = document.auth.userId.value

    $('#message').text("");
    $.ajax({
      type: 'GET',
      url: `http://sfidante.qiita.com/api/v2/users/${userId}/stocks`,
      dataType: 'json',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      success: function(d) {
        var stocks = []
        d.map( function (v, i, a){
          var stock = {}
          stock.title = v.title
          stock.url = v.url
          stocks.push(stock)
        });
        $('#message').text(JSON.stringify(stocks, null, 2));
      },
      error: function(r, s, e){
        $('#message').text(JSON.stringify(e));
      }
    });
  }
  document.getElementById("update").addEventListener("click", loadStock)
});
