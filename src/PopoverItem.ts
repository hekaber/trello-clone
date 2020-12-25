type BasePopoverItem = {
    isShown: boolean
    position?: DOMRect | undefined
}

export type MenuColumnPopoverItem = BasePopoverItem & {
    type: 'MENU_COLUMN'
}

export type MenuTaskPopoverItem = BasePopoverItem & {
    type: 'MENU_TASK'
}

export type PopoverItem = MenuColumnPopoverItem | MenuTaskPopoverItem;