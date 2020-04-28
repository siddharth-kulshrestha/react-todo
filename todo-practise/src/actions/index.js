// Types of action
export const Types = {
    CREATE_ITEM: "CREATE_ITEM",
    UPDATE_RATING: "UPDATE_RATING",
    ADD_ITEMS: "ADD_ITEMS",
}

// createItem action
export const createItem = item => ({
    type: Types.CREATE_ITEM,
    payload: item
});

// addMultipleItems action
export const addMultipleItems = items => ({
    type: Types.ADD_ITEMS,
    payload: items,
})

// addMultipleItems action
export const updateRating = (id, newRating) => ({
    type: Types.UPDATE_RATING,
    payload: {itemID: id, rating: newRating},
})
