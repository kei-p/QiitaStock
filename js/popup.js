$(function () {
  chrome.tabs.getSelected(null, function(tab) {
  });

  var stocks = function (data) {
    var stocks = []
    data.map( function (v, i, a){
      var stock = {}
      stock.title = v.title
      stock.url = v.url
      stocks.push(stock)
    });
    return stocks;
  }

  var fetchStock = function() {
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
        $('#message').text(JSON.stringify(stocks(d), null, 2));
      },
      error: function(r, s, e){
        $('#message').text(JSON.stringify(e));
      }
    });
  }

  document.getElementById("update").addEventListener("click", fetchStock)
});
