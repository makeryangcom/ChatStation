<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'radix-vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'vertical',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="
      cn('flex touch-none select-none transition-colors scrollbar-box',
         orientation === 'vertical'
           && 'h-full w-2.5 border-l border-l-transparent p-px scrollbar-box',
         orientation === 'horizontal'
           && 'h-2.5 flex-col border-t border-t-transparent p-px scrollbar-box',
         props.class)"
  >
    <ScrollAreaThumb class="relative flex-1 rounded-full bg-border scrollbar-thumb" />
  </ScrollAreaScrollbar>
</template>
