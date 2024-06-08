import { format } from "date-fns";
import Image from "next/image";
import { forwardRef } from "react";

export const PrintReceipt = forwardRef(function PrintPage(
  { selectedReceipt, duration, formik, selectedCar },
  ref
) {
  const totalCharges = selectedCar
    ? selectedCar.rates.weekly * duration.weeks +
      selectedCar.rates.daily * duration.days +
      selectedCar.rates.hourly * duration.hours
    : 0;

  const start = new Date(
    selectedReceipt?.pickupDate || formik.values.pickupDate
  );
  const end = new Date(
    selectedReceipt?.dropoffDate || formik.values.returnDate
  );

  return (
    <div ref={ref} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">RENTER INFO</h2>
          <p>
            {selectedReceipt?.customerName ||
              `${formik.values.firstName} ${formik.values.lastName}`}
          </p>
          <>
            <p href="mailto:test@gmail.com" className="text-blue-600">
              {selectedReceipt?.customerEmail || formik.values.email}
            </p>
          </>
          <p>Phone: {selectedReceipt?.customerPhone || formik.values.phone}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Reservation</h2>
          <p>{selectedReceipt?.invoiceId}</p>
          <h2 className="text-lg font-bold">REPAIR ORDER:</h2>
          <p>CLAIM:</p>
          <p>
            Date/Time Out:{" "}
            {(selectedReceipt?.pickupDate || formik.values.pickupDate) &&
              format(start, "Pp")}
          </p>
          <p>
            Date/Time In:{" "}
            {(selectedReceipt?.dropoffDate || formik.values.returnDate) &&
              format(end, "Pp")}
          </p>
        </div>
      </div>
    </div>
  );
});
