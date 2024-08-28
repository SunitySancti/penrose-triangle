import { useCallback,
         memo } from 'react'
import { List,
         Box } from '@mui/material'
import BrushIcon from '@mui/icons-material/Brush'
import styled from 'styled-components'

import ExpandableCard from 'components/atoms/ExpandableCard'
import LightPositionController from 'components/LightPositionController'
import { ListItemSlider,
         ListItemCheckbox,
         ListItemColorInput } from 'components/atoms/StyledControllers'
import { uiStoreInstance } from 'store/ui'

import type { MaterialMenuProps } from 'interfaces/components'


const transitionLength = 0.6; 

const FlexContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
    width: 'auto',
    justifyContent:'center',
}));

const FlexFadeInList = styled(List)<{ $isFirst?: boolean }>(({ $isFirst, theme }) => ({
    paddingTop: $isFirst ? theme.sizes.buttonSize - theme.sizes.largeMargin * 2 + 'px !important' : undefined,
    minWidth: '100px',
    flexGrow: 0,
    opacity: 0,
    animation: `fadeIn ${ transitionLength / 2 }s ${ transitionLength }s forwards `,
    width: 'fit-content',

    '@keyframes fadeIn': {
        '0%': {
            opacity: 0,
        },
        '100%': {
            opacity: 1,
        },
    },
}));

const MaterialMenu = memo(({
    geometry,
    material,
    light,
    isActive,
    toggleActive,
    controllerStyles
}: MaterialMenuProps
) => {
    const { rotation: geometryRotation } = geometry.config;
    const { color } = material.config;
    const { intensity,
            brightness,
            rotation,
            elevation,
            binding } = light.config;
    const { setColor } = material.controllers;
    const { setPrimaryColor } = uiStoreInstance;
    const { setIntensity,
            setBrightness,
            setRotation,
            setElevation,
            toggleBinding } = light.controllers;
  
    const handleColorChange = useCallback((newValue: string) => {
        setColor(newValue)
        setPrimaryColor(newValue)
    },[]);
    const handleElevationChange = useCallback((_e: any, value: number | number[]) => {
        setElevation(value as number)
    },[]);
    const handleIntensityChange = useCallback((_e: any, value: number | number[]) => {
        setIntensity(value as number)
    },[]);
    const handleBrightnessChange = useCallback((_e: any, value: number | number[]) => {
        setBrightness(value as number)
    },[]);

    return (
        <ExpandableCard
            trigger={ <BrushIcon/> }
            isExpanded={ isActive }
            toggleExpansion={ toggleActive }
            isLeft
        >
            <FlexContainer>
                <FlexFadeInList $isFirst>

                    <ListItemColorInput
                        label='Color'
                        value={ color }
                        onChange={ handleColorChange }
                    />

                    <ListItemSlider
                        label='Brightness'
                        value={ brightness }
                        onChange={ handleBrightnessChange }
                        min={ 0 }
                        max={ 2.5 }
                        step={ 0.05 }
                    />

                    <ListItemSlider
                        label='Spot light elevation'
                        value={ elevation }
                        onChange={ handleElevationChange }
                        min={ 0 }
                        max={ 5 }
                        step={ 0.1 }
                    />

                    <ListItemSlider
                        label='Spot light intensity'
                        value={ intensity }
                        onChange={ handleIntensityChange }
                        min={ 0 }
                        max={ 25 }
                        step={ 0.5 }
                    />

                </FlexFadeInList>

                <FlexFadeInList>
                
                    <LightPositionController
                        innerValue={ geometryRotation }
                        outerValue={ rotation }
                        onOuterChange={ setRotation }
                        styles={ controllerStyles }
                    />

                    <ListItemCheckbox
                        label='Pin spot light to geometry'
                        align='center'
                        checked={ typeof binding === 'number' }
                        onChange={ toggleBinding }
                    />

                </FlexFadeInList>
            </FlexContainer>

        </ExpandableCard>
    );  
})

export default MaterialMenu
