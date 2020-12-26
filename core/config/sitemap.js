const modules = {
  home: { name: 'Home', url: '/', isHome: true, navKey: 'home' },
  property: { name: 'Properties', url: '/properties', navKey: 'properties' },
  search: { name: 'Search', url: '/search', navKey: 'search' },
  messages: { name: 'Messages', url: '/messages', navkey: 'messages' },
  settings: { name: 'Settings', url: '/settings', navkey: 'settings' },
  subscription: { name: 'Subscription', url: '/subscription', navkey: 'subscription' },
  privacy: { name: 'Privacy Policy', url: '/privacy-policy', navkey: 'privacy' },
  terms: { name: 'Terms and Conditions', url: '/terms-and-conditions', navkey: 'terms' },
  favourites: { name: 'Favourites', url: '/favourites', navkey: 'favourites' },
  notifications: { name: 'Notifications', url: '/notifications', navkey: 'notifications' },
  error: { name: 'Error', url: '/error' }
};

const site = {
  modules: modules,
  routes: {
    dashboard: {
      exact: true,
      module: modules.home,
      path: modules.home.url,
      title: 'Dashboard',
      navKey: 'dashboard'
    },
    viewProperty: {
      exact: true,
      module: modules.property,
      route: modules.property.url + '/',
      path: modules.property.url + '/[id]',
      title: 'Details',
      navKey: 'viewProperty'
    },
    addProperty: {
      exact: true,
      module: modules.property,
      path: modules.property.url + '/add',
      title: 'Add Property',
      navKey: 'addProperty'
    },
    previewAdd: {
      exact: true,
      module: modules.property,
      path: modules.property.url + '/previewadd',
      title: 'Preview',
      navKey: 'addProperty'
    },
    searchIndex: {
      exact: true,
      module: modules.search,
      path: modules.search.url,
      title: 'Search',
      isIndex: true,
      navKey: 'searchIndex'
    },
    Messages: {
      exact: true,
      module: modules.messages,
      path: modules.messages.url,
      title: 'Messages',
      isIndex: true,
      navKey: 'messages'
    },
    UserMessage: {
      exact: true,
      module: modules.messages,
      route: modules.messages.url + '/',
      path: modules.messages.url + '/[id]',
      title: 'Message',
      isIndex: true,
      navKey: 'message'
    },
    Settings: {
      exact: true,
      module: modules.settings,
      path: modules.settings.url,
      title: 'Account Settings',
      navKey: 'settings'
    },
    Subscription: {
      exact: true,
      module: modules.subscription,
      path: modules.subscription.url,
      title: 'Subscription Plan',
      navKey: 'subscription'
    },
    Favourites: {
      exact: true,
      module: modules.favourites,
      path: modules.favourites.url,
      title: 'Favourites',
      isIndex: true,
      navKey: 'favourites'
    },
    Terms: {
      exact: true,
      module: modules.terms,
      path: modules.terms.url,
      title: 'Terms',
      navKey: 'terms'
    },
    Privacy: {
      exact: true,
      module: modules.privacy,
      path: modules.privacy.url,
      title: 'Policy',
      navKey: 'favourites'
    },
    Notifications: {
      exact: true,
      module: modules.notifications,
      path: modules.notifications.url,
      title: 'Notifications',
      navKey: 'notifications'
    },
    error: {
      module: modules.error,
      title: 'Not Found'
    }
  }
};

export default site;
