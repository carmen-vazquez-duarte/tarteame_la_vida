
const fullImgBox = document.getElementById('fullImgBox'); // Get the container element for the full-size image box
const fullImg = document.getElementById('fullImg');
console.log(fullImgBox);// Log the fullImgBox element to the console (useful for debugging)
//document.getElementById('img1').addEventListener("click",openImg);
function closeImg(){
    fullImgBox.style.display = "none";// Hide the full-size image box by setting its display property to "none"

}

function openImg(path){ // Function to open the full-size image box and display a specific image
    fullImg.src = path;  // Set the source (src) of the full-size image to the provided path
    console.log(fullImgBox);
    fullImgBox.style.display = "flex"; // Display the full-size image box by setting its display property to "flex"
    
}
