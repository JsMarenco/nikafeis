export const loginFormInputs = {
  buttonSize: "large",

  email: {
    id: "email_input_id",
    name: "email",
    label: "",
    role: "email-input",
    ariaLabel: "email-input",
    placeholder: "Your email address",
    type: "email",
    autoComplete: "off",
  },

  password: {
    id: "password_input_id",
    name: "password",
    label: "",
    role: "password-input",
    ariaLabel: "password-input",
    placeholder: "Your password",
    type: {
      hidden: "password",
      show: "text",
    },
    autoComplete: "off",
  },
}
