import axios from "axios";

const ROOT_END_POINT = "https://data.jsdelivr.com/v1/";
const PACKAGE_NAMESPACED = "package/";

// mutations list
const SET_PACKAGES_MUTATION = "setPackages";
const SET_LOADING_MUTATION = "setLoading";
const SET_PAGE_MUTATION = "setPage";
const SET_TOTAL_PAGES_MUTATION = "setTotalPages";
const SET_SEARCH_QUERY_MUTATION = "setSearchQuery";
const SET_IS_SHOW_MODAL_MUTATION = "setIsShowModal";
const SET_SELECTED_PACKAGE = "setSelectedPackage";

//actions list
const GET_LIST_TOP_PACKAGES_ACTION = "getListTopPackages";
const GET_PACKAGE_BY_NAME_ACTION = "getPackageByName";

// mutations and actions with namespaced for export
export const PACKAGE_SET_PACKAGES_MUTATION =
  PACKAGE_NAMESPACED + SET_PACKAGES_MUTATION;
export const PACKAGE_SET_LOADING_MUTATION =
  PACKAGE_NAMESPACED + SET_LOADING_MUTATION;
export const PACKAGE_SET_PAGE_MUTATION = PACKAGE_NAMESPACED + SET_PAGE_MUTATION;
export const PACKAGE_SET_TOTAL_PAGES_MUTATION =
  PACKAGE_NAMESPACED + SET_PAGE_MUTATION;
export const PACKAGE_SET_SEARCH_QUERY_MUTATION =
  PACKAGE_NAMESPACED + SET_SEARCH_QUERY_MUTATION;
export const PACKAGE_SET_IS_SHOW_MODAL_MUTATION =
  PACKAGE_NAMESPACED + SET_IS_SHOW_MODAL_MUTATION;
export const PACKAGE_SET_SELECTED_PACKAGE =
  PACKAGE_NAMESPACED + SET_SELECTED_PACKAGE;

export const PACKAGE_GET_LIST_TOP_PACKAGES_ACTION =
  PACKAGE_NAMESPACED + GET_LIST_TOP_PACKAGES_ACTION;
export const PACKAGE_GET_PACKAGE_BY_NAME_ACTION =
  PACKAGE_NAMESPACED + GET_PACKAGE_BY_NAME_ACTION;

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
  [SET_PACKAGES_MUTATION] (state, packages) {
    state.packages = packages;
  },

  [SET_LOADING_MUTATION] (state, bool) {
    state.isLoading = bool;
  },
  [SET_PAGE_MUTATION] (state, page) {
    state.page = page;
  },
  [SET_TOTAL_PAGES_MUTATION] (state, totalPages) {
    state.totalPages = totalPages;
  },
  [SET_SEARCH_QUERY_MUTATION] (state, searchQuery) {
    state.searchQuery = searchQuery;
  },
  [SET_IS_SHOW_MODAL_MUTATION] (state, isShowModal) {
    state.isShowModal = isShowModal;
  },
  [SET_SELECTED_PACKAGE] (state, selectedPackage) {
    state.selectedPackage = selectedPackage;
  },
};

const actions = {
  async [GET_LIST_TOP_PACKAGES_ACTION] ({ state, commit }) {
    const url = `${ROOT_END_POINT}stats/packages`;
    try {
      commit(SET_LOADING_MUTATION, true);
      const response = await axios.get(url, {
        params: {
          page: state.page,
          limit: state.limit,
          type: "npm",
        },
      });

      if (response.data && response.headers) {
        commit(SET_PACKAGES_MUTATION, response.data ?? []);
        commit(
          SET_TOTAL_PAGES_MUTATION,
          +(response.headers["x-total-pages"] ?? 0)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit(SET_LOADING_MUTATION, false);
    }
  },

  async [GET_PACKAGE_BY_NAME_ACTION] ({ commit }, packageName) {
    const url = `${ROOT_END_POINT}packages/npm/${packageName}`;
    try {
      commit(SET_LOADING_MUTATION, true);
      const response = await axios(url);
      if (response.data) {
        commit(SET_SELECTED_PACKAGE, response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit(SET_LOADING_MUTATION, false);
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
