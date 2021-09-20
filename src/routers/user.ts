import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models';

const router = express.Router();

const salt = bcrypt.genSaltSync(13);
const tokenSecret = process.env.tokenSecret;

router.get('/', async (req, res) => {
  const userList = await User.find().select('-passwordHash');

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');

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
    passwordHash: bcrypt.hashSync(req.body.password, salt)
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

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send('User with such email not found');
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign({
      userId: user.id
    },
    tokenSecret,
    {
      expiresIn: '1w'
    }
    );

    res.status(200).send({user, token});
  } else {
    res.status(400).send('Password is wrong')
  }
});

router.post('/register', async (req, res) => {
  let user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, salt)
  });
  user = await user.save();

  if (!user) {
    return res.status(400).send({ success: false });
  }

  res.status(200).send({ success: true });
});

export { router };
