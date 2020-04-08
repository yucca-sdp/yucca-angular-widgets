var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var bower = require('gulp-bower');
var zip = require('gulp-zip');

gulp.task('default', ['createReferenceZipFolder']);


gulp.task('compress',function() {
  return gulp.src('angular-yucca/src/js/**/*.js')
  	.pipe(concat('angular-yucca.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename('angular-yucca.min.js'))
	.pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('copyResources', ['createEmbedProjectZipFolder'], function() {
	  return gulp.src(['angular-yucca/src/**/*', '!angular-yucca/src/js/**/*'])
	               .pipe(gulp.dest('dist'));
	});

gulp.task('copyToReference',["copyResources", "downloadReferenceDependences"], function() {
	  return gulp.src(['dist/**/*'])
	               .pipe(gulp.dest('reference/app/lib/yucca-angular-widgets/dist'));
	});

gulp.task('downloadReferenceDependences', function(){
	 return bower({cwd: './reference', directory: './app/lib' });
});

gulp.task('createReferenceZipFolder', ["copyToReference"], function(){
	  return gulp.src(['./reference/app/**']).pipe(zip('./target/reference.zip')).pipe(gulp.dest('.'));
});

gulp.task('downloadSeedProjectDependences', ["compress"], function(){
	return bower({cwd: './seedProject', directory: './lib' });
});

gulp.task('createSeedProjectCopyNewLib',["downloadSeedProjectDependences"], function() {
	  return gulp.src(['dist/**/*'])
	               .pipe(gulp.dest('./seedProject/lib/yucca-angular-widgets/dist'));
	});

gulp.task('createSeedProjectZipFolder', ["createSeedProjectCopyNewLib"], function(){
	  return gulp.src(['./seedProject/**', '!./seedProject/.bowerrc']).pipe(zip('./yuccaAngularWidgetSeed.zip')).pipe(gulp.dest('.'));
});

gulp.task('createEmbedProjectZipFolder', ["copyEmbedProjectCopyNewLib"], function(){
	return gulp.src(['./reference/template/**']).pipe(zip('./reference/app/template/embedProject.zip')).pipe(gulp.dest('.'));
});

gulp.task('copyEmbedProjectCopyNewLib', ["copyToEmbedded"], function(){
	  return gulp.src(['./seedProject/lib/**/*']).pipe(gulp.dest('./reference/template/lib/'));
});

gulp.task('copyToEmbedded',['createSeedProjectZipFolder'],  function(){
	  return gulp.src(['dist/**/*']).pipe(gulp.dest('reference/template/lib/yucca-angular-widgets/dist'));
});
