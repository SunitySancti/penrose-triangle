import { memo,
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
    '&:hover': theme.materials.mateGlass,
}));


const ExpandableCard = memo(({
    trigger,
    children,
    isBottom = false,
    isLeft = false,
    isExpanded,
    toggleExpansion
} : ExpandableCardProps
) => {
    const containerRef = useRef(null);

    const theme = useTheme();
    const { width: windowWidth } = useElementSizes();
    const breakpoint = 440;
    const { largeMargin,
            borderRadius,
            buttonSize } = theme.sizes;

    const { resizeTransition } = theme.durations;
    
    const vertPadding = largeMargin;
    const horPadding = useMemo(() => (
        (windowWidth > breakpoint)
            ? largeMargin
            : 2
    ),[ windowWidth ]);

    const { width: containerWidth, height: containerHeight, scrollWidth, scrollHeight } = useElementSizes(containerRef);
    const backgroundHeight = useMemo(() => (
        containerHeight + 2 * vertPadding < window.innerHeight
            ? containerHeight
            : scrollHeight
    ),[ containerHeight,
        scrollHeight,
        vertPadding
    ]);
    const backgroundWidth = useMemo(() => (
        containerWidth + 2 * horPadding < window.innerWidth
            ? containerWidth
            : scrollWidth
    ),[ containerWidth,
        scrollWidth,
        horPadding
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
            onClick={ e => e.stopPropagation() }
            style={{
                ...verticalAlignments(vertPadding),
                ...horizontalAlignments(horPadding),
                zIndex: isExpanded ? 1 : 0,
                padding: isExpanded ? `${ vertPadding }px ${ horPadding }px` : undefined,
                maxWidth: `calc(100vw - 2 * ${ horPadding }px)`,
                maxHeight: `calc(100vh - 2 * ${ vertPadding }px)`,
                overflow: isExpanded ? 'auto' : 'visible',
                borderRadius,
            }}
        >

            <div
                onClick={ toggleExpansion }
                style={{
                    position: isExpanded ? 'absolute' : 'relative',
                    zIndex: isExpanded ? 2 : 1,
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
                    width: backgroundWidth,
                    height: backgroundHeight,
                    borderRadius,
                    transition: `all ${ resizeTransition }s ease`,
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    ...isExpanded ? theme.materials.mateGlass : {},
                }}
            />

            { isExpanded ? children : null }
            

        </StyledContainer>
    )
});

export default ExpandableCard
