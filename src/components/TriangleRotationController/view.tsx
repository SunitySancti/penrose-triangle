import styled from 'styled-components'

import type { TriangleRotationControllerViewProps } from 'interfaces/components'


const Container = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display: inline-block;
`

const TriangleRotationControllerView = ({
    handleMouseMove,
    handleMouseDown,
    cleanUp,
    isHovering,
    innerAngle,
    outerAngle,
    styleConfig,
    geometryConfig,
} : TriangleRotationControllerViewProps
) => {
    const { colors, strokeWidths } = styleConfig;
    const { outerCircle, innerCircle } = geometryConfig;
    
    const { cx, cy, r } = outerCircle;
    const rad = (outerAngle - 90) * Math.PI / 180;

    const arcStart = {
        x: cx,
        y: cy - r,
    }
    const arcEnd = {
        x: cx + Math.cos(rad) * r,
        y: cy + Math.sin(rad) * r,
    }

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
                <path
                    d={ `M ${ arcStart.x } ${ arcStart.y } A ${ outerCircle.r } ${ outerCircle.r } 0 0 ${ arcEnd.x >= arcStart.x ? 1 : 0 }  ${ arcEnd.x } ${ arcEnd.y }` }
                    stroke={ colors.stroke_2 }
                    strokeWidth={ strokeWidths.bold }
                />
                <path
                    d="M12.5 5L19.8612 17.75H5.13878L12.5 5Z"
                    transform={ `
                        translate (${ arcEnd.x - 12.5 } ${ arcEnd.y - 12.5 })
                        rotate(${ outerAngle > 0 ? outerAngle + 90 : outerAngle < 0 ? outerAngle -90 : 180 }, 12.5, 12.5)
                    ` }
                    fill={ colors.fill_3 }
                    stroke={ colors.stroke_2 }
                    strokeWidth={ strokeWidths.bold }
                />
                
                <g transform={ `rotate(${ innerAngle }, 180, 180)` }>

                    <circle { ...innerCircle }
                        stroke={ colors.stroke_1 }
                        strokeWidth={ strokeWidths.thin }
                    />
                    <path
                        d="M180 71.2539L187.43 84.1239H172.569L180 71.2539Z"
                        fill={ colors.fill_3 }
                        stroke={ colors.stroke_2 }
                        strokeWidth={ strokeWidths.bold }
                    />
                    
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
};

export default TriangleRotationControllerView
