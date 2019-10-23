import { createSelector } from 'reselect';

const selectMarketplaceConnection = (state) => state.marketplaceConnection;

const makeSelectMarketplaceConnectionData = () => createSelector(
  selectMarketplaceConnection,
  (marketplaceConnectionState) => marketplaceConnectionState.marketplaceData
);

const makeSelectMarketplace = (marketplace) => createSelector(
  makeSelectMarketplaceConnectionData(),
  (marketplaceConnectionData) => marketplaceConnectionData.find((o) => o.name === marketplace)
);

const makeSelectShopify = () => createSelector(
  makeSelectMarketplace('shopify'),
  (isShopifyConnected) => isShopifyConnected
);

const makeSelectEasystore = () => createSelector(
  makeSelectMarketplace('easystore'),
  (isEasystoreConnected) => isEasystoreConnected
);

const makeSelectShopee = () => createSelector(
  makeSelectMarketplace('shopee'),
  (isShopeeConnected) => isShopeeConnected
);

const makeSelectWoocommerce = () => createSelector(
  makeSelectMarketplace('woocommerce'),
  (isWooCommerceConnected) => isWooCommerceConnected
);

export {
  makeSelectMarketplaceConnectionData,
  makeSelectShopify,
  makeSelectEasystore,
  makeSelectShopee,
  makeSelectWoocommerce
};
