import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getLocation(req, res);
    default:
      break;
  }
}

const getLocation = async (req, res) => {
  const { id } = req.query;

  const [result] = await pool.query(
    "SELECT * FROM location WHERE location_id = ?",
    [id]
  );

  return res.status(200).json(result[0]);
};
