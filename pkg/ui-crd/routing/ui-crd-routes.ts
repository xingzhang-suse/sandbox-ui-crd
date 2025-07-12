// custom pages should be created as VueJS components. Usually stored on the /pages folder on the extension
// definition of a "blank cluster" in Rancher Dashboard

import Dashboard from '../pages/index.vue';
import { PRODUCT, PAGE } from '../types/ui-crd';
import UICRDResourceList from '../pages/c/_cluster/ui-crd/_resource/index.vue';

// to achieve naming consistency throughout the extension
// we recommend this to be defined on a config file and exported
// so that the developer can import it wherever it needs to be used

const routes = [
  // this is an example of a custom page if you wanted to register one
  {
    name:      `c-cluster-${ PRODUCT.NAME }-${ PAGE.DASHBOARD }`,
    path:      `/c/:cluster/${ PRODUCT.NAME }/${ PAGE.DASHBOARD }`,
    component: Dashboard,
    meta:      {
      product: PRODUCT.NAME,
    },
  },
  {
    name:      `c-cluster-${ PRODUCT.NAME }-resource`,
    path:      `/c/:cluster/${ PRODUCT.NAME }/:resource`,
    component: UICRDResourceList,
    meta:      {
        product: PRODUCT.NAME,
    },
  },
];

export default routes;