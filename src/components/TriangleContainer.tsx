import { forwardRef } from 'react'
import { Box } from '@mui/material'
import styled from 'styled-components'

import type { TriangleContainerProps } from 'interfaces/components'

const Container = styled(Box)(({ theme }) => ({
    width: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    height: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    margin: '10px',
    borderRadius: '10px',
    overflow: 'hidden',
    ...theme.materials.transparentGlass
}));
const TriangleContainer = forwardRef(({ children }: TriangleContainerProps, ref) => {
    return (
        <Container ref={ ref }>
            { children }
        </Container>
    )
})

export default TriangleContainer
