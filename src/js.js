const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;

const place = document.querySelector("#place") as HTMLElement;
const degrees = document.querySelector("#degrees") as HTMLElement;
const img = document.querySelector(".clima") as HTMLImageElement;
const wind = document.querySelector("#wind") as HTMLElement;
const content = document.querySelector(".content") as HTMLElement;

interface WeatherData {
    name: string;
    sys: { country: string };
    main: { temp: number };
    weather: [{ icon: string }];
    wind: { speed: number };
}

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        input.value
    )}&units=metric&appid=340938cc2eed896f0785a5c3fdb11c13`;

    try {
        const response = await fetch(url);
        const data: WeatherData = await response.json();

        if (data?.cod && data.cod === "404") {
            return alert("Local não encontrado!");
        }

        loadData(data);
    } catch (error) {
        alert(error);
    }
}

function loadData(data: WeatherData) {
    if (data && data.name && data.sys && data.sys.country && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].icon && data.wind && data.wind.speed) {
        place.innerHTML = `${data.name}, ${data.sys.country}`;
        degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
        content.style.display = "flex";
    } else {
        alert("Dados inválidos ou incompletos.");
    }
}
