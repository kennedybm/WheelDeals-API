import * as yup from "yup";

export const gallerySchema = yup.object().shape({
  url: yup
    .array()
    .of(yup.string().matches(/(http(s?):)([/|.|\w|\s|-])*\./, "Only img's url"))
    .min(1, "Url array cannot be empty")
    .required("Required Field"),
});
