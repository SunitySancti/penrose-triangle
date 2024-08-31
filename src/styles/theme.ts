import { BaseTheme,
         ThemeEnum,
         ThemeProvidedProps } from 'interfaces/styled'


export const baseTheme = {
    sizes: {
        unit: 20,
        borderRadius: 10,
        buttonSize: 60,
        smallMargin: 10,
        largeMargin: 20,
    },
    palette: {
        primary: '#FFF877',
        textPrimary: 'black',
        bg: 'white',
        codeSnippetBackground: '#2a2038',
        codeSnippetButton: '#60596b',
        codeSnippetButtonHover: '#7d7b87',
        gray_00: 'white',
        gray_10: '#ccc',
        gray_50: '#777',
        gray_70: '#666',
        gray_90: '#333',
        gray_100: 'black',
        transparent_white_00: 'rgba(255,255,255,0)',
        transparent_white_25: 'rgba(255,255,255,0.25)',
        transparent_white_60: 'rgba(255,255,255,0.6)',
        transparent_white_70: 'rgba(255,255,255,0.7)',
        transparent_black_5: 'rgba(0,0,0,0.05)',
        transparent_black_10: 'rgba(0,0,0,0.1)',
        transparent_black_25: 'rgba(0,0,0,0.25)',
    },
    materials: {
        matteGlass: {
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(9px)',
            WebkitBackdropFilter: 'blur(9px)',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.6)'
        },
        transparentGlass: {
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.6)'
        },
    },
    mixins: {
        flexCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        flexColumnStart: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexFlow: 'column',
        },
        scrollbar: {
            '&::-webkit-scrollbar': {
                width: '12px',
                background: 'transparent',
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {  
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                margin: '5px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(0, 0, 0, 0.5)',
            },
        }
    },
    durations: {
        resizeTransition: 0.6
    },
    transitions: {
        main: `all 0.6s ease`
    }
}

export const lightTheme: BaseTheme = {
    ...baseTheme,
    
    palette: {
        ...baseTheme.palette,
        textPrimary: 'coral',
        bg: '#fff'
    },

    type: ThemeEnum.light
}
export const darkTheme: BaseTheme = {
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

export const palette = (colorName: keyof typeof baseTheme.palette) => ({ theme }: ThemeProvidedProps) => (
    theme.palette[colorName]
);

