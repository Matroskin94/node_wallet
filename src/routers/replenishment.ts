import express from 'express';

import { Replenishment } from '../models';

const router = express.Router();

router.post('/', (req, res) => {
  const replenishment = new Replenishment({
    type: req.body.type,
    comment: req.body.comment
  });

  replenishment
    .save()
    .then(( createdReplenishment) => {
      res.status(201).json(createdReplenishment);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false
      })
    });
});

router.get('/', async (req, res) => {
  const replenishmentTypeList = await Replenishment.find();

  if (replenishmentTypeList) {
    res.send(replenishmentTypeList);
  } else {
    res.status(500).json({success: false});
  }
});

export { router };