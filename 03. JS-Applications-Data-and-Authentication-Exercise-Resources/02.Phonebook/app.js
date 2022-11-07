async function attachEvents() {
    const personIn = document.getElementById('person');
    const phoneIn = document.getElementById('phone');
    const create = document.getElementById('btnCreate');
    const load = document.getElementById('btnLoad');

    load.addEventListener('click', async () => {
        let response = await fetch("http://localhost:3030/jsonstore/phonebook");
        let data = await response.json();
        await Object.entries(data).forEach(d=>{
            let li = document.createElement('li');
            li.textContent = `${d[1].person}: ${d[1].phone}`;
            let del = document.createElement('button');
            del.addEventListener('click', async () => {
                await fetch(`http://localhost:3030/jsonstore/phonebook/${d[0]}`, {
                    method: 'DELETE'
                })
            })
            del.textContent = "Delete"
            li.appendChild(del)
            document.getElementById("phonebook").appendChild(li);
        })
    });

    create.addEventListener("click", async () =>{
        let data = {
            person: personIn.value,
            phone: phoneIn.value
        }
        await fetch("http://localhost:3030/jsonstore/phonebook", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    })
}

attachEvents();