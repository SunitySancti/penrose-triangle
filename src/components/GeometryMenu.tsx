import { useCallback } from 'react'
import { List,
         Box } from '@mui/material'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import styled from 'styled-components'

import ExpandableCard from 'components/atoms/ExpandableCard'
import TriangleRotationController from 'components/TriangleRotationController'
import { ListItemSlider,
         ListItemCheckbox,
         CubesNumberController } from 'components/atoms/StyledControllers'

import type { GeometryMenuProps } from 'interfaces/components'


const transitionLength = 0.6; 

const FlexContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
    width: 'auto',
    justifyContent:'center',
});

const FlexFadeInList = styled(List)({
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
});

const GeometryMenu = ({
    geometry,
    isActive,
    toggleActive,
    controllerStyles
}: GeometryMenuProps
) => {
    const { cubesInSide,
            gapRatio,
            diameter,
            isRotating,
            isInverted,
            rotation,
            rotationSpeed } = geometry.config;
    const { setCubesInSide,
            setGapRatio,
            setDiameter,
            toggleAutoRotation,
            toggleGeometryInvertion,
            setRotation,
            setRotationSpeed } = geometry.controllers;

    const handleCubesChange = useCallback((_e: any, value: number | null) => {
        setCubesInSide((value || 0) + 4)
    },[]);

    const handleGapRatioChange = useCallback((_e: any, value: number | number[]) => {
        setGapRatio(value  as number)
    },[]);

    const handleDiameterChange = useCallback((_e: any, value: number | number[]) => {
        setDiameter(value as number)
    },[]);

    return (
        <ExpandableCard
            trigger={ <ArchitectureIcon/> }
            isExpanded={ isActive }
            toggleExpansion={ toggleActive }
        >
            <FlexContainer>
                <FlexFadeInList>

                    <CubesNumberController
                        label='Cubes in side'
                        value={ cubesInSide - 4 }
                        onChange={ handleCubesChange }
                    />

                    <ListItemSlider
                        label='Gap between cubes'
                        value={ gapRatio }
                        onChange={ handleGapRatioChange }
                        min={ 0 }
                        max={ 1 }
                        step={ 0.01 }
                    />

                    <ListItemSlider
                        label='Triangle size'
                        value={ diameter }
                        onChange={ handleDiameterChange }
                        min={ 0.5 }
                        max={ 1.5 }
                        step={ 0.01 }
                    />

                    <ListItemCheckbox
                        label='Invert triangle geometry'
                        checked={ isInverted }
                        onChange={ toggleGeometryInvertion }
                    />

                </FlexFadeInList>

                <FlexFadeInList>

                    <TriangleRotationController
                        innerValue={ rotation }
                        outerValue={ rotationSpeed }
                        onInnerChange={ setRotation }
                        onOuterChange={ setRotationSpeed }
                        outerMaxValue={ 100 }
                        outerMaxAngle={ 150 }
                        styles={ controllerStyles }
                    />

                    <ListItemCheckbox
                        label='Use automatic rotation'
                        align='center'
                        checked={ isRotating }
                        onChange={ toggleAutoRotation }
                    />

                </FlexFadeInList>
            </FlexContainer>

        </ExpandableCard>
    );  
};

export default GeometryMenu
