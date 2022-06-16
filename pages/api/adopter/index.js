import { pool } from "../../../config/db";
import CreateAdopter from "../../create-adopter";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getAdopter(req, res);
    case "POST":
      return await saveAdopter(req, res);
  }
}

const getAdopter = async (req, res) => {
  const response = await pool
    .query("SELECT * FROM adopter")
    .then((args) => {
      console.log(args[0]);
      return { status: true, adopters: args[0] };
    })
    .catch((err) => {
      return { status: false, msg: "ERROR EN QUERY", db: err.sqlMessage };
    });
  const output = response.status ? response.adopters : [];
  return res.status(200).json(output);
};

const saveAdopter = async (req, res) => {
  const { name, address, email, phone } = req.body;

  const response = await pool
    .query("INSERT INTO adopter SET ?", {
      name,
      address,
      email,
      phone,
    })
    .then((args) => {
      //console.log( args );
      return {
        status: true,
        adopter: {
          name,
          address,
          email,
          phone,
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
