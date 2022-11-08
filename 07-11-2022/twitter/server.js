const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db',
});

const app = express();

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
    const token = Buffer.from(JSON.stringify(user)).toString('base64');
    res.json({
      accessToken: token,
    });
  } else {
    res.status(401).json({ message: 'falha no login' });
  }
});

app.use(async (req, res, next) => {
  const userAuth = JSON.parse(
    Buffer.from(req.headers.authorization, 'base64').toString()
  );
  const user = await User.findOne({
    where: {
      email: userAuth.email,
      password: userAuth.password,
      id: userAuth.id,
    },
  });
  if (user) {
    next();
  } else {
    res.status(401).json({
      message: 'usuário não está logado',
    });
  }
});

app.post('/posts', async (req, res) => {
  const userAuth = JSON.parse(
    Buffer.from(req.headers.authorization, 'base64').toString()
  );
  const post = new Post();
  post.message = req.body.message;
  post.userId = userAuth.id;
  await post.save();
  res.json(post);
});

app.listen(3000, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('app is running');
});
