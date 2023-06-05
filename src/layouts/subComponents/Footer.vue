<template>
  <footer>
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          <h5>Created by Alexey Zhidkov @{{ new Date().getFullYear() }}</h5>
        </v-col>
        <v-col cols="6">
          <div class="contact-info">
            <h6>Contacts</h6>
            <template v-for="link in contactLinks">
              <a :href="link.href" target="_blank">{{ link.name }}</a>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script setup>
const contactLinks = [
  {
    id: 1,
    href: "https://github.com/Power-Shots",
    name: "GIT",
  },
];
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
footer {
  min-height: 100px;
  background: $background-gray900;
  display: flex;
  padding: 12px 0;
  justify-content: space-between;

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 16px;
  }
  a {
    font-size: 14px;
    font-weight: 700;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
