export async function getCarList() {
  return fetch(`${process.env.API_URL}/carsList`)
    .then((res) => res.json())
    .then(({ data }) => data);
}
