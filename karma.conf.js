module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'liwid/lib/angular/1.5.3/angular.js',
      'liwid/lib/angular/1.5.3/angular-route.js',
      'liwid/lib/angular/1.5.3/angular-mocks.js',
      'app/modules/**/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
