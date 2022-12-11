import './sources.css';

type SourseItem = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

class Sources {
    draw(data: Array<SourseItem>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourseItemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            sourseItemName.textContent = item.name;
            const sourseItem = sourceClone.querySelector('.source__item') as HTMLElement;
            sourseItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourses = document.querySelector('.sources') as HTMLElement;
        sourses.append(fragment);
    }
}

export default Sources;
