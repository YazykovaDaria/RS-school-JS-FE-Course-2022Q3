import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: 'b9dd86b9fad441bebccfc4b505a7c1bd',
        });
    }
}

export default AppLoader;
