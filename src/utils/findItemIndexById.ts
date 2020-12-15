interface Item {
    id: string
}

// Find item having at least an id attribute in an items array
export const findItemIndexById = <T extends Item>(items: T[], id: string) => {

    return items.findIndex((item: T) => item.id === id);
}
