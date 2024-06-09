"use client";

import DateTimePicker from "@/components/common/DateTimePicker";
import ErrorIdentifier from "@/components/common/ErrorIdentifier";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDuration } from "@/lib/utils";
import { useState } from "react";

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
      <ErrorIdentifier formik={formik} field={name} />
    )}
  </div>
);

const DateField = ({ label, name, formik, onDateChange, minDate }) => (
  <div>
    <Label className="block">
      {label}
      <span className="text-destructive">*</span>
    </Label>
    <DateTimePicker
      selectedDate={formik.values[name]}
      onDateChange={onDateChange}
      minDate={minDate}
    />
    <ErrorIdentifier formik={formik} field={name} />
  </div>
);

export default function ReservationDetails({ formik }) {
  const { values, setFieldValue } = formik;
  const [minReturnDate, setMinReturnDate] = useState(new Date());
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
              const minReturnDate = new Date(date.getTime() + 60 * 60 * 1000);
              setMinReturnDate(minReturnDate);
              if (values.returnDate && values.returnDate <= date) {
                setFieldValue("returnDate", minReturnDate);
                setFieldValue(
                  "duration",
                  formatDuration(date, minReturnDate)?.formatted
                );
              } else if (values.returnDate) {
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
            minDate={minReturnDate}
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
    </div>
  );
}
