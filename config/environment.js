/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mf',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    i18n: {
      defaultLocale: 'es',
      alowedLocales: ['es', 'en', 'fr', 'pt', 'zh']
    },

    moment: {
      outputFormat: 'LL',
      allowEmpty: true, // default: false
      defaultFormat: 'DD.MM.YYYY',
      defaultLocale: 'es',
      includeLocales: true,
      includeTimezone: 'all'
    },

    firebase: {

    },

    // if using ember-cli-content-security-policy
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com https://auth.firebase.com wss://*.firebaseio.com"
    },
    baseUrl: '/',
    torii: {
      sessionServiceName: 'session'
    },
    baseUrl: '/',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};