<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h3>Packges List</h3>
      </v-col>
      <v-col v-show="isLoading" cols="6">
        <p class="loading">Loading...</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <PackagesDataGrid />
      </v-col>
    </v-row>
    <template v-if="isShowModal">
      <PackageDetailModal :open="true" @close-modal="onCloseModal" />
    </template>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import PackageDetailModal from "../../components/modals/PackageDetailModal.vue";
import PackagesDataGrid from "../../components/PackagesDataGrid.vue";
import {
  packages_namespaced,
  packages_setIsShowModal_mutation,
} from "../../store/modules/packagesModule";

const store = useStore();
const isLoading = computed(() => store.state.package.isLoading);
const isShowModal = computed(() => store.state.package.isShowModal);

const onCloseModal = () => {
  store.commit(packages_namespaced + packages_setIsShowModal_mutation, false);
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: right;
}
</style>
