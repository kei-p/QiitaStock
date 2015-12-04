$(function () {
  var auth = {}

  var stocks = function (data) {
    var stocks = []
    data.map( function (v, i, a){
      var stock = {
        title: v.title,
        url: v.url,
        user: {
          id: `@${v.user.id}`,
          icon: v.user.profile_image_url
        }
      }
      stocks.push(stock)
    });
    return stocks;
  }

  var renderStocks = function (stocks) {
    stocks.forEach(function(v, i, a) {
      var icon = $('<div class="stock-cell-icon">').append(`<img alt="${v.user.id}" class="stock-cell-icon-img" src="${v.user.icon}">`)
      var userId = $('<div class="stock-cell-userId">').text(v.user.id)

      var author = $('<div class="stock-cell-author">')
      author.append(icon)
      author.append(userId)

      var body = $('<div class="stock-cell-body">').append($(`<a href="${v.url}" target="_blank">${v.title}</a>`))

      var stock = $('<div class="stock-cell">')
      stock.append(body)
      stock.append(author)

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
        var teamId = d.teamId
        var f = fqdn(teamId)

        var hclass = teamId ? "qiita-team" : "qiita"
        var title = teamId ? "Qiita Team" : "Qiita"

        $('#header').toggleClass(hclass)
        $('#header-title').text(title)
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
