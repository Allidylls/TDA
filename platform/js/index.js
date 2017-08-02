// communicate with local app via ipc
const {ipcRenderer} = require('electron');
console.log(ipcRenderer.sendSync('synchronous-message', 'ping sync')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping async');

 
// embeded apps holder
window.touch_device = {
    page: '',
    app: {}
};

// route page events to embeded app with page id
$(document).on('pagecreate', function (event, ui) {
    let page_id = event.target.id;
    touch_device.page = page_id;
    let app = touch_device.app[page_id];
    let fun = 'oncreate';
    if (typeof app === 'object' && typeof app[fun] === 'function') {
        app[fun].apply(app, [event, ui]);
    }
    console.log('pagecreate ' + page_id);
}).on('pagecontainerbeforeshow', function (event, ui) {
    let pre_page_id = (ui.prevPage && ui.prevPage.prop('id')) || '';
    let to_page_id = (ui.toPage && ui.toPage.prop('id')) || '';
    touch_device.page = to_page_id;
    let app = touch_device.app[to_page_id];
    let fun = 'onshowing';
    if (typeof app === 'object' && typeof app[fun] === 'function') {
        app[fun].apply(app, [event, ui]);
    }
    console.log('pagecontainerbeforeshow ' + pre_page_id + ' -> ' + to_page_id);
}).on('pagecontainershow', function (event, ui) {
    let pre_page_id = (ui.prevPage && ui.prevPage.prop('id')) || '';
    let to_page_id = (ui.toPage && ui.toPage.prop('id')) || '';
    touch_device.page = to_page_id;
    let app = touch_device.app[to_page_id];
    let fun = 'onshow';
    if (typeof app === 'object' && typeof app[fun] === 'function') {
        app[fun].apply(app, [event, ui]);
    }
    console.log('pagecontainershow ' + pre_page_id + ' -> ' + to_page_id);
    
    if (to_page_id == 'page-home') {
        let pc = $('#page-home');
        pc.css({'transform': 'none', 'min-height': pc.css('min-height')});
    }
}).on('pagecontainerbeforehide', function (event, ui) {
    let pre_page_id = (ui.prevPage && ui.prevPage.prop('id')) || '';
    let to_page_id = (ui.toPage && ui.toPage.prop('id')) || '';
    touch_device.page = pre_page_id;
    let app = touch_device.app[pre_page_id];
    let fun = 'onhiding';
    if (typeof app === 'object' && typeof app[fun] === 'function') {
        app[fun].apply(app, [event, ui]);
    }
    console.log('pagecontainerbeforehide ' + pre_page_id + ' -> ' + to_page_id);
}).ready(function () {
    console.log('ready');
    $('.app-launch-icon').click(function (event) {
        let pc = $('#page-home');
        let ts = $(this);
        let pc_offset = pc.offset();
        let ts_offset = ts.offset();
        let pc_x = pc_offset.left;
        let pc_y = pc_offset.top;
        let pc_w = pc.width();
        let pc_h = pc.height();
        let ts_x = ts_offset.left;
        let ts_y = ts_offset.top;
        let ts_w = ts.width();
        let ts_h = ts.height();
        let zm_x = pc_w/ts_w;
        let zm_y = pc_h/ts_h;
        let dt_x = zm_x*((pc_x+0.5*pc_w)-(ts_x+0.5*ts_w));
        let dt_y = zm_y*((pc_y+0.5*pc_h)-(ts_y+0.5*ts_h));
        pc.css({
            'transition': '0.5s',
            'transform': 'matrix(' + [zm_x, 0.0, 0.0, zm_y, dt_x, dt_y].join(',') + ')'
        }).one('transitionend ', function (evt) {
            $(':mobile-pagecontainer').pagecontainer('change', ts.data('app-page'));
        });
    });
});
