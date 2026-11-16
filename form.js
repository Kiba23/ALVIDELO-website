const modal = document.getElementById("request-modal");
const modalForm = modal.querySelector(".modal-form");
const requestForm = document.querySelector(".request-form");
const status = modalForm.querySelector(".form-status");
const submitButton = modalForm.querySelector(".modal__submit");

// Основная форма -> открыть окно и перенести значения (по совпадению name)
requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "";
  new FormData(event.target).forEach((value, name) => {
    if (modalForm.elements[name]) modalForm.elements[name].value = value;
  });
  modal.showModal();
});

// Клик по затемнённому фону закрывает окно
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

// Отправка заявки на почту через Web3Forms
modalForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = modalForm.dataset.sending;
  submitButton.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(modalForm))),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message);

    status.textContent = modalForm.dataset.success;
    modalForm.reset();
    requestForm.reset();
  } catch (error) {
    status.textContent = modalForm.dataset.error;
  } finally {
    submitButton.disabled = false;
  }
});
