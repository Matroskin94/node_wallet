import express from 'express';

import { WasteType } from '../models';

const router = express.Router();

router.post('/', (req, res) => {
  const wasteType = new WasteType({
    name: req.body.name,
    code: req.body.code
  });

  wasteType
    .save()
    .then(( createdWasteType ) => {
      res.status(201).json(createdWasteType);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false
      })
    });
});

router.get('/', async (req, res) => {
  const wasteTypeList = await WasteType.find();

  if (wasteTypeList) {
    res.send(wasteTypeList);
  } else {
    res.status(500).json({success: false});
  }
});

export { router };