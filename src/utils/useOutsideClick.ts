import { RefObject, useEffect } from "react"

export const useOutsideClick = (ref: RefObject<HTMLElement>, handler: Function) => {

    useEffect(() => {

        function handleClickOut(event: MouseEvent | TouchEvent) {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
    
            handler(event);
        }

        document.addEventListener('mousedown', handleClickOut);
        document.addEventListener('touchstart', handleClickOut);

        return () => {
            document.removeEventListener('mousedown', handleClickOut);
            document.removeEventListener('touchstart', handleClickOut);
        }
    }, [ref, handler]);
}
