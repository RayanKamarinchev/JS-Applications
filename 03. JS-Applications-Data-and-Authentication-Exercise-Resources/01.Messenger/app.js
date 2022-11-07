function attachEvents() {
    const author = document.getElementsByName('author')[0];
    const content = document.getElementsByName('content')[0];
    const submit = document.getElementById('submit');
    const refresh = document.getElementById('refresh');
    const output = document.getElementById('messages');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let data = {
            author: author.value,
            content: content.value
        }
        fetch("http://localhost:3030/jsonstore/messenger", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    })
    refresh.addEventListener('click', (e) => {
        e.preventDefault();
        fetch("http://localhost:3030/jsonstore/messenger")
            .then(response => response.json())
            .then(data => {
                Object.entries(data).forEach(d=>{
                    output.value += `${d[1].author}: ${d[1].content}\n`;
                })
                output.value = output.value.trim();
            })
    })
}

attachEvents();