$(function () {
  var auth = {}

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

  var renderStocks = function (stocks) {
    stocks.forEach(function(v, i, a) {
      var link = $(`<a href="${v.url}" target="_blank">${v.title}</a>`)
      var stock = $('<li>').append(link)
      $('#stocks').append(stock)
    });
  }

  var fetchStock = function() {
    chrome.storage.local.get({
        token: null,
        userId: null
      },
      function(d) {
        var token = d.token
        var userId = d.userId

        $('#message').text("");
        $.ajax({
          type: 'GET',
          url: `http://sfidante.qiita.com/api/v2/users/${userId}/stocks`,
          dataType: 'json',
          headers: {
            'Authorization' : `Bearer ${token}`
          },
          success: function(d) {
            renderStocks(stocks(d))
          },
          error: function(r, s, e){
            $('#message').text(JSON.stringify(e));
          }
        });
      }
    );
  }

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
  fetchStock();
});
