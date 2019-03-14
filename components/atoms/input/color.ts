export const borderColor = ({ focused, hasErrors, theme }) =>
  hasErrors ? theme.red.A400 : focused ? theme.primary.A600 : theme.shade.A100
