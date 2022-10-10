const form = document.forms[0];
const submitForm = document.forms[1];
const input = document.querySelector('input[type="number"]');
input.value = 100;

const goForm = () => {
  form.addEventListener('change', (e) => {
    input.value = e.target.value;
  });

  input.addEventListener('change', (e) => {
    const sum = e.target.value;
    const radioButton = document.querySelector(`#sum-${sum}`);
    if (radioButton) {
      radioButton.checked = true;
    }
  });

  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('после сабмита возвращаются начальные значения форм');
    input.value = 100;
    document.querySelector('#sum-100').checked = true;
  });
};

export default goForm;
