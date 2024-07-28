import { ThemeProvider } from 'styled-components'

import PenroseTriangle from 'components/PenroseTriangle'
import GlobalStyles from 'styles/global'
// import { lightTheme } from 'styles/theme'

import { UIStore } from 'store/ui'


const uiStore = new UIStore();


const App = () => (
    <ThemeProvider theme={ uiStore.theme }>
        <PenroseTriangle
            // cubesInSide
            // gapRatio={ 1 }
            // diameter
            // rotate
            // children
        />
        <GlobalStyles/>
    </ThemeProvider>
)

export default App
