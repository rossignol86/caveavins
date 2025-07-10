const wineForm = document.getElementById("wine-form");
const wineList = document.getElementById("wine-list");

let wines = JSON.parse(localStorage.getItem("wines")) || [];



// Fonction pour afficher la liste des vins
// On utilise la méthode forEach pour parcourir le tableau wines
// On crée un élément div pour chaque vin
// On ajoute une classe wine-card à chaque div
// On utilise innerHTML pour ajouter le contenu HTML
// On utilise appendChild pour ajouter le div à la liste
// On utilise innerHTML pour ajouter le contenu HTML
// On utilise JSON.parse pour convertir la chaîne de caractères en tableau
// On utilise localStorage.getItem pour récupérer la chaîne de caractères
// On utilise localStorage.setItem pour sauvegarder la chaîne
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


// Fonction pour sauvegarder les vins dans le localStorage
// On utilise JSON.stringify pour convertir le tableau en chaîne de caractères
// On utilise localStorage.setItem pour sauvegarder la chaîne
// On utilise JSON.parse pour convertir la chaîne de caractères en tableau
// On utilise localStorage.getItem pour récupérer la chaîne de caractères
function saveWines() {
  localStorage.setItem("wines", JSON.stringify(wines));
}

// Écouteur d'événement pour le formulaire
// On récupère les valeurs des champs du formulaire
// On ajoute le vin au tableau wines
// On sauvegarde le tableau dans le localStorage
wineForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const stars = document.getElementById("stars");
  const region = document.getElementById("region").value;
  const description = document.getElementById("description").value;
  const year = document.getElementById("year").value;
  const color = document.getElementById("color").value;
  const quantity = document.getElementById("quantity").value;

  wines.push({ name, stars, region, description, year, color, quantity });
  saveWines();
  renderWines();
  wineForm.reset();
});

// Fonction pour supprimer un vin
// On utilise la méthode splice pour supprimer l'élément à l'index donné
// On met à jour le localStorage et on réaffiche la liste
// On utilise la méthode splice pour supprimer l'élément à l'index donné
function deleteWine(index) {
  wines.splice(index, 1);
  saveWines();
  renderWines();
}

// Fonction pour diminuer la quantité de vin
// Si la quantité est 1, on demande confirmation avant de supprimer
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



// Évaluation des vins
document.querySelectorAll('.evaluation span').forEach(stars => {
  stars.addEventListener('click', function () {
    const evaluationValue = parseInt(this.getAttribute('data-value'));
    const evaluationContainer = this.parentElement;

    // Met à jour l’attribut data-evaluation
    evaluationContainer.setAttribute('data-evaluation', evaluationValue);

    // Met à jour l’apparence
    updateStars(evaluationContainer, evaluationValue);
  });
});

// Fonction pour mettre à jour les étoiles
// On utilise la méthode forEach pour parcourir le tableau stars
// On utilise la méthode toggle pour ajouter ou supprimer la classe selected
function updateStars(container, evaluation) {
  const stars = container.querySelectorAll('span');
  stars.forEach(stars => {
    const value = parseInt(stars.getAttribute('data-value'));
    stars.classList.toggle('selected', value <= evaluation);
  });
}


renderWines();

