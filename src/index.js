
//DOM elements

const attachTable = document.querySelector("#table-body")
const form = document.querySelector("#dog-form")

//event listeners

attachTable.addEventListener("click", editDog)
form.addEventListener("submit", updateDog)

//update table

function updateTable(){
    attachTable.innerHTML = ""
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(newDogsArray => {
        newDogsArray.forEach(renderDogs)
        console.log('New Success:', newDogsArray);
      })
}

// update dog

function updateDog(event){
    event.preventDefault()
    const id = event.target.dataset.id
    const updatedDog = {
        name: event.target.name.value,
        breed: event.target.breed.value,
        sex: event.target.sex.value
    }
    fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedDog),
    })
    .then(response => response.json())
    .then(editedDog => {
        updateTable()
    console.log('Success:', editedDog);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
  
}

//populate form

function fillForm(dog){
    form[0].value = dog.name
    form[1].value = dog.breed
    form[2].value = dog.sex
    form.dataset.id = dog.id
}

//handle getting dog to be editted 

function editDog(event){
    if (event.target.tagName === "BUTTON"){
        const id = event.target.dataset.id
        fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(returnedDog => {
            fillForm(returnedDog)
            console.log('Success:', returnedDog);
      })
    }
}


//initial dog render

function renderDogs(dogObj){
    console.log(dogObj)
    const tr = document.createElement("tr")
    const tdName = document.createElement("td")
    tdName.textContent = dogObj.name
    const tdBreed = document.createElement("td")
    tdBreed.textContent = dogObj.breed
    const tdSex = document.createElement("td")
    tdSex.textContent = dogObj.sex
    const editBtn = document.createElement("button")
    editBtn.dataset.id = dogObj.id
    editBtn.textContent = "Edit"
    tr.append(tdName, tdBreed, tdSex, editBtn)
    attachTable.append(tr)
}

//get all dogs
function initialize(){
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(dogsArray => {
        dogsArray.forEach(renderDogs)
        console.log('Success:', dogsArray);
      })
}

initialize()