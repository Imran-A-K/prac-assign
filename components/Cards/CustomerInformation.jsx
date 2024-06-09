"use client";

import ErrorIdentifier from "@/components/common/ErrorIdentifier";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdditionalCharges from "./AdditionalCharges";

const FormField = ({ label, name, formik, type = "text" }) => (
  <div>
    <Label>
      {label}
      <span className="text-destructive">*</span>
    </Label>
    <Input
      type={type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name={name}
    />
    <ErrorIdentifier formik={formik} field={name} />
  </div>
);

export default function CustomerInformation({ formik }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="border-b-2 border-indigo-600 pb-1 text-lg font-semibold mb-5">
          Customer Information
        </div>

        <Card className="space-y-2">
          <FormField label="First Name" name="firstName" formik={formik} />
          <FormField label="Last Name" name="lastName" formik={formik} />
          <FormField label="Email" name="email" formik={formik} />
          <FormField label="Phone" name="phone" formik={formik} type="tel" />
        </Card>
      </div>
      <AdditionalCharges formik={formik} />
    </div>
  );
}
