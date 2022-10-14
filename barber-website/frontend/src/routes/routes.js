import HomePage from "../home/HomePage.vue";
import ProfilePage from "../profile/MainPage.vue";
import AdminPage from "../admin/AdminPage.vue";
import GalleryPage from "../gallery/GalleryPage.vue";
import AppointmentPage from "../appointment/AppointmentPage.vue";
import BarbersManagementPage from "../admin/BarbersManagementPage.vue";


export default [
  { path: "/", component: HomePage },
  {
    path: "/profile", component: ProfilePage, children: [
      { path: "", component: ProfileForm },
      { path: "orders", component: OrdersList },
      { path: "appointments", component: Appointment },
      { path: "availabilities", component: Availabilities },
      { path: "changepassword", component: ChangePassword },
    ]
  },
  { path: "/admin", component: AdminPage },
  { path: "/gallery", component: GalleryPage },
  { path: "/appointment", component: AppointmentPage },

];
