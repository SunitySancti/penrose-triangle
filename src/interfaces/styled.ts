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
    // media: {
    //     extraLarge: string
    //     large: string
    //     medium: string
    //     small: string
    // }
    palette: Palette,
  
    sizes: {
        unit: number,
        // header: { height: number }
        // container: { width: number }
        // footer: { height: number }
        // modal: { width: number }
    }
  
    // durations: {
    //     ms300: number    
    // }
  
    // order: {
    //     header: number
    //     modal: number
    // },
}

export interface ThemeProvidedProps {
    theme: DefaultTheme,
    children?: ReactNode,
    className?: string,
}
