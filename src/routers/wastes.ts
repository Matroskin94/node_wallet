import express from 'express';

import { Currency, Waste, WasteType } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
  const wasteType = await WasteType.findById(req.body.type);
  const currency = await Currency.findById(req.body.currency);
  if (!wasteType) {
    return res.status(400).send('Invalid waste type');
  }
  if (!currency) {
    return res.status(400).send('Invalid currency');
  }

  let waste = new Waste({
    type: req.body.type,
    name: req.body.name,
    comment: req.body.comment,
    currency: req.body.currency,
    amount: req.body.amount
  });

  try {
    waste = await waste.save();
  } catch (e) {
    // TODO: Добавить функционал для более точного отображения сообщений о ошибках
    return res.status(500).send(e.message);
  }

  res.send(waste);
});

router.get('/', async (req, res) => {
  const wasteList = await Waste.find();

  if (wasteList) {
    res.send(wasteList);
  } else {
    res.status(500).json({success: false});
  }
});

router.get('/:id', async (req, res) => {
  const waste = await Waste.findById(req.params.id).populate('currency type');

  if (waste) {
    res.status(200).send(waste);
  } else {
    res.status(500).json({ message: 'Waste type with given ID not found'})
  }
});

router.delete('/:id', (req, res) => {
  Waste.findByIdAndRemove(req.params.id).then(waste => {
    if (waste) {
      return res.status(200).json({success: true, message: 'waste was deleted'});
    } else {
      return res.status(404).json({success: false, message: 'waste not deleted'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, err})
  });
});

export { router };