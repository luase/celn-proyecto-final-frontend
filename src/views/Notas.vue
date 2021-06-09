<template>
  <div class="container">
    <h1>notas</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.text }}
    </b-alert>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">nombre</th>
          <th scope="col">descripción</th>
          <th scope="col">fecha</th>
          <th scope="col">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item._id }}</th>
          <th>{{ item.nombre }}</th>
          <th>{{ item.description }}</th>
          <th>{{ item.date }}</th>
          <td>
            <b-button
              class="btn-warning btn-sm mx-2"
              @click="editarNota(item._id)"
              >actualizar</b-button
            >
            <b-button
              class="btn-danger btn-sm mx-2"
              @click="eliminarNota(item._id)"
              >eliminar</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Notas",
  data() {
    return {
      notas: [],
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  created() {
    this.listarNotas();
  },
  methods: {
    listarNotas() {
      this.axios
        .get("notas")
        .then((res) => {
          this.notas = res.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style scoped></style>
