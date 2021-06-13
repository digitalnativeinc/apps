import { ThemeDef } from '@polkadot/react-components/src/types'
import darkTheme from '../constants/darkTheme'
import lightTheme from '../constants/lightTheme'

interface customThemeProp {
    theme: ThemeDef;
}

// not used as of now
// injection of theme object has overhead
// stick to polkadot's approach on setting css values on 
// @polkadot/apps/public/index.html
// if this is to go in effect, styled-component's theme provider needs to be
// implemented in the root.tsx
export default function useCustomTheme({theme}: customThemeProp) {
    return theme.theme === 'dark' ? darkTheme : lightTheme
}