import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 16px;
    }

    body {
        margin: 0;
        overflow: hidden;
    }

    ::-webkit-scrollbar {
        position: absolute;
        right: 0;
    }
    ::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: white;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        
        &:hover {
            background-color: white;
        }
    }

`