import store, { GarageStor } from '../../store/store';

class GarageForm {
  formEl: HTMLFormElement;

  formRole: string;

  constructor(formRole: string) {
    this.formRole = formRole;
    this.formEl = document.createElement('form');
  }

  init(): HTMLFormElement {
    this.render();
    this.attachEvents();
    return this.formEl;
  }

  render(): void {
    const inputValue = store.garage[this.formRole];

    this.formEl.classList.add('garage-btns');
    this.formEl.innerHTML = `
  <input type="text" id="uname" name="name" value="${inputValue}"/>
  <input type="color" id="color" name="color"
  value="#e66465">
  <button type="submit">${this.formRole.toUpperCase()}</button>`;
  }

  private attachEvents(): void {
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      const name = formData.get('name');
      const color = formData.get('color')

      console.log(name, color);

    })
  }
}

export default GarageForm;
