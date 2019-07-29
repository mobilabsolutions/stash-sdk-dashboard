export const borderColor = ({ focused, hasErrors, theme }) =>
  hasErrors ? theme.red.A400 : focused ? theme.primary.A500 : theme.shade.A100
