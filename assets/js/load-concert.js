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
        .then(response => response.json())
        .then(concerts => {
            const concertList = document.getElementById('concert-list');
            
            concertList.innerHTML = '';
            
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
        })
        .catch(error => {
            console.error('Erreur lors du chargement des concerts:', error);
        });
}

// Appeler la fonction dès que la page est chargée
window.onload = chargerConcerts;