let addToy = false;
//Event Handlers



function createCardElement(toy){
  //create a <div class = "card"
  let card = document.createElement('div')
  //add card class
  card.classList.add("card")

  let h2 = document.createElement("h2")
  h2.textContent = toy.name

  let img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  let p = document.createElement("p")
  p.textContent = `${toy.likes} Likes`

  let button = document.createElement("button")
  button.addEventListener('click', ()=>{
    //update likes on DOM
    p.textContent = `${toy.likes +=1} Likes`
    updateLikes(toy.id,toy.likes)
  })
  button.classList.add("like-btn")
  button.id = `${toy.id}`
  button.textContent = "like"

  


  card.append(h2,img,p,button)
document.getElementById("toy-collection").appendChild(card)

}

function addNewToy(e){
  e.preventDefault()

  const formData = Object.fromEntries(new FormData(e.target));
  formData.likes = 0;
  patchNewToy(formData);

}
  
function addLike(e){
  console.log(e.id)

}


//EVENT Listeners

document.addEventListener("DOMContentLoaded", () => {
  fetch ("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => createCardElement(toy)))
  
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


const form = document.querySelector('form.add-toy-form')
form.addEventListener('submit',addNewToy)

// const createToyForm = document.getElementsByClassName("add-toy-form")
// createToyForm.addEventListener("submit", ()=>{
//   /* ******TIP FROM JAY TO GRAB INFO FROM FORM*******/
//   const formData = Object.fromEntries(new FormData(event.target));
//   console.log(formData)
// })




//LETS TALK TO THE SERVER
function updateLikes(id, newNumberofLikes){
  fetch (`http://localhost:3000/toys/${id}`,{
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes" : newNumberofLikes
    })
  }
  )

}


function patchNewToy(newToyData){
  fetch ('http://localhost:3000/toys',{
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify(newToyData)
    
})
.then(res => res.json())
.then(toy => createCardElement(toy))
}






//const formData = Object.fromEntries(new FormData(event.target));

