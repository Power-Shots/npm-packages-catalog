import axios from "axios";
import { ref, isRef,  watchEffect } from "vue";

export const useFetch = (url = "", options = {}) => {
  const data = ref(null);
  const error = ref(null);

  const doFetch = async () => {
    data.value = null;
    error.value = null;
    const response = await axios.get(url, {
      ...options,
    });
    data.value = response.data;
    error.value = response.error;
  };

  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }
  console.log(data)
  return { data, error };
};
