(function(global, $){
    'use strict';

    // var photolist = [], total = 10;
    // var photo_info = {
    //     total: 10,
    //     width: 900,
    //     height: 420
    // };

    // for( var i = 0; i < total; i++ ) {
    //     photolist.push('https://unsplash.it/' + photo_info.width + '/' + photo_info.height + '?image=' + i);
    // }

    // console.log(photolist.join(' '));
    var showcase = $.query('.photo-showcase-container img');
    var controller = $.query('.photo-showcase-controller');
    var showcase_imgs = $.queryAll('img', controller);
    var indicator = $.queryAll('a', controller);

    function changeImg(index) {
        var src = this.src.split('=')[0];
        src = src + '=' + index;
        
        this.src = src;
        return false;
    }
    for( var i = 0, len = showcase_imgs.length; i < len; i++ ) {
        var img = showcase_imgs.item(i);
        indicator.item(i).onclick = changeImg.bind(showcase, i);
    }
}(window, window.FDS));