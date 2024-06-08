import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  pickupDate: Yup.date().required("Pickup date is required"),
  returnDate: Yup.date().required("Return date is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  vehicleType: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string(),
    })
    .required("Vehicle type is required"),
  vehicle: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string(),
    })
    .required("Vehicle is required"),
});
