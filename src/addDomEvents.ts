import MessageHelper from './MessageHelper';
import {
  MessageSeverity,
} from './types';
import StorageHelper from './StorageHelper';

const LS_INSTALL_PROMPT = 'install-prompt-shown';

// tslint:disable-next-line:no-any
let installEvent: any = null;
const messageHelper = MessageHelper.getInstance();
const storageHelper = StorageHelper.getInstance();

async function onBeforeInstallPrompt(event: Event) {
  event.preventDefault();
  installEvent = event;

  // If the prompt has been shown, don't show again
  const hasSeenPrompt = await storageHelper.getPreference<number>(LS_INSTALL_PROMPT);
  if (hasSeenPrompt) {
    return;
  }
  messageHelper.send(MessageSeverity.NONE, 'Add to Home Screen', 'EdNon can be added to your device\'s home screen for easy access. Would you like to do this?', [{
    text: 'Add to Home Screen',
    onClick: onUserWantInstall,
  }]);

  // Mark the prompt as shown
  await storageHelper.setPreference(LS_INSTALL_PROMPT, Date.now());
}

async function onUserWantInstall() {
  installEvent.prompt();
  // Wait for the user to respond to the prompt
  installEvent.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      messageHelper.send(MessageSeverity.NONE, 'Add to Home Screen', 'Successfully added to Home Screen');
    } else {
      messageHelper.send(MessageSeverity.NONE, 'Add to Home Screen', 'You can add it later by using the browser\'s menu');
    }
    // Clear the saved prompt since it can't be used again
    installEvent = null;
  });
}

export default function addDomEvents() {
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
}
