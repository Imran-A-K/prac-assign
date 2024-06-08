"use client";

import * as Yup from "yup";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import ReservationCard from "./_components/ReservationCard";
import CustomerInformation from "./_components/CustomerInformation";
import ChargeInformation from "./_components/ChargeInformation";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";

import { formatDuration } from "@/lib/utils";
import { PrintReceipt } from "./_components/PrintReceipt";

const validationSchema = Yup.object().shape({
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

const initialFormValues = {
  vehicleType: null,
  vehicle: null,
  reservationId: "",
  hasDamage: false,
  hasInsurance: false,
  pickupDate: "",
  returnDate: "",
  duration: "",
  discount: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  hasTax: false,
};

export default function Home() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const cashReceiptRef = useRef();

  const handlePrintCashReceipt = useReactToPrint({
    content: () => cashReceiptRef.current,
    documentTitle: `cash_receipt`,
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
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
      setSelectedReceipt(payload);
      handlePrintCashReceipt();
    },
  });

  useEffect(() => {
    if (formik.values.pickupDate && formik.values.returnDate) {
      setDuration(
        formatDuration(formik.values.pickupDate, formik.values.returnDate)
      );
    }
  }, [formik.values.pickupDate, formik.values.returnDate]);

  useEffect(() => {
    const id = crypto.randomUUID().slice(0, 8);
    formik.setFieldValue("reservationId", `${id.toString().padStart(4, "0")}`);
  }, []);

  const { data: carListData, isLoading } = useQuery({
    queryKey: ["carsList"],
    queryFn: () =>
      fetch(`https://exam-server-7c41747804bf.herokuapp.com/carsList`)
        .then((res) => res.json())
        .then(({ data }) => data),
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      formik.handleSubmit();
    },
    [formik]
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen z-50 flex justify-center items-start pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const vehicleTypes = [...new Set(carListData?.map((car) => car?.type))].map(
    (type) => ({
      label: type,
      value: type,
    })
  );

  const vehicleOptions = carListData
    ?.filter((car) => car.type === formik.values.vehicleType?.value)
    .map((car) => ({
      label: car.model,
      value: car.model,
    }));

  return (
    <main>
      <div className="hidden">
        <PrintReceipt
          ref={cashReceiptRef}
          selectedReceipt={selectedReceipt}
          duration={duration}
          formik={formik}
          selectedCar={selectedCar}
        />
      </div>
      <Container>
        <form>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-2xl">Reservation</h3>
            <Button variant="purple" type="submit" onClick={handleSubmit}>
              Print / Download
            </Button>
          </div>

          <div className="grid grid-cols-10 gap-6">
            <div className="col-span-10 md:col-span-5 lg:col-span-3">
              <ReservationCard
                formik={formik}
                vehicleTypeOptions={vehicleTypes}
                vehicleOptions={vehicleOptions}
                data={carListData}
                setSelectedCar={setSelectedCar}
              />
            </div>
            <div className="col-span-10 md:col-span-5 lg:col-span-3">
              <CustomerInformation formik={formik} />
            </div>
            <div className="col-span-10 lg:col-span-4">
              <ChargeInformation
                duration={duration}
                formik={formik}
                selectedCar={selectedCar}
              />
            </div>
          </div>
        </form>
      </Container>
    </main>
  );
}
