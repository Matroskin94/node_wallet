import express from 'express';

import { ReplenishmentType } from '../models';

const router = express.Router();

router.post('/', (req, res) => {
  const replenishmentType = new ReplenishmentType({
    name: req.body.name,
    code: req.body.code
  });

  replenishmentType
    .save()
    .then(( createdReplenishmentType ) => {
      res.status(201).json(createdReplenishmentType);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false
      })
    });
});

router.get('/', async (req, res) => {
  const replenishmentTypeList = await ReplenishmentType.find();

  if (replenishmentTypeList) {
    res.send(replenishmentTypeList);
  } else {
    res.status(500).json({success: false});
  }
});


router.get('/:id', async (req, res) => {
  const replenishmentType = await ReplenishmentType.findById(req.params.id);

  if (replenishmentType) {
    res.status(200).send(replenishmentType);
  } else {
    res.status(500).json({ message: 'Replenishment type with given ID not found'})
  }
});

router.delete('/:id', (req, res) => {
  ReplenishmentType.findByIdAndRemove(req.params.id).then(replenishmentType => {
    if (replenishmentType) {
      return res.status(200).json({success: true, message: 'Replenishment type was deleted'});
    } else {
      return res.status(404).json({success: false, message: 'Replenishment type not deleted'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, err})
  });
});

router.put('/:id', async (req, res) => {
  const updatedReplenishmentType = await ReplenishmentType.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    code: req.body.code
  });

  if (updatedReplenishmentType) {
    res.status(200).send(updatedReplenishmentType);
  } else {
    res.status(500).json({
      message: 'Replenishment type did not update',
      success: false
    });
  }
});

export { router };