// import React, { useContext, useState } from "react";
// import useStore from "./useStore";
// import { ThemeDef } from '@polkadot/react-components/src/types'

// interface customThemeProp {
//     theme: ThemeDef;
// }

// export const themeContext = React.createContext({});
// export const useThemeContext = () => useContext(themeContext);

// export default function useTheme({theme}: customThemeProp) {
//   const [getLastValue, setLastValue] = useStore("options:theme", "theme");
//   const [_theme, setTheme] = useState(getLastValue() || "dark");

//   const switchLight = () => {
//     setLastValue("light");
//     setTheme("light");
//   };

//   const switchDark = () => {
//     setLastValue("dark");
//     setTheme("dark");
//   };

//   return [theme, switchLight, switchDark];
// }
