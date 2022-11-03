function solve() {
    let firstStop = "Depot";
    let id = "depot";
    const result = document.querySelector(".info");
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");
    function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${id}`)
            .then(response => response.json())
            .then(data => {
                debugger;
                id = data.next;
                firstStop = data.name;
            })
        result.textContent = `Next stop ${firstStop}`;
    }

    function arrive() {
        arriveBtn.disabled = true;
        departBtn.disabled = false;
        result.textContent = `Arriving at ${firstStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();