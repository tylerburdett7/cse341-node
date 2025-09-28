document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/data")
    .then(res => res.json())
    .then(data => {
      document.getElementById("professionalName").textContent = data.professionalName;
      document.getElementById("professionalImage").src = data.image;
      document.getElementById("nameLink").textContent = data.linkTitle;
      document.getElementById("nameLink").href = data.link;
      document.getElementById("primaryDescription").textContent = data.primaryDescription;
      document.getElementById("workDescription1").textContent = data.workDescription1;
      document.getElementById("workDescription2").textContent = data.workDescription2;
      document.getElementById("linkTitleText").textContent = data.linkTitleText;
      document.getElementById("linkedInLink").href = data.linkedin;
      document.getElementById("githubLink").href = data.github;
      document.getElementById("contactText").textContent = data.contact;
    })
    .catch(err => console.error("Error fetching data:", err));
});
