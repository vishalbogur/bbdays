module.exports = function(grunt) {
	// load grunt tasks based on dependencies in package.json
	require('load-grunt-tasks')(grunt);

	grunt.config.init({
	  useminPrepare: {
	      html: 'dist/index.html',
	      options: {
	        dest: 'dist',
					root: 'app/'
	      }
	  },
	  usemin:{
	  	html:['dist/index.html']
	  },
	  copy:{
	    html: {
	    	src: 'app/index.html', dest: 'dist/index.html'
	    }
	  },
		ngtemplates: {
		dist: {
			options: {
				module: 'opbApp',
				htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true },
				usemin: 'assets/scripts/app.js'
			},
			cwd:  'app',
			src: '**/*.template.html',
			dest: '.tmp/templateCache.js'
		}
	}

	// ng-annotate tries to make the code safe for minification automatically
	// by using the Angular long form for dependency injection.
	// ngAnnotate: {
	// 	dist: {
	// 		files: [{
	// 			expand: true,
	// 			cwd: '.tmp/concat/scripts',
	// 			src: '*.js',
	// 			dest: '.tmp/concat/scripts'
	// 		}]
	// 	}
	// }
	});

	grunt.registerTask('default',[
		'copy:html',
		'useminPrepare',
		'ngtemplates',
		'concat',
		'uglify',
		'cssmin',
		'usemin'
    ]);
}
