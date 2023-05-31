const container = {
  borderRadius: 3,
  bgcolor: "background.paper",
  width: "100%",
  p: 2,
}

const button_large = {
  maxWidth: "165px",
  minWidth: "120px",
  borderRadius: 3,
  py: 1,
  px: 3,
  flexShrink: 0,
}

const button_small = {
  ...button_large,
  minWidth: "100px",
}

const cardStyles = {
  container,
  button_large,
  button_small,
}

export default cardStyles
