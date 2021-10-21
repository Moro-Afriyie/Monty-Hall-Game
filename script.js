let doors = [];
const doorBox = document.querySelectorAll(".door-box");
const ansYes = document.querySelector(".yes");
const ansNo = document.querySelector(".no");
const answer = document.querySelector(".answer");
const title = document.querySelector(".title");

// get all the doors id from the div tags and store it in the doors array
doorBox.forEach(element=>{
    doors.push(document.getElementById(element.firstElementChild.id));
});

const randomNumber = Math.floor(Math.random()*doorBox.length);

// removes the event listener from the card that was clicked once the result it revealed
const removeEvent =(e)=>{
 doors.forEach((door)=>{
        if(door === e.currentTarget && e.type==="click"){
        door.removeEventListener('click', handleGamePlay);
                }
        });
}
const handleGamePlay = (e)=>{
    e.path[0].style.transform = "rotateY(180deg)";
    title.innerHTML = "";
    doors.forEach((door)=>{
        if(door !== e.currentTarget){
        door.removeEventListener('click', handleGamePlay);
                }
        });
    for(let i=0; i<doors.length; i++){
        if(i===randomNumber){
             doorBox[i].children[1].innerHTML = `<img src="car.png" />`;
        }
        else{
             doorBox[i].children[1].innerHTML = `<img src="goat.png" />`;
        }
    }
     let doorSelected = e.path[1].id;  // gets the id of the door which was selected
     let box =  document.querySelector(`.${e.path[1].id}-box`);
     let imageSrc = box.children[1].firstChild.src.split('/') // get the image src
     let imageData = imageSrc[imageSrc.length-1].split(".")[0]; // get the value of the image
     
    if(imageData==="car"){
       removeEvent(e);
        setTimeout(()=>{
 title.innerHTML = "You win 🏆";    
        },1000);
       
    }
    else{
        removeEvent(e);
       setTimeout(()=>{
title.innerHTML = "You lose 😞";    
        answer.style.display = "block";
        [ansYes, ansNo].forEach(element=>{
            element.addEventListener("click",(e)=>{
                if(e.path[0].innerHTML==="yes"){
                    box.parentNode.removeChild(document.querySelector(`.${ doorSelected }-box`));
                    answer.style.display = "none";
                      title.innerHTML = "";
                      doors.forEach((door)=>{
    door.addEventListener('click', handleGamePlay);

});
                }
           else{
               title.innerHTML = "Game Over 🚫";
               answer.style.display = "none";
           }
            });
        });
},1000);
    }
   };


// loop through the doors and add eventlistener to it when the user clicks on it
doors.forEach((element)=>{
    element.addEventListener('click', handleGamePlay);

});
