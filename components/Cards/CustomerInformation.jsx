"use client";

import ErrorIdentifier from "@/components/common/ErrorIdentifier";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const CheckboxField = ({ label, name, formik, price }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      id={name}
      checked={formik.values[name]}
      onCheckedChange={() => formik.setFieldValue(name, !formik.values[name])}
    />
    <Label
      htmlFor={name}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full cursor-pointer"
    >
      {label}
      <p>{price}</p>
    </Label>
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

      <div>
        <div className="border-b-2 border-indigo-600 pb-1 text-lg font-semibold mb-5">
          Additional Charges
        </div>

        <Card className="space-y-8">
          <CheckboxField
            label="Collision Damage Waiver"
            name="hasDamage"
            formik={formik}
            price="$9.00"
          />
          <CheckboxField
            label="Liability Insurance"
            name="hasInsurance"
            formik={formik}
            price="$15.00"
          />
          <CheckboxField
            label="Rental Tax"
            name="hasTax"
            formik={formik}
            price="$11.50"
          />
        </Card>
      </div>
    </div>
  );
}
