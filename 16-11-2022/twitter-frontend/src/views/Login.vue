<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <v-col cols="10" sm="6">
        <v-card>
          <v-card-title> Login </v-card-title>
          <v-card-text>
            <v-text-field label="E-mail" v-model="email"> </v-text-field>
            <v-text-field label="Senha" v-model="password"> </v-text-field>
            <v-btn @click="registrar">Registrar</v-btn>
            <v-btn @click="entrar">Entrar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  mounted() {
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
  },
  methods: {
    async entrar() {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      const resposta = await axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password,
      });

      axios.defaults.headers['Authorization'] = resposta.data.token;

      this.$router.push('twitter');
    },
    registrar() {
      this.$router.push('/registro');
    },
  },
};
</script>
