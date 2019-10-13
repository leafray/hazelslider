// function myPlugin() {
//     "use strict";

//     let myPlugin = {};

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
        let _ = this;
        let containerWidth;
        let containerHeight;
        let slot = _.container.querySelectorAll('.hs-slot');
        let _first = 0;
        let _last = slot.length -1;
        let piece = [];
        let _pieces;

        

        
        containerWidth = typeof(this.width) === 'number' ? this.width : this.container.offsetWidth;
        containerHeight = typeof(this.height) === 'number' ? this.height : this.container.offsetHeight;
        
        // Image Width & Height
        for(let i = 0; i <= _last; i++) {
            slot[i].children[0].style.width = containerWidth + 'px';
            slot[i].children[0].style.height = containerHeight + 'px';
        }

        let pieceParent = document.createElement('div');
        pieceParent.className = 'hs-slide-slot';
        
        let imgWidth = containerWidth / this.slideX;
        let imgHeight = containerHeight / this.slideY;

        for( let i = 0; i <= _last; i++) {

            for( let j = 0; j < _.slideX; j++) {
                
                let hs = document.createElement('div');
                hs.className = 'hs-xy hs-x'+ j +'-y';
                hs.style.width = imgWidth +'px';
                hs.style.height = imgHeight +'px';

                let image = _.container.querySelectorAll('.hs-img');
                image[i].getAttribute('src');

                let hsImg = document.createElement('img');
                hsImg.src = image[i].getAttribute('src');
                hsImg.style.width = imgWidth +'px';
                hs.appendChild(hsImg);

                pieceParent.appendChild(hs);
            }
            
            slot[i].appendChild(pieceParent.cloneNode(true));
            pieceParent.innerHTML = '';
        }

        


        
    };



})();

new HazelSlider({
    // container: '.hs-container',
    slideX: 5,
    slideY: 5,
    // width: 960,
    // height: 400,
});