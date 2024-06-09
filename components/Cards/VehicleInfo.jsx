import React from "react";
import SelectField from "@/components/common/SelectField";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ErrorIdentifier from "@/components/common/ErrorIdentifier";
function VehicleInfo({
  formik,
  vehicleTypeOptions,
  vehicleOptions,
  data,
  setSelectedCar,
}) {
  return (
    <div>
      <div className="border-b-2 border-indigo-600 pb-1 text-lg font-semibold mb-5">
        Vehicle Information
      </div>

      <Card className="space-y-2">
        <div>
          <Label>
            Vehicle Type<span className="text-destructive">*</span>
          </Label>
          <SelectField
            options={vehicleTypeOptions}
            onChange={(value) => {
              setSelectedCar(null);
              formik.setFieldValue("vehicle", null);
              formik.setFieldValue("vehicleType", value);
            }}
            value={formik.values.vehicleType}
            placeholder="Select Vehicle Type"
          />
          <ErrorIdentifier formik={formik} field="vehicleType" />
        </div>

        <div>
          <Label>
            Vehicle<span className="text-destructive">*</span>
          </Label>
          <SelectField
            isDisabled={!formik.values.vehicleType}
            options={vehicleOptions}
            onChange={(value) => {
              formik.setFieldValue("vehicle", value);
              setSelectedCar(data?.find((car) => car.model === value.value));
            }}
            value={formik.values.vehicle}
            placeholder="Select Vehicle"
          />
          <ErrorIdentifier formik={formik} field="vehicle" />
        </div>
      </Card>
    </div>
  );
}

export default VehicleInfo;
