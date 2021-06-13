import type {ThemeProps} from '@polkadot/react-components/src/types'

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle<ThemeProps>(({theme}: ThemeProps ) => `
.theme--dark, {}

.theme--light, {}

.theme--dark,
.theme--light {
    
}
`);