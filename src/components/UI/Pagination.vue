<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    rounded="4"
    :total-visible="7"
  ></v-pagination>
</template>

<script setup>
import { ref, watch } from "vue";
const { page, totalPages } = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["changePage"]);
const currentPage = ref(page);

watch(currentPage, (currentPage) => {
  emit("changePage", currentPage);
});
</script>

<style lang="scss" scoped></style>
