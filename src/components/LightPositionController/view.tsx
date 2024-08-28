import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useTheme } from 'styled-components'

import type { LightPositionControllerViewProps } from 'interfaces/components'


const Container = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display: inline-block;
`

const LightPositionControllerView = observer(({
    handleMouseMove,
    handleMouseDown,
    cleanUp,
    isHovering,
    innerAngle,
    outerAngle,
    styleConfig,
    geometryConfig,
} : LightPositionControllerViewProps
) => {
    const { primary } = useTheme().palette;
    const { colors,
            strokeWidths } = styleConfig;
    const { outerCircle } = geometryConfig;
    
    return (
        <Container>
            <svg
                width="360"
                height="360"
                viewBox="0 0 360 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                onMouseDown={ handleMouseDown }
                onMouseMove={ handleMouseMove }
                onMouseUp={ cleanUp }
                onMouseEnter={ cleanUp }
                style={{ cursor: isHovering ? 'pointer' : 'default' }}  
            >
                <circle { ...outerCircle }
                    stroke={ colors.stroke_1 }
                    strokeWidth={ strokeWidths.thin }
                />

                <g transform={`rotate(${ outerAngle }, 180, 180)`}>
                    <circle
                        cx="180"
                        cy="30"
                        r="15"
                        fill={ primary }
                        stroke={ colors.stroke_2 }
                        strokeWidth={ strokeWidths.bold }
                    />
                    <path
                        d="M166.5 45.5v12M175.5 49.5v8M184.5 49.5v8M193.5 45.5v12"
                        stroke={ colors.stroke_2 }
                        strokeWidth={ strokeWidths.bold }
                    />
                </g>
                
                <g transform={`rotate(${ innerAngle }, 180, 180)`}>
                    <path
                        d="M180 164.437L180.003 164.444M180 164.444L193.468 141.191L247.342 234.574H112.457L99.0879 211.228H207.036L180.003 164.444Z"
                        fill={ colors.fill_3 }
                        stroke={ colors.stroke_2 }
                        strokeWidth={ strokeWidths.bold }
                    />
                    <path
                        d="M166.531 94.3008L99.0879 211.228H207.036L193.546 187.882H139.394L193.468 94.3008H166.531Z"
                        fill={ colors.fill_2 }
                        stroke={ colors.stroke_2 }
                        strokeWidth={ strokeWidths.bold }
                    />
                    <path
                        d="M193.468 94.3008L139.395 187.882H166.431L193.468 141.191L247.343 234.573L260.911 211.028L193.468 94.3008Z"
                        fill={ colors.fill_1 }
                        stroke={ colors.stroke_2 }
                        strokeWidth={ strokeWidths.bold }
                    />

                </g>

            </svg>
        </Container>
    );
});

export default LightPositionControllerView
