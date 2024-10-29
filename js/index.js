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
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localization");
const sectionInfos = document.querySelector("#time-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfos)
        return;
    const localization = input.value;
    if (localization.length < 3) {
        alert("O local precisa ter pelo menos três letras");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=2303262fbbe9d1c3603259fc241ced29&lang=pt_br&units=metric`);
        const datas = yield response.json();
        console.log(datas);
        const infos = {
            temperature: Math.round(datas.main.temp),
            local: datas.name,
            icon: `https://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`,
        };
        sectionInfos.innerHTML = `
      <div class="time-data">
        <h2>${infos.local}</h2>
        <span>${infos.temperature}°C</span>
      </div>
  
      <img src="${infos.icon}" />`;
    }
    catch (err) {
        console.log("Deu um erro na obtenção dos dados da API", err);
    }
}));
