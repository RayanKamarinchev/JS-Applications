async function lockedProfile() {
    const main = document.getElementById('main');
    main.innerHTML = "";
    function createProfile(username, email, age, index){
        main.innerHTML = main.innerHTML + `<div class=\"profile\">\n` +
            `\t\t\t\t<img src=\"./iconProfile2.png\" class=\"userIcon\" />\n` +
            `\t\t\t\t<label>Lock</label>\n` +
            `\t\t\t\t<input type=\"radio\" name=\"user${index}Locked\" value=\"lock\" checked>\n` +
            `\t\t\t\t<label>Unlock</label>\n` +
            `\t\t\t\t<input type=\"radio\" name=\"user${index}Locked\" value=\"unlock\"><br>\n` +
            `\t\t\t\t<hr>\n` +
            `\t\t\t\t<label>Username</label>\n` +
            `\t\t\t\t<input type=\"text\" name=\"user${index}Username\" value=\"${username}\" disabled readonly />\n` +
            `\t\t\t\t<div class=\"user1Username\">\n` +
            `\t\t\t\t\t<hr>\n` +
            `\t\t\t\t\t<label>Email:</label>\n` +
            `\t\t\t\t\t<input type=\"email\" name=\"user${index}Email\" value=\"${email}\" disabled readonly />\n` +
            `\t\t\t\t\t<label>Age:</label>\n` +
            `\t\t\t\t\t<input type=\"text\" name=\"user${index}Age\" value=\"${age}\" disabled readonly />\n` +
            `\t\t\t\t</div>\n` +
            `\t\t\t\t<button>Show more</button>\n` +
            `\t\t\t</div>`
    }
    await fetch("http://localhost:3030/jsonstore/advanced/profiles")
        .then(response => response.json())
        .then(data => {
            Object.entries(data).forEach((profile, i) => {
                createProfile(profile[1].username, profile[1].email, profile[1].age, i+1);
            })
        })
    document.querySelectorAll('.profile button').forEach((b, i)=>{
        b.addEventListener('click', () => {
            if (!document.getElementsByName(`user${i+1}Locked`)[0].checked){
                let display = document.getElementsByClassName(`user${i+1}Username`)[0];
                if (display.style.display === 'none')
                    display.style.display = 'block';
                else
                    display.style.display = 'none';
            }
        })
    })
}