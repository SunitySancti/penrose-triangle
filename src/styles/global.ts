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

    h1 {
        margin: 2rem;
    }

    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
        background: transparent;
        margin-right: 2px;
    };
    ::-webkit-scrollbar-track {
        background: transparent;
    };
    ::-webkit-scrollbar-thumb {  
        /* background: rgba(0, 0, 0, 0.25); */
        background: rgba(255, 255, 255, 0.25);
        border-radius: 10px;
        margin-right: 5px;
    };
    ::-webkit-scrollbar-thumb:hover {
        /* background: rgba(0, 0, 0, 0.5); */
        background: rgba(255, 255, 255, 0.4);
    };

`