<template>
  <v-dialog
    v-model="isOpen"
    max-width="400px"
    width="100%"
    transition="dialog-bottom-transition"
  >
    <v-card class="card">
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
const { open } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const isOpen = ref(open);

const emit = defineEmits(["closeModal"]);

watch(isOpen, () => {
  emit("closeModal");
});
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

.card {
  background-color: $background-gray800;
  color: $text-color-light-gray;
}
</style>
