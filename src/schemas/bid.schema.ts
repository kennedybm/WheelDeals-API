import * as yup from "yup";

export const bidSchema = yup.object().shape({
  value: yup
    .number()
    .typeError("Must be only digits")
    .required("Amount required!")
    .test("len", "Max of 5 digits", (val) => (val ? val.toString().length <= 12 : true)),
});
