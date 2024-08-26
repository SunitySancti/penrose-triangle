import styled,
       { ThemeProvider } from 'styled-components'
import { Box } from '@mui/material'
import { PenroseTriangle,
         usePenroseTriangle } from 'react-penrose-triangle'
import { observer } from 'mobx-react-lite'

import MenuController from 'components/MenuController'
import GlobalStyles from 'styles/global'

import { useResponsiveBackground } from 'util/hooks'

import { uiStoreInstance } from 'store/ui'



const Container = styled(Box)(({ theme }) => ({
    width: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    height: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    margin: '10px',
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
}));

const defaultConfig = Object.freeze({
    cubesInSide: 4,
    gapRatio: 0.5,
    diameter: 1.1,
    rotation: 60,
    rotationSpeed: 30,
    isRotating: true,
    isInverted: true
});

const App = observer(() => {
    const isLandscape = useResponsiveBackground();
    const { props,
            geometry,
            material,
            light,
            parentRef } = usePenroseTriangle(defaultConfig);

    return (
        <ThemeProvider theme={ uiStoreInstance.theme }>
                <GlobalStyles/>
                <Background $isLandscape={ isLandscape }>

                    <Container ref={ parentRef }>
                        <PenroseTriangle {...props }/>
                    </Container>

                    <MenuController {...{ geometry, material, light }}/>

                </Background>
        </ThemeProvider>
    )
})

export default App
