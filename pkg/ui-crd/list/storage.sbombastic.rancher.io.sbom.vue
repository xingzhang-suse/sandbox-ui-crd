<script>
import { CATALOG } from '@shell/config/types';

import Loading from '@shell/components/Loading';
import ResourceTable from '@shell/components/ResourceTable';

export default {
  components: {
    DefaultsBanner,
    Loading,
    ResourceTable
  },

  props: {
    resource: {
      type:     String,
      required: true,
    },
    schema: {
      type:     Object,
      required: true,
    },
  },

  async fetch() {
    await this.$store.dispatch('cluster/findAll', { type: this.resource });

    if (this.$store.getters['cluster/canList'](CATALOG.APP)) {
      await this.$store.dispatch('catalog/load');
    }
  },

  data() {
    return { apps: null };
  },

  computed: {
    rows() {
      return this.$store.getters['cluster/all'](this.resource);
    }
  }
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <ResourceTable
      :schema="schema"
      :rows="rows"
      data-testid="ui-crd-resource-table"
    />
  </div>
</template>
