function attachEvents() {
    const location = document.getElementById('location');
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("forecast").style.display = "block"
        if(document.getElementsByClassName("forecasts")[0]) document.getElementsByClassName("forecasts")[0]
            .remove();
        const forecasts = CreateElement("div", document.getElementById("current"), "forecasts");
        fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.value}`)
            .then(response => response.json())
            .then(data => {
                let condition = data.forecast.condition;
                let symbol;
                switch (condition) {
                    case "Sunny":
                        symbol = "☀"
                        break;
                    case "Partly sunny":
                        symbol = "⛅"
                        break;
                    case "Overcast":
                        symbol = "☁"
                        break;
                    case "Rain":
                        symbol = "☂"
                        break;
                }
                CreateElement("span", forecasts, "condition symbol", symbol);
                let primary = CreateElement("span", forecasts, "condition");
                CreateElement("span", primary, "forecast-data", data.name);
                CreateElement("span", primary, "forecast-data", `${data.forecast.low}°/${data.forecast.high}°`);
                CreateElement("span", primary, "forecast-data", condition);
            })
            .catch(() => {
                CreateElement("span", forecasts, "", "Error");
            })

        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${location.value}`)
            .then(response => response.json())
            .then(data => {
                if (document.getElementById("forecast-info")) document.getElementById("forecast-info").remove();
                let forecastInfo = CreateElement("div", document.getElementById("upcoming"),"forecast-info");
                CreateCondition(data, 0, forecastInfo);
                CreateCondition(data, 1, forecastInfo);
                CreateCondition(data, 2, forecastInfo);
            })
            .catch(() => {
                CreateElement("span", forecasts, "", "Error");
            })
    })
    function CreateCondition(data, index, forecastInfo){
        let condition = data.forecast[index].condition;
        let symbol;
        switch (condition) {
            case "Sunny":
                symbol = "☀"
                break;
            case "Partly sunny":
                symbol = "⛅"
                break;
            case "Overcast":
                symbol = "☁"
                break;
            case "Rain":
                symbol = "☂"
                break;
        }
        CreateElement("span", forecastInfo, "condition symbol", symbol);
        let upcoming = CreateElement("span", forecastInfo, "upcoming");
        CreateElement("span", upcoming, "forecast-data", data.name);
        CreateElement("span", upcoming, "forecast-data", `${data.forecast[index].low}°/${data.forecast[index].high}°`);
        CreateElement("span", upcoming, "forecast-data", condition);
    }

    function CreateElement(type, parent, clas, content) {
        let element = document.createElement(type);
        if (parent) parent.appendChild(element);
        element.textContent = content;
        element.className = clas;
        return element;
    }
}

attachEvents();