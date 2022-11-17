<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-text-field label="Nome" v-model="usuario.nome"></v-text-field>
          <v-text-field label="Email" v-model="usuario.email"></v-text-field>
          <v-text-field
            type="password"
            label="Senha"
            v-model="usuario.senha"
          ></v-text-field>
          <v-btn @click="gravar">Cadastrar</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      usuario: {},
    };
  },
  methods: {
    async gravar() {
      const resposta = await axios.post('http://localhost:3000/users', {
        name: this.usuario.nome,
        email: this.usuario.email,
        password: this.usuario.senha,
      });
      console.log(resposta.data);
      this.$router.push('/login');
    },
  },
};
</script>
