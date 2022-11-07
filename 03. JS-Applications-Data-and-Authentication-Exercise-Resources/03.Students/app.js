const firstNameIn = document.getElementsByName("firstName")[0];
const lastNameIn = document.getElementsByName("lastName")[0];
const facultyNumberIn = document.getElementsByName("facultyNumber")[0]
const gradeIn = document.getElementsByName("grade")[0];
const submit = document.getElementById("submit");
const table = document.querySelector("#results thead")

submit.addEventListener("click", async (ev) => {
    await ev.preventDefault();
    let data = {
        firstName: firstNameIn.value,
        lastName: lastNameIn.value,
        facultyNumber: facultyNumberIn.value,
        grade: gradeIn.value
    }
    await fetch("http://localhost:3030/jsonstore/collections/students", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    let response = await fetch("http://localhost:3030/jsonstore/collections/students");
    let data2 = await response.json();
    Object.entries(data2).forEach(d=>{
        let tr = document.createElement('tr');
        let firstName = document.createElement('th');
        firstName.textContent = d[1].firstName;
        let lastName = document.createElement('th');
        lastName.textContent = d[1].lastName;
        let faculty = document.createElement('th');
        faculty.textContent = d[1].facultyNumber;
        let grade = document.createElement('th');
        grade.textContent = d[1].grade;
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(faculty);
        tr.appendChild(grade);
        table.appendChild(tr);
    })
})