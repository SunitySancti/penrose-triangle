import { makeAutoObservable } from 'mobx'
import { DefaultTheme } from 'styled-components'

import { ThemeEnum } from 'interfaces/styled'
import { darkTheme, lightTheme } from 'styles/theme'


export class UIStore {
    theme: DefaultTheme = lightTheme
    
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
