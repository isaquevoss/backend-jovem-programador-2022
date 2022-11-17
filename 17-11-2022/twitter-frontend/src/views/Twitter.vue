<template>
  <v-card>
    <v-card-title>Twitter</v-card-title>
    <v-card-text>
      <v-textarea
        v-model="mensagem"
        filled
        label="Nos conte sua brilante opnião"
      ></v-textarea>
      <v-btn @click="publicar">publicar</v-btn>
      <v-row v-for="post in posts" :key="post.id">
        <v-col>
          <v-chip>{{ ` ${post.message} criado em ${post.createdAt} ` }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      posts: [],
      mensagem: '',
    };
  },
  async mounted() {
    this.buscarPosts();
  },
  methods: {
    async buscarPosts() {
      const resposta = await axios.get('http://localhost:3000/posts');
      this.posts = resposta.data;
    },
    async publicar() {
      const resposta = await axios.post('http://localhost:3000/posts', {
        message: this.mensagem,
      });
      this.mensagem = '';
      console.log(resposta.data);
      this.buscarPosts();
    },
  },
};
</script>
