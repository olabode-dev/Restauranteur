var $slider = $(".slider");
var $slides = $slider.find(".slider-item");
var $navPrev = $(".go-prev");
var $navNext = $(".go-next");
var $startAutoplay = $(".start-autoplay");
var $stopAutoplay = $(".stop-autoplay");
var slidesNum = $slides.length;
var prevSlideID = null;
var currentSlideID = 0;
var isAnimating = false;
var isAutoPlay = false;

function init() {
    TweenLite.set($slides, {
        left: "-100%"
    });
    $navPrev.on("click", gotoPrevSlide);
    $navNext.on("click", gotoNextSlide);
    $startAutoplay.on("click", startAutoPlay);
    $stopAutoplay.on("click", stopAutoPlay);
    gotoSlide(0, 0);
}

function gotoPrevSlide() {
    var slideToGo = currentSlideID - 1;
    if (slideToGo <= -1) {
        slideToGo = slidesNum - 1;
    }
    stopAutoPlay();
    gotoSlide(slideToGo, 1, "prev");
}

function gotoNextSlide() {
    var slideToGo = currentSlideID + 1;
    if (slideToGo >= slidesNum) {
        slideToGo = 0;
    }
    stopAutoPlay();
    gotoSlide(slideToGo, 1, "next");
}

function gotoSlide(slideID, _time, _direction) {
    if (!isAnimating) {
        isAnimating = true;
        prevSlideID = currentSlideID;
        currentSlideID = slideID;
        var $prevSlide = $slides.eq(prevSlideID);
        var $currentSlide = $slides.eq(currentSlideID);
        var time = 1;
        if (_time !== null) {
            time = _time;
        }
        var direction = "next";
        if (_direction != null) {
            direction = _direction;
        }
        if (direction == "next") {
            TweenLite.to($prevSlide, time, {
                left: "-100%"
            });
            TweenLite.fromTo($currentSlide, time, {
                left: "100%"
            }, {
                left: "0"
            });
        } else {
            TweenLite.to($prevSlide, time, {
                left: "100%"
            });
            TweenLite.fromTo($currentSlide, time, {
                left: "-100%"
            }, {
                left: "0"
            });
        }
        TweenLite.delayedCall(time, function() {
            isAnimating = false;
        });
    }
}

function play(){
  gotoNextSlide();
  TweenLite.delayedCall(4, play);
}

function startAutoPlay(immediate) {
    if (immediate != null) {
        immediate = false;
    }
    
    if (immediate) {
        gotoNextSlide();
    }
    TweenLite.delayedCall(4, play);
}

function stopAutoPlay() {
  isAutoPlay = false;
    TweenLite.killDelayedCallsTo(play);
}
init();