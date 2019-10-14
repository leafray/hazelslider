(function() {

    "use strict";

    window.HazelSlider = function(options) {
        this.container = typeof(options.container) == 'string' ? document.querySelector(options.container) : document.querySelector('.hs-container');
        this.slideX = options.slideX;
        this.slideY = options.slideY;
        this.width = typeof(options.width) == 'undefined' ? '100%' : options.width;
        this.height = options.height;
        this.imageHeightRatio = 46;

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

        
        // Container First Width
        let containerFirstWidth = typeof(_.width) == 'string' ? parseFloat(_.width) + '%' : parseInt(_.width) + 'px';
        _.container.style.width = containerFirstWidth;
        
        // Container First Height
        let containerFirstHeight = typeof(_.height) == 'undefined' ? ((_.container.offsetWidth * _.imageHeightRatio) / 100) + 'px' : parseInt(_.height) + 'px';
        _.container.style.height = containerFirstHeight;
        
        // Container Width and Height
        containerWidth = _.container.offsetWidth;
        containerHeight = _.container.offsetHeight;
        
        // Image Width & Height
        for(let i = 0; i <= _last; i++) {
            slot[i].children[0].style.width = containerWidth + 'px';
            slot[i].children[0].style.height = containerHeight + 'px';
        }

        let pieceParent = document.createElement('div');
        pieceParent.className = 'hs-slide-slot';
        
        let slotWidth = containerWidth / _.slideX;
        let slotHeight = containerHeight / _.slideY;

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

                // Hide all slots if 'i' bigger than 0
                if(i != 4)
                    hs.style.display = 'none';

                // Select all images
                let image = _.container.querySelectorAll('.hs-img');

                // Create HS XY image
                let hsImg = document.createElement('img');
                hsImg.src = image[i].getAttribute('data-src');
                hsImg.className = 'hs-img-piece';
                hsImg.style.width = containerWidth +'px';
                hsImg.style.height = containerHeight +'px';

                hsImg.style.left = '-'+ (slotWidth * countX) +'px';
                hsImg.style.top = '-'+ (slotHeight * countY) +'px';
                hs.appendChild(hsImg);

                pieceParent.appendChild(hs);
            }
            
            slot[i].appendChild(pieceParent.cloneNode(true));
            pieceParent.innerHTML = '';
        }


        console.log(typeof(screen.width + '%'));
        
        
    };



})();

new HazelSlider({
    container: '.hs-container',
    slideX: 6,
    slideY: 6,
    width: '100%', // if you want to use % then you will use like '100%'. if you don't need % then just use number like 500
    // height: 600,
    //imageHeightRatio: 50 // Default 46
});