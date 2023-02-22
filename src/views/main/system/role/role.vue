<template>
  <div class="role">
    <PageList :listConfig="listConfig" pageName="role"></PageList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import PageList from '@/components/page-list'
import { listConfig } from './config/list.config'

export default defineComponent({
  name: 'role',
  components: {
    PageList
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: 'role',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    return {
      listConfig
    }
  }
})
</script>

<style scoped></style>
