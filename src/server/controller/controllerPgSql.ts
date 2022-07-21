export const getPokemonsPGSQL = async (req: Request, res: Response) => {
  const pageRes = Number(req.params.page);
  const queryName = req.query.name;

  //   if (err) return res.status(400).json([]);
  //   return res.status(200).json(data);
};

export const saveFavoirtePokemonsPGSQL = async (
  req: Request,
  res: Response
) => {
  //   if (err[1]) return res.status(400).send("The data is not added");
  //   return res.status(200).send("The data is added successfully");
};

export const getFavoritePokemonsPGSQL = async (req: Request, res: Response) => {
  //   if (err) return res.status(400).json([]);
  //   return res.status(200).json(data);
};
