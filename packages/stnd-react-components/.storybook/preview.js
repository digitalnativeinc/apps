import '!style-loader!css-loader!sass-loader!../src/styles/customize.css';
import '!style-loader!css-loader!sass-loader!../../../node_modules/animate.css/animate.min.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}