import {LightTheme} from 'baseui';

const breakpoints = {
    small: 400,
    medium: 650,
    large: 950,
  };

  const ResponsiveTheme = Object.keys(breakpoints).reduce(
    (acc, key) => {
      acc.mediaQuery[
        key
      ] = `@media screen and (max-width: ${breakpoints[key]}px)`;
      return acc;
    },
    {
      breakpoints,
      mediaQuery: {},
    },
  );

  export const MyTheme = {...LightTheme,...ResponsiveTheme};