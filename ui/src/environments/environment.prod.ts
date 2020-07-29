export const environment = {
  APP_NAME: 'Application Name',
  production: true,

  baseProductListUrl: "/api/product/base-product",
  // getProductListForBaseProductUrl: "/api/product/base-product/product"
   getProductListForBaseProductUrl: ((id) => `/api/product/base-product/${id}/product`)
};
