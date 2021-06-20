import type {ThemeProps} from '@polkadot/react-components/src/types'

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle<ThemeProps>(({theme}: ThemeProps ) => `
html {
    font-size: 16px;
}
.theme--dark, {
    color: var(--text);
}

.theme--light, {}

.theme--dark,
.theme--light {
    
}
`);