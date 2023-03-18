import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Required Field!").max(50, "Max of 50 characters"),
  email: yup.string().required("Required Field!").email("Email is invalid"),
  password: yup.string().required("Password is required!"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!"
  // ),
  description: yup.string().required("Required Field!").max(200, "Max of 200 characters"),
  cpf: yup.string().required("Cpf is required!").max(11, "XXX.XXX.XXX-XX"),
  cell: yup.string().required("Required Field!").max(11, "(DDD)XXXXX-XXXX"),
  birthDate: yup.string().required("Required Field!").max(10, "year/month/day"),
  accountType: yup.string().required("Required Field!").max(10, "Max of 10 characters"),
  cep: yup.string().required("Required Field!").max(8, "XXXXX-XXX"),
  state: yup.string().required("Required Field!").max(2),
  city: yup.string().required("Required Field!").max(50, "Max of 50 characters"),
  street: yup.string().required("Required Field!").max(50, "Max of 50 characters"),
  number: yup.number().required("Required Field!"),
  complement: yup.string().required("Required Field!").max(100, "Max of 50 characters"),
});
