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

router.get('/:id', async (req, res) => {
  const wasteType = await WasteType.findById(req.params.id);

  if (wasteType) {
    res.status(200).send(wasteType);
  } else {
    res.status(500).json({ message: 'Waste type with given ID not found'})
  }
});

router.delete('/:id', (req, res) => {
  WasteType.findByIdAndRemove(req.params.id).then(wasteType => {
    if (wasteType) {
      return res.status(200).json({success: true, message: 'Waste type was deleted'});
    } else {
      return res.status(404).json({success: false, message: 'Waste type not deleted'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, err})
  });
});

export { router };