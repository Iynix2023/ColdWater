// script.js


// Add event listeners to all Justin placeholders

document.addEventListener('mousemove', function(e) {
    let bubbleTrail = document.getElementById('bubble-trail');
    let bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${e.clientX}px`;
    bubble.style.top = `${e.clientY}px`;

    bubbleTrail.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 3000); // Removes the bubble after 3 seconds
});



document.addEventListener("DOMContentLoaded", function () {
    // Array of Justin IDs and associated note IDs
    const justins = [
        { id: 'justin5', noteId: 'note1' },
        { id: 'justin2', noteId: 'note2' },
        { id: 'justin6', noteId: 'note3' },
        { id: 'justin3', noteId: 'note4' }
    ];

    // Define fade-out duration
    const fadeOutDuration = 500; // 1000 ms (1 second)

    // Loop through each Justin element to add event listeners
    justins.forEach(justin => {
        const justinElement = document.getElementById(justin.id);
        const noteElement = document.getElementById(justin.noteId);

        // Play the note on mouse enter
        justinElement.addEventListener('mouseenter', () => {
            noteElement.currentTime = 0; // Reset playback
            noteElement.volume = 1; // Set volume to full when starting
            noteElement.play(); // Play note
        });

        // Fade out the note on mouse leave
        justinElement.addEventListener('mouseleave', () => {
            fadeOut(noteElement, fadeOutDuration);
        });
    });

    // Function to fade out audio
    function fadeOut(audioElement, duration) {
        let fadeOutInterval = 15; // Adjust this for smoother fade
        let fadeOutStep = audioElement.volume / (duration / fadeOutInterval);

        // Gradually reduce the volume
        let fadeOutTimer = setInterval(() => {
            if (audioElement.volume - fadeOutStep > 0) {
                audioElement.volume -= fadeOutStep;
            } else {
                audioElement.volume = 0;
                audioElement.pause();
                audioElement.currentTime = 0; // Reset playback
                clearInterval(fadeOutTimer);
            }
        }, fadeOutInterval);
    }
});





// Function to stop audio note with a sustain effect
function stopNoteWithSustain(noteId, sustainTime) {
    const note = document.getElementById(noteId);
    setTimeout(() => {
        note.pause();
        note.currentTime = 0;
    }, sustainTime);
}



// Volume controller for background video
document.addEventListener("DOMContentLoaded", function () {
    var video = document.querySelector('.background-video'); // Reference the video element
    var volumeSlider = document.getElementById('volume-slider');

    // Set initial volume based on the slider value (halved)
    video.volume = volumeSlider.value * 0.5;

    // Update video volume based on slider input
    volumeSlider.addEventListener('input', function () {
        video.volume = this.value * 0.5; // Scale slider value to a max volume of 0.5
    });
});








// Define texts for each Justin
const justinTexts = {
    justin5: "F# Minor",
    justin2: "E Major",
    justin6: "C# Minor",
    justin3: "D Major",
};

// Get the text display container
const textDisplay = document.getElementById('text-display');

// Function to show text on hover
function showText(justinId) {
    textDisplay.innerText = justinTexts[justinId];
    textDisplay.style.display = 'block'; // Make the text display visible
}

// Function to hide text when not hovering
function hideText() {
    textDisplay.style.display = 'none';
}

// Add hover event listeners to each Justin
document.getElementById('justin5').addEventListener('mouseenter', () => showText('justin5'));
document.getElementById('justin5').addEventListener('mouseleave', hideText);

document.getElementById('justin2').addEventListener('mouseenter', () => showText('justin2'));
document.getElementById('justin2').addEventListener('mouseleave', hideText);

document.getElementById('justin6').addEventListener('mouseenter', () => showText('justin6'));
document.getElementById('justin6').addEventListener('mouseleave', hideText);

document.getElementById('justin3').addEventListener('mouseenter', () => showText('justin3'));
document.getElementById('justin3').addEventListener('mouseleave', hideText);













document.addEventListener("DOMContentLoaded", function () {
    const letterOverlay = document.getElementById('letter-overlay');
    const closeLetterButton = document.getElementById('close-letter-button');
    const letterSound = document.getElementById('letter-sound');
    const letterIcon = document.getElementById('letter-icon');
    const toggleButton = document.getElementById('toggle-button');
    const backgroundVideo = document.querySelector('.background-video');
    const practiceMusic = document.getElementById('practice-audio');
    const title = document.getElementById('cool-title');
    const volumeControl = document.querySelector('.volume-control'); // Container for volume control
    

 
    let isPracticeMode = true; // Start with practice mode

    // Function to play the letter sound effect
    function playLetterSound() {
        letterSound.currentTime = 0; // Reset playback
        letterSound.play(); // Play sound
    }

    // Initially show the letter overlay
    letterOverlay.style.display = 'flex';
    playLetterSound();

    // Close button functionality
    closeLetterButton.addEventListener('click', function () {
        letterOverlay.style.display = 'none'; // Hide the overlay to show the practice screen
        backgroundVideo.play(); // Start playing the background video
        playLetterSound(); // Play the letter sound
    });

     // Show letter overlay when letter icon is clicked
     letterIcon.addEventListener('click', function () {
        letterOverlay.style.display = 'flex'; // Show the overlay
        playLetterSound(); // Play the letter sound
    });


    letterIcon.addEventListener('click', function() {
        // Add bounce class
        this.classList.add('bounce');


        // Remove bounce class after animation is complete
        this.addEventListener('animationend', function() {
            this.classList.remove('bounce');
            });
        });


    // Set initial video and button text
    backgroundVideo.src = 'pictures/vecteezy_abstract-dark-sci-fi-landscape-seamless-loop-4k-3d_29472681.mp4'; // Path to Practice video
    practiceMusic.play(); // Play practice music
    toggleButton.textContent = 'Start'; // Set initial button text
    title.textContent = 'Practice';
    volumeControl.classList.add('hidden'); // Hide volume control in practice mode

    toggleButton.addEventListener('click', function () {
        if (isPracticeMode) {
            // Switch to Cold Water
            backgroundVideo.src = '[Major Lazer Official] Major Lazer - Cold Water (feat. Justin Bieber & MØ) (Official Lyric Video).mp4'; // Path to Cold Water video
            backgroundVideo.play();
            practiceMusic.pause();
            practiceMusic.currentTime = 0;
            toggleButton.textContent = 'Exit'; // Change button text to Exit
            title.textContent = 'Cold Water';
            volumeControl.classList.remove('hidden'); // Show volume control in Cold Water mode
            isPracticeMode = false;
        } else {
            // Switch back to Practice
            backgroundVideo.src = 'pictures/vecteezy_abstract-dark-sci-fi-landscape-seamless-loop-4k-3d_29472681.mp4'; // Path to Practice video
            backgroundVideo.play();
            practiceMusic.play();
            toggleButton.textContent = 'Start'; // Change button text to Start
            title.textContent = 'Practice';
            volumeControl.classList.add('hidden'); // Hide volume control in Practice mode
            isPracticeMode = true;
        }
    });

    // Volume control
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', function () {
        backgroundVideo.volume = this.value * 0.5; // Adjust volume for video
        if (!isPracticeMode) {
            practiceMusic.volume = this.value * 0.5; // Adjust volume for practice music
        }
    });
});








