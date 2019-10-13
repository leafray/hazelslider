// function myPlugin() {
//     "use strict";

//     var myPlugin = {};

//     myPlugin.init = function() {
//         document.body.style.border = '5px solid red';
//     };


//     alert('asdf');
//     return myPlugin;
// };

// myPlugin();
// myPlugin.init();

(function() {

    "use strict";

    window.HazelSlider = function(options) {
        this.container = typeof(options.container) == 'string' ? document.querySelector(options.container) : document.querySelector('.hs-container');
        this.slideX = options.slideX;
        this.slideY = options.slideY;
        this.width = options.width || null;
        this.height = options.height || null;


        this.build(options);
    };

    HazelSlider.prototype.build = function(opts) {
        var _ = this,
            containerWidth,
            containerHeight,
            slot = _.container.querySelectorAll('.hs-slot'),
            _first = 0,
            _last = slot.length -1,
            piece = [],
            _pieces,

        

        
        containerWidth = typeof(this.width) === 'number' ? this.width : this.container.offsetWidth;
        containerHeight = typeof(this.height) === 'number' ? this.height : this.container.offsetHeight;
        
        // Image Width & Height
        for(var i = 0; i <= _last; i++) {
            slot[i].children[0].style.width = containerWidth + 'px';
            slot[i].children[0].style.height = containerHeight + 'px';
        }

        var pieceParent = document.createElement('div');
        pieceParent.className = 'hs-slide-slot';
        
        // for( var i = 0; i <= _last; i++) {
            for( var j = 0; j < _.slideX; j++) {
                var hs = document.createElement('div');
                hs.className = 'hs-xy hs-x'+ j +'-y';

                var image = _.container.querySelectorAll('.hs-img');
                image[0].getAttribute('src');

                

                var hsImg = document.createElement('img');
                hsImg.src = image[0].getAttribute('src');
                hs.appendChild(hsImg);

                pieceParent.appendChild(hs);
            }

            _pieces = piece.join('');
        // }

        
        slot[0].appendChild(pieceParent);

        var w = containerWidth / this.slideX;

        
    };



})();

new HazelSlider({
    // container: '.hs-container',
    slideX: 5,
    slideY: 5,
    // width: 960,
    // height: 400,
});