//this is the code for opening and close the content
function toggleContainer(containerId, containerName) {
    // Get all containers
    var containers = document.querySelectorAll('.descriptive');

    // Loop through all containers to hide them
    containers.forEach(function(container) {
        if (container.id === containerId) {
            // Show the clicked container and hide others
            container.classList.add('active');
        } else {
            // Ensure others are hidden
            container.classList.remove('active');
        }
    });

    // Get the static part of the path from the data attribute
    var pathDiv = document.getElementById('path');
    var staticPath = pathDiv.getAttribute('data-static-path');

    // Update the path with the static part and the dynamic part (container name)
    pathDiv.innerHTML = `${staticPath}/${containerName}<br>
                        <hr style="border: .5px solid rgb(0, 92, 0); left:0px;">`;
}



let slideIndex = 1;
        
window.onload = function() {
    showSlides(slideIndex);  // Ensure first slide shows when page loads
};

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
