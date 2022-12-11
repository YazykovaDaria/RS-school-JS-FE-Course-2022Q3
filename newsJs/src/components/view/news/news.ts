import './news.css';
import { NewsType } from '../../types';

class News {
    draw(data: Array<NewsType>): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
            newsMetaAuthor.textContent = item.author || item.source.name;

            const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            newsTitle.textContent = item.title;

            const newsSourse = newsClone.querySelector('.news__description-source') as HTMLElement;
            newsSourse.textContent = item.source.name;
            const newsContent = newsClone.querySelector('.news__description-content') as HTMLElement;
            newsContent.textContent = item.description;
            const newsMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
            newsMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsEl = document.querySelector('.news') as HTMLElement;
        newsEl.innerHTML = '';
        newsEl.appendChild(fragment);
    }
}

export default News;
