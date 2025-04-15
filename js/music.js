document.addEventListener("DOMContentLoaded", function () {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    let isPlaying = false;
    let volume = 0;
    const targetVolume = 0.5;

    // Try to autoplay with fade-in
    function playWithFadeIn() {
        audio.volume = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                const fadeIn = setInterval(() => {
                    if (volume < targetVolume) {
                        volume = Math.min(volume + 0.05, targetVolume);
                        audio.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 150);
            }).catch((error) => {
                console.warn("Autoplay failed or was blocked by the browser:", error);
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            });
        }
    }

    playWithFadeIn();

    // Play/Pause toggle
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }).catch((err) => {
                console.warn("Playback failed:", err);
            });
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
    });

    // Close widget
    closeBtn.addEventListener("click", () => {
        widget.style.display = "none";
        audio.pause();
    });
});
