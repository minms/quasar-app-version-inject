/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

module.exports = function (api) {
    const ver = build_version();
    const ver_char = ver.replaceAll('.', '')

    api.extendWebpack((cfg, {isClient, isServer}, api) => {
        cfg.output = Object.assign({}, cfg.output, {
            filename: `js/[name].${ver_char}.js`,
            chunkFilename: `js/[name].${ver_char}.js`
        })
    })

    if (api.hasPackage('mini-css-extract-plugin')) {
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        api.extendWebpack((cfg, {isClient, isServer}, api) => {
            cfg.plugins.forEach((val) => {
                if (val instanceof MiniCssExtractPlugin) {
                    val.options.filename = `css/[name].${ver_char}.css`
                    val.options.chunkFilename = `css/[name].${ver_char}.css`
                }
            })
        })
    }
    api.extendQuasarConf((conf, api) => {
        if (!conf.build.env) {
            conf.build['env'] = {}
        }

        conf.build.env['APP_VERSION'] = ver
    })
}

function build_version() {
    let dd = new Date();
    return 'v' + (dd.getFullYear())
        + '.'
        + (dd.getMonth() + 1)
        + '.'
        + (dd.getDate())
        + '.'
        + (dd.getHours())
        + '.'
        + (dd.getMinutes())
        + '.'
        + (dd.getSeconds());
}