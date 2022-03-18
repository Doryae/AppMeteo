import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

console.log(tabJoursEnOrdre);

const CLEFAPI = '9e63a454a8cdb394ba44df5790cc900b';
let resultatsAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourHeure = document.querySelectorAll('.heure-prevision-valeur')

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner. Veuillez l'activer !");
    })
}

function AppelAPI(long,lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            
            resultatsAPI = data;

            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;


            //Les heures + leurs températures

            let heureActuelle = new Date().getHours();

            for(let i = 0; i < heure.length; i++) {

                let heureIncr = heureActuelle + i * 3;

                if(heureIncr > 24) {
                    heure[i].innerText = `${heureIncr -24} h`
                } else if(heureIncr === 24) {
                    heureIncr[i].innerText = "00 h"
                } else {
                    heure[i].innerText= `${heureIncr} h`
                }

            }

            // température par heure
            for(let j = 0; j < tempPourHeure.length; j++) {
                tempPourHeure[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
            }

        })

}