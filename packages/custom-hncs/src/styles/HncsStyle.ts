import type {ThemeProps} from '@polkadot/react-components/src/types'

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle<ThemeProps>(({theme}: ThemeProps ) => `
.--bg--glass { 
    background: linear-gradient(23.12deg, rgba(96, 95, 148, 0.4) 2.05%, rgba(245, 244, 255, 0.2) 104.3%) !important;
    backdrop-filter: blur(110px) !important;
    /* Note: backdrop-filter has minimal browser support */
    
    border-radius: 20px;
}

.dimmer { 
    background: rgba(14, 5, 37, 0.7) !important;
    backdrop-filter: blur(10px) !important;
}

.--shake {
    &:hover {
        animation: shake 0.5s;
    }
}

.theme--dark {
    .--btn--primary {
        border-radius: 8px;
        background: var(--bg--btn--primary);
        color: var(--text--btn--primary);
    }
}

.theme--light {
    .--btn--primary {
        border-radius: 8px;
        background: var(--bg--btn--primary);
        color: var(--text--btn--primary);
    }
}

.theme--dark,
.theme--light {
    
}


//animes

@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    // 10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(1px, -1px) rotate(1deg); }
    // 30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(-1px, 1px) rotate(1deg); }
    // 50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-1px, 1px) rotate(0deg); }
    // 70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    // 90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -1px) rotate(-1deg); }
  }
`);