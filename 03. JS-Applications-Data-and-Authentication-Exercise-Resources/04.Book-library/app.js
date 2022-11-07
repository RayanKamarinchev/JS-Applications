const titleIn = document.getElementsByName('title')[0];
const authorIn = document.getElementsByName('author')[0];
const submit = document.querySelector('form button');
const load = document.getElementById('loadBooks');
const table = document.querySelector("tbody");
const formHeader = document.querySelector('form h3');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let data = {
        author: authorIn.value,
        title: titleIn.value
    }
    await fetch("http://localhost:3030/jsonstore/collections/books", {
        method: "POST",
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    })
    authorIn.value = "";
    titleIn.value = "";
})

load.addEventListener("click", async() =>{
    let response = await fetch("http://localhost:3030/jsonstore/collections/books");
    let data = await response.json();
    table.innerHTML = "";
    Object.entries(data).forEach(d=>{
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        title.textContent = d[1].title;
        let author = document.createElement("td");
        author.textContent = d[1].author;
        let btns = document.createElement("td")
        let edit = document.createElement("button");
        edit.textContent = "Edit";
        let del = document.createElement("button");
        del.textContent = "Delete";
        edit.addEventListener("click", async () => {
            //hm
            titleIn.value = d[1].title;
            authorIn.value = d[1].author;
            formHeader.textContent = "Edit FORM";
            await fetch("http://localhost:3030/jsonstore/collections/books/" + d[0], {
                method: "DELETE"
            });
        })
        del.addEventListener("click", () => {
            fetch("http://localhost:3030/jsonstore/collections/books/" + d[0], {
                method: "DELETE"
            });
        })
        btns.appendChild(edit);
        btns.appendChild(del);
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(btns);
        table.appendChild(tr);
    })
})

