<template>
  <v-container class="mx-auto my-auto" fluid>
    <v-row class="slideshow-sec">
      <v-col cols="12" align="right">
        <v-card class="rounded-lg pa-4 text-center glass" width="290px" :elevation="25">
          Barbershop Current Status: <strong>{{ status }}</strong> <br />
          Next Availability: <strong>{{ nextAvailability }}</strong>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["status", "nextAvailability"],
  methods: {
    bookNow() {
      this.$router.push("/appointment");
    },
  },
};
</script>
<style>
.slideshow-sec {
  background:rgb(0,0,0) url("/images/barbershop.gif") no-repeat;
  background-position: center;
  background-size: contain;
  height: 650px;
}
.book-now-btn {
  padding: 1rem 2.7rem;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  background: #96baff;
  border: 3px solid #121212;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 5px 5px 0px #000000;
}
.glass{
  background-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  border: 2px solid white !important;
}
</style>
