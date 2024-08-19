import { ReactNode } from "react"
import { DefaultTheme } from "styled-components"

export enum ThemeEnum  {
    light = "light",
    dark = "dark"
}

export interface Palette {
    bg: string,
    textPrimary: string,
    transparent_gray_5: string,
}
 

export interface BaseTheme {
    palette: Palette,
  
    sizes: {
        unit: number,
        borderRadius: number,
        buttonSize: number,
        smallMargin: number,
        largeMargin: number,
        // header: { height: number }
        // container: { width: number }
        // footer: { height: number }
        // modal: { width: number }
    },

    materials: {
        [cssPropsGroup: string]: object
    }
  
    durations: {
        resizeTransition: number    
    }
}

export interface ThemeProvidedProps {
    theme: DefaultTheme,
    children?: ReactNode,
    className?: string,
}
