'use strict';

const copyButton = document.getElementById('copy-button');
const messageText = document.getElementById('message-text');
const copyStatus = document.getElementById('copy-status');

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(messageText.textContent);
    copyStatus.textContent = 'Copied! Now send it to me 😌';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(messageText);
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Select the message above and copy it manually.';
  }
});
