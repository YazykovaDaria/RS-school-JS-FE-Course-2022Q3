import dictionary from '../model/dictionary';

const translate = (lang) => {
  const els = document.querySelectorAll('.js-lang');
  els.forEach((el) => {
    const key = el.dataset.lang;
    // eslint-disable-next-line no-param-reassign
    el.textContent = dictionary[key][lang];
    //console.log(dictionary[lang], lang);
  });
};

export default translate;
