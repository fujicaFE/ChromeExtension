<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const copyAPI = () => {
  console.log(`output->123`, 123)
}

</script>

<template>
  <div class="cc-tag" @click="copyAPI">Copy</div>
</template>

<style scoped>
.cc-tags {
  color: #ff0;
}
</style>
