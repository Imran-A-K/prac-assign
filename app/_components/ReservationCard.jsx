"use client";

import DateTimePicker from "@/components/shared/DateTimePicker";
import FormikErrorBox from "@/components/shared/FormikErrorBox";
import SelectField from "@/components/shared/SelectField";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDuration } from "@/lib/utils";
import VehicleInfo from "./VehicleInfo";

const FormField = ({
  label,
  name,
  formik,
  type = "text",
  disabled = false,
}) => (
  <div>
    <Label>
      {label}
      {name !== "duration" &&
        name !== "reservationId" &&
        name !== "discount" && <span className="text-destructive">*</span>}
    </Label>
    <Input
      type={type}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={disabled}
    />
    {name !== "duration" && name !== "reservationId" && name !== "discount" && (
      <FormikErrorBox formik={formik} field={name} />
    )}
  </div>
);

const DateField = ({ label, name, formik, onDateChange }) => (
  <div>
    <Label className="block">
      {label}
      <span className="text-destructive">*</span>
    </Label>
    <DateTimePicker
      selectedDate={formik.values[name]}
      onDateChange={onDateChange}
    />
    <FormikErrorBox formik={formik} field={name} />
  </div>
);

export default function ReservationCard({
  formik,
  vehicleTypeOptions,
  vehicleOptions,
  data,
  setSelectedCar,
}) {
  const { values, setFieldValue } = formik;

  return (
    <div className="space-y-6">
      <div>
        <div className="border-b-2 border-indigo-600 pb-1 text-lg font-semibold mb-5">
          Reservation Details
        </div>

        <Card className="space-y-2">
          <FormField
            label="Reservation ID"
            name="reservationId"
            formik={formik}
            disabled
          />

          <DateField
            label="Pickup Date"
            name="pickupDate"
            formik={formik}
            onDateChange={(date) => {
              setFieldValue("pickupDate", date);
              if (values.returnDate) {
                setFieldValue(
                  "duration",
                  formatDuration(date, values.returnDate)?.formatted
                );
              }
            }}
          />

          <DateField
            label="Return Date"
            name="returnDate"
            formik={formik}
            onDateChange={(date) => {
              setFieldValue("returnDate", date);
              if (values.pickupDate) {
                setFieldValue(
                  "duration",
                  formatDuration(values.pickupDate, date)?.formatted
                );
              }
            }}
          />

          <div className="flex items-center gap-10 !mt-5">
            <Label>Duration</Label>
            <Input disabled value={values.duration} />
          </div>

          <FormField label="Discount (%)" name="discount" formik={formik} />
        </Card>
      </div>

      <VehicleInfo
        formik={formik}
        vehicleTypeOptions={vehicleTypeOptions}
        vehicleOptions={vehicleOptions}
        data={data}
        setSelectedCar={setSelectedCar}
      />
    </div>
  );
}
