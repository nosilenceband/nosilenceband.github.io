function formaterDate(dateStr) {
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

function chargerConcerts() {
    fetch('assets/json/concerts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier JSON");
            }
            return response.text(); // Traiter comme texte d'abord pour vérifier si le contenu est vide
        })
        .then(text => {
            if (!text.trim()) {
                // Si le texte est vide, afficher le message
                const concertList = document.getElementById('concert-list');
                concertList.innerHTML = '<p class="text-center text-xl text-light-green">Pas de concert prévus 😔</p>';
                return; // Arrêter l'exécution si le fichier est vide
            }

            // Convertir ensuite le texte en JSON
            const concerts = JSON.parse(text);
            const concertList = document.getElementById('concert-list');
            
            concertList.innerHTML = ''; // Clear previous content

            if (concerts.length === 0) {
                // Si le tableau est vide, afficher le message
                const noConcertMessage = document.createElement('p');
                noConcertMessage.classList.add('text-center', 'text-xl', 'text-light-green');
                noConcertMessage.textContent = "Pas de concert prévus 😔";
                concertList.appendChild(noConcertMessage);
            } else {
                // Sinon, afficher les concerts
                concerts.forEach(concert => {
                    const concertElement = document.createElement('div');
                    concertElement.classList.add('bg-dark-green', 'p-4', 'rounded-lg', 'hover:bg-opacity-75', 'transition-colors', 'duration-300');
                    
                    const concertDate = document.createElement('h3');
                    concertDate.classList.add('text-xl', 'font-bold', 'text-light-green');
                    
                    const formattedDate = formaterDate(concert.date);
                    
                    concertDate.textContent = `${formattedDate} - ${concert.lieu}`;
                    
                    const concertTime = document.createElement('p');
                    concertTime.textContent = `${concert.nom_salle} - ${concert.heure}`;
                    
                    concertElement.appendChild(concertDate);
                    concertElement.appendChild(concertTime);
                    
                    concertList.appendChild(concertElement);
                });
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des concerts:', error);
            const concertList = document.getElementById('concert-list');
            concertList.innerHTML = '<p class="text-center text-xl text-light-green">Erreur de chargement des concerts 😔</p>';
        });
}

// Appeler la fonction dès que la page est chargée
window.onload = chargerConcerts;
