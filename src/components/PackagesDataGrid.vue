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
        v-for="item in searchedPackages"
        :key="item.id"
      >
        <td>{{ item.name.toUpperCase() }}</td>
        <td>{{ item.bandwidth }}</td>
        <td>{{ item.hits }}</td>
      </tr>
    </tbody>
  </v-table>
  <p v-show="searchedPackages.lenght === 0" class="no-found">No data found</p>
  <Pagination
    :page="page"
    :total-pages="totalPages"
    @change-page="handleChangePage"
  />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Pagination from "./UI/Pagination.vue";
import {
  PACKAGE_GET_PACKAGE_BY_NAME_ACTION,
  PACKAGE_SET_IS_SHOW_MODAL_MUTATION,
  PACKAGE_SET_PAGE_MUTATION,
  PACKAGE_SEARCHED_PACKAGES_GETTER,
  PACKAGE_GET_LIST_TOP_PACKAGES_ACTION,
} from "@/store/modules/packagesModule";
import { PACKAGE_SET_SEARCH_QUERY_MUTATION } from "../store/modules/packagesModule";

const store = useStore();
const searchedPackages = computed(() => {
  return store.getters[PACKAGE_SEARCHED_PACKAGES_GETTER];
});
const page = computed(() => store.state.package.page);
const totalPages = computed(() => store.state.package.totalPages);

const handleChangePage = (newPage) => {
  store.commit(PACKAGE_SET_PAGE_MUTATION, newPage);
  store.commit(PACKAGE_SET_SEARCH_QUERY_MUTATION, "");
  store.dispatch(PACKAGE_GET_LIST_TOP_PACKAGES_ACTION);
};

const handleOpenModal = () => {
  store.commit(PACKAGE_SET_IS_SHOW_MODAL_MUTATION, true);
};

const getDetailPackageInfo = (packageName) => {
  handleOpenModal();
  store.dispatch(PACKAGE_GET_PACKAGE_BY_NAME_ACTION, packageName);
};

onMounted(() => {
  store.dispatch(PACKAGE_GET_LIST_TOP_PACKAGES_ACTION);
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
    transition: all 0.2s linear;
    &:hover {
      background: $background-gray800;
    }
  }
}

.no-found {
  text-align: center;
  font-size: 24px;
  margin: 12px auto;
}
</style>
