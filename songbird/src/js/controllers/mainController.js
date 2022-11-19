import model from '../model/model';
import mainView from '../view/mainView';

const popup = document.querySelector('.popup');
const gallery = document.querySelector('.gallery');

const mainController = () => {
  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery__card');
    const id = Number(card.id);
    const data = model.getDataItem(id);
    mainView('openPopup', popup, data);
  });

  popup.addEventListener('click', (e) => {
    if (!e.target.closest('.gameplay__item_popup')) {
      mainView('closePopup', popup);
    }
  });
};

export default mainController;
