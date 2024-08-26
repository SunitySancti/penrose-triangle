import { makeAutoObservable } from 'mobx'

import { ThemeEnum, BaseTheme } from 'interfaces/styled'
import { darkTheme, lightTheme } from 'styles/theme'


class UIStore {
    theme: BaseTheme = lightTheme;
    
    constructor() {
        makeAutoObservable(this)
    }

    get isLightTheme() {
        return this.theme.type === ThemeEnum.light
    }

    // Переключатель темы
    toggleTheme() {
        this.theme = this.isLightTheme ? darkTheme : lightTheme
    }
}

export const uiStoreInstance = new UIStore();
