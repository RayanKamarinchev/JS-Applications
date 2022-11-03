async function getInfo() {
    let buses = document.getElementById("buses");
    while (buses.firstChild) {
        buses.removeChild(buses.lastChild);
    }
    let id = document.getElementById("stopId").value;
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("stopName").textContent = data.name;
            Object.entries(data.buses)
                .map(b=> `Bus ${b[0]} arrives in ${b[1]} minutes`)
                .forEach(b=>{
                    let li = document.createElement("li");
                    li.textContent = b;
                    buses.appendChild(li)
                })
        })
        .catch(err => document.getElementById("stopName").textContent = "Error");
    document.getElementById("stopId").value = "";
    document.getElementById("stopName").textContent = "";
}