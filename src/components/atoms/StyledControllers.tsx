import { memo,
         useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { ListItem,
         ListItemText,
         Slider,
         FormControlLabel,
         Checkbox,
         Stack,
         Rating } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import   styled,
       { useTheme } from 'styled-components'
import { darken,
         rgba } from 'polished'

import Icon from 'components/atoms/Icon'

import type { SliderProps,
              CheckboxProps,
              RatingProps } from '@mui/material'
import type { MuiColorInputProps } from 'mui-color-input'


const StyledListItem = styled(ListItem)({
    flexGrow: 0
});

interface ListItemSliderProps extends SliderProps {
    label: string,
}

export const ListItemSlider = observer(({
    label,
    ...props
}: ListItemSliderProps
) => {
    const { primary } = useTheme().palette;
    const sliderColor = darken(0.25, primary);
    const borderColor = darken(0.4, primary);
    return <>
        <StyledListItem>
            <ListItemText primary={ label } />
        </StyledListItem>
        <StyledListItem>
            <Slider
                aria-label={ label }
                {...props}
                sx={{  
                    color: sliderColor,
                    '& .MuiSlider-thumb': {  
                      backgroundColor: primary,
                      border: '2px solid ' + borderColor,
                    },
                  }}  
            />
        </StyledListItem>
    </>
});


interface ListItemCheckboxProps extends CheckboxProps {
    label: string,
    align?: 'center' | 'flex-start'
}

export const ListItemCheckbox = observer(({
    label,
    align = 'flex-start',
    ...props
}: ListItemCheckboxProps
) => {
    const { primary } = useTheme().palette;
    const fill = darken(0.3, primary);
    const hover = rgba(primary, 0.2);

    return <>
        <StyledListItem style={{ justifyContent: 'center' }}>  
            <FormControlLabel  
                control={
                    <Checkbox
                        {...props }
                        sx={{
                            color: fill,
                            '&.Mui-checked': {
                                color: fill,
                            },
                            ':hover, &.Mui-checked:hover': {  
                                backgroundColor: hover,
                            },
                        }}
                    />
                }  
                label={ label }
            />
        </StyledListItem>
    </>
});


interface ListItemColorInputProps extends MuiColorInputProps {
    label: string,
}

export const ListItemColorInput = memo(({
    label,
    ...props
} : ListItemColorInputProps
) => {
    return <>
        <StyledListItem>
            <ListItemText primary={ label } />
        </StyledListItem>
        <StyledListItem>
            <MuiColorInput
                format="hex"
                isAlphaHidden
                {...props}
            />
        </StyledListItem>
    </>
});


interface CubesNumberControllerProps extends RatingProps {
    label: string,
}

interface FilledCubeProps {
    colors: string[],
}

const FilledCube = ({ colors }: FilledCubeProps) => (
    <Icon
        name='colorfulCube'
        color={ colors }
    />
);
const OutlinedCube = () => <Icon name='outlinedCube'/>

export const CubesNumberController = observer(({
    label,
    ...props
}: CubesNumberControllerProps
) => {
    const { palette } = useTheme();
    const stroke = darken(0.9, palette.primary);
    const face_1 = palette.primary;
    const face_2 = darken(0.4, palette.primary);
    const face_3 = darken(0.25, palette.primary);

    const colors = useMemo(() => [ stroke, face_1, face_2, face_3 ],[ stroke, face_1, face_2, face_3 ]);

    return <>
        <StyledListItem>
            <ListItemText primary={ label } />
        </StyledListItem>
        <StyledListItem>
            <Stack component="div" direction="row">

                <Rating
                    defaultValue={ 4 }
                    disabled
                    max={ 4 }
                    icon={ <FilledCube {...{ colors }}/> }
                    emptyIcon={ <OutlinedCube/> }
                />
                <Rating
                    aria-label="Cubes in side"
                    precision={ 1 }
                    max={ 6 }
                    icon={ <FilledCube {...{ colors }}/> }
                    emptyIcon={ <OutlinedCube/> }
                    {...props }
                />

            </Stack>
        </StyledListItem>
    </>
});
