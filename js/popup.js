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

  var fqdn = function (teamId) {
    if(teamId) {
      return `${teamId}.qiita.com`
    } else {
      return "qiita.com"
    }
  }

  var fetchStock = function() {
    chrome.storage.local.get({
        token: null,
        userId: null,
        teamId: null
      },
      function(d) {
        var token = d.token
        var userId = d.userId
        var f = fqdn(d.teamId)

        $('#message').text("");
        $.ajax({
          type: 'GET',
          url: `http://${f}/api/v2/users/${userId}/stocks`,
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

  fetchStock();
});
