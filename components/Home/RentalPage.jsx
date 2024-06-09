"use client";
import { PrintReceipt } from "@/components/Cards/PrintReceipt";
import { Button } from "@/components/ui/button";
import ReservationCard from "@/components/Cards/ReservationCard";
import CustomerInformation from "@/components/Cards/CustomerInformation";
import ChargeInformation from "@/components/Cards/ChargeInformation";
import { formatDuration } from "@/lib/utils";
import { validationSchema } from "@/lib/schema";
import { initialFormValues } from "@/lib/utils";

import { useEffect, useRef, useState, useCallback } from "react";
import { useFormik } from "formik";
import { useReactToPrint } from "react-to-print";
function RentalPage({ carListData, vehicleTypes }) {
  const [selectedCar, setSelectedCar] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const cashReceiptRef = useRef();

  const handlePrintCashReceipt = useReactToPrint({
    content: () => cashReceiptRef.current,
    documentTitle: `payment_invoice`,
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const receiptData = {
        invoiceId: values.reservationId,
        customerName: `${values.firstName} ${values.lastName}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        carId: selectedCar?.id,
        pickupDate: values.pickupDate,
        dropoffDate: values.returnDate,
        discount: values.discount,
        hasDamage: values.hasDamage,
        hasInsurance: values.hasInsurance,
        hasTax: values.hasTax,
      };
      setSelectedReceipt(receiptData);
      handlePrintCashReceipt();
    },
  });
  const vehicleOptions = carListData
    ?.filter((car) => car.type === formik.values.vehicleType?.value)
    .map((car) => ({
      label: car.model,
      value: car.model,
    }));
  useEffect(() => {
    if (formik.values.pickupDate && formik.values.returnDate) {
      setDuration(
        formatDuration(formik.values.pickupDate, formik.values.returnDate)
      );
    }
  }, [formik.values.pickupDate, formik.values.returnDate]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      formik.handleSubmit();
    },
    [formik]
  );

  return (
    <>
      <div className="hidden">
        <PrintReceipt
          ref={cashReceiptRef}
          selectedReceipt={selectedReceipt}
          duration={duration}
          formik={formik}
          selectedCar={selectedCar}
        />
      </div>
      <form>
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-bold text-2xl">Reservation</h3>
          <Button variant="purple" type="submit" onClick={handleSubmit}>
            Print / Download
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className=" ">
            <ReservationCard
              formik={formik}
              vehicleTypeOptions={vehicleTypes}
              vehicleOptions={vehicleOptions}
              data={carListData}
              setSelectedCar={setSelectedCar}
            />
          </div>
          <div className="">
            <CustomerInformation formik={formik} />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <ChargeInformation
              duration={duration}
              formik={formik}
              selectedCar={selectedCar}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default RentalPage;
