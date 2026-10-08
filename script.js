'use strict';

// All invitation copy lives here so the playful follow-up is easy to edit.
const messages = [
  "Fair! My nose can stay on beginner mode a little longer 😅",
  "I'll keep training my nose. Apparently 'smells nice' isn't a fragrance note 😂",
  "Offer stays open: you judge the perfumes, I try to learn the vocabulary ✨"
];

const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const declineButton = document.getElementById('decline-button');
const responseMessage = document.getElementById('response-message');
const followUp = document.getElementById('follow-up');
const invitationGif = document.getElementById('invite-gif');
let messageIndex = 0;

function handleYesClick() {
  // A relative link works both as a local file and on a hosted website.
  window.location.href = 'yes_page.html';
}

function handleNoClick() {
  responseMessage.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
  noButton.textContent = 'Still another time';
  followUp.hidden = false;
  invitationGif.src = 'assets/nose-in-training.gif';
  invitationGif.alt = 'A perfume bottle releases floating scent notes while a question mark bobs above it.';
  // Keep both choices usable: no runaway buttons or endlessly growing text.
}

function handleDeclineClick() {
  responseMessage.textContent = 'All good, Myriam! See you at the gym 💪';
  document.getElementById('answer-buttons').hidden = true;
  followUp.hidden = true;
  invitationGif.src = 'assets/perfume-quest.gif';
  invitationGif.alt = 'An animated dumbbell passes the spotlight to a sparkling perfume bottle.';
}

yesButton.addEventListener('click', handleYesClick);
noButton.addEventListener('click', handleNoClick);
declineButton.addEventListener('click', handleDeclineClick);
