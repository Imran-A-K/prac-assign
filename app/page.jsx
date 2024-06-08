import { getCarList } from "@/api/carListData";
import RentalPage from "@/components/Home/RentalPage";
import Wrapper from "@/components/shared/Wrapper";

export default async function Home() {
  const carListData = await getCarList();
  const vehicleTypes = [...new Set(carListData?.map((car) => car?.type))].map(
    (type) => ({
      label: type,
      value: type,
    })
  );
  const reservationId = crypto.randomUUID().slice(0, 8);

  return (
    <Wrapper>
      <RentalPage
        carListData={carListData}
        vehicleTypes={vehicleTypes}
        reservationId={reservationId}
      />
    </Wrapper>
  );
}
