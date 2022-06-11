// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-sabarivka-reporter'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "jenkins/coverage"),
      subdir: '.',
      reporters: [{type: 'html'}, {type: 'lcovonly'}, {type: 'text-summary'}],
      include: [
        "src/app/**/*.(js|ts)",
        '!src/environments/*.ts',
        '!src/test/**/*.ts',
        '!src/main.ts',
        '!src/polyfills.ts',
        '!src/settings.ts',
        '!src/test.ts',
        "!src/app/**/*enum.ts",
        "!src/app/**/*interface.ts",
        "!src/app/**/*spec.ts",
      ]
    },
    browsers: ['ChromeHeadless'],
    captureTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 2,
    failOnEmptyTestSuite: false,
    restartOnFileChange: true,
    retryLimit: 12
  });
};
