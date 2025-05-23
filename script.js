const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  form.querySelectorAll(".error").forEach((el) => el.remove());

  const name = form.name.value.trim();
  const message = form.message.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();

  let isValid = true;

  if (!name) {
    showError(form.name, "Name is required");
    isValid = false;
  }

  if (!/^.{5,}$/.test(message)) {
    showError(form.message, "Message must have at least 5 characters");
    isValid = false;
  }

  if (!/^\+380\d{9}$/.test(phone)) {
    showError(form.phone, "Phone must start with +380 and have 9 digits after");
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/) {
    showError(form["e-mail"], "Invalid email");
    isValid = false;
  }

  if (!isValid) return;

  const formObj = {
    name,
    message,
    phone,
    email,
  };

  console.log(formObj);

  alert("Form submitted successfully!");
  form.reset();
});

function showError(input, message) {
  const errorElem = document.createElement("div");
  errorElem.className = "error text-danger";
  errorElem.textContent = message;
  input.parentNode.appendChild(errorElem);

  const removeError = () => {
    errorElem.remove();
    input.removeEventListener("input", removeError);
  };

  input.addEventListener("input", removeError);
}
