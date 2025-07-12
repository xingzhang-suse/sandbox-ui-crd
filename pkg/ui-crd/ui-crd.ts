import { IPlugin } from '@shell/core/types';
import { RESOURCE, PRODUCT, PAGE } from './types/ui-crd'

export function init($plugin: IPlugin, store: any) {

  const { 
    product,
    virtualType,
    configureType,
    basicType,
  } = $plugin.DSL(store, PRODUCT.NAME);

  product({
    icon: 'gear',
    inStore: 'cluster',
    weight: 100,
    to:  { // this is the entry route for the Extension product, which is registered below
      name: `c-cluster-${ PRODUCT.NAME }-${ PAGE.DASHBOARD }`,
      params: {
        product: PRODUCT.NAME,
      }
    }
  });

  // => => => creating a custom page
  virtualType({
    labelKey: 'menu.dashboard.label',
    name:     PAGE.DASHBOARD,
    route:    {
      name:   `c-cluster-${ PRODUCT.NAME }-${ PAGE.DASHBOARD }`,
      params: {
        product: PRODUCT.NAME,
      }
    }
  });

  // => => => defining a k8s resource as page
  configureType(RESOURCE.REGISTORIES, {
    displayName: 'sbom',
    isCreatable: true,
    isEditable:  true,
    isRemovable: true,
    showAge:     true,
    showState:   true,
    canYaml:     true,
    customRoute: {
      name: `c-cluster-${ PRODUCT.NAME }-resource`,
      params: {
        product: PRODUCT.NAME,
        resource: RESOURCE.REGISTORIES
      }
    }
  });

  // => => => registering the defined pages as side-menu entries
  basicType([RESOURCE.REGISTORIES, PAGE.DASHBOARD]);
}