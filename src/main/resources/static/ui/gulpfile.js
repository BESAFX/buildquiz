var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var strip = require('gulp-strip-comments');
var replace = require('gulp-replace');
var googleWebFonts = require('gulp-google-webfonts');

var options = {
    fontsDir: './font/googlefonts/',
    cssDir: './css/',
    cssFilename: 'myGoogleFonts.css'
};


gulp.task('fonts', function () {
    return gulp.src('./font/googlefonts/fonts.list')
        .pipe(googleWebFonts(options))
        .pipe(gulp.dest('./'));
});

gulp.task('css', function () {

    gulp.src([
        './css/animate.css',
        './css/bootstrap.css',
        './css/fonts.css',
        './css/md-icons.css',
        './css/angular-toggle-switch-bootstrap-3.css',
        './css/highlight.css',
        './css/chat.css',
        './bootstrap-select/css/nya-bs-select.css',
        './css/font-awesome-animation.css',
        './kdate/css/jquery.calendars.picker.css',
        './node_modules/textangular/dist/textAngular.css',
        './css/select.css',
        './chosen/chosen.css'
    ])
        .pipe(replace('/*!', '/*'))
        .pipe(concat('app.css'))
        .pipe(cleanCSS({specialComments: 'all'}))
        .pipe(gulp.dest('./'));

});

gulp.task('scripts', function () {

    gulp.src([

        './js/material.js',
        './js/mdl-ext.js',
        './js/fontawesome.js',
        './js/jquery.js',

        './kdate/js/jquery.calendars.js',
        './kdate/js/jquery.calendars-ar.js',
        './kdate/js/jquery.calendars-ar-EG.js',
        './kdate/js/jquery.plugin.js',
        './kdate/js/jquery.calendars.picker.js',
        './kdate/js/jquery.calendars.picker-ar.js',
        './kdate/js/jquery.calendars.picker-ar-EG.js',
        './kdate/js/jquery.calendars.picker.lang.js',
        './kdate/js/jquery.calendars.ummalqura.js',
        './kdate/js/jquery.calendars.ummalqura-ar.js',
        './kdate/js/jquery.calendars.plus.js',

        './js/jquery-ui.js',
        './js/angular.js',
        './js/angular-sanitize.js',
        './js/angular-ui-router.js',
        './js/angular-animate.js',
        './js/angular-touch.js',
        './js/angular-filter.js',
        './angular-spinner/spin.js',
        './angular-spinner/angular-spinner.js',
        './angular-spinner/angular-loading-spinner.js',
        './js/ui-bootstrap.js',
        './js/ui-bootstrap-tpls.js',
        './js/select.js',
        './sockjs/sockjs.js',
        './stomp-websocket/lib/stomp.js',
        './ng-stomp/ng-stomp.js',
        './kdate/kdate.module.js',
        './kdate/kdate.filter.js',
        './kdate/kdate.picker.js',
        './js/underscore.js',
        './js/lrDragNDrop.js',
        './js/contextMenu.js',
        './js/lrStickyHeader.js',
        './js/smart-table.js',
        './js/stStickyHeader.js',
        './js/angular-pageslide-directive.js',
        './js/elastic.js',
        './js/scrollglue.js',
        './ng-upload/angular-file-upload.js',
        './bootstrap-select/js/nya-bs-select.js',
        './js/angular-css.js',
        './js/angular-timer-all.js',
        './full-screen/angular-fullscreen.js',
        './animate-counter/angular-counter.js',
        './js/angular-focusmanager.js',
        './js/jcs-auto-validate.js',
        './js/angular-toggle-switch.js',
        './js/chosen.jquery.js',
        './chosen/angular-chosen.js',
        './js/sortable.js',
        './js/FileSaver.js',
        './js/jquery.noty.packaged.js',
        './angular-chart/Chart.js',
        './angular-chart/angular-chart.js',

        './node_modules/textangular/dist/textAngular-rangy.min.js',
        './node_modules/textangular/dist/textAngular-sanitize.js',
        './node_modules/textangular/dist/textAngular.js',
        './node_modules/textangular/dist/textAngularSetup.js',

        //--> init/config
        './init/config/config.js',

        //--> init/factory
        './init/factory/answerFactory.js',
        './init/factory/categoryFactory.js',
        './init/factory/personFactory.js',
        './init/factory/questionFactory.js',
        './init/factory/quizFactory.js',
        './init/factory/resultFactory.js',
        './init/factory/teamFactory.js',
        './init/factory/traineeFactory.js',
        './init/factory/traineeQuizFactory.js',
        './init/factory/trainerFactory.js',
        './init/factory/errorHandleFactory.js',

        //--> init/service
        './init/service/service.js',

        //--> init/directive
        './init/directive/directive.js',

        //--> init/filter
        './init/filter/filter.js',

        //--> init/run
        './init/run/run.js',

        //--> partials
        './partials/home/home.js',
        './partials/menu/menu.js',

        './partials/team/team.js',
        './partials/team/teamCreateUpdate.js',

        './partials/trainee/traineeDetails.js',
        './partials/trainee/traineeFilter.js',
        './partials/trainee/traineeCreateUpdate.js',
        './partials/trainee/traineeQuizAdd.js',

        './partials/trainer/trainerDetails.js',
        './partials/trainer/trainerFilter.js',
        './partials/trainer/trainerCreateUpdate.js',

        './partials/category/categoryCreateUpdate.js',

        './partials/quiz/quizCreateUpdate.js',
        './partials/quiz/quizDetails.js',
        './partials/quiz/quizResult.js',

        './partials/question/questionCreateUpdate.js',
        './partials/question/questionDetails.js',

        './partials/answer/answerCreateUpdate.js',

        './partials/help/help.js',
        './partials/profile/profile.js',
        './partials/about/about.js',

        './partials/modal/confirmModal.js'

    ])
        .pipe(strip())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))

});

gulp.task('default', ['css', 'scripts']);