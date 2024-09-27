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
    url: 'https://ai-pik.com/explore',
    title: 'ai-pik',
    icon: 'logos/aipik.png',
  },
  {
    url: 'https://messages.google.com/web',
    title: 'Messages',
    icon: 'logos/messages.png',
  },
  {
    url: 'https://web.telegram.org/k',
    title: 'Telegram',
    icon: 'logos/telegram.png',
  },
  {
    url: 'https://web.whatsapp.com/',
    title: 'WhatsApp',
    icon: 'logos/whatsapp.png',
  },
  {
    url: 'https://tasks.google.com/embed/?origin=https%3A%2F%2Fmail.google.com',
    title: 'Google Tasks',
    icon: 'logos/google_tasks.png',
  },
  {
    url: 'https://keep.google.com',
    title: 'Google Keep',
    icon: 'logos/google_keep.png',
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
    url: 'https://translate.google.com/',
    title: 'Google Translate',
    icon: 'logos/google_translate.png',
  },
  {
    url: 'https://github.com',
    title: 'Github',
    icon: 'logos/github.png',
  },
  {
    url: 'https://www.linkedin.com',
    title: 'LinkedIn',
    icon: 'logos/linkedin.png',
  },
  {
    url: 'https://www.pinterest.com',
    title: 'Pinterest',
    icon: 'logos/pinterest.png',
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
    url: 'https://buymeacoffee.com/setkyar/quickreach-chrome-extension',
    title: 'Buy Me A Coffee',
    icon: 'logos/buy_me_a_coffee.png',
  },
];

let currentUrl = DEFAULT_URL;

const openLink = async (url = DEFAULT_URL) => {
  const iframe = document.getElementById('preview');
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
  createSidebarItems(SIDEBAR_ITEMS);
  openLink(savedUrl || DEFAULT_URL);
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
});