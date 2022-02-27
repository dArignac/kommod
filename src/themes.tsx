import { createStitches, globalCss } from "@stitches/react"

// color palette https://coolors.co/palette/22223b-4a4e69-9a8c98-c9ada7-f2e9e4

const { theme } = createStitches({
  theme: {
    colors: {
      primary: "#F2E9E4",
      secondary: "#C9ADA7",
      //   auxiliary: '#9A8C98',
      background: "#22223B", // if changed, also adjust index.html
      //   backgroundLight: '#4A4E69'
    },
    space: {
      space1: "4px",
    },
    fonts: {
      family: "Arial, sans-serif",
      size: "14px",
    },
  },
})

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },
  body: {
    background: theme.colors.background.computedValue,
    color: theme.colors.primary.computedValue,
    fontFamily: theme.fonts.family.computedValue,
    fontSize: theme.fonts.size.computedValue,
    margin: theme.space.space1.computedValue,
  },
})
