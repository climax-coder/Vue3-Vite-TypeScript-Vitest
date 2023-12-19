<template>
  <div>
    <label>{{ label }}</label>
    <input type="text" :placeholder="placeholder" class="form-control" @input="updateValue" :value="modelValue">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'DebouncedInput',
  props: {
    modelValue: String,
    placeholder: String,
    label: String
  },
  setup(_props, { emit }) {
    const updateValue = debounce((event: Event) => {
      let target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    }, 300);

    return {
      updateValue
    };
  }
});
</script>

<style scoped>
.form-control {
  display: inline-flex;
  height: 50px;
  padding: 13px 24px;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgba(19, 19, 19, 0.25);
  background: #FFF;
  margin-top: 16px
}

label {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

}
</style>
