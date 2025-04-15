document.addEventListener("DOMContentLoaded", () => {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    let isPlaying = false;



    // Start muted for autoplay compatibility
    audio.muted = true;
    audio.volume = 0;
    const playAttempt = audio.play();

    if (playAttempt !== undefined) {
        playAttempt.then(() => {
            audio.muted = false; // Unmute after play starts
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

            // Fade in
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
            console.warn("Autoplay blocked:", err);
            // Optional: Show a "Click to Start Music" button
        });
    }

    // Play / Pause Toggle
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
