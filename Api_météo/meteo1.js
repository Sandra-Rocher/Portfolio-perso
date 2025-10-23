// Valeur meteo.html valeur du queryLoc par défaut = new york, on peut changer par toulouse, london etc...
// (qui traduira dans le link par toulouse,fr london,uk ou new+york,us) par exemple
// NB : les villes seront espacées par des -, et les accents seront possible mais pas obligatoire

var callBackGetSuccess = function(data){
    console.log("donnees api", data)
    // alert("Meteo temp :" data.main.temp);
    var element = document.getElementById("zone_meteo");
    var element1 = document.getElementById("zone_meteo1");
    var element2 = document.getElementById("zone_meteo2");
    var element3 = document.getElementById("zone_meteo3");
    var element4 = document.getElementById("zone_meteo4");
    var element5 = document.getElementById("zone_meteo5");
    var element6 = document.getElementById("zone_meteo6");
    var element7 = document.getElementById("zone_meteo7");
    var element8 = document.getElementById("zone_meteo8");
    // var element9 = document.getElementById("zone_meteo9");
    // var element10 = document.getElementById("zone_meteo10");
    var element11 = document.getElementById("zone_meteo11");

    element.innerHTML =  data.name;
    element1.innerHTML = data.main.temp + " &degC";
    element2.innerHTML = "Ressentie : " + data.main.feels_like + " &degC";
    element8.innerHTML = "<img src='https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'> ";

    
// Traduction de CONDITION par défaut en EN vers FR avec API DeepL en free key:

// const apiKey = 'xxx';


let weatherCondition = data.weather[0].main;

// MAJ UP 23/10/25 1/2 : Ancienne version en //, ce site est hébergé par GitHub, et depuis 2024 les requêtes d'appels directes 
// de github vers DeepL depuis le navigateur sont HS (à cause du CORS). Donc : Utilisation d’un proxy CORS (attention : il ne 
// marchera qu'en local http://127.0.0.1:5500 pour la démo, sinon il faudrait faire un fichier PHP.
// Schéma : Site localhost Météo -> requête appel API -> via Proxy -> vers DeepL = ok 
//          Site github Météo -> requête appel API -> directement vers Deepl = Refusée
// En bref il faut que ce soit le proxy qui face la requête vers deepl et pas github.
// Problème : github n'hebergera pas du php, mais uniquement du html css js..) 
const proxyUrl = "https://corsproxy.io/?";
const deeplUrl = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${weatherCondition}&target_lang=FR`;


// Requête vers l'API DeepL, en FR
// MAJ UP 23/10/25 2/2 : CORS = Cross-Origin Resource Sharing
// fetch(`https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${weatherCondition}&target_lang=FR`, {method: 'POST'
// })
fetch(proxyUrl + deeplUrl, { method: 'POST' })
.then(response => response.json())
.then(result => {
    // Stockage du texte traduit :
    let translatedText = result.translations[0].text;

    // Mise à jour de l'element4 ayant était traduit
    element4.innerHTML = "Conditions : " + translatedText;
})
.catch(error => {
    console.error('Erreur:', error);
});

    // version simple sans traduction ci dessous (obsolète du coup): 
    // element4.innerHTML = "Conditions : " + data.weather[0].main;


    element6.innerHTML = "Temp min : " + data.main.temp_min + " &degC";
    element7.innerHTML = "Temp max : " + data.main.temp_max + " &degC";
    element3.innerHTML = "Humidité : " + data.main.humidity + " %";

    // Fonction pour convertir les degrés (de 0 a 360 degres) en direction (nord, sud, est ou ouest)
        function getWindDirection(deg) {
            if (deg >= 338 || deg < 23) return "Nord";
            if (deg >= 23 && deg < 68) return "Nord-Est";
            if (deg >= 68 && deg < 113) return "Est";
            if (deg >= 113 && deg < 158) return "Sud-Est";
            if (deg >= 158 && deg < 203) return "Sud";
            if (deg >= 203 && deg < 248) return "Sud-Ouest";
            if (deg >= 248 && deg < 293) return "Ouest";
            if (deg >= 293 && deg < 338) return "Nord-Ouest";
        }

        let windDirection = getWindDirection(data.wind.deg);

        element11.innerHTML = `Direction du vent : ${windDirection}`;
        // element11.innerHTML = "Direction du vent : " + data.wind.deg;


    // Mise à jour de l'element5 avec transformation des m/s en km/h 
    let windSpeedMs = data.wind.speed;
    let windSpeedKmh = (windSpeedMs * 3.6).toFixed(1);

    element5.innerHTML = `Force du vent : ${windSpeedKmh} km/h`;

    // version EN/US en m/s et pas FR en km/h ci dessous (obsolète du coup): 
    // element5.innerHTML = "Force du vent : " + data.wind.speed + " m/s";


    // Ajout possible mais n'existe pas dans mon abonnement de free key :
    // element9.innerHTML = "Mm de pluie par heure : " + data.rain;
    // element10.innerHTML = "Mn de neige par heure : " + data.snow;
}


function buttonClickGet(){

     // la height de la div s'allonge au click pour que toutes les infos météo rentrent dans la zone
    document.getElementById("zone").style.height = "370px";

    var queryLoc = document.getElementById("queryLoc").value;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+queryLoc+"&appid=44e9203541e336d7e477fe5fd8022a05&units=metric"
    // rajouter a l interieur de l url "+queryLoc+" a la place de Paris,fr ou new york,us ou sevilla,es ou venise,it..
    // exemple https://api.openweathermap.org/data/2.5/weather?q=new+york,us&appid=44e9203541e336d7e477fe5fd8022a05&units=metric
    // ou https://api.openweathermap.org/data/2.5/weather?q=paris,fr&appid=44e9203541e336d7e477fe5fd8022a05&units=metric
    
    $.get(url, callBackGetSuccess).done(function() {
    // alert("Success");
 })
    .fail(function(){
    alert("Cette ville n'existe pas, veuillez vérifier l'ortographe.");
})
    .always(function() {
});

}






