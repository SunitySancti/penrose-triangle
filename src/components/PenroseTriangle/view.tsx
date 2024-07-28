import styled from 'styled-components'

import Cube from 'components/Cube'


const Container = styled.div`
    background-color: ${ props => props.theme.palette.bg };
    color: ${ props => props.theme.palette.textPrimary };
    position: fixed;
    width: 100vw;
    height: 100vh;
    transform-style: preserve-3d;
        /* perspective: 300px;
        perspective-origin: center; */
`


interface PenroseTriangleViewProps {

}

const PenroseTriangleView = ({

} : PenroseTriangleViewProps
) => {
    return (
        <Container>
            <Cube coords={[ 400, 300 ]}/>
        </Container>
    );
};

export default PenroseTriangleView;