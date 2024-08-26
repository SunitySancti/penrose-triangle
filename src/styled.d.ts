import 'styled-components'

import { BaseTheme } from 'interfaces/styled'

declare module 'styled-components' {
    export interface DefaultTheme extends BaseTheme {}
}