import * as yup from "yup";

export const sessionSchema = yup.object().shape({
  email: yup.string().required("Email is required.").email("Email is invalid."),
  password: yup.string().required("Password is required."),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!"
  // ),
});
