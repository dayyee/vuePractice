<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile router :to="{ name: 'home' }" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router :to="{ name: 'users' }" exact>
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!--drawer는 data에 정의된 상태 변수로, 처음에는 null로 설정되어 있습니다. 
        
        drawer는 주로 Boolean 값(true 또는 false)으로 사용되며, 메뉴나 사이드바의 열림/닫힘 상태를 관리하는 데 사용됩니다.

        !drawer는 부정 연산자를 이용해 drawer의 현재 값을 반전시킵니다.
        예를 들어, drawer가 true라면 !drawer는 false가 되고, drawer가 false라면 !drawer는 true가 됩니다.
        
        따라서 drawer = !drawer는 drawer의 상태를 토글합니다. true였다면 false로, false였다면 true로 바꾸는 것이죠.-->
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  props: {
    source: String,
  },
};
</script>
