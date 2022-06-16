import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getCats(req, res);

    case "POST":
      console.log("Gato Guardado:");
      console.log(req.body);
      return await saveCat(req, res);
  }
}

const saveCat = async (req, res) => {
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

  const response = await pool
    .query("INSERT INTO cat SET ?", {
      name,
      description,
      age,
      vaccined,
      breed,
      gender,
      location_id,
      adopter_id,
    })
    .then((args) => {
      //console.log( args );
      return {
        status: true,
        cat: {
          name,
          description,
          age,
          vaccined,
          breed,
          gender,
          location_id,
          adopter_id,
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

  return res.status(200).json(response);
};

const getCats = async (req, res) => {
  const response = await pool
    .query("SELECT * FROM cat")
    .then((args) => {
      //console.log( args );
      return { status: true, cats: args[0] };
    })
    .catch((err) => {
      return { status: false, msg: "ERROR EN QUERY", db: err.sqlMessage };
    });

  const output = response.status ? response.cats : [];

  return res.status(200).json(output);
};
