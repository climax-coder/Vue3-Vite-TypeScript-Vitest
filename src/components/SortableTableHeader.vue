<template>
  <th scope="col" @click="sort">
    <div class="d-flex justify-content-between cursor-pointer">
      <span>{{ title }}</span>
      <i class="bi bi-caret-up-fill" v-if="sortField === field && sortOrder === 'asc'"></i>
      <i class="bi bi-caret-down-fill" v-if="sortField === field && sortOrder === 'desc'"></i>
    </div>
  </th>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  name: 'SortableTableHeader',
  props: {
    title: String,
    field: String,
    sortField: String,
    sortOrder: String
  },
  setup(props: any, context: SetupContext) {
    const sort = () => {
      context.emit('sort', props.field);
    }
    return {
      sort
    }
  }
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

span {
  font-family: 'Lato';
}
</style>
