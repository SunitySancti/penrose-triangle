import { ThemeProvider } from 'styled-components'

import PenroseTriangle from 'components/PenroseTriangle'
import ConfigMenu from 'components/ConfigMenu'
import GlobalStyles from 'styles/global'
// import { lightTheme } from 'styles/theme'

import { uiStoreInstance } from 'store/ui'
import { TriangleConfigContext,
         triangleConfigStoreInstance } from 'store/triangleConfig'


const App = () => (
    <ThemeProvider theme={ uiStoreInstance.theme }>
        <TriangleConfigContext.Provider value={ triangleConfigStoreInstance }>
            <PenroseTriangle/>
            <ConfigMenu/>
            <GlobalStyles/>
        </TriangleConfigContext.Provider>
    </ThemeProvider>
)

export default App
