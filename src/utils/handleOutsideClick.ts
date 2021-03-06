import { RefObject } from "react"

export const handleOutsideClick = (ref: RefObject<HTMLElement>, showMenu: boolean, handler: Function) => {

    function handleClickOut(event: MouseEvent | TouchEvent) {
        if (!ref.current || ref.current.contains(event.target as Node)) {
            return;
        }

        handler(event);
    }

    if (showMenu) {
        document.addEventListener('mousedown', handleClickOut);
        document.addEventListener('touchstart', handleClickOut);
        return;
    }

    document.removeEventListener('mousedown', handleClickOut);
    document.removeEventListener('touchstart', handleClickOut);
}
