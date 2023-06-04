<template>
  <v-table class="packges-table" fixed-header max-height="700px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Bandwidth</th>
        <th class="text-left">Hits</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="row"
        @click="getDetailPackageInfo(item.name)"
        v-for="item in packages"
        :key="item.id"
      >
        <td>{{ item.name.toUpperCase() }}</td>
        <td>{{ item.bandwidth }}</td>
        <td>{{ item.hits }}</td>
      </tr>
    </tbody>
  </v-table>
  <Pagination
    :page="page"
    :total-pages="totalPages"
    @change-page="handleChangePage"
  />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  packages_namespaced,
  packages_getListTopPackages_action,
  packages_setPage_mutation,
  packages_setIsShowModal_mutation,
} from "@/store/modules/packagesModule";
import Pagination from "./UI/Pagination.vue";
import { packages_getPackageByName_action } from "../store/modules/packagesModule";

const store = useStore();
const packages = computed(() => store.state.package.packages);
const page = computed(() => store.state.package.page);
const totalPages = computed(() => store.state.package.totalPages);

const handleChangePage = (newPage) => {
  store.commit(packages_namespaced + packages_setPage_mutation, newPage);
  store.dispatch(packages_namespaced + packages_getListTopPackages_action);
};

const handleOpenModal = () => {
  store.commit(packages_namespaced + packages_setIsShowModal_mutation, true);
};

const getDetailPackageInfo = (packageName) => {
  console.log(packageName);
  handleOpenModal();
  store.dispatch(packages_namespaced + packages_getPackageByName_action, packageName)
};

onMounted(() => {
  store.dispatch(packages_namespaced + packages_getListTopPackages_action);
});
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
.packges-table {
  width: 100%;
  background: $background-gray900;
  border-radius: $border-radius-small;

  th {
    background: $background-gray800 !important;
    color: $text-color-light-gray !important;
  }
  td {
    color: $text-color-light-gray !important;
  }

  .row {
    cursor: pointer;
  }
}
</style>
