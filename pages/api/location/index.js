import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getLocation(req, res);
    case "POST":
      return await saveLocation(req, res);
    default:
      break;
  }
}

const getLocation = async (req, res) => {
  const response = await pool
    .query("SELECT * FROM location")
    .then((args) => {
      console.log(args[0]);
      return { status: true, locations: args[0] };
    })
    .catch((err) => {
      return { status: false, msg: "ERROR EN QUERY", db: err.sqlMessage };
    });
  const output = response.status ? response.locations : [];
  return res.status(200).json(output);
};

const saveLocation = async (req, res) => {
  const { name, address, description, mapLink } = req.body;

  const response = await pool
    .query("INSERT INTO location SET ?", {
      name,
      address,
      description,
      mapLink,
    })
    .then((args) => {
      //console.log( args );
      return {
        status: true,
        location: {
          name,
          address,
          description,
          mapLink,
          id: args[0].insertId,
        },
      };
    })
    .catch((err) => {
      return {
        status: false,
        msg: `ERROR EN QUERY: ${err.sqlMessage}`,
        db: err.sqlMessage,
      };
    });
  console.log(response);
  return res.status(200).json(response);
};
