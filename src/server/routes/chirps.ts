import { Router } from "express";
import chirpStore from "../utils/chirpstore";
const router = Router();

router.get("/", (req, res) => {
  const data = chirpStore.GetChirps();
  const chirps = Object.keys(data).map((key) => {
    return {
      id: key,
      user: data[key].user,
      text: data[key].text,
    };
  });
  chirps.pop()
  res.json(chirps);
});

router.get("/:id", (req, res) => {
  let id = req.params.id;

  //gets one chirp via the id property (made above in the "get all" method)
  let oneChirp = chirpStore.GetChirp(id);

  res.json({id: id, ...oneChirp});
});

router.post("/", (req, res) => {
  chirpStore.CreateChirp({
    user: req.body.user,
    text: req.body.text,
  });
  res.status(201).json("Chirp Created");
});

router.put("/:id", (req, res) => {
  chirpStore.UpdateChirp(req.params.id, {
    user: req.body.user,
    text: req.body.text,
  });
  res.status(201).json(`Chirp (ID ${req.params.id}) Updated`);
});

router.delete("/:id", (req, res) => {
  chirpStore.DeleteChirp(req.params.id);
  res.status(201).json("Chirp Deleted");
});

export default router;
