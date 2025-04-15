document.addEventListener("DOMContentLoaded", function () {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    let hasStarted = false;

    // Start muted for autoplay compatibility
    audio.muted = true;
    audio.volume = 0;

    function startMusic() {
        if (!hasStarted) {
            audio.play().then(() => {
                hasStarted = true;
                audio.muted = false;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.5) {
                        volume += 0.05;
                        audio.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 200);
            }).catch(err => {
                console.warn("Autoplay blocked:", err);
            });

            document.body.removeEventListener("click", startMusic);
            document.body.removeEventListener("scroll", startMusic);
        }
    }

    // Trigger playback on user interaction
    document.body.addEventListener("click", startMusic);
    document.body.addEventListener("scroll", startMusic);

    // Play / Pause
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Close Widget
    closeBtn.addEventListener("click", () => {
        widget.style.display = "none";
        audio.pause();
    });
});
