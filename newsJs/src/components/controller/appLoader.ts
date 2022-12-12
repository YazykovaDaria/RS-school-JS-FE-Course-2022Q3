import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'b9dd86b9fad441bebccfc4b505a7c1bd', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
