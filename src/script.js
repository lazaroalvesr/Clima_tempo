"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector("input");
const button = document.querySelector("button");
const place = document.querySelector("#place");
const degress = document.querySelector("#degrees");
const wind = document.querySelector("#wind");
const img = document.querySelector(".clima");
const content = document.querySelector(".content");
button.addEventListener('click', () => {
    if (!input.value)
        return;
    getDataApi();
});
function getDataApi() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(input.value)}&units=metric&appid=340938cc2eed896f0785a5c3fdb11c13`;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if ('cod' in data && data.cod === '404') {
                return alert('Local não encontrado');
            }
            ;
            loadData(data);
        }
        catch (e) {
            alert(e);
        }
        ;
    });
}
;
function loadData(data) {
    if (data.name && data.sys && data.sys.country && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].icon && data.wind && data.wind.speed) {
        place.innerHTML = `${data.name}, ${data.sys.country}`;
        degress.innerHTML = `Temperatura: ${Math.floor(data.main.temp)} ° C`;
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        wind.innerHTML = `Vento: ${data.wind.speed}`;
        content.style.display = 'flex';
    }
    else {
        alert('Conteudo não encontrado ou incompleto');
    }
}
