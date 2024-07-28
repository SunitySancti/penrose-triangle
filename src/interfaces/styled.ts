export enum ThemeEnum  {
    light = "light",
    dark = "dark"
}

export interface BaseTheme {
    // media: {
    //     extraLarge: string
    //     large: string
    //     medium: string
    //     small: string
    // }
  
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

export interface ColorTheme extends BaseTheme {
    palette: {
        // primary: string,
        // secondary: string,
        // success: string,
        // danger: string,
        bg: string,
        textPrimary: string,
        // textSecondary: string,
    }
}
