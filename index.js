
let form = document.getElementById("data");
let retrieve = () => {
  let entry = localStorage.getItem("entries");
  if (entry) {
    entry = JSON.parse(entry);
  } else {
    entry = [];
  }
  return entry;
};
let entries = retrieve();
let display = () => {
  let table =
    `<thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dob</th>
            <th>Accepted Terms?</th>
          </tr>
        </thead>` +
    entries
      .map(
        (i) => `<tr>
      <td>${i.name}</td>
  <td>${i.email}</td>
  <td>${i.password}</td>
  <td>${i.dob}</td>
  <td>${i.terms}</td>
  </tr>`
      )
      .join("\n");
  document.getElementById("table").innerHTML = table;
};

let save = (event) => {
  event.preventDefault();
  let dobValue = new Date(document.getElementById("dob").value);
  let today = new Date();
  let age = today.getFullYear() - dobValue.getFullYear();
  let monthDiff = today.getMonth() - dobValue.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    alert("Sorry, you must be between 18 and 55 years old to register.");
    return;
  }
  let entry = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    dob: document.getElementById("dob").value,
    terms: document.getElementById("terms").checked,
  };
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
  display();
  form.reset();
};
display();
form.addEventListener("submit", save);
