import { NewsResponse } from './../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document.querySelector('.sources').addEventListener('click', (e): void =>
            this.controller.getNews(e, (data: NewsResponse) => {
                console.log(data);
                this.view.drawNews(data);
            })
        );
        this.controller.getSources((data: NewsResponse) => this.view.drawSources(data));
    }
}

export default App;
