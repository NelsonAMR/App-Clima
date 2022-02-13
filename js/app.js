window.addEventListener('load', ()=>{
    let lon;
    let lat;
    let cd;

    let tempV = document.getElementById('temp-valor');
    let tempD = document.getElementById('temp-descripcion');

    let ubic = document.getElementById('ubicacion');
    let icono = document.getElementById('icono');

    let vel = document.getElementById('vel-viento');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            console.log('latitud: ', lat);
            console.log('longitud: ', lon);

            //Ubicacion Actual
            const url_ub  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d6fa146d4b1c36fec8dbf5e164868848&lang=es&units=metric`
            console.log(url_ub);

            //Ubicacion por ciudad
            // const url_cd = `https://api.openweathermap.org/data/2.5/weather?q=${cd}&appid=d6fa146d4b1c36fec8dbf5e164868848&lang=es&units=metric`

            fetch(url_ub)
                .then (Response => {return Response.json()})
                .then (data => {
                    console.log(data);
                    let temp = Math.round(data.main.temp);
                    let desc = data.weather[0].description;
                    let ubicacion = data.name;
                    let velocidad = data.wind.speed;
                    let iconCode =  data.weather[0].icon;

                    //Para Iconos Estaticos
                    const urlIconE =`http://openweathermap.org/img/wn/${iconCode}.png`;
                    console.log(data.weather[0].icon);
                    console.log(urlIconE);
                    icono.src = urlIconE;

                    //Para Iconos Animados
                    // console.log(data.weather[0].main)
                    // switch(data.weather[0].main){
                    //     case 'Clear':
                    //         icono.src = '../icon/animated/day.svg';
                    //     break;

                    //     case 'Clouds':
                    //         icono.src = '../icon/animated/cloudy.svg';
                    // }

                    tempV.textContent = `${temp} °C`;
                    tempD.textContent = desc.toUpperCase();
                    ubic.textContent = ubicacion;
                    vel.textContent = `${velocidad} m/s`;
                    // icono.textContent = urlIcon;
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
});