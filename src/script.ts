const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const place = document.querySelector("#place") as HTMLElement;
const degress = document.querySelector("#degrees") as HTMLElement;
const wind = document.querySelector("#wind") as HTMLElement;
const img = document.querySelector(".clima") as HTMLImageElement;
const content = document.querySelector(".content") as HTMLElement;

interface WetherData {
    name: string;
    sys: { country: string };
    main: { temp: number };
    wind: { speed: number };
    weather: [{ icon: string }];
}

button.addEventListener('click', () => {
    if (!input.value) return;

    getDataApi();
});

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        input.value
    )}&units=metric&appid=340938cc2eed896f0785a5c3fdb11c13`;

    try {
        const response = await fetch(url);
        const data: WetherData = await response.json();

        if ('cod' in data && data.cod === '404') {
            return alert('Local não encontrado');
        };

        loadData(data);
    } catch (e) {
        alert(e);
    };
};

function loadData(data: WetherData) {
    if (data.name && data.sys && data.sys.country && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].icon && data.wind && data.wind.speed) {
        place.innerHTML = `${data.name}, ${data.sys.country}`;
        degress.innerHTML = `Temperatura: ${Math.floor(data.main.temp)} ° C`;
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        wind.innerHTML = `Vento: ${data.wind.speed}`;
        content.style.display = 'flex';
    } else {
        alert('Conteudo não encontrado ou incompleto');
    }
}