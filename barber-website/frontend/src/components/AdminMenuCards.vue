<template>
  <div>
    <v-item-group mandatory class="mt-n4">
      <v-row justify="center">
        <v-col cols="12" md="2" v-for="items in menuItems" :key="items.title">
          <v-item v-slot="{ active, toggle }">
            <v-card
              :color="active ? '#999999' : 'white'"
              class="d-flex align-center rounded-xl"
              dark
              height="200"
              @click="toggle"
              @click.stop="onCardMenuSelect(items.title)"
            >
              <v-row>
                <v-col cols="12" sm="12">
                  <v-list-item three-line class="mt-10">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-icon x-large :color="active ? 'white' : '#999999'">{{
                          items.icon
                        }}</v-icon>
                      </div>
                      <v-list-item-subtitle
                        :class="active ? 'white--text' : 'black--text'"
                        >{{ items.title }}</v-list-item-subtitle
                      >
                      <v-list-item-title
                        class="headline mb-1"
                        :class="active ? 'white--text' : 'black--text'"
                      >
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script>
import {
  mdiImage,
  mdiCalendar,
  mdiAccountGroupOutline,
  mdiAccountEdit,
} from "@mdi/js";

export default {
  name: "AdminMenuCards",
  data() {
    return {
      menuItems: [
        { title: "BARBERS", icon: mdiAccountGroupOutline },
        { title: "EDIT FAQs", icon: mdiAccountEdit },
        { title: "APPOINTMENTS", icon: mdiCalendar },
        { title: "PRODUCTS", icon: mdiImage },
        { title: "BARBER`S AVAILABILITY", icon: mdiCalendar },
      ],
      menuItemSelected: "",
    };
  },
  methods: {
    onCardMenuSelect(menuItem) {
      this.menuItemSelected = menuItem;
      this.$emit("theMenuItem", this.menuItemSelected);
    },
  },
  mounted() {
    if (!this.menuItemSelected) {
      this.menuItemSelected = "BARBERS";
      this.$emit("theMenuItem", this.menuItemSelected);
    }
  },
};
</script>
