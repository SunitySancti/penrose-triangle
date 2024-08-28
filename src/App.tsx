import styled,
       { ThemeProvider } from 'styled-components'
import { Box } from '@mui/material'
import { PenroseTriangle,
         usePenroseTriangle } from 'react-penrose-triangle'
import { observer } from 'mobx-react-lite'

import MenuController from 'components/MenuController'
import TriangleContainer from 'components/TriangleContainer'
import GlobalStyles from 'styles/global'

import { useResponsiveBackground } from 'util/hooks'

import { uiStoreInstance } from 'store/ui'


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
    geometry: {
        cubesInSide: 4,
        gapRatio: 0.5,
        diameter: 1,
        rotation: 60,
        rotationSpeed: 30,
        isRotating: true,
        isInverted: true,
    },
    light: {
        binding: 0,
    }
});

const App = observer(() => {
    const isLandscape = useResponsiveBackground();
    const { props,
            config,
            geometry,
            material,
            light,
            parentRef } = usePenroseTriangle(defaultConfig);

    return (
        <ThemeProvider theme={ uiStoreInstance.theme }>
                <GlobalStyles/>
                <Background $isLandscape={ isLandscape }>

                    <TriangleContainer {...{
                        ref: parentRef,
                        config
                    }}>
                        <PenroseTriangle {...props }/>
                    </TriangleContainer>

                    <MenuController {...{ geometry, material, light }}/>

                </Background>
        </ThemeProvider>
    )
});

export default App
