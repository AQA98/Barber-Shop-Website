<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          lg="3"
          md="4"
          sm="6"
          xs="12"
          justify="space-around"
          v-for="barber in barbers"
          :key="barber.index"
          class="pa-10 mb-5"
        >
          <div
            :style="{
              'background-image': 'url(/images/avatar.svg)',
              height: '100px',
            }"
          ></div>
          <v-card class="d-flex1 align-center1 rounded-xl" height="200">
            <v-img
              height="200px"
              :src="
                barber.picturelink ? barber.picturelink : '/images/avatar.svg'
              "
              v-if="1"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-content>
                          <v-list-item-title
                            @click="
                              selectedAction(item.optionID, barber.userid)
                            "
                          >
                            {{ item.title }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-app-bar>
              <div
                class="barber-name"
                style="margin-right: auto; margin-left: auto;"
              >
                {{ barber.firstname }}
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn @click="getAllBarbers()" class="white--text mb-15">
            <SignUp @BarberCreated="getAllBarbers()"> Add Account </SignUp>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SignUp from "../components/SignUp.vue";
import BarbersAccount from "@/services/user";

export default {
  components: { SignUp },
  name: "BarbersManagementPage",
  data() {
    return {
      items: [{ title: "Delete User", optionID: 1 }],
      offset: true,
      barbers: [],
    };
  },
  methods: {
    selectedAction(optionID, barberID) {
      if (optionID == 1) {
        this.deleteBarber(barberID);
      }
    },
    async getAllBarbers() {
      try {
        const data = await BarbersAccount.getAllUsers();
        var users = data.data;
        this.barbers = this.extractBarbersFromUsersList(users);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    },
    async deleteBarber(barberId) {
      console.log("barberid", barberId);
      try {
        await BarbersAccount.deleteAccount({ UserID: barberId });
        this.getAllBarbers();
      } catch (error) {
        console.log(error);
      }
    },
    extractBarbersFromUsersList(user) {
      var barberList = [];
      for (var i = 0; i < user.length; i++) {
        if (user[i].userrole == "Barber") {
          barberList.push(user[i]);
        } else continue;
      }
      return barberList;
    },
  },
  created: function() {
    this.getAllBarbers();
  },
};
</script>
<style>
.barber-name {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 6px 0;
  color: white;
}
</style>
