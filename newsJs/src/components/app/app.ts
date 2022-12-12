import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document.querySelector('.sources')?.addEventListener('click', (e): void =>
            this.controller.getNews(e, (data) => {
                if (typeof data !== 'undefined') this.view.drawNews(data);
            })
        );
        this.controller.getSources((data) => {
            if (typeof data !== 'undefined') this.view.drawSources(data);
        });
    }
}

export default App;
