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

export { router };