import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { List,
         ListItem,
         ListItemText,
         Slider,
         Checkbox,
         FormControlLabel,
         Box,
         Stack,
         Rating } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import styled from 'styled-components'

import Icon from 'components/atoms/Icon'
import ExpandableCard from 'components/atoms/ExpandableCard'
import TriangleRotationController from 'components/TriangleRotationController'

import { useTriangleConfig } from 'store/triangleConfig'


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

const StyledListItem = styled(ListItem)({
    flexGrow: 0
});

const ConfigMenuView = observer(() => {
    const {
        cubesInSide,
        setCubesInSide,
        gapRatio,
        setGapRatio,
        diameter,
        setDiameter,
        isRotating,
        toggleAutoRotation,
        isInverted,
        toggleGeometryInvertion,
        rotation,
        setRotation,
        rotationSpeed,
        setRotationSpeed,
    } = useTriangleConfig();

    const handleCubesChange = useCallback((_e: any, value: number | null) => {
        setCubesInSide((value || 0) + 4)
    },[]);

    const handleGapRatioChange = useCallback((_e: any, value: number) => {
        setGapRatio(value)
    },[]);

    const handleDiameterChange = useCallback((_e: any, value: number) => {
        setDiameter(value)
    },[]);

    return (
        <ExpandableCard trigger={ <TuneIcon/> }>
            <FlexContainer>
                <FlexFadeInList>

                    <StyledListItem>
                        <ListItemText primary="Cubes in side" />
                    </StyledListItem>
                    <StyledListItem>
                        <Stack component="div" direction="row">

                            <Rating
                                defaultValue={ 4 }
                                disabled
                                max={ 4 }
                                icon={ <Icon name='colorfulCube'/> }
                                emptyIcon={ <Icon name='outlinedCube'/> }
                            />
                            <Rating
                                aria-label="Cubes in side"
                                value={ cubesInSide - 4 }
                                onChange={ handleCubesChange }
                                precision={ 1 }
                                max={ 6 }
                                icon={ <Icon name='colorfulCube'/> }
                                emptyIcon={ <Icon name='outlinedCube'/> }
                            />

                        </Stack>
                    </StyledListItem>
                    
                    <StyledListItem>
                        <ListItemText primary="Gap between cubes" />
                    </StyledListItem>
                    <StyledListItem>
                        <Slider
                            aria-label="Gap ratio"
                            value={ gapRatio }
                            onChange={ handleGapRatioChange }
                            marks
                            min={ 0 }
                            max={ 1 }
                            step={ 0.05 }
                        />
                    </StyledListItem>

                    <StyledListItem>
                        <ListItemText primary="Triangle size" />
                    </StyledListItem>
                    <StyledListItem>
                        <Slider
                            aria-label="Diameter"
                            value={ diameter }
                            onChange={ handleDiameterChange }
                            min={ 0.5 }
                            max={ 1.5 }
                            step={ 0.01 }
                        />
                    </StyledListItem>
                    
                    <StyledListItem>  
                        <FormControlLabel  
                            control={
                                <Checkbox
                                    checked={ isInverted }
                                    onChange={ toggleGeometryInvertion }
                                />
                            }  
                            label="Invert triangle geometry"
                        />
                    </StyledListItem>
                    
                    <StyledListItem>  
                        <FormControlLabel  
                            control={
                                <Checkbox
                                    checked={ isRotating }
                                    onChange={ toggleAutoRotation }
                                />
                            }
                            label="Automatic rotation"
                        />
                    </StyledListItem>

                </FlexFadeInList>

                <FlexFadeInList>

                    <TriangleRotationController
                        innerValue={ rotation }
                        outerValue={ rotationSpeed }
                        onInnerChange={ setRotation }
                        onOuterChange={ setRotationSpeed }
                        outerMaxValue={ 100 }
                        outerMaxAngle={ 150 }
                    />

                </FlexFadeInList>
            </FlexContainer>

        </ExpandableCard>
    );  
});

export default ConfigMenuView
