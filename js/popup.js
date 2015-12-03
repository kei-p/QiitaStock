$(function () {
    chrome.tabs.getSelected(null, function(tab) {
        $('#message').text(tab.title);
    });
});
