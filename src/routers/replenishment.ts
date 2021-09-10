import express from 'express';

import { Currency, Replenishment, ReplenishmentType } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
  const type = await ReplenishmentType.findById(req.body.type);
  const currency = await Currency.findById(req.body.currency);
  if (!type) {
    return res.status(400).send('Invalid replenishment type');
  }
  if (!currency) {
    return res.status(400).send('Invalid currency');
  }

  let replenishment = new Replenishment({
    type: req.body.type,
    comment: req.body.comment,
    currency: req.body.currency,
    amount: req.body.amount
  });

  try {
    replenishment = await replenishment.save();
  } catch (e) {
    // TODO: Добавить функционал для более точного отображения сообщений о ошибках
    return res.status(500).send(e.message);
  }

  res.send(replenishment);
});

router.get('/', async (req, res) => {
  const replenishmentList = await Replenishment.find();

  if (replenishmentList) {
    res.send(replenishmentList);
  } else {
    res.status(500).json({success: false});
  }
});

router.get('/:id', async (req, res) => {
  const replenishment = await Replenishment.findById(req.params.id).populate('currency type');

  if (replenishment) {
    res.status(200).send(replenishment);
  } else {
    res.status(500).json({ message: 'Replenishment with given ID not found'})
  }
});

router.delete('/:id', (req, res) => {
  Replenishment.findByIdAndRemove(req.params.id).then(replenishment => {
    if (replenishment) {
      return res.status(200).json({success: true, message: 'Replenishment was deleted'});
    } else {
      return res.status(404).json({success: false, message: 'Replenishment not deleted'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, err})
  });
});

export { router };