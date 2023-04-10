import * as yup from "yup";

export const commentSchema = yup.object().shape({
  message: yup.string().required("Required Field").min(5, "Min 5 characters"),
});
