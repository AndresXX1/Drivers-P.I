const { createDriverDB } = require("../Controllers/createDrivers");

const postCreateDriversHandler = async (req, res) => {
  try {
    const { name, surname, description, nationality, birthdate, wins, TeamId } = req.body;
    // Llama a la función del controlador para crear un nuevo conductor
    const newDriver = await createDriverDB({
      name,
      surname,
      description,
      nationality,
      birthdate,
      wins,
      TeamId,
    });

    res.status(201).json({ success: "Driver created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Driver" });
  }
};

module.exports = {
  postCreateDriversHandler,
};