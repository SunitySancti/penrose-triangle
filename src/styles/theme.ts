import { DefaultTheme } from 'styled-components'

import { BaseTheme,
         ThemeEnum,
         ThemeProvidedProps,
         Palette } from 'interfaces/styled'


const baseTheme: BaseTheme = {
    sizes: {
        unit: 20,
        borderRadius: 10,
        buttonSize: 60,
        smallMargin: 10,
        largeMargin: 20,
    },
    palette: {
        textPrimary: 'black',
        bg: 'white',
        transparent_gray_5: 'rgba(0,0,0,0.05)'
    },
    materials: {
        mateGlass: {
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(9px)',
            WebkitBackdropFilter: 'blur(9px)',
            background: 'rgba(255, 255, 255, 0.7)',
        },
        transparentGlass: {
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            background: 'rgba(255, 255, 255, 0.1)',
        },
    },
    durations: {
        resizeTransition: 0.6
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

