const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Sequelize, DataTypes } = require('sequelize');

const jwt = require('jsonwebtoken');
const senhaSecreta = '123456789asdf';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db',
});

const app = express();
app.use(cors());

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Post = sequelize.define('post', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Post);

app.use(bodyParser.json());
app.use(cors());

app.post('/users', async (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  res.json(user);
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(401).json({ message: 'falha no login' });
  }
  if (user.password === req.body.password) {
    const token = jwt.sign(
      {
        user,
      },
      senhaSecreta,
      {
        expiresIn: 3600,
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'falha no login' });
  }
});

app.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, senhaSecreta);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
//antes de tudo rodar npm install jsonwebtoken

app.post('/posts', async (req, res) => {
  const userAuth = jwt.decode(req.headers.authorization).user;
  const post = new Post();
  post.message = req.body.message;
  post.userId = userAuth.id;
  await post.save();
  res.json(post);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

app.listen(3000, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('app is running');
});
