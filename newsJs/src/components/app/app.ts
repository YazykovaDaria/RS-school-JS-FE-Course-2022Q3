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
        const sources = document.querySelector('.sources');
        sources?.addEventListener('click', (e): void =>
            this.controller.getNews(e, (data) => {
                if (typeof data !== 'undefined') this.view.drawNews(data);
                this.view.toggleSelect(sources);
            })
        );
        this.controller.getSources((data) => {
            if (typeof data !== 'undefined') {
                this.view.drawSources(data);
            }
        });

        const selectHeader = document.querySelector('.select__header');
        selectHeader?.addEventListener('click', () => {
            if (sources) {
                this.view.toggleSelect(sources);
            }
        });
    }
}

export default App;
