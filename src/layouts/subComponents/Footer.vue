<template>
  <footer>
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          Created by Alexey Zhidkov @{{ new Date().getFullYear() }}
        </v-col>
        <v-col cols="6">
          <v-flex></v-flex>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
footer {
  min-height: 100px;
  background: $background-gray900;
  display: flex;
  align-items: center;
}
</style>
