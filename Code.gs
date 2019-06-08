/**
 * https://developers.google.com/gmail/api/v1/reference/users/messages/get
 */
function listMessages() {
  var messageList = Gmail.Users.Messages.list('me', {
    includeSpamTrash: true,
    //labelIds: ['SPAM'],
    q: 'label:DeleteForever',
    maxResults: 10
  });
  
  if (!messageList.messages || !messageList.messages[0]) {
    Logger.log("No messages found.");
    return;
  }
    
  messageList.messages.forEach(function(message) {
    var messageObject = Gmail.Users.Messages.get('me', message.id);
    var senderAddress = getHeaderValue(messageObject, "From").match(/[^@<\s]+@[^@\s>]+/);
    
    Gmail.Users.Messages.remove('me', message.id);
    
    var autoResponseDraft = getDraft();
    var draftSubject = getHeaderValue(autoResponseDraft, "Subject");
    var draftBody = getBodyHtml(autoResponseDraft);
    
    sendMail(senderAddress, draftSubject, draftBody);
  });

}

/**
 * https://stackoverflow.com/questions/24811008/gmail-api-decoding-messages-in-javascript
 */
function getDraft() {
  var draftList = Gmail.Users.Drafts.list('me', {
    includeSpamTrash: true,
    labelIds: ['SPAM'],
    q: 'label:AutoResponderTemplate',
    maxResults: 1
  });

  if (!draftList.drafts || !draftList.drafts[0]) {
    Logger.log("No drafts found.");
    return;
  }

  var msg = "";
  for (var i = 0; i < draftList.drafts.length; i++) {
    var draft = draftList.drafts[i];
    var draftObject = Gmail.Users.Drafts.get('me', draft.id, {format: "full"});
    var msg = draftObject.message;
  };
  return msg;

}

/**
 * https://stackoverflow.com/search?q=%5Bgoogle-apps-script%5D+Gmail.Users.messages.send
 */
function sendMail(recipient, subject, body) {
  var raw = Utilities.base64EncodeWebSafe("Subject: "+subject+"\r\n" +
                                        "From: " + Session.getActiveUser().getEmail() + "\r\n" +
                                        "To:" +recipient+"\r\n" +
                                        "Content-Type: text/html; charset=UTF-8\r\n\r\n" +
                                        body+"\r\n\r\n");
  var message = Gmail.newMessage();
  message.raw = raw;
  var result = Gmail.Users.Messages.send(message, 'me');
  Logger.log(JSON.stringify(result));
}

function getHeaderValue(messageObject, headerName) {
  return messageObject.payload.headers.filter(function(header) {
    return header.name === headerName;
  })[0].value;
  
  /*for (var i = 0; i < messageObject.payload.headers.length; i++) {
    var header = messageObject.payload.headers[i];
    if(header.name == headerName) {
      return header.value;
    }
  }*/
}

function getBodyHtml(message) {
  var part = message.payload.parts.filter(function(part) {
    return part.mimeType == 'text/html';
  })[0];
  
  var messageBlob = Utilities.newBlob(part.body.data, Utilities.Charset.UTF_8);
  var messageBody = messageBlob.getDataAsString();
  
  return messageBody;
}

/**
 * https://developers.google.com/gmail/api/v1/reference/users/threads/get
 * https://github.com/gsuitedevs/apps-script-samples/blob/master/advanced/gmail.gs
 */
/*function listThreads() {
  var threadList = Gmail.Users.Threads.list('me', {
    includeSpamTrash: true,
    labelIds: ['SPAM'],
    //q: 'label:inbox'
  });

  if (!threadList.threads || !threadList.threads[0]) {
    Logger.log('No sent threads found.');
    return;
  }
  
  Logger.log("Threads:");
  threadList.threads.forEach(function(thread) {
    Logger.log('Snippet: %s', thread.snippet);
  });

}*/

/**
 * Lists the user's labels, including name, type,
 * ID and visibility information.
 *
 * https://developers.google.com/apps-script/advanced/gmail
 */
/*function listLabelInfo() {
  var response =
    Gmail.Users.Labels.list('me');
  for (var i = 0; i < response.labels.length; i++) {
    var label = response.labels[i];
    Logger.log(JSON.stringify(label));
  }
}*/

/**
 * https://stackoverflow.com/questions/15995031
 */
/*function deleteForever(userId, labelName) {
  var threads = GmailApp.search("in:trash label:" + labelName);
  for (var i = 0; i < threads.length; i++) {
    Gmail.Users.Messages.remove(userId, threads[i].getId());
  }
}*/