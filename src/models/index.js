import * as MyGenericStores from './config.js'

for ( let storeName in MyGenericStores ) {
  MyGenericStores[ storeName ].setName( storeName )
}

export default MyGenericStores;
