<template>
  <v-dialog
    v-model="isOpen"
    max-width="400px"
    width="100%"
    transition="dialog-top-transition"
  >
    <v-card class="card">
      <v-card-title class="card-title">
        {{ selectedPackage.name.toUpperCase() }}
      </v-card-title>
      <div class="content">
        <div class="info-item">
          <v-card-subtitle class="card-subtitle">Type</v-card-subtitle>
          <v-card-text> type: {{ selectedPackage.type }} </v-card-text>
        </div>
        <div class="info-item">
          <v-card-subtitle class="card-subtitle">Versions</v-card-subtitle>
          <v-card-text
            class="info-item-text"
            v-for="(value, key) in selectedPackage.tags"
          >
            {{ key }}: <span :class="key">{{ value }}</span>
          </v-card-text>
        </div>
        <div class="info-item">
          <v-card-subtitle class="card-subtitle">Links</v-card-subtitle>
          <div
            v-for="(value, key) in selectedPackage.links"
            class="link-container"
          >
            <v-card-text class="info-item-text">
              <a :href="value">{{ key }}</a>
            </v-card-text>
          </div>
        </div>
        <v-card-actions class="close-btn-container">
          <v-btn
            @click="isOpen = false"
            density="compact"
            icon="mdi-close"
          ></v-btn
        ></v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
const { open, selectedPackage } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  selectedPackage: {
    type: Object,
    required: true,
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
  padding: 12px;
  position: relative;
  div {
    padding: 0;
  }

  .close-btn-container {
    position: absolute;
    top: 0px;
    right: 12px;
    z-index: 2;

    button {
      border-radius: $border-radius-small;
      transition: all 0.2s linear;
      &:hover {
        transform: rotate(180deg);
      }
    }
  }
  .card-title {
    text-align: center;
    margin-bottom: 12px;
  }
  .content {
    display: flex;
    flex-direction: column;

    .card-subtitle {
      margin-bottom: 4px;
      font-size: 20px;
    }

    .info-item {
      margin-bottom: 12px;
      .info-item-text {
        span {
          font-weight: 700;
          color: $text-color-warning;
          &[class^="latest"] {
            color: $text-color-success;
          }
          &[class^="beta"] {
            color: $text-color-warning;
          }
          &[class^="next"] {
            color: $text-color-danger;
          }
        }
      }

      .link-container {
      }
    }
  }
}
</style>
