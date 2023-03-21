import * as yup from "yup";

export const announcementSchema = yup.object().shape({
  title: yup.string().required("Required Field!").max(50, "Max of 50 characters"),
  announceType: yup.string().required("Required Field!").max(15, "Max of 15 characters"),
  description: yup.string().required("Required Field!"),
  km: yup
    .number()
    .typeError("Must be only digits")
    .test("len", "Max of 6 digits", (val) => (val ? val.toString().length <= 6 : true))
    .required("Required Field!"),
  fabricationYear: yup
    .number()
    .typeError("Must be only digits")
    .required("Required Field!")
    .test("len", "Max of 4 digits", (val) => (val ? val.toString().length <= 4 : true)),
  price: yup
    .number()
    .typeError("Must be only digits")
    .required("Required Field!")
    .test("len", "Max of 12 digits", (val) => (val ? val.toString().length <= 12 : true)),
  announceCover: yup
    .string()
    .required("Required Field!")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\./, "Only img's url"),
  category: yup.string().required("Required Field!").max(10, "Max of 10 characters"),
});
