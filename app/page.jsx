import { getCarList } from "@/api/carListData";
import RentalPage from "@/components/Home/RentalPage";
import Wrapper from "@/components/common/Wrapper";

export default async function Home() {
  const carListData = await getCarList();
  const vehicleTypes = [...new Set(carListData?.map((car) => car?.type))].map(
    (type) => ({
      label: type,
      value: type,
    })
  );

  return (
    <Wrapper>
      <RentalPage carListData={carListData} vehicleTypes={vehicleTypes} />
    </Wrapper>
  );
}
