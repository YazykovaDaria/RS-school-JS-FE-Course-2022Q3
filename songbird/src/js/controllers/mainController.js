import model from '../model/model';
import popupView from '../view/popupView';

const popup = document.querySelector('.popup');
const gallery = document.querySelector('.gallery');

const mainController = () => {
  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery__card');
    const id = Number(card.id);
    const data = model.getDataItem(id);
    popupView('open', popup, data);
  });

  popup.addEventListener('click', (e) => {
    if (!e.target.closest('.gameplay__item_popup')) {
      popupView('close', popup);
    }
  });
};

export default mainController;
