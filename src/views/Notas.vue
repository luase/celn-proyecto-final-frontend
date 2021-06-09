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
    <form @submit.prevent="agregarNota()" v-if="agregar">
      <h2 class="text-center">agregar nueva nota</h2>
      <input
        type="text"
        placeholder="ingresa un nombre"
        class="form-control my-2"
        v-model="nota.nombre"
      />
      <input
        type="text"
        placeholder="ingresa la descripción"
        class="form-control my-2"
        v-model="nota.description"
      />
      <b-button type="submit" class="btn-sm btn-block btn-success"
        >agregar</b-button
      >
    </form>
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
      nota: {},
      agregar: true,
    };
  },
  created() {
    this.listarNotas();
  },
  methods: {
    listarNotas() {
      this.axios
        .get("/notas")
        .then((res) => {
          this.notas = res.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },
    agregarNota() {
      this.axios
        .post("/nota-nueva", this.nota)
        .then((res) => {
          this.notas.push(res.data);
          this.nota.nombre = "";
          this.nota.description = "";

          this.mensaje.texto = "nota registrada";
          this.mensaje.color = "success";
          this.showAlert();
        })
        .catch((e) => {
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.error.errors.nombre.message;
          this.showAlert();
        });
      this.notas = {};
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
