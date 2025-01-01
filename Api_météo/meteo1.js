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

    element.innerHTML =  data.name;
    element1.innerHTML = data.main.temp + " &degC";
    element2.innerHTML = "Ressentie : " + data.main.feels_like + " &degC";
    element8.innerHTML = "<img src='https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'> ";

    
// Traduction de CONDITION par défaut en EN vers FR avec API DeepL en free key:
const apiKey = '1632191b-075c-4eac-b660-3d25141ff5b9:fx';
// const apiKey = 'xxx';


let weatherCondition = data.weather[0].main;

// Requête vers l'API DeepL, en FR
fetch(`https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${weatherCondition}&target_lang=FR`, {
    method: 'POST'
})
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
    element5.innerHTML = "Force du vent : " + data.wind.speed + " m/s";
    element3.innerHTML = "Humidité : " + data.main.humidity + " %";


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






