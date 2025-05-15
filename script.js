const wineForm = document.getElementById("wine-form");
const wineList = document.getElementById("wine-list");

let wines = JSON.parse(localStorage.getItem("wines")) || [];

function renderWines() {
  wineList.innerHTML = "";
  wines.forEach((wine, index) => {
    const card = document.createElement("div");
    card.className = "wine-card";
    card.innerHTML = `
      <h3>${wine.name}</h3>
      <p> <span style= color:#8AAE27;>Couleur :</span> ${wine.color}</p>
      <p> <span style= color:#8AAE27;>Millésime :</span> ${wine.year}</p>
      <p> <span style= color:#8AAE27;>Région : </span> ${wine.region}</p>
      <p> <span style= color:#8AAE27;>Description :</span> ${wine.description}</p>
      <p> <span style= color:#8AAE27;>Nbr de bouteilles :</span> ${wine.quantity}</p>
      <button onclick="decreaseQuantity(${index})">-1</button>
      <button onclick="deleteWine(${index})">Supprimer</button>
    `;
    wineList.appendChild(card);
  });
}

function saveWines() {
  localStorage.setItem("wines", JSON.stringify(wines));
}

wineForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const region = document.getElementById("region").value;
  const description = document.getElementById("description").value;
  const year = document.getElementById("year").value;
  const color = document.getElementById("color").value;
  const quantity = document.getElementById("quantity").value;

  wines.push({ name, region, description, year, color, quantity });
  saveWines();
  renderWines();
  wineForm.reset();
});



function deleteWine(index) {
  wines.splice(index, 1);
  saveWines();
  renderWines();
}


function decreaseQuantity(index) {
  if (wines[index].quantity > 1) {
    wines[index].quantity--;
  } else {
    if (confirm("Il ne reste qu'une bouteille. Pense à acheter de nouvelle bouteilles ?")) {
      wines.splice(index, 1);
    }
  }
  saveWines();
  renderWines();
}


renderWines();

