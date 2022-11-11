<template>
  <main>
    <div>
      <input type="text" v-model="user" />
      <input type="password" v-model="password" />

      <button @click="login">Login</button>

      <button @click="buscarPosts">posts</button>

      <table style="border: 1px solid black">
        <tr
          style="border: 1px solid black"
          v-for="post in posts"
          :key="post.id"
        >
          <td style="border: 1px solid black">{{ post.message }}</td>
          <td style="border: 1px solid black">{{ post.createdAt }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: 'joão@senac.sc.com.br',
      password: 'isaque123',
      posts: '',
    };
  },
  methods: {
    async login() {
      console.log(this.user, this.password);
      const resposta = await axios.post('http://localhost:3000/login', {
        email: this.user,
        password: this.password,
      });
      localStorage.setItem('token', resposta.data.token);
      console.log(resposta.data);
    },
    async buscarPosts() {
      const resposta = await axios.get('http://localhost:3000/posts', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      console.log(resposta.data);
      this.posts = resposta.data;

      this.post.foreach((item) => {
        item.message = 'mensagem: ' + item.message;
      });
    },
  },
};
</script>
