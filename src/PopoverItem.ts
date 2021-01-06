type ClickSource = 'OUT' | 'BUTTON';

type BasePopoverItem = {
    isShown: boolean;
    clickSource: ClickSource; 
    position?: DOMRect | undefined;
    targetId?: string;
}

export type MenuColumnPopoverItem = BasePopoverItem & {
    type: 'MENU_COLUMN';
}

export type MenuTaskPopoverItem = BasePopoverItem & {
    type: 'MENU_TASK';
}

export type PopoverItem = MenuColumnPopoverItem | MenuTaskPopoverItem;