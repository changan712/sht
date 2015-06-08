seajs.config({
    base: document.location.protocol + '//s.shtimage.com/scripts/sea-modules',
    comboExcludes: /.*/,
    alias: {
        '$': 'jquery/jquery/1.9.1/jquery.js',
        '$-debug':'jquery/jquery/1.9.1/jquery.js',
        'jquery': 'jquery/jquery/1.9.1/jquery.js',
        'jquery-debug': 'jquery/jquery/1.9.1/jquery.js',
        'seajs-debug': 'seajs/seajs-debug/1.1.1/seajs-debug.js'
    },
    debug: false,
    preload: ['jquery/jquery/1.9.1/jquery.js', 'seajs/seajs-style/1.0.2/seajs-style']
});

//开发测试
seajs.on('fetch', function (data) {
    var Reg = /(.*)\/sea-modules\/sht\/(\w*)\/[\d\.]*\/(\w*)/;
    var match = data.uri.match(Reg);
    if (match && location.href.indexOf('?dev') > 0) {
        data.requestUri = match[1] + '/sht/' + match[2] + '/src/' + match[3] + '.js';
    }

});

