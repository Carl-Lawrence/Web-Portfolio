document.addEventListener("DOMContentLoaded", function () {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    let volume = 0;
    const targetVolume = 0.5;

    // Attempt autoplay on interaction fallback
    const tryAutoplay = () => {
        audio.volume = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                let fadeIn = setInterval(() => {
                    if (volume < targetVolume) {
                        volume = Math.min(volume + 0.05, targetVolume);
                        audio.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 150);
            }).catch((err) => {
                console.warn("Autoplay was blocked:", err);
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
        }
    };

    // Ensure audio is loaded before attempting playback
    audio.addEventListener("canplay", tryAutoplay);

    // Handle Play/Pause
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => {
                console.warn("Play error:", err);
            });
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
