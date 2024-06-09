import { format } from "date-fns";
import Link from "next/link";
import { forwardRef } from "react";

export const PrintReceipt = forwardRef(function PrintPage(
  { selectedReceipt, duration, formik, selectedCar },
  ref
) {
  const taxCharge = formik.values.hasTax ? 20.55 : 0;
  const damageCharge = formik.values.hasDamage ? 9 : 0;

  const insuranceCharge = formik.values.hasInsurance ? 15 : 0;
  const totalCharges = selectedCar
    ? selectedCar.rates.weekly * duration?.weeks +
      selectedCar.rates.daily * duration?.days +
      selectedCar.rates.hourly * duration?.hours +
      taxCharge +
      damageCharge +
      insuranceCharge
    : 0;

  const pickupDate = new Date(
    selectedReceipt?.pickupDate || formik.values.pickupDate
  );
  const dropOffDate = new Date(
    selectedReceipt?.dropoffDate || formik.values.returnDate
  );

  return (
    <div ref={ref} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">Customer Details</h2>
          <p>
            {selectedReceipt?.customerName ||
              `${formik.values.firstName} ${formik.values.lastName}`}
          </p>

          <Link
            href="mailto:nyntax-receipt@gmail.com"
            className="text-indigo-600"
          >
            {selectedReceipt?.customerEmail || formik.values.email}
          </Link>

          <p>Phone: {selectedReceipt?.customerPhone || formik.values.phone}</p>
        </div>

        <div className="">
          <h2 className="text-lg font-bold">Order Information</h2>
          <p>
            <span className="font-semibold">Reservation ID: </span>
            {selectedReceipt?.invoiceId}
          </p>
          <p>
            <span className="font-semibold"> Unit: </span>{" "}
            {selectedReceipt?.carName ||
              `${selectedCar?.make} ${selectedCar?.model}`}
          </p>
          <p>
            <span className="font-semibold">Make & Model:</span>{" "}
            {selectedReceipt?.carName ||
              `${selectedCar?.make} ${selectedCar?.model}`}
          </p>
          <p>
            <span className="font-semibold">Pickup-date:</span>{" "}
            {(selectedReceipt?.pickupDate || formik.values.pickupDate) &&
              format(pickupDate, "Pp")}
          </p>
          <p>
            <span className="font-semibold">Return-date:</span>{" "}
            {(selectedReceipt?.dropoffDate || formik.values.returnDate) &&
              format(dropOffDate, "Pp")}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">Service Charge</h2>
        <table className="w-full text-left text-sm">
          <thead className="border-b">
            <tr>
              <th className="pb-2">Charge</th>
              <th className="pb-2 pr-2">Duration</th>
              <th className="pb-2">Rate</th>
              <th className="pb-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {selectedCar && (
              <>
                {duration?.weeks > 0 && (
                  <tr>
                    <td className="py-2">Weekly</td>
                    <td className="py-2">{duration?.weeks}</td>
                    <td className="py-2">
                      ${parseFloat(selectedCar.rates.weekly).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        selectedCar.rates.weekly * duration?.weeks
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}

                {duration?.days > 0 && (
                  <tr>
                    <td className="py-2">Daily</td>
                    <td className="py-2">{duration?.days}</td>
                    <td className="py-2">
                      ${parseFloat(selectedCar.rates.daily).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        selectedCar.rates.daily * duration?.days
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}

                {duration?.hours > 0 && (
                  <tr>
                    <td className="py-2">Hourly</td>
                    <td className="py-2">{duration?.hours}</td>
                    <td className="py-2">
                      ${parseFloat(selectedCar.rates.hourly).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        selectedCar.rates.hourly * duration?.hours
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}

                {formik.values.hasDamage && (
                  <tr>
                    <td className="py-2">Collision Damage Waiver</td>
                    <td className="py-2"></td>
                    <td className="py-2">$9.00</td>
                    <td className="py-2 text-right">$9.00</td>
                  </tr>
                )}
                {formik.values.hasInsurance && (
                  <tr>
                    <td className="py-2">Liability Insurance</td>
                    <td className="py-2"></td>
                    <td className="py-2">$15.00</td>
                    <td className="py-2 text-right">$15.00</td>
                  </tr>
                )}
                {formik.values.hasTax && (
                  <tr>
                    <td className="py-2">Tax</td>
                    <td className="py-2"></td>
                    <td className="py-2">$20.55</td>
                    <td className="py-2 text-right">$20.55</td>
                  </tr>
                )}
                {formik.values.discount && (
                  <tr>
                    <td className="py-2">Discount</td>
                    <td className="py-2"></td>
                    <td className="py-2">{formik.values.discount}%</td>
                    <td className="py-2 text-right">
                      $
                      {parseFloat(
                        (totalCharges * formik.values.discount) / 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t font-semibold">
              <td className="pt-2">Total</td>
              <td className="pt-2"></td>
              <td className="pt-2"></td>
              <td className="pt-2 text-right">
                $
                {parseFloat(
                  totalCharges -
                    (formik.values.discount
                      ? (totalCharges * formik.values.discount) / 100
                      : 0)
                ).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});
