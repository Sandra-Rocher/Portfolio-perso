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
    element4.innerHTML = "Conditions : " + data.weather[0].main;
    element6.innerHTML = "Temp min : " + data.main.temp_min + " &degC";
    element7.innerHTML = "Temp max : " + data.main.temp_max + " &degC";
    element5.innerHTML = "Force du vent : " + data.wind.speed + " m/s";
    element3.innerHTML = "Humidité : " + data.main.humidity + " %";

    // n'existe pas dans mon abonnement :
    // element9.innerHTML = "Mm de pluie par heure : " + data.rain;
    // element10.innerHTML = "Mn de neige par heure : " + data.snow;
}


function buttonClickGet(){

     // la height de la div s'allonge au click pour que la météo rentre dedans
    document.getElementById("zone").style.height = "370px";

    var queryLoc = document.getElementById("queryLoc").value;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+queryLoc+"&appid=44e9203541e336d7e477fe5fd8022a05&units=metric"
    // rajouter a l interieur de l url "+queryLoc+" a la place de Paris,fr ou new york,us ou sevilla,es ou venise,it..
    // exemple https://api.openweathermap.org/data/2.5/weather?q=new+york,us&appid=44e9203541e336d7e477fe5fd8022a05&units=metric
    // ou https://api.openweathermap.org/data/2.5/weather?q=paris,fr&appid=44e9203541e336d7e477fe5fd8022a05&units=metric
    
    $.get(url, callBackGetSuccess).done(function() {
    // alert("second success");
 })
    .fail(function(){
    alert("error");
})
    .always(function() {
});

}

