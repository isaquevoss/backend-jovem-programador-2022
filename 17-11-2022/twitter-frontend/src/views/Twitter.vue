<template>
  <v-card>
    Twitter
    <v-row v-for="post in posts" :key="post.id">
      <v-col>
        <v-chip>{{ ` ${post.message} criado em ${post.createdAt} ` }}</v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    const resposta = await axios.get('http://localhost:3000/posts');
    this.posts = resposta.data;
  },
};
</script>
