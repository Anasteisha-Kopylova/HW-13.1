const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  form.querySelectorAll(".error").forEach((el) => el.remove());

  const [name, message, phone, email] = [
    "name",
    "message",
    "phone",
    "email",
  ].map((field) => form[field].value.trim());

  let isValid = true;

  function validateField(regex, value, field, message) {
    if (!regex.test(value)) {
      showError(field, message);
      return false;
    }
    return true;
  }

  const rules = {
    name: { regex: /.+/, message: "Name is required" },
    message: { regex: /^.{5,}$/, message: "Message must have at least 5 characters" },
    phone: { regex: /^\+380\d{9}$/, message: "Phone must start with +380 and have 9 digits after" },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
  };

  const values = { name, message, phone, email };

  for (const fieldName in rules) {
    const rule = rules[fieldName];
    const value = values[fieldName];
    const field = form[fieldName];
    
    if (!validateField(rule.regex, value, field, rule.message)) {
      isValid = false;
    }
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
