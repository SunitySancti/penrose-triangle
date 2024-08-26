import { useState,
         useEffect,
         useCallback } from 'react'

import type { MouseEventHandler,
              RefObject } from 'react'


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

export const useMenuController = () => {
    const [ activeMenu, setActiveMenu ] = useState<'geometry' | 'material' | undefined>(undefined);

    useEffect(() => {
        const closeMenus = () => setActiveMenu(undefined);
        window.addEventListener('click', closeMenus);
        return () => {
            window.removeEventListener('click', closeMenus);
        }
    });
    const isGeometryActive = activeMenu === 'geometry';
    const isMaterialActive = activeMenu === 'material';

    const toggleGeometryMenu = useCallback<MouseEventHandler<HTMLDivElement>>((e)=> {
        e.stopPropagation();
        if(isGeometryActive) {
            setActiveMenu(undefined)
        } else {
            setActiveMenu('geometry')
        }
    },[ isGeometryActive ]);

    const toggleMaterialMenu = useCallback<MouseEventHandler<HTMLDivElement>>((e)=> {
        e.stopPropagation();
        if(isMaterialActive) {
            setActiveMenu(undefined)
        } else {
            setActiveMenu('material')
        }
    },[ isMaterialActive ]);

    return ({
        isGeometryActive,
        isMaterialActive,
        toggleGeometryMenu,
        toggleMaterialMenu,
    })
}
