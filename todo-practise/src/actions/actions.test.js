import { createItem, addMultipleItems, updateRating } from './index';

describe(' Testing action creators ', () => {
    it(' createItem ', () => {
        const result = createItem({content: 'test item content', rating: 50});
        console.log('Result: ');
        console.log(result);
        expect(result).toEqual({ type: 'CREATE_ITEM', payload: { content: 'test item content', rating: 50 } });
    });

    it(' createItem -- Snapshot tests ', () => { // This shows snapshot tests are not only limited to react. Its a feature of jest which compares JS objects.
        const result = createItem({content: 'test item content', rating: 50});
        expect(result).toMatchSnapshot();
    });
});
