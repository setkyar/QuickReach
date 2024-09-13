const DEFAULT_URL = 'https://chatgpt.com';
const SIDEBAR_ITEMS = [
  {
    url: 'https://chatgpt.com',
    title: 'ChatGPT',
    icon: 'logos/chat_gpt.png',
  },
  {
    url: 'https://claude.ai/new',
    title: 'Claude',
    icon: 'logos/claude.png',
  },
  {
    url: 'https://gemini.google.com/app',
    title: 'Gemini',
    icon: 'logos/gemini.png',
  },
  {
    url: 'https://poe.com',
    title: 'Poe',
    icon: 'logos/poe.png',
  },
  {
    url: 'https://www.perplexity.ai',
    title: 'perplexity',
    icon: 'logos/perplexity.png',
  },
  {
    url: 'https://www.typingmind.com',
    title: 'typingmind',
    icon: 'logos/typingmind.png',
  },
  {
    url: 'https://web.telegram.org',
    title: 'Telegram',
    icon: 'logos/telegram.png',
  },
  {
    url: 'https://www.notion.so',
    title: 'Notion',
    icon: 'logos/notion.png',
  },
  {
    url: 'https://docs.google.com/document/u/0/',
    title: 'Google Sheets',
    icon: 'logos/google_docs.png',
  },
  {
    url: 'https://www.youtube.com',
    title: 'YouTube',
    icon: 'logos/youtube.png',
  },
  {
    url: 'https://music.youtube.com/',
    title: 'YouTube Music',
    icon: 'logos/youtube_music.png',
  },
  {
    url: 'https://www.tiktok.com/en',
    title: 'TikTok',
    icon: 'logos/tiktok.png',
  },
  {
    url: 'https://www.twitch.tv',
    title: 'Twitch',
    icon: 'logos/twitch.png',
  },
  {
    url: 'https://www.chess.com/home',
    title: 'Chess',
    icon: 'logos/chess.png',
  },
];

let currentUrl = DEFAULT_URL;

const openLink = async (url = DEFAULT_URL) => {
  const iframe = document.getElementById('preview');
  await chrome.runtime.sendMessage({ action: 'updateRules' });
  if (iframe) {
    iframe.src = url;
  }
  currentUrl = url;
  updateSidebarActiveState();

  saveState();
};

const updateSidebarActiveState = () => {
  const links = document.querySelectorAll('#sidebar a');
  links.forEach((link) => {
    if (link.href.includes(currentUrl)) {
      link.classList.add('active');
      link.classList.remove('un-active');
    } else {
      link.classList.add('un-active');
      link.classList.remove('active');
    }
  });
};

const createSidebarItems = (items) => {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';
  items.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.title = item.title;
    link.className = 'un-active';
    link.innerHTML = `<img src="${item.icon}" alt="${item.title}" />`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLink(item.url);
    });
    sidebar.appendChild(link);
  });
};

const saveState = () => {
  localStorage.setItem('currentUrl', currentUrl);
};

const loadState = () => {
  const savedUrl = localStorage.getItem('currentUrl');
  openLink(savedUrl || DEFAULT_URL);
  createSidebarItems(SIDEBAR_ITEMS);
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
});