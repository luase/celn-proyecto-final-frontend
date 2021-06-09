<template>
  <div class="container">
    <h1>notas</h1>
    <!--    alerta-->
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChange"
    >
      {{ mensaje.texto }}
    </b-alert>
    <!--    form para editar una nota-->
    <form @submit.prevent="editarNota()" v-if="!agregar">
      <h2 class="text-center">editar nota</h2>
      <input
        type="text"
        class="form-control my-2"
        v-model="notaEditar.nombre"
      />
      <input
        type="text"
        class="form-control my-2"
        v-model="notaEditar.description"
      />
      <b-button class="btn-warning my-2 mx-2" type="submit">confirmar</b-button>
      <b-button class="my-2" type="submit" @click="agregar = true"
        >cancelar</b-button
      >
    </form>
    <!--    form para agregar una nota-->
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
      <b-button class="btn-sm btn-block btn-success" type="submit">
        agregar
      </b-button>
    </form>
    <!--    tabla de notas-->
    <table class="table">
      <!--      cabecera-->
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">nombre</th>
          <th scope="col">descripción</th>
          <th scope="col">fecha</th>
          <th scope="col">acciones</th>
        </tr>
      </thead>
      <!--      datos-->
      <tbody>
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item._id }}</th>
          <th>{{ item.nombre }}</th>
          <th>{{ item.description }}</th>
          <th>{{ item.date }}</th>
          <td>
            <b-button
              class="btn-warning btn-sm mx-2"
              @click="activarEdition(item._id)"
            >
              actualizar
            </b-button>
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
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
      notas: [],
      nota: {
        nombre: "",
        description: "",
      },
      agregar: true,
      notaEditar: {},
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
      if (this.nota.nombre === "" || this.nota.description === "") {
        this.mensaje.texto = "ingresa los datos de la nota";
        this.mensaje.color = "danger";
        this.showAlert();
      } else {
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
            this.mensaje.texto = "error registrando la nota";
            this.mensaje.color = "danger";
            this.showAlert();
            console.log(e);
          });
      }
    },
    eliminarNota(id) {
      this.axios
        .delete(`notas/${id}`)
        .then((res) => {
          const index = this.notas.findIndex(
            (item) => item._id === res.data._id
          );
          this.notas.splice(index, 1);

          this.showAlert();
          this.mensaje.texto = "nota eliminada";
          this.mensaje.color = "success";
        })
        .catch((e) => {
          console.log(e);
          this.mensaje.texto = "ocurrió un error al eliminar esta nota";
          this.mensaje.color = "danger";
          this.showAlert();
        });
    },
    editarNota() {
      this.axios
        .put(`notas/${this.notaEditar._id}`, this.notaEditar)
        .then((res) => {
          const index = this.notas.findIndex((n) => n._id === res.data._id);
          this.notas[index].nombre = res.data.nombre;
          this.notas[index].description = res.data.description;
          this.notaEditar.nombre = "";
          this.notaEditar.description = "";
          this.agregar = true;
          this.mensaje.texto = "nota actualizada";
          this.mensaje.color = "success";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e);
          this.nota.nombre = "";
          this.nota.description = "";
          this.mensaje.texto = "error al actualizar nota";
          this.mensaje.color = "danger";
          this.showAlert();
        });
    },
    activarEdition(id) {
      this.agregar = false;
      this.axios
        .get(`notas/${id}`)
        .then((res) => {
          this.notaEditar = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    countDownChange(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style scoped></style>
