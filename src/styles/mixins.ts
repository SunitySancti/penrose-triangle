import { css } from 'styled-components'


export const absoluteCenterize = () => css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

export const flexCenter = (direction = 'row') => css`  
    display: flex;  
    flex-direction: ${ direction };  
    justify-content: center;  
    align-items: center;  
`;  
