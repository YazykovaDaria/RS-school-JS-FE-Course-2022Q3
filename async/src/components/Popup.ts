class Popup {
  popupEl: HTMLElement;

  name: string;

  speed: number;

  constructor(name: string, speed: number) {
    this.name = name;
    this.speed = speed;
    this.popupEl = document.createElement('div');

    this.render();
  }

  render(): void {
    this.popupEl.classList.add('popup');
    this.popupEl.innerHTML = `
  <h2>The winner is ${this.name} with result ${this.speed} sec</h2>
  `;
  }

  remove(): void {
    this.popupEl.remove();
  }
}

export default Popup;
