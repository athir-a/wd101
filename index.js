window.addEventListener("DOMContentLoaded", function () {
  const dob = document.getElementById("dob");

  const today = new Date();

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const minDate = new Date(
    today.getFullYear() - 56,
    today.getMonth(),
    today.getDate()+1
  );

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  dob.min = formatDate(minDate);
  dob.max = formatDate(maxDate);
});

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
