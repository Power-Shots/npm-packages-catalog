<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h3>Packges List</h3>
      </v-col>
      <v-col v-show="isLoading" cols="6">
        <div class="loading-container">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="20"
          ></v-progress-circular>
          <p class="loading">Loading...</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <PackagesDataGrid />
      </v-col>
    </v-row>
    <template v-if="isShowModal && selectedPackage">
      <PackageDetailModal
        :selectedPackage="selectedPackage"
        :open="true"
        @close-modal="onCloseModal"
      />
    </template>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PackageDetailModal from "@/components/modals/PackageDetailModal.vue";
import PackagesDataGrid from "@/components/PackagesDataGrid.vue";
import {
  PACKAGE_SET_IS_SHOW_MODAL_MUTATION,
  PACKAGE_SET_SELECTED_PACKAGE,
} from "@/store/modules/packagesModule";

const store = useStore();
const isLoading = computed(() => store.state.package.isLoading);
const isShowModal = computed(() => store.state.package.isShowModal);
const selectedPackage = computed(() => store.state.package.selectedPackage);

const onCloseModal = () => {
  store.commit(PACKAGE_SET_IS_SHOW_MODAL_MUTATION, false);
  store.commit(PACKAGE_SET_SELECTED_PACKAGE, null);
};
</script>

<style lang="scss" scoped>


.loading-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  .loading {
    text-align: right;
  }
}
</style>