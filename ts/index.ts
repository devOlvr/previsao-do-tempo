const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector(
  "#input-localization"
);

const sectionInfos = document.querySelector("#time-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionInfos) return;

  const localization = input.value;

  if (localization.length < 3) {
    alert("O local precisa ter pelo menos três letras");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=2303262fbbe9d1c3603259fc241ced29&lang=pt_br&units=metric`
    );

    const datas = await response.json();

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
  } catch (err) {
    console.log("Deu um erro na obtenção dos dados da API", err);
  }
});
