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
    const body = document.documentElement;
   
    // Verifica se o usuário já ativou o modo escuro antes
    if (localStorage.getItem("theme") === "dark") {
      body.setAttribute("data-theme", "dark");
      toggleSwitch.checked = true;
    }
  
    toggleSwitch.addEventListener("change", () => {
      if (toggleSwitch.checked) {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.setAttribute("data-theme", "light");
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

// const form = document.querySelector('form');

// form.addEventListener('submit', (evento) => {
//   evento.preventDefault();
// })

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);

    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  } 

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerHTML = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch(error) {
      this.displayError();
      throw new Error(error);
    }
  }

  // Testa o que estamos fazendo
  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<div class='success'><h1>Mensagem Enviada!</h1><i class='bi bi-check-circle-fill'></i></div>",
  error: "<div class='error'><h1>Não foi possível enviar sua mensagem.</h1><i class='bi bi-emoji-frown-fill'></i></div>",
});
formSubmit.init();
//------------------------------------------------------------------------------------------------
