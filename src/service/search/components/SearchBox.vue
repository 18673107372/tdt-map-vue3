<template>
  <div class="tdt-search-box">
    <input
      class="tdt-search-box__input"
      type="text"
      :placeholder="placeholder"
      v-model="keyword"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      @input="onInput"
      @keyup.enter="emit('search', keyword)"
    />
    <i class="tdt-search-box__close" :style="{ display: keyword ? 'block' : 'none' }" @click="keyword = ''">
      <IconClose />
    </i>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconClose } from "./icons";
import "../styles/search-box.scss";

defineProps<{
  /** 显示在输入框的提示 */
  placeholder?: string;
  /** 是否显示搜索按钮 */
  searchBtn?: boolean;
  /** 是否显示导航按钮 */
  routeBtn?: boolean;
}>();

const emit = defineEmits<{
  /** 点击搜索按钮或回车时触发 */
  search: [e: string];
}>();

const keyword = defineModel<string>({ default: "" });

const isComposition = ref(false);

function onCompositionStart() {
  isComposition.value = true;
}

function onCompositionEnd() {
  isComposition.value = false;
}

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  setTimeout(() => {
    if (!isComposition.value) {
      keyword.value = val;
    }
  });
}
</script>
