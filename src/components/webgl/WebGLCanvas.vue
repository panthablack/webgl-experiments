<template>
  <canvas
    :id="getCanvasID"
    width="640"
    height="480"
  ></canvas>
</template>

<script setup lang="ts">
import { computed, onMounted, type ComputedRef } from 'vue'
import { DEFAULT_CANVAS_ID } from '@/config/constants/webgl'

const props = defineProps<{
  canvasID?: string
  onMountedCallback?: Function
}>()

const emit = defineEmits(['canvas-mounted'])

const getCanvasID: ComputedRef<string> = computed(() => props.canvasID || DEFAULT_CANVAS_ID)

onMounted(() => {
  const canvas = document.getElementById(getCanvasID.value)
  if (props.onMountedCallback) props.onMountedCallback(canvas)
  emit('canvas-mounted', canvas)
})
</script>