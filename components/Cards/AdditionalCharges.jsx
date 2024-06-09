import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
function AdditionalCharges({ formik }) {
  const additionalChargeData = [
    {
      key: crypto.randomUUID(),
      label: "Collision Damage Waiver",
      name: "hasDamage",
      price: "$9.00",
    },
    {
      key: crypto.randomUUID(),
      label: "Liability Insurance",
      name: "hasInsurance",
      price: "$15.00",
    },
    {
      key: crypto.randomUUID(),
      label: "Rental Tax",
      name: "hasTax",
      price: "$20.55",
    },
  ];
  return (
    <div>
      <div className="border-b-2 border-indigo-600 pb-1 text-lg font-semibold mb-5">
        Additional Charges
      </div>

      <Card className="space-y-8">
        {additionalChargeData.map((charge) => (
          <CheckboxField
            key={charge.key}
            label={charge.label}
            name={charge.name}
            formik={formik}
            price={charge.price}
          />
        ))}
      </Card>
    </div>
  );
}

export default AdditionalCharges;
