// função que mostra a hora atual
function actualTime(){
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const period = hour >= 12 ? "pm" : "am";

// formatar para 12h
const hourFormat = hour % 12 || 12;
const minuteFormat = minute.toString().padStart(2, "0");
const secondFormat = second.toString().padStart(2, "0");

const timeNow = `${hourFormat}:${minuteFormat}:${secondFormat} ${period}`;

document.getElementById("localTime").textContent = timeNow;
}

// Atualiza a cada segundo
setInterval(actualTime, 1000);
actualTime(); //chamada inicial

// --------------------------------------------------------------------------------------------------

// Dark-mode
document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleDarkMode");
    const body = document.body;
  
    // Verifica se o usuário já ativou o modo escuro antes
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      toggleSwitch.checked = true;
    }
  
    toggleSwitch.addEventListener("change", () => {
      if (toggleSwitch.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  });
  
//------------------------------------------------------------------------------------------------
// Project-scroll
document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".project");
  const dots = document.querySelectorAll(".dot");

  function showProjects(index) {
      projects.forEach((project) => (project.style.display = "none")); // Oculta todos os projetos

      const start = index * 2; // Cada página exibe 2 projetos
      for (let i = start; i < start + 2; i++) {
          if (projects[i]) projects[i].style.display = "block";
      }

      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");
  }

  dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
          showProjects(i);
      });
  });

  showProjects(0); // Exibe os primeiros projetos ao carregar a página
});

//------------------------------------------------------------------------------------------------
// Form Submit

const form = document.querySelector('form');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
})

//------------------------------------------------------------------------------------------------
