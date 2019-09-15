import { createSelector } from 'reselect';

const selectMarketplaceConnection = (state) => state.marketplaceConnection;

const makeSelectMarketplaceConnectionData = () => createSelector(
  selectMarketplaceConnection,
  (marketplaceConnectionState) => marketplaceConnectionState.connectionData
);

const makeSelectMarketplace = (marketplace) => createSelector(
  makeSelectMarketplaceConnectionData(),
  (marketplaceConnectionData) => marketplaceConnectionData.find((o) => o.name === marketplace)
);

const makeSelectShopify = () => createSelector(
  makeSelectMarketplace('shopify'),
  (isShopifyConnected) => isShopifyConnected
);

const makeSelectShopee = () => createSelector(
  makeSelectMarketplace('shopee'),
  (isShopeeConnected) => isShopeeConnected
);

export {
  makeSelectMarketplaceConnectionData,
  makeSelectShopify,
  makeSelectShopee
};
