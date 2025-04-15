document.addEventListener("DOMContentLoaded", () => {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    audio.volume = 0;
    let isPlaying = false;

    // Try to play muted first (browsers allow this)
    audio.muted = true;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Unmute and fade in
            audio.muted = false;
            isPlaying = true;
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
        }).catch((err) => {
            console.warn("Autoplay was blocked:", err);
            // Wait for user interaction
        });
    }

    // Play/Pause
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Close
    closeBtn.addEventListener("click", () => {
        widget.style.display = "none";
        audio.pause();
        isPlaying = false;
    });
});
