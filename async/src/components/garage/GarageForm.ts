import { CreateCar } from './../../types/types';
import { createCar } from '../../api/fetch';
import store from '../../store/store';

class GarageForm {
  formEl: HTMLFormElement;

  formRole: string;

  callback: (data: CreateCar)=> Promise<void>;

  constructor(formRole: string, callback: (data: CreateCar) => Promise<void>) {
    this.formRole = formRole;
    this.callback = callback;
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
  <input type="text" class="js-${this.formRole}" id="uname" name="name" value="${inputValue}"/>
  <input type="color" id="color" name="color"
  value="#e66465">
  <button type="submit">${this.formRole.toUpperCase()}</button>`;
  }

  private attachEvents(): void {
    const input = this.formEl.querySelector('input[type=text]') as HTMLInputElement;
    input?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const { value } = target;
      store.garage[this.formRole] = value;
    });

    this.formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      const name = formData.get('name') as string;
      const color = formData.get('color') as string;

      await this.callback({ name, color });
      store.garage[this.formRole] = '';
      if (input) {
        input.value = '';
      }
    });
  }

}

export default GarageForm;
