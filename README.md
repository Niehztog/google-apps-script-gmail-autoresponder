# google-app-script-gmail-autoresponder
Google Apps Script which deletes E-Mails with a specific label forever and sends autoresponder (useful for blocking unwelcome Senders).

This is a script written for "Google Apps Script". It can be executed on https://script.google.com by adding it as a new project.

## What it does
* reads all messages which have a label named "DeleteForever" assigned
* permanently deletes those E-Mails, they won't appear in Trash or Spam folders
* reads a message with a label named "AutoResponderTemplate"  from Gmails drafts folder
* usees this draft and sends it as a kind of autoresponder to the sender of the previously deleted Email
* this is usefull for blocking unwanted senders from sending you messages

## Preparation
* use Gmail filters to auto-assign the "DeleteForever" label to any mwessages you __don't want to be aware of__
* in Google Script, use function "listMessages" as script entry point
* it is necessary to __enable the Gamil API in Google Script__ in order to use this script

## Customization
* adapt the search-filter label name ("DeleteForever") in line 8 of the script accoding to your needs
* adapt the autoresponder label name ("AutoResponderTemplate") in line 39 of the script accoding to your needs
