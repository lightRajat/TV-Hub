const appData = [
    {id: "youtube", link: "https://www.youtube.com/", iconPath: new URL("./icons/youtube.jpg", import.meta.url).href},
    {id: "music", link: "https://music.youtube.com/", iconPath: new URL("./icons/music.png", import.meta.url).href},
    {id: "mx", link: "https://www.mxplayer.in/", iconPath: new URL("./icons/mx.jpg", import.meta.url).href},
    {id: "anime", link: "https://hianimez.to/home", iconPath: new URL("./icons/anime.png", import.meta.url).href},
    {id: "movie", link: "https://ww-fmovies.com/", iconPath: new URL("./icons/movie.png", import.meta.url).href},
];
const contentFrame = document.getElementById('contentFrame');
const backElem = document.querySelector('.back-container');
let webView;
const volumeUpElem = document.querySelector('.up-container');
const volumeDownElem = document.querySelector('.down-container');
const volumeFeedbackContainerElem = document.querySelector('.volume-feedback-container');
const volumeFeedbackElem = document.querySelector('.volume-feedback-container > div');

for (const app of appData) {
    const appElem = document.getElementById(app.id);
    appElem.addEventListener('click', () => {
        // loading screen
        contentFrame.style.display = 'inherit';
        contentFrame.style.backgroundImage = `url(${app.iconPath})`;
        contentFrame.style.backgroundSize = 'cover';

        // add webview
        webView = document.createElement('webview');
        contentFrame.appendChild(webView);
        webView.src = app.link;
        webView.addEventListener('dom-ready', () => {
            webView.style.display = 'inherit';
            backElem.style.display = 'inherit';
        });
    });
}

backElem.addEventListener('click', () => {
    if (webView.canGoBack()) {
        webView.goBack();
    } else {
        contentFrame.style.display = 'none';
        backElem.style.display = 'none';
        contentFrame.removeChild(webView);
    }
});

// disable back interface on homepage
backElem.style.display = 'none';

// sound controls
let intervalId;
function displayVolumeFeedback() {
    if (!intervalId) {
        clearInterval(intervalId);
    }
    volumeFeedbackContainerElem.style.transition = 'none';
    volumeFeedbackContainerElem.style.opacity = '1';
    intervalId = setTimeout(() => {
        volumeFeedbackContainerElem.style.transition = '3s';
        volumeFeedbackContainerElem.style.opacity = '0';
    }, 4000);
}

volumeUpElem.addEventListener('click', async () => {
    const volume = await window.systemUtils.increaseVolume();
    volumeFeedbackElem.textContent = volume;
    displayVolumeFeedback();
});
volumeDownElem.addEventListener('click', async () => {
    const volume = await window.systemUtils.decreaseVolume();
    volumeFeedbackElem.textContent = volume;
    displayVolumeFeedback();
});