import { useState,
         useEffect } from 'react'

import type { RefObject } from 'react'


export const useElementSizes = (ref?: RefObject<HTMLElement> | undefined) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        if(ref) {
            const { current } = ref;
            if(current) {
                const resizeObserver = new ResizeObserver(() => {
                    setWidth(current.offsetWidth);
                    setHeight(current.offsetHeight);
                    setScrollWidth(current.scrollWidth);
                    setScrollHeight(current.scrollHeight);
                });
                resizeObserver.observe(current);

                return () => {
                    resizeObserver.disconnect();
                }
            } 
        } else {
            const setWindowSizes = () => {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
                setScrollWidth(window.innerWidth);
                setScrollHeight(window.innerHeight);
            }
            setWindowSizes();
            window.addEventListener('resize', setWindowSizes);

            return () => {
                window.removeEventListener('resize', setWindowSizes)
            }
        }
        
    },[ ref, ref?.current ]);

    return { width, height, scrollWidth, scrollHeight }
}

export const useResponsiveBackground = () => {
    const { width, height } = useElementSizes();
    return width >= height
}
