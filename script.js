const wineForm = document.getElementById("wine-form");
const wineList = document.getElementById("wine-list");

let wines = JSON.parse(localStorage.getItem("wines")) || [];

// Affiche la liste des vins
function renderWines() {
  wineList.innerHTML = "";
  wines.forEach((wine, index) => {
    const fullStars = "★".repeat(wine.stars || 0);
    const emptyStars = "☆".repeat(5 - (wine.stars || 0));
    const card = document.createElement("div");
    card.className = "wine-card";
    card.innerHTML = `
      <h3>${wine.name}</h3>
      <p><span style="color:#8AAE27;">Couleur :</span> ${wine.color}</p>
      <p><span style="color:#8AAE27;">Millésime :</span> ${wine.year}</p>
      <p><span style="color:#8AAE27;">Région :</span> ${wine.region}</p>
      <p><span style="color:#8AAE27;">Description :</span> ${wine.description}</p>
      <p><span style="color:#8AAE27;">Nbr de bouteilles :</span> ${wine.quantity}</p>
      <p><span style="color:#8AAE27;">Note :</span> ${fullStars}${emptyStars}</p>
      <button onclick="decreaseQuantity(${index})">-1</button>
      <button onclick="deleteWine(${index})">Supprimer</button>
    `;
    wineList.appendChild(card);
  });
}

// Sauvegarde dans le localStorage
function saveWines() {
  localStorage.setItem("wines", JSON.stringify(wines));
}

// Soumission du formulaire
wineForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const starsContainer = document.getElementById("stars");
  const stars = parseInt(starsContainer.getAttribute("data-evaluation")) || 0;
  const region = document.getElementById("region").value;
  const description = document.getElementById("description").value;
  const year = document.getElementById("year").value;
  const color = document.getElementById("color").value;
  const quantity = document.getElementById("quantity").value;

  wines.push({ name, stars, region, description, year, color, quantity });
  saveWines();
  renderWines();
  wineForm.reset();
  starsContainer.setAttribute("data-evaluation", "0");
  updateStars(starsContainer, 0);
});

// Supprime un vin
function deleteWine(index) {
  wines.splice(index, 1);
  saveWines();
  renderWines();
}

// Diminue la quantité
function decreaseQuantity(index) {
  if (wines[index].quantity > 1) {
    wines[index].quantity--;
  } else {
    if (confirm("Il ne reste qu'une bouteille. Pense à acheter de nouvelles bouteilles ?")) {
      wines.splice(index, 1);
    }
  }
  saveWines();
  renderWines();
}

// Évaluation des vins (clic étoiles)
document.querySelectorAll('.evaluation span').forEach(star => {
  star.addEventListener('click', function () {
    const evaluationValue = parseInt(this.getAttribute('data-value'));
    const evaluationContainer = this.parentElement;
    evaluationContainer.setAttribute('data-evaluation', evaluationValue);
    updateStars(evaluationContainer, evaluationValue);
  });
});

// Met à jour l’apparence des étoiles
function updateStars(container, evaluation) {
  const stars = container.querySelectorAll('span');
  stars.forEach(star => {
    const value = parseInt(star.getAttribute('data-value'));
    star.classList.toggle('selected', value <= evaluation);
  });
}

// Affiche initialement les vins
renderWines();
