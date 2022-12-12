import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse } from '../types';

export class AppView {
    news: News;
    sources?: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources?.draw(values);
    }

    toggleSelect(selectEl: Element): void {
        const footer = document.querySelector('footer');
        footer?.classList.toggle('hide');
        selectEl.classList.toggle('active');
    }
}

export default AppView;
