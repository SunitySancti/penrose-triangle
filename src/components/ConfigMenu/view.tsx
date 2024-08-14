import { useState,
        //  useEffect,
         useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Typography,
         List,
         ListItem,
         ListItemText,
        //  Slider,
        //  TextField,
        //  Checkbox,
        //  FormControlLabel,
         Box,
         Stack,
         Rating } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import ClearIcon from '@mui/icons-material/Clear'
import styled from 'styled-components'

import Icon from 'components/atoms/Icon'
import { units,
        //  palette 
        } from 'styles/theme'

import { useTriangleConfig } from 'store/triangleConfig'
import type { FC,
              ReactNode } from 'react'


const buttonSize = units(3);
const innerPadding = units(2);
const padding = units(1, true);
const transitionLength = 0.6;

const Container = styled.div`
    position: absolute;
    top: ${ padding }px;
    right: ${ padding }px;
`

interface ExpandableCardProps {
    isExpanded: boolean,
    children: ReactNode,
    [prop: string | symbol]: any
}


const ExpandableCardView: FC<ExpandableCardProps> = ({ isExpanded, ...props }) => (
    <Box {...props}/>
)

const ExpandableCard: FC<ExpandableCardProps> = styled(ExpandableCardView)(({ isExpanded, theme }) => {
    const glass = ({
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(9px)',
        webkitBackdropFilter: 'blur(9px)',
        background: 'rgba(255, 255, 255, 0.7)',
    });
    const common = ({
        position: 'absolute' as const,
        top: '0px',
        right: '0px',
        width: isExpanded ? '500px' : buttonSize({ theme }),
        height: isExpanded ? `calc(100vh - 2 * ${ padding({ theme }) }px)` : buttonSize({ theme }),
        zIndex: '0',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: units(0.25)({ theme }),
        border: '1px solid hsla(0, 0%, 100%, 0.7)',
        transition: `all ${ transitionLength }s ease`,

        '&:hover': glass,
    });
    const open = ({
        padding: innerPadding({ theme }),
    });
    const closed = ({
        padding: 0,
    });
    return isExpanded
        ? { ...common, ...glass, ...open }
        : { ...common, ...closed }
});

const StyledIcon = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0px',
    right: '0px',
    zIndex: 1,
    width: buttonSize({ theme }),
    height: buttonSize({ theme }),
    color: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    '&:hover': {
        color: 'rgba(0,0,0,0.9)',
    }
}));

const FadeInList = styled(List)(() => ({  
    opacity: 0,  
    animation: `fadeIn ${ transitionLength / 2 }s ${ transitionLength }s forwards `, 

    '@keyframes fadeIn': {  
      '0%': {  
        opacity: 0,  
      },
      '100%': {  
        opacity: 1,  
      },  
    },  
  }));  


interface ConfigMenuViewProps {
    
}


const ConfigMenuView = observer(({

} : ConfigMenuViewProps
) => {
    // const [rangeValue, setRangeValue] = useState([20, 37])
    // const [numberValue, setNumberValue] = useState(0);  
    // const [checked, setChecked] = useState(false);

    // const handleRangeChange = (event, newValue) => {  
    //     setRangeValue(newValue);  
    // };  

    // const handleNumberChange = (event) => {  
    //     setNumberValue(event.target.value === '' ? '' : Number(event.target.value));  
    // };  

    // const handleCheckboxChange = () => {  
    //     setChecked(!checked);  
    // };  

    // const handleIncrement = () => {  
    //     setNumberValue(prev => prev + 1);  
    // };  

    // const handleDecrement = () => {  
    //     setNumberValue(prev => prev - 1);  
    // };    
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {  
        setIsExpanded(!isExpanded);
    };

    const { cubesInSide, setCubesInSide } = useTriangleConfig();

    const handleCubesChange = useCallback((_e: any, value: number | null) => {
        // if(value && value !== cubesInSide - 4) {
        //     console.log(value, cubesInSide)
            setCubesInSide((value || 0) + 4)
        // }
    },[ cubesInSide ])

    // const handleCubesHover = useCallback((event, newHover) => {  
    //     // Здесь вы можете определить значения, для которых вы хотите отключить hover  
    //     const disabledHoverValues = [0, 1, 2, 3, 4, 5]; // Например, отключаем hover для '1'  

    //     if (disabledHoverValues.includes(newHover)) {  
    //         event.preventDefault(); // предотвращаем изменение состояния hover  
    //     }  
    // },[ cubesInSide ]);


    // const config = useTriangleConfig();

    // useEffect(() => {
    //     console.log('cubesInSide was changed: ', config.cubesInSide)
    // },[ config.cubesInSide ]);

    return (  
        <Container>
            
                <ExpandableCard isExpanded={ isExpanded }>
                    <StyledIcon onClick={ handleClick }>
                        { isExpanded ? <ClearIcon/> : <TuneIcon/> }
                    </StyledIcon>
                    { isExpanded ?
                        <FadeInList>
                            
                            <ListItem>
                                <Typography component="legend">Кубов в линии</Typography>
                            </ListItem>
                            <ListItem>
                                <Stack component="div" direction="row">

                                    <Rating
                                        defaultValue={ 4 }
                                        disabled
                                        max={ 4 }
                                        icon={<Icon name='colorfulCube'/>}
                                        emptyIcon={<Icon name='outlinedCube'/>}
                                    />
                                    <Rating
                                        name="cubesInSide"
                                        defaultValue={ cubesInSide - 4 }
                                        precision={ 1 }
                                        max={ 6 }
                                        icon={<Icon name='colorfulCube'/>}
                                        emptyIcon={<Icon name='outlinedCube'/>}
                                        onChange={ handleCubesChange }
                                        // onChangeActive={ handleCubesHover }
                                    />

                                </Stack>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Выберите диапазон" />
                            </ListItem>
                            {/* <ListItem>
                                <Slider
                                    value={rangeValue}
                                    onChange={handleRangeChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </ListItem> */}

                        </FadeInList>
                        : undefined
                    }
                    
                </ExpandableCard>

            {/* <ListItem>  
                        <ListItemText primary="Числовой инпут" />  
                        <Button onClick={handleDecrement}>-</Button>  
                        <TextField  
                            value={numberValue}  
                            onChange={handleNumberChange}  
                            type="number"  
                        />  
                        <Button onClick={handleIncrement}>+</Button>  
                    </ListItem>  
                    <ListItem>  
                        <FormControlLabel  
                            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}  
                            label="Чекбокс"  
                        />  
                    </ListItem>  
                </List> */}
        </Container>  
    );  
});

export default ConfigMenuView
