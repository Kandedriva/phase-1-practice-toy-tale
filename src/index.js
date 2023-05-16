let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

const toyCollection = document.getElementById("toy-collection");

fetch("http://localhost:3000/toys")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch toys.");
    }
  })
  .then(function(toys) {
    toys.forEach(toy => createNewToy(toy));
  })
  .catch(function(error) {
    console.error(error);
  });


  // const toyCollection = document.querySelector("#toy-collection");
const form = document.querySelector(".add-toy-form");
const imageUrl = document.getElementsByClassName("input-text")[1];
const toysName = document.getElementsByClassName("input-text")[0]

// Create a toy card
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const toyCard = {
    name: toysName.value,
    image: imageUrl.value,
    likes: 0,
  };
  console.log(toyCard)
// Fetch to add a new toy.
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toyCard),
  })
    .then(function (response) {
      return response.json();
    })
    .then(toy => createNewToy(toy))
    form.reset();
});



 function createNewToy(toy){
  const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      const h2 = document.createElement("h2");
      h2.textContent = toy.name;

      const img = document.createElement("img");
      img.setAttribute("src", toy.image);
      img.classList.add("toy-avatar");

      const p = document.createElement("p");
      p.textContent = toy.likes + " Likes";

      const button = document.createElement("button");
      button.setAttribute("class", "like-btn");
      button.textContent = "Like ❤️";
      button.setAttribute("id", toy.id);
      button.addEventListener("click", addLikes)
      cardDiv.appendChild(h2);
      cardDiv.appendChild(img);
      cardDiv.appendChild(p);
      cardDiv.appendChild(button);

      toyCollection.appendChild(cardDiv);


 }
 // Increase the number of likes for a toy
function addLikes(e){
  console.log(e)
  const button = e.target;
  const toyId = button.id;
    const likesElement = button.previousSibling;
    console.log(likesElement)
    let likesCount = parseInt(likesElement.textContent.split(" ")[0]);
    likesCount++;
    console.log(likesCount);
    console.log(toyId);

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likesCount
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(toy) {
        likesElement.textContent = `${toy.likes} Likes`;
      });

}


