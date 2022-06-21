export const nameStyles = {
  fontWeight: "bold",
  textDecoration: "Underline",
  cursor: "pointer",
  "&:hover": {
    color: "text.secondary",
  },
  display: "inline-block",
  width: "auto",
}

export const commentContainerStyles = {
  mb: 1,
  bgcolor: "#0A1929",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  "&:before": {
    content: "''",
    position: "initial",
  }
}

export const favoriteButtonStyles = {
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: "transparent",
  },
  fontSize: "0.8em",
}

export const commentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}