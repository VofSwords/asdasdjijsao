<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <v-layout class="h-100">
    <v-app-bar>
      <template v-slot:prepend>
        <NuxtLink to="/" class="logo"> 💯 </NuxtLink>
      </template>
      <v-spacer />
      <nav>
        <v-row>
          <v-spacer />
          <v-col>
            <v-btn-toggle
              v-model="route.path"
              color="deep-purple-accent-3"
              rounded="0"
              group
            >
              <NuxtLink to="/" class="logo">
                <v-btn value="/" class="h-75"> Settings </v-btn>
              </NuxtLink>
              <NuxtLink to="/order-book" class="logo">
                <v-btn value="/order-book" class="h-75"> Order book </v-btn>
              </NuxtLink>
            </v-btn-toggle>
          </v-col>
          <v-spacer />
        </v-row>
      </nav>
      <v-spacer />
    </v-app-bar>
    <v-main class="h-100 overflow-hidden">
      <div class="h-100 w-100 d-flex justify-center align-start pa-8">
        <NuxtPage />
      </div>
    </v-main>
  </v-layout>
</template>

<style>
body {
  height: 100dvh;
}

#__nuxt {
  height: 100%;
}
.logo {
  font-size: 24px;
  text-decoration: none;
}
</style>
