import express from 'express';

import { Currency } from '../models';

const router = express.Router();

router.post('/', (req, res) => {
  const currency = new Currency({
    name: req.body.name,
    code: req.body.code
  });

  currency
    .save()
    .then(( createdCurrency ) => {
      res.status(201).json(createdCurrency);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false
      })
    });
});

router.get('/', async (req, res) => {
  const currencyList = await Currency.find();

  if (currencyList) {
    res.send(currencyList);
  } else {
    res.status(500).json({success: false});
  }
});

router.get('/:id', async (req, res) => {
  const currency = await Currency.findById(req.params.id);

  if (currency) {
    res.status(200).send(currency);
  } else {
    res.status(500).json({ message: 'Currency with given ID not found'})
  }
});

router.delete('/:id', (req, res) => {
  Currency.findByIdAndRemove(req.params.id).then(currency => {
    if (currency) {
      return res.status(200).json({success: true, message: 'Currency was deleted'});
    } else {
      return res.status(404).json({success: false, message: 'Currency not deleted'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, err})
  });
});

router.put('/:id', async (req, res) => {
  const updatedCurrency = await Currency.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    code: req.body.code
  });

  if (updatedCurrency) {
    res.status(200).send(updatedCurrency);
  } else {
    res.status(500).json({
      message: 'Currency did not update',
      success: false
    });
  }
});

export { router };