import CatCreationForm from "../Components/CatCreationForm/CatCreationForm";

const CreateCat = ({ location, adopter }) => {
  console.log(adopter);
  return (
    <>
      <CatCreationForm location={location} adopter={adopter} />
    </>
  );
};

export default CreateCat;

export const getServerSideProps = async () => {
  const res2 = await fetch("http://localhost:3000/api/location");
  const location = (await res2.json()) || [];

  const res3 = await fetch("http://localhost:3000/api/adopter");
  const adopter = (await res3.json()) || [];

  return {
    props: {
      location,
      adopter,
    },
  };
};
