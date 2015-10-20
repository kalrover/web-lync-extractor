var inject_script = true;

function sendInfoMessage (tab, cb) {

    console.log(tab.title);
    chrome.tabs.sendMessage(tab.id, {
      msg: 'get_info'
    }, function (res) {
      console.log(res.logs);
      cb();
    });
}

function getAllChatWindows(cb) {
  var queryInfo = {
    title: '*- Conversation'
  };

  chrome.tabs.query(queryInfo, function(tabs) {

    //renderStatus(tab.title);
    for (var i = 0; i < tabs.length; i++) {
      if (inject_script) {
        (function (tab) { 
          chrome.tabs.executeScript(tab.id, {file: 'jquery.min.js'}, function () {
            chrome.tabs.executeScript(tab.id, {file: 'content.js'}, function () {
              sendInfoMessage(tab, cb);
            })
          });
        })(tabs[i]);
      } else {
        sendInfoMessage(tabs[i], cb);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  getAllChatWindows(function() {
    console.log('Finish!');
  });
});
