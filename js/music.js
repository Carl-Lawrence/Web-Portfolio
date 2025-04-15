document.addEventListener("DOMContentLoaded", () => {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    let isPlaying = false;
    let hasTried = false;

    // Prepare audio for autoplay
    audio.muted = true;
    audio.volume = 0;

    const fadeInAudio = () => {
        let volume = 0;
        const fadeIn = setInterval(() => {
            if (volume < 0.5) {
                volume += 0.05;
                audio.volume = volume;
            } else {
                clearInterval(fadeIn);
            }
        }, 200);
    };

    const startMusic = () => {
        if (!hasTried) {
            hasTried = true;
            audio.play().then(() => {
                audio.muted = false;
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                fadeInAudio();
            }).catch(err => {
                console.warn("Autoplay still blocked:", err);
            });
        }
    };

    // Try autoplay on load
    audio.play().then(() => {
        audio.muted = false;
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        fadeInAudio();
    }).catch(err => {
        console.warn("Autoplay blocked:", err);
        // Fallback to scroll or click
        window.addEventListener("scroll", startMusic, { once: true });
        document.body.addEventListener("click", startMusic, { once: true });
    });

    // Play / Pause toggle
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Close widget
    closeBtn.addEventListener("click", () => {
        widget.style.display = "none";
        audio.pause();
    });
});
