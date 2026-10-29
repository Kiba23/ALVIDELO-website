const modal = document.getElementById("request-modal");
const modalForm = modal.querySelector(".modal-form");

// Основная форма -> открыть окно и перенести значения (по совпадению name)
document.querySelector(".request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(event.target).forEach((value, name) => {
    if (modalForm.elements[name]) modalForm.elements[name].value = value;
  });
  modal.showModal();
});

// Клик по затемнённому фону закрывает окно
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

// Отправка формы в окне (пока заглушка)
modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  modalForm.querySelector(".form-status").textContent =
    modalForm.dataset.success;
});
