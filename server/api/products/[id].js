import data from '../products.json';

export default defineEventHandler((event) => {
    const id = parseInt(getRouterParam(event, 'id'));
    let result = {};
    for (let index = 0; index < data.products.length; index++) {
        const element = data.products[index];
        if (element.id === id) {
            result = element;
        }
    }
    return result;
})