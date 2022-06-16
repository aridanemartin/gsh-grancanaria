import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getCat(req, res);
    case "DELETE":
      return await deleteCat(req, res);
    case "PUT":
      return await updateCat(req, res);
    default:
      break;
  }
}

const getCat = async (req, res) => {
  const { id } = req.query;

  const [result] = await pool.query("SELECT * FROM cat WHERE cat_id = ?", [id]);

  return res.status(200).json(result[0]);
};

const deleteCat = async (req, res) => {
  const { id } = req.query;

  const result = await pool.query("DELETE FROM cat WHERE cat_id = ?", [id]);
  console.log(result);
  return res.status(204).json();
};

const updateCat = async (req, res) => {
  const { id } = req.query;
  const {
    name,
    description,
    age,
    vaccined,
    breed,
    gender,
    location_id,
    adopter_id,
  } = req.body;
  await pool.query(
    "UPDATE cat SET name = ?, description = ?, age = ?, vaccined = ?, breed = ?, gender = ?, location_id = ?, adopter_id = ? WHERE cat_id = ?",
    [
      name,
      description,
      age,
      vaccined,
      breed,
      gender,
      location_id,
      adopter_id,
      id,
    ]
  );
  return res.status(204).json();
};
