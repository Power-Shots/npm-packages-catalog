<template>
  <header>
    <v-container>
      <v-row no-gutters>
        <v-col cols="8"><h1>Packges App</h1> </v-col>
        <v-col cols="4">
          <v-form
            @submit.prevent="
              {
              }
            "
            class="search-from"
          >
            <v-text-field
              v-model.trim="search"
              density="compact"
              label="Packge name"
            ></v-text-field>
            <v-btn type="submit">Search</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

header {
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  background: $background-gray900;

  .search-from {
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    button {
      height: 43px;
    }
  }
}
</style>
