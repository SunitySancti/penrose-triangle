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
        /* overflow-x: hidden; */
        position: relative;
        perspective: 1000px;
        perspective-origin: center;
        transform-style: preserve-3d;
    }

    #root {
        width: 100vw;
        min-height: 100vh;
        /* background-color: $grayscale_20; */
    }

    ::-webkit-scrollbar {
        position: absolute;
        right: 0;
        /* background-color: $grayscale_20; */
    }
    ::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: white;
        border-radius: 10px;
        /* border: solid 5px $grayscale_20; */
        transition: all 0.3s ease-in-out;
        &:hover {
            /* border: solid 4px $grayscale_20; */
            background-color: white;
        }
    }

`