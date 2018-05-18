// Laravel Mix multiple config slution https://github.com/JeffreyWay/laravel-mix/issues/1086

const { mix } = require('laravel-mix');
const argv = require('yargs').argv;

if (!argv.env) {
    // normal npm run watch config
    mix.setPublicPath('./public');
    mix.sass('index.scss', 'public/styles');
    mix.js('index.js', 'public/js')
    
    mix.browserSync({
        proxy: 'https://dry.fsedev',
        https: true,
        files: [
            'public/**/*.css',
            'public/**/*.js',
            'craft/templates/**/*.html',
            'craft/templates/**/*.twig',
        ]
    });
}
