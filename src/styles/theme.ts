import { DefaultTheme } from 'styled-components'

import { BaseTheme,
         ThemeEnum,
         ThemeProvidedProps,
         Palette } from 'interfaces/styled'


const baseTheme: BaseTheme = {
    sizes: {
        unit: 20,
    },
    palette: {
        textPrimary: 'black',
        bg: 'white',
        transparent_gray_5: 'rgba(0,0,0,0.05)'
    }
}

export const lightTheme: DefaultTheme = {
    ...baseTheme,
    
    palette: {
        ...baseTheme.palette,
        textPrimary: 'coral',
        bg: '#fff'
    },

    type: ThemeEnum.light
}
export const darkTheme: DefaultTheme = {
    ...baseTheme,

    palette: {
        ...baseTheme.palette,
        textPrimary: 'cyan',
        bg: '#222'
    },

    type: ThemeEnum.dark
}

export const units = (k = 1, isNumber?: boolean) => ({ theme }: ThemeProvidedProps) => (
    isNumber
        ? theme.sizes.unit * k
        : (theme.sizes.unit * k) + 'px'
);

export const palette = (colorName: keyof Palette) => ({ theme }: ThemeProvidedProps) => (
    theme.palette[colorName]
);

