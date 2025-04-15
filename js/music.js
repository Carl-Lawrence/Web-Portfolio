document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const closeBtn = document.getElementById("closeBtn");

    // Attempt autoplay (some browsers require interaction)
    audio.volume = 0.5;
    const autoplayPromise = audio.play();

    if (autoplayPromise !== undefined) {
        autoplayPromise.catch(error => {
            console.warn("Autoplay failed, will require user interaction.");
        });
    }

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    closeBtn.addEventListener("click", function () {
        document.getElementById("music-widget").style.display = "none";
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
