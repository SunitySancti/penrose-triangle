import { useState,
         memo,
         useMemo,
         useRef } from 'react'
import { Box } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import styled,
       { useTheme } from 'styled-components'

import { useElementSizes } from 'util/hooks'

import type { ExpandableCardProps } from 'interfaces/components'


const StyledContainer = styled(Box)({
    position: 'absolute',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',  
    '&::-webkit-scrollbar': {
        display: 'none',
    }
})


const StyledIcon = styled(Box)({
    color: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    '&:hover': {
        color: 'rgba(0,0,0,0.9)',
    }
});

const StyledBackground = styled(Box)(({ theme }) => ({
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid hsla(0, 0%, 100%, 0.7)',
    '&:hover': theme.materials.mateGlass,
}));


const ExpandableCard = memo(({
    trigger,
    children,
    isBottom = false,
    isLeft = false,
} : ExpandableCardProps
) => {
    const containerRef = useRef(null);
    
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded)
    };

    const theme = useTheme();
    const { unit,
            borderRadius,
            buttonSize } = theme.sizes;

    const { resizeTransition } = theme.durations;
    
    const { height: windowHeight, width: windowWidth } = useElementSizes();
    const breakpoint = 440;
    const paddingSize = useMemo(() => (
        (windowHeight > breakpoint && windowWidth > breakpoint)
            ? unit
            : 2
    ),[ windowHeight,
        windowWidth
    ]);

    const { height: containerHeight, scrollWidth, scrollHeight } = useElementSizes(containerRef);
    const backgroundHeight = useMemo(() => (
        containerHeight + 2 * paddingSize < window.innerHeight
            ? containerHeight
            : scrollHeight
    ),[ containerHeight,
        scrollHeight,
        paddingSize
    ]);

    const verticalAlignments = (margin: number) => isBottom
        ? { bottom: margin }
        : { top: margin };

    const horizontalAlignments = (margin: number) => isLeft
        ? { left: margin }
        : { right: margin };

    return (
        <StyledContainer
            ref={ containerRef }
            style={{
                ...verticalAlignments(paddingSize),
                ...horizontalAlignments(paddingSize),
                padding: isExpanded ? paddingSize : undefined,
                maxWidth: `calc(100vw - 2 * ${ paddingSize }px)`,
                maxHeight: `calc(100vh - 2 * ${ paddingSize }px)`,
                overflow: isExpanded ? 'auto' : 'visible',
                borderRadius,
            }}
        >

            <div
                onClick={ toggleExpansion }
                style={{
                    position: isExpanded ? 'absolute' : 'relative',
                    zIndex: 1,
                    ...verticalAlignments(0),
                    ...horizontalAlignments(0),
                }}
            >
                <StyledIcon style={{
                    width: buttonSize,
                    height: buttonSize,
                }}>
                    { isExpanded ? <ClearIcon/> : trigger }
                </StyledIcon>
            </div>

            <StyledBackground
                style={{
                    ...verticalAlignments(0),
                    ...horizontalAlignments(0),
                    width: scrollWidth,
                    height: backgroundHeight,
                    borderRadius,
                    transition: `all ${ resizeTransition }s ease`,
                    ...isExpanded ? theme.materials.mateGlass : {},
                }}
            />

            { isExpanded ? children : null }
            

        </StyledContainer>
    )
});

export default ExpandableCard
