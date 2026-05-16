const STORAGE_KEY = 'oTranscribe-theme';

function getInitialTheme() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
        return stored;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        toggle.innerHTML = theme === 'dark'
            ? '<i class="fa fa-lightbulb-o" aria-hidden="true"></i>'
            : '<i class="fa fa-adjust" aria-hidden="true"></i>';
    }
}

export default function themeSetup() {
    let theme = getInitialTheme();
    applyTheme(theme);

    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) {
        return;
    }

    toggle.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        window.localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
    });
}
