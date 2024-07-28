import { DefaultTheme } from 'styled-components'

import { BaseTheme, ThemeEnum } from 'interfaces/styled'


const baseTheme: BaseTheme = {
    sizes: {
        unit: 20,
    }
}

export const lightTheme: DefaultTheme = {
    ...baseTheme,
    
    palette: {
        textPrimary: 'coral',
        bg: '#fff'
    },

    type: ThemeEnum.light
}
export const darkTheme: DefaultTheme = {
    ...baseTheme,

    palette: {
        textPrimary: 'cyan',
        bg: '#222'
    },

    type: ThemeEnum.dark
}

