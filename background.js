chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'https://x.com/intent/follow?screen_name=setkyarwalar',
      active: true,
    });
    chrome.tabs.create({
      url: 'https://buymeacoffee.com/setkyar/quickreach-chrome-extension',
      active: true,
    });
  }
});


let actionMenu = false;
if (chrome.contextMenus && !actionMenu) {
  actionMenu = true;

  chrome.contextMenus.create({
    id: 'welcome-guide',
    title: 'Welcome Guide',
    contexts: ['all'],
  });

  chrome.contextMenus.create({
    id: 'make-a-donation',
    title: 'Make a Donation',
    contexts: ['all'],
  });

  // Add "Share this" parent menu
  const shareParent = chrome.contextMenus.create({
    id: 'share-this',
    title: 'Share this',
    contexts: ['all'],
  });

  // Add social media share options
  const shareOptions = [
    {
      id: 'share-email',
      title: 'Email',
      url: 'mailto:?subject=Check out QuickReach&body=',
    },
    {
      id: 'share-x',
      title: 'X (Twitter)',
      url: 'https://twitter.com/intent/tweet?text=',
    },
    {
      id: 'share-facebook',
      title: 'Facebook',
      url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      id: 'share-whatsapp',
      title: 'WhatsApp',
      url: 'https://api.whatsapp.com/send?text=',
    },
    {
      id: 'share-linkedin',
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
    {
      id: 'share-telegram',
      title: 'Telegram',
      url: 'https://t.me/share/url?url=',
    },
    {
      id: 'share-vkontakte',
      title: 'VKontakte',
      url: 'https://vk.com/share.php?url=',
    },
  ];

  shareOptions.forEach((option) => {
    chrome.contextMenus.create({
      id: option.id,
      title: option.title,
      parentId: shareParent,
      contexts: ['all'],
    });
  });

  // Add a click handler for the context menu items
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const extensionPage =
      'https://chrome.google.com/webstore/detail/khmdjnahnmgaidpklhhfgiceaffjibfi';
    const shareMessage = encodeURIComponent(
      'Check out QuickReach Chrome Extension: ' + extensionPage
    );

    switch (info.menuItemId) {
      case 'welcome-guide':
        chrome.tabs.create({
          url: 'https://buymeacoffee.com/setkyar/quickreach-chrome-extension',
          active: true,
        });
        break;
      case 'make-a-donation':
        chrome.tabs.create({
          url: 'https://buymeacoffee.com/setkyar',
          active: true,
        });
        break;
      case 'share-email':
        chrome.tabs.create({ url: `${shareOptions[0].url}${shareMessage}` });
        break;
      case 'share-x':
        chrome.tabs.create({ url: `${shareOptions[1].url}${shareMessage}` });
        break;
      case 'share-facebook':
        chrome.tabs.create({ url: `${shareOptions[2].url}${extensionPage}` });
        break;
      case 'share-whatsapp':
        chrome.tabs.create({ url: `${shareOptions[3].url}${shareMessage}` });
        break;
      case 'share-linkedin':
        chrome.tabs.create({
          url: `${
            shareOptions[4].url
          }${extensionPage}&title=${encodeURIComponent(
            'QuickReach Chrome Extension'
          )}`,
        });
        break;
      case 'share-telegram':
        chrome.tabs.create({
          url: `${shareOptions[5].url}${extensionPage}&text=${shareMessage}`,
        });
        break;
      case 'share-vkontakte':
        chrome.tabs.create({ url: `${shareOptions[6].url}${extensionPage}` });
        break;
    }
  });
}
