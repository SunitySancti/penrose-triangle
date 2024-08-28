import { makeAutoObservable } from 'mobx'

import { ThemeEnum, BaseTheme } from 'interfaces/styled'
import { darkTheme, lightTheme } from 'styles/theme'
import { defaultMaterial } from 'react-penrose-triangle/store/MaterialStore'

class UIStore {
    theme: BaseTheme = lightTheme
    
    constructor() {
        makeAutoObservable(this)
        this.theme.palette.primary = defaultMaterial.color
    }

    get isLightTheme() {
        return this.theme.type === ThemeEnum.light
    }

    toggleTheme() {
        this.theme = this.isLightTheme ? darkTheme : lightTheme
    }

    setPrimaryColor = (color: string) => {
        this.theme.palette.primary = color
    }
}

export const uiStoreInstance = new UIStore();
