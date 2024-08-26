import { memo,
         useMemo } from 'react'
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
         lighten,
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

export const ListItemSlider = memo(({
    label,
    ...props
}: ListItemSliderProps
) => {
    const { primary } = useTheme().palette;
    const slider = darken(0.3, primary);
    const thumbFill = lighten(0.2, primary);
    const thumbStroke = darken(0.4, primary);
    return <>
        <StyledListItem>
            <ListItemText primary={ label } />
        </StyledListItem>
        <StyledListItem>
            <Slider
                aria-label={ label }
                {...props}
                sx={{  
                    color: slider,
                    '& .MuiSlider-thumb': {  
                      backgroundColor: thumbFill,
                      border: '2px solid ' + thumbStroke,
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

export const ListItemCheckbox = memo(({
    label,
    align = 'flex-start',
    ...props
}: ListItemCheckboxProps
) => {
    const { primary } = useTheme().palette;
    const fill = darken(0.4, primary);
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

export const CubesNumberController = memo(({
    label,
    ...props
}: CubesNumberControllerProps
) => {
    const { palette } = useTheme();
    const stroke = palette.gray_70;
    const face_1 = palette.primary;
    const face_2 = darken(0.45, palette.primary);
    const face_3 = darken(0.3, palette.primary);

    console.log({ face_3 })

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
