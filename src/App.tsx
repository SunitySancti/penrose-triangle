import styled,
       { ThemeProvider } from 'styled-components'
import { Box } from '@mui/material'

import PenroseTriangle from 'components/PenroseTriangle'
import ConfigMenu from 'components/ConfigMenu'
import GlobalStyles from 'styles/global'
// import { lightTheme } from 'styles/theme'

import { useResponsiveBackground } from 'util/hooks'

import { uiStoreInstance } from 'store/ui'
import { TriangleConfigContext,
         triangleConfigStoreInstance } from 'store/triangleConfig'
import { useRef } from 'react'


const Container = styled(Box)(({ theme }) => ({
    width: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    height: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    margin: '10px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    ...theme.materials.transparentGlass
}));

const Background = styled<any,{ $isLandscape: boolean }>(Box)(({ $isLandscape }) => ({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&::before': {
        content: '""',
        position: 'absolute',
        width: $isLandscape ? '100vw' : '100vh',
        height: $isLandscape ? '100vh' : '100vw',
        backgroundImage: "url('/house-of-stairs.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: $isLandscape ? undefined : 'rotate(270deg)',
    }
}))

const App = () => {
    const isLandscape = useResponsiveBackground();
    const containerRef = useRef(null);

    return (
        <ThemeProvider theme={ uiStoreInstance.theme }>
            <TriangleConfigContext.Provider value={ triangleConfigStoreInstance }>
                <Background $isLandscape={ isLandscape }>
                    <Container ref={ containerRef }>
                        <PenroseTriangle parent={ containerRef }/>
                    </Container>
                    <ConfigMenu/>
                </Background>
                <GlobalStyles/>
            </TriangleConfigContext.Provider>
        </ThemeProvider>
    )
}

export default App
