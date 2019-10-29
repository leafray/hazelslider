# Hazelslider


## 1. Add to body then edit image sources
``` Html

<div class="hs-container">
    <div class="hs-slide">
        <div class="hs-slot hs-active">
            <img data-src="img/img-1.jpg" class="hs-img" alt="">
        </div>
        <div class="hs-slot">
            <img data-src="img/img-2.jpg" class="hs-img" alt="">
        </div>
        <div class="hs-slot">
            <img data-src="img/img-3.jpg" class="hs-img" alt="">
        </div>
    </div>

    <button class="hs-btn hs-prev-btn" id="prevBtn"></button>
    <button class="hs-btn hs-next-btn" id="nextBtn"></button>
</div>
```
## 2. Call the HazelSider

``` Javascript
new HazelSlider({
    container: '.hs-container',
    slideX: 6,
    slideY: 6,
    width: 960, // if you want to use % then you will use like '100%'. if you don't need % then just use number like 500
    // height: 600,
    //imageHeightRatio: 50, // Default 46 | if you will use this then disable to height
    transformDegMax: 15, //Default 25
    transformDegMin: 1, // Default 1
    _rotateX: 0.65, // Default 0.65
    _rotateY: 0.65, // Default 0.65
    animateTime: 1200, // Default 600
});
```
