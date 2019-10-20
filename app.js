(function() {

    "use strict";

    window.HazelSlider = function(options) {
        this.container = typeof(options.container) == 'string' ? document.querySelector(options.container) : document.querySelector('.hs-container');
        this.slideX = options.slideX;
        this.slideY = options.slideY;
        this.width = typeof(options.width) == 'undefined' ? '100%' : options.width;
        this.height = options.height;
        this.imageHeightRatio = 46;
        this.transformDegMax = typeof(options.transformDegMax) == 'number' ? options.transformDegMax : 25;
        this.transformDegMin = typeof(options.transformDegMin) == 'number' ? options.transformDegMin : 1;
        this._rotateX = typeof(options._rotateX) == 'number' ? options._rotateX : 0.65;
        this._rotateY = typeof(options._rotateY) == 'number' ? options._rotateY : 0.65;
        this.animateTime = typeof(options.animateTime) == 'number' ? options.animateTime : 0.6;
        this.delay = typeof(options.delay) == 'number' ? options.delay : 6000;

        this.build();

    };

    HazelSlider.prototype.build = function() {
        let _ = this;
        let containerWidth;
        let containerHeight;
        let slot = _.container.querySelectorAll('.hs-slot');
        let _first = 0;
        let _last = slot.length -1;

        
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
                const transformDeg = {
                    _Max: _.transformDegMax,
                    _Min: _.transformDegMin
                };
                const _transform = {
                    _A : 1,
                    _B : 0.05,
                    _C : 0.1,
                    // for matrix()
                    // _D : _TransformTimeDir == 1 ? Math.random() * (0.8 - 0.72) + 0.72 : Math.random() * (-0.8 - (-0.72)) + (-0.72),
                    // for rotate()
                    _D : _TransformTimeDir == 1 ? Math.random() * (transformDeg._Max - transformDeg._Min) + transformDeg._Min : Math.random() * (-transformDeg._Max - (-transformDeg._Min)) + (-transformDeg._Min),
                    _X : 0,
                    _Y : 0,
                    _sX : _._rotateX, // 0.55 - 0.65 is normal for rotate(), 0.75 is normal for matrix()
                    _sY : _._rotateY  // 0.55 - 0.65 is normal for rotate(), 0.75 is normal for matrix()
                };
                
                // if when refresh page then show slot[0] normally
                if( i != 0 ) {
                    // with matrix()
                    // hs.style.transform = 'matrix('+ _transform._A +','+ _transform._B +','+ _transform._C +','+_transform._D+','+ _transform._X +','+ _transform._Y +') scale('+ _transform._sX +','+ _transform._sY +')';
                    // with rotate()
                    hs.style.transform = 'rotate('+ _transform._D +'deg) scale('+ _transform._sX +','+ _transform._sY +')';
                }

                // Hide all slots except slot[0]
                if(i != 0) {
                    hs.style.visibility = 'hidden';
                    hs.style.opacity = 0;
                }

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
        
        _.btnInit(_);
        _.autoSlide(_);

    };
    
    HazelSlider.prototype.btnInit = function(_this) {

        let nextBtn = document.querySelector('#nextBtn');
        nextBtn.addEventListener('click', function(e) {
            _this.btnBuild('next', _this);
            
        });

        let prevBtn = document.querySelector('#prevBtn');
        prevBtn.addEventListener('click', function() {
            _this.btnBuild('prev', _this);
        });
    };

    HazelSlider.prototype.btnBuild = function(btn, _this) {
        // Find active slot
        let nodes = Array.prototype.slice.call( document.querySelector('.hs-slide').children );
        let hsActive = nodes.indexOf( document.getElementsByClassName('hs-active')[0] );
        
        let hsOldActive = hsActive;

        // Remove current active slot classname
        nodes[hsActive].classList.remove('hs-active');

        // if btn == next
        if(btn == 'next' && hsActive == nodes.length -1)
            hsActive = -1;

        // if btn == prev
        if(btn == 'prev' && hsActive == 0)
            hsActive = nodes.length;
        
        let hsNewActive = btn == 'next' ? hsActive +1 : hsActive -1;

        // get all slots
        let allHsSlots = document.querySelectorAll('.hs-slot');

        allHsSlots[hsOldActive].children[0].src = allHsSlots[hsOldActive].children[0].getAttribute('data-src');
        
        // Add new slot active classname
        allHsSlots[hsNewActive].classList.add('hs-active');
        allHsSlots[hsNewActive].style.zIndex = 19;

        for( let i = 0; i < nodes.length; i++ ) {
            if(i != hsOldActive)
                allHsSlots[i].children[0].src = '';
        }



        for (let i = 0; i < nodes.length; i++) {
            allHsSlots[hsOldActive].style.zIndex = 17;

            let deActiveSlots = allHsSlots[hsOldActive].querySelectorAll('.hs-xy');
            for (let j = 0; j < deActiveSlots.length; j++) {
                let _TransformTimeDir = Math.ceil(Math.random() * (2 - 0.1) + 0.1);
                const transformDeg = {
                    _Max: _this.transformDegMax,
                    _Min: _this.transformDegMin
                };
                const _transform = {
                    _A : 1,
                    _B : 0.05,
                    _C : 0.1,
                    // for matrix()
                    // _D : _TransformTimeDir == 1 ? Math.random() * (0.8 - 0.72) + 0.72 : Math.random() * (-0.8 - (-0.72)) + (-0.72),
                    // for rotate()
                    _D : _TransformTimeDir == 1 ? Math.random() * (transformDeg._Max - transformDeg._Min) + transformDeg._Min : Math.random() * (-transformDeg._Max - (-transformDeg._Min)) + (-transformDeg._Min),
                    _X : 0,
                    _Y : 0,
                    _sX : _this._rotateX, // 0.55 - 0.65 is normal for rotate(), 0.75 is normal for matrix()
                    _sY : _this._rotateY  // 0.55 - 0.65 is normal for rotate(), 0.75 is normal for matrix()
                };

                deActiveSlots[j].style.transform = 'rotate('+ _transform._D +'deg) scale('+ _transform._sX +','+ _transform._sY +')';
                deActiveSlots[j].style.opacity = 0;
                deActiveSlots[j].style.visibility = 'hidden';
                deActiveSlots[j].style.transition = 'transform '+ _this.animateTime +'s, opacity '+ _this.animateTime +'s, visibility '+ _this.animateTime +'s';
            }
        }


        allHsSlots[hsNewActive].style.zIndex = 19;

        // get all .hs-xy in new active slot
        let xySlots = allHsSlots[hsNewActive].querySelectorAll('.hs-xy');
        for (let i = 0; i < xySlots.length; i++) {
            xySlots[i].style.transform = 'rotate(0deg) scale(1)';
            xySlots[i].style.opacity = 1;
            xySlots[i].style.visibility = 'visible';
            xySlots[i].style.transition = 'transform '+ _this.animateTime +'s, opacity '+ _this.animateTime +'s, visibility '+ _this.animateTime +'s';
        }
    };

    HazelSlider.prototype.autoSlide = function(_this) {
        
        let _interval;

        let _hover = function() {
            _this.btnBuild('next', _this);
        };
        
        _interval = setInterval(_hover, _this.delay);
        
        
        _this.container.addEventListener('mouseover', function() {
            clearInterval(_interval);
        });

        _this.container.addEventListener('mouseout', function() {
            _interval = setInterval(_hover, _this.delay);
        });
    }
    


})();

new HazelSlider({
    container: '.hs-container',
    slideX: 6,
    slideY: 6,
    width: '100%', // if you want to use % then you will use like '100%'. if you don't need % then just use number like 500
    // height: 600,
    //imageHeightRatio: 50, // Default 46
    transformDegMax: 15, //Default 25
    transformDegMin: 1, // Default 1
    _rotateX: 0.65, // Default 0.65
    _rotateY: 0.65, // Default 0.65
    animateTime: 1.2, // Default 0.6
    delay: 4000, // Default 6000 (6 seconds)
});