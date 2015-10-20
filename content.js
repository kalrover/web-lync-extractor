
function getLogs() {
  var logs = '';
  jQuery('#inner')
    .contents()
      .find("#historyArea")
      .find("div")
        .each(function() {
          logs += jQuery(this).text() + '\n';
      });
  return logs;
}

function getUsers() {
  var users = [];
  jQuery('#inner')
    .contents()
      .find("#rosterList")
      .find("table")
        .each(function() {
          users.push(jQuery(this).attr("title"));
        }
      );
  return users;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  switch (request.msg) {
    case 'get_users':
      sendResponse({results: getUsers()})
      break;
    case 'get_logs':
      sendResponse({results: getLogs()});
      break;
    case 'get_info':
      sendResponse({
        users: getUsers(),
        logs: getLogs()
      });
      break;
    default:
      sendResponse({});
    return;
  }
});