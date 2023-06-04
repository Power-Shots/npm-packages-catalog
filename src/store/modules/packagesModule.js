import axios from "axios";

const rootEndpoint = "https://data.jsdelivr.com/v1/";
export const packages_namespaced = "package/";

// mutations list
export const packages_setPackages_mutation = "setPackages";
export const packages_setLoading_mutation = "setLoading";
export const packages_setPage_mutation = "setPage";
export const packages_setTotalPages_mutation = "setTotalPages";
export const packages_setSearchQuery_mutation = "setSearchQuery";
export const packages_setIsShowModal_mutation = "setIsShowModal";
export const packages_setSelectedPackage = "setSelectedPackage";

//actions list
export const packages_getListTopPackages_action = "getListTopPackages";
export const packages_getPackageByName_action = "getPackageByName";

const state = {
  selectedPackage: null,
  packages: [],
  page: 1,
  limit: 10,
  searchQuery: "",
  isLoading: false,
  totalPages: 0,
  isShowModal: false,
};

const getters = {};

const mutations = {
  setPackages(state, packages) {
    state.packages = packages;
  },

  setLoading(state, bool) {
    state.isLoading = bool;
  },
  setPage(state, page) {
    state.page = page;
  },
  setTotalPages(state, totalPages) {
    state.totalPages = totalPages;
  },
  setSearchQuery(state, searchQuery) {
    state.searchQuery = searchQuery;
  },
  setIsShowModal(state, isShowModal) {
    console.log(isShowModal);
    state.isShowModal = isShowModal;
  },
  setSelectedPackage(state, selectedPackage) {
    state.selectedPackage = selectedPackage;
  },
};

const actions = {
  async getListTopPackages({ state, commit }) {
    const url = `${rootEndpoint}stats/packages`;
    try {
      commit(packages_setLoading_mutation, true);
      const response = await axios.get(url, {
        params: {
          page: state.page,
          limit: state.limit,
          type: "npm",
        },
      });

      if (response.data && response.headers) {
        commit(packages_setPackages_mutation, response.data ?? []);
        commit(
          packages_setTotalPages_mutation,
          +(response.headers["x-total-pages"] ?? 0)
        );
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      commit(packages_setLoading_mutation, false);
    }
  },

  async getPackageByName({ commit }, packageName) {
    const url = `${rootEndpoint}packages/npm/${packageName}`;
    try {
      commit(packages_setLoading_mutation, true);
      const response = await axios(url);
      if(response.data) {
        commit(packages_setSelectedPackage, response.data ?? []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit(packages_setLoading_mutation, false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
