// My carousel galleries
var galleries = {
    "Hangman":["abstract.jpg","abstract2.jpg","abstract3.jpg"],
    "RPG Game":["abstract4.jpg","abstract5.jpg","cloudy.png"],
    "Trivia Game":["fish.jpg","idk.jpg","diamond.jpg"],
    "Rock Paper Scissors":["football.jpg","basketball.jpg","ball.jpg"],
    "Rutgers Info Widget":["bear.jpg","wolf.jpg","tiger.jpg"]
};

//Creates shortcut for grabbing elements
function getElem(id) {
    return document.getElementById(id);
};

//The div containing carousel items
var container = getElem('container');

//Grabbing all children of the container and creating the carousels
/* 
for (var i = 0; i < container.children.length; i++) {
    carousel(container.children[i].children[0],galleries[container.children[i].getAttribute('id')]);
};
*/

var currGal = 0
var maxGal = Object.keys(galleries).length;

/* 
gallery - The img that is fading
images - The array of images for that specific carousel
originStyle - Used to save the style for when I reset the inline css of the fading img
*/
function carousel(gallery,images) {
    //console.log(gallery,static,images);

    //To fix the css after the carousel pauses
    var originStyle = gallery.getAttribute('style');

    //The carousel's current frame
    var num = 0;

    //Event function used for fading effect/frame changing
    var moveCarousel = function( event ) { 
        var op = window.getComputedStyle(gallery).opacity;
        if (op == 0.5) {
            gallery.src = "assets/images/"+images[num];
            num=num+1;
            if (num > images.length-1) {
                num = 0;
            }
            gallery.style.opacity = 1;
        }    
        else {
            //Checks if the hover event is still active
            if (window.getComputedStyle(gallery.parentElement).boxShadow != "none") {
                gallery.style.opacity = 0.5;
            }
            else {
                //Resets the css when the hover ends(when the boxshadow is removed)
                gallery.setAttribute('style',originStyle);
            }
            gallery.parentElement.style.backgroundImage = "url('assets/images/"+images[num]+"')";
        }  
    };

    //Event Listeners for multiple browsers
    gallery.addEventListener('webkitTransitionEnd', function( event ) {moveCarousel();}, false );
    gallery.addEventListener('mozTransitionEnd', function( event ) {moveCarousel();}, false );
    gallery.addEventListener('oTransitionEnd', function( event ) {moveCarousel();}, false );
};

//Creates all elements needed for each gallery
function createGalleries() {
    var name = Object.keys(galleries)[currGal]; //Name of gallery
    var list = galleries[name]; //Grabs the gallery's array
    var frame = document.createElement('div'); //Creates container for gallery
    frame.className = "images";
    frame.style.backgroundImage = "url('assets/images/"+list[0]+"')"; //Preview of next image in gallery
    var gallery = document.createElement('img')
    gallery.className = "fading";
    gallery.style.height = "100%";
    gallery.style.width = "100%";
    gallery.style.zIndex = 5;
    gallery.src = "assets/images/"+list[list.length-1];
    var label = document.createElement('div'); //Label for name of gallery
    label.className = "imageLabel";
    label.innerHTML = name;
    label.zIndex = 10;
    frame.appendChild(gallery);
    frame.appendChild(label);
    container.appendChild(frame);
    var op = 0;
    //Fades gallery into the document after it's creation
    setTimeout(function() {
    var apInt = setInterval(appear,30);
    function appear() {
        if (op >= 100) {
            clearInterval(apInt);
            carousel(gallery,list);
        }
        else {
            op++;
            frame.style.opacity=op/100;
        }
    };
    }, 250*currGal)
currGal++;
}

//Creates gallery for each array in the galleries object
for (var i = 0; i < maxGal; i++) {
    createGalleries();
};