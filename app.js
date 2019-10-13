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
        
        let slotWidth = containerWidth / this.slideX;
        let slotHeight = containerHeight / this.slideY;

        for( let i = 0; i <= _last; i++) {
            let countX = 0;
            let countY = 0;

            for( let j = 0; j < _.slideX * _.slideY; j++) {
                countX++;

                if(j % _.slideX == 0)
                    countX = 0;

                if(j % _.slideX == 0 && j > 0)
                    countY++;

                // .HS-XY
                let hs = document.createElement('div');
                hs.className = 'hs-xy hs-x'+ j +'-y';
                hs.style.width = slotWidth +'px';
                hs.style.height = slotHeight +'px';
                hs.style.left = (slotWidth * countX) +'px';
                hs.style.top = (slotHeight * countY) +'px';

                if(i > 0)
                    hs.style.display = 'none';

                // Select all images
                let image = _.container.querySelectorAll('.hs-img');

                // Create HS XY image
                let hsImg = document.createElement('img');
                hsImg.src = image[i].getAttribute('data-src');
                hsImg.style.width = containerWidth +'px';
                hsImg.style.height = containerHeight +'px';
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