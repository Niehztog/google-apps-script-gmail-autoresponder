# google-apps-script-gmail-autoresponder
Google Apps Script which deletes E-Mails with a specific label forever and sends an autoresponder to the sender (useful for blocking unwelcome senders).

This is a script written for "Google Apps Script". It can be executed on https://script.google.com by adding it as a new project.

## What it does
* Reads all messages which have a label named "DeleteForever" assigned
* Permanently deletes those E-Mails, they won't appear in Trash or Spam folders
* Reads a message with a label named "AutoResponderTemplate"  from Gmails drafts folder
* Uses this draft and sends it as a kind of autoresponder to the sender of the previously deleted Email
* This is useful for blocking unwanted senders from sending you messages

## Preparation
* Use Gmail filters to auto-assign the "DeleteForever" label to any messages you __don't want to be aware of__
* In Google Script, use function "listMessages" as script entry point
* You can set up an automatic running schedule ("time driven trigger") to have it executed automatically
* It is necessary to __enable the Gamil API in Google Script__ in order to use this script

## Customization
* Adapt the search-filter label name ("DeleteForever") in line 9 of the script accoding to your needs
* Adapt the autoresponder label name ("AutoResponderTemplate") in line 45 of the script accoding to your needs
