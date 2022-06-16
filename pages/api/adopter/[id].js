import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getAdopter(req, res);
  }
}

const getAdopter = async (req, res) => {
  const { id } = req.query;

  const [result] = await pool.query(
    "SELECT * FROM adopter WHERE adopter_id = ?",
    [id]
  );

  return res.status(200).json(result[0]);
};
