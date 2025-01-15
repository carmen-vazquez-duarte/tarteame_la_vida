const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector(".carruseles");
const sliderSections = document.querySelectorAll(".slider-section");

let currentIndex = 0; // Keep track of the current index of the active slide

btnLeft.addEventListener("click", () => moveToLeft());
btnRight.addEventListener("click", () => moveToRight());// Add a click event listener to the right button

function moveToRight() { // Function to move the carousel to the righ
    if (currentIndex < sliderSections.length - 1) { // Check if the current index is less than the last slide index
        currentIndex++; // Increment the current index
        updateSliderPosition();// Update the carousel's position
    }
}

function moveToLeft() {
    if (currentIndex > 0) { // Check if the current index is greater than 0
        currentIndex--; // Decrement the current index
        updateSliderPosition(); // Actualiza la posición del slider
    }
}

function updateSliderPosition() {
    const slideWidth = sliderSections[0].offsetWidth; // Get the width of a single slide
    const newTranslateX = -currentIndex * slideWidth; // Calculate the new translation value based on the current index
    slider.style.transform = `translateX(${newTranslateX}px)`;  // Apply the translation to the carousel using CSS transform
    slider.style.transition = "transform 0.5s ease";  // Add a smooth transition effect for the movemen
}



