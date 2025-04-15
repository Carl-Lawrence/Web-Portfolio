document.addEventListener("DOMContentLoaded", function () {
    const widget = document.getElementById("music-widget");
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    // Autoplay with fallback
    audio.volume = 0.5;
    const tryPlay = audio.play();
    if (tryPlay !== undefined) {
        tryPlay.catch(() => {
            console.warn("Autoplay failed");
        });
    }

    // Play/Pause functionality
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Close functionality
    closeBtn.addEventListener("click", () => {
        widget.style.display = "none";
        audio.pause();
    });

    let volume = 0;
    audio.volume = 0;
    audio.play();
    
    let fadeIn = setInterval(() => {
        if (volume < 0.5) {
            volume += 0.05;
            audio.volume = volume;
        } else {
            clearInterval(fadeIn);
        }
    }, 200);
  
});


