import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://YazykovaDaria.github.io/RS-school-JS-FE-Course-2022Q3/newsJs/', {
            apiKey: 'b9dd86b9fad441bebccfc4b505a7c1bd',
        });
    }
}

export default AppLoader;
