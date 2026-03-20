const pais = document.getElementById("pais");
const clima = document.getElementById("clima");
const card = document.getElementById("card");

pais.addEventListener("change", () => {    
    fetch(`https://restcountries.com/v3.1/name/${pais.value}?fields=name,flags,population`)
        .then(res => res.json())
        .then(pais => {
            let content = `
                <div class="card" style="width: 18rem;">
                    <img src="${pais[0].flags.png}" class="card-img-top" alt="${pais[0].flags.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${pais[0].name.common}</h5>
                            <p class="card-text">La población de este país es de: ${pais[0].population} habitantes.</p>
                            <a href="#" class="btn btn-primary" onclick=climaBtn('${pais[0].name.common}')>Mostrar clima</a>
                        </div>
                </div>`;

            card.innerHTML = content;
        })
})

window.climaBtn = (pais) => {
    fetch(`https://api.weatherstack.com/current?access_key=nokey&query=${pais}`)
        .then(res => res.json())
        .then(pais => {
            let content = "";
            content += `<p>Temperatura: ${pais.current.temperature}°C</p>`;
            content += `<p>Índice UV: ${pais.current.uv_index}</p>`;
            content += `<p>Humedad: ${pais.current.humidity}%</p>`;
            content += `<p>Viento: ${pais.current.wind_speed} km/h (${pais.current.wind_dir})</p>`;
            content += `<img src="${pais.current.weather_icons[0]}">`;
        
            clima.innerHTML = content;
        })
}