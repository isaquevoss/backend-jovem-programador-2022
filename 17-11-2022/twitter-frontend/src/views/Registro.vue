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
          <v-btn>Cadastrar</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      usuario: {},
    };
  },
};
</script>
