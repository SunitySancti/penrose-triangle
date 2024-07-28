import 'styled-components'

import { ColorTheme, ThemeEnum } from 'interfaces/styled'

declare module 'styled-components' {
    export interface DefaultTheme extends ColorTheme {
        // type: ThemeEnum
    }
}