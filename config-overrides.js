/**
 * Created by flyTigger on 2019/7/30.
 */
const {override, fixBabelImports,addLessLoader} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: "es", style: 'css'
    }),
    addLessLoader()
);