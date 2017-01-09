'use strict';

var gulp = require('gulp');

require('./dev');
require('./typescript');
require('./webpack');

gulp.task('default', ['webpack']);
