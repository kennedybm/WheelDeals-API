import * as yup from "yup";

export const announcementSchema = yup.object().shape({
  title: yup.string().required("Required Field!").max(50, "Max of 50 characters"),
  announceType: yup.string().required("Required Field!").max(15, "Max of 15 characters"),
  description: yup.string().required("Required Field!"),
  km: yup.number().typeError("Must be only digits").required("Required Field!"),
  fabricationYear: yup.number().typeError("Must be only digits").required("Required Field!"),
  price: yup.number().typeError("Must be only digits").required("Required Field!"),
  announceCover: yup.string().required("Required Field!"),
  category: yup.string().required("Required Field!").max(10, "Max of 10 characters"),
});
