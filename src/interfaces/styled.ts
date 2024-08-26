import { ReactNode } from "react"
import { DefaultTheme } from "styled-components"
import { baseTheme } from 'styles/theme'

export enum ThemeEnum  {
    light = "light",
    dark = "dark"
}

export type BaseTheme = typeof baseTheme & {
    type: ThemeEnum
}

export interface ThemeProvidedProps {
    theme: DefaultTheme,
    children?: ReactNode,
    className?: string,
}
