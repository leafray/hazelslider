(function() {

    "use strict";

    window.HazelSlider = function(options) {
        this.container = typeof(options.container) == 'string' ? document.querySelector(options.container) : document.querySelector('.hs-container');
        this.slideX = options.slideX;
        this.slideY = options.slideY;
        this.width = typeof(options.width) == 'undefined' ? '100%' : options.width;
        this.height = options.height;
        this.imageHeightRatio = 46;

        this.build();
    };

    HazelSlider.prototype.build = function() {
        let _ = this;
        let containerWidth;
        let containerHeight;
        let slot = _.container.querySelectorAll('.hs-slot');
        let _first = 0;
        let _last = slot.length -1;
        let piece = [];
        let _pieces;

        
        // Container First Width
        const containerFirstWidth = typeof(_.width) == 'string' ? parseFloat(_.width) + '%' : parseInt(_.width) + 'px';
        _.container.style.width = containerFirstWidth;
        
        // Container First Height
        const containerFirstHeight = typeof(_.height) == 'undefined' ? ((_.container.offsetWidth * _.imageHeightRatio) / 100) + 'px' : parseInt(_.height) + 'px';
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

                let _TransformTimeDir = Math.ceil(Math.random() * (2 - 0.1) + 0.1);

                const _transform = {
                    _A : 1,
                    _B : 0.05,
                    _C : 0.1,
                    // for matrix()
                    // _D : _TransformTimeDir == 1 ? Math.random() * (0.8 - 0.72) + 0.72 : Math.random() * (-0.8 - (-0.72)) + (-0.72),
                    // for rotate()
                    _D : _TransformTimeDir == 1 ? Math.random() * (5 - 1) + 1 : Math.random() * (-5 - (-1)) + (-1),
                    _X : 0,
                    _Y : 0,
                    _sX : 0.55, // 0.55 is normal for rotate(), 0.75 is normal for matrix()
                    _sY : 0.55  // 0.55 is normal for rotate(), 0.75 is normal for matrix()
                }
                
                // with matrix()
                // hs.style.transform = 'matrix('+ _transform._A +','+ _transform._B +','+ _transform._C +','+_transform._D+','+ _transform._X +','+ _transform._Y +') scale('+ _transform._sX +','+ _transform._sY +')';
                // with rotate()
                hs.style.transform = 'rotate('+ _transform._D +'deg) scale('+ _transform._sX +','+ _transform._sY +')';

                // Hide all slots except slot[0]
                if(i != 0)
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
        this.init();


    };

    HazelSlider.prototype.init = function() {

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