import express from 'express';

import { User } from '../models';

const router = express.Router();

router.get('/', async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(500).json({ message: 'User with given ID not found'})
  }
});

router.post('/', async (req, res) => {
  let user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    passwordHash: req.body.password
  });
  user = await user.save();

  if (!user) {
    return res.status(400).send({ success: false });
  }

  res.status(200).send({ success: true });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).then(user => {
    if (user) {
      return res.status(200).json({success: true, message: 'User was deleted'});
    } else {
      return res.status(404).json({success: false, message: 'User not deleted'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, err})
  });
});

export { router };
