var pieTimer = function (wrap) {

    // dodaje CSS do dokumentu
    var myCSS = document.createElement( "link" );
    myCSS.rel = "stylesheet";
    myCSS.href = "build/pie-timer.min.css";
    // insert it at the end of the head in a legacy-friendly manner
    document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
    // dodaje CSS - END

    var mainClassName = "rs-pie-timer";
    this.wrapper = document.querySelectorAll(wrap);
    var _thisWrapper = this.wrapper[0];

    this.wrapper.forEach(function (elem) {

        console.log('elem: ', elem);
        elem.classList.add('rs-pie-timer-init');

        this.defaults = {
            timerLabels: [
                {"days": "dni"},
                {"hours": "godziny"},
                {"minutes": "minuty"},
                {"seconds": "sekundy"}
            ],
            size: 80,
            borderSize: 7,
            borderColor: "#bd47a0",
            progressColor: "#36b8d4",
            numberColor: "#000",
            numberSize: "35%",
            textColor: "#000",
            textSize: "20%",
            countdownTo: "2020 07 20 00:00:00",
            labels: true
        };

        console.log(elem.getAttribute('data-rs-pt-end-date') !== ''
        && elem.getAttribute('data-rs-pt-end-date') !== null
            ? elem.getAttribute('data-rs-pt-end-date')
            : defaults.countdownTo);

        this.chceckAttribute = function(attr){
            return elem.getAttribute(attr) !== ''
            && elem.getAttribute(attr) !== null
                ? elem.getAttribute(attr)
                : defaults.countdownTo;
        };

        var dataAtt = 'data-rs-pt-';

        //concat objects
        this.set = {
            countdownTo: chceckAttribute(dataAtt+'end-date'),
            labels: chceckAttribute(dataAtt+'labels'),
            size: chceckAttribute(dataAtt+'size'),
            borderSize: chceckAttribute(dataAtt+'border-size'),
            borderColor: chceckAttribute(dataAtt+'border-color'),
            progressColor: chceckAttribute(dataAtt+'progress-color'),
            numberColor: chceckAttribute(dataAtt+'number-color'),
            numberSize: chceckAttribute(dataAtt+'number-size'),
            textColor: chceckAttribute(dataAtt+'text-color'),
            textSize: chceckAttribute(dataAtt+'text-size'),
            timerLabels: elem.getAttribute(dataAtt+'label-names')
            && elem.getAttribute(dataAtt+'label-names') !== ''
                ? JSON.parse(elem.getAttribute(dataAtt+'label-names'))
                : defaults.timerLabels,
        };

        this.leadingZero = function (value) {
            return value < 10
                ? value >= 0 ? "0" + value : value > -10 ? "-0" + -value : value
                : value;
        };

        //tworz zegary i elementy
        this.createElem = function () {
            for (var t = 0; t < set.timerLabels.length; t++) {
                var timer = document.createElement("div"),
                    inner = document.createElement("div"),
                    fill = document.createElement("div"),
                    mask = document.createElement("div"),
                    mask2nd = document.createElement("div"),
                    text = document.createElement("div"),
                    num = document.createElement("span");

                timer.className = mainClassName + " " + mainClassName + "-" + Object.keys(set.timerLabels[t]);
                inner.className = mainClassName + "__inner";
                fill.className = mainClassName + "__inner__fill";
                mask.className = mainClassName + "__inner__mask";
                mask2nd.className = mainClassName + "__inner__mask " + mainClassName + "__inner__mask2";
                text.className = mainClassName + "__text";

                timer.style = "width:" + set.size + "px; height:" + set.size + "px";
                inner.style = "border-width:" + set.borderSize + "px; border-color:" + set.borderColor + "";
                mask.style = "border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px;";
                mask2nd.style = "border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor;
                text.style = "font-size:" + set.size + "px";
                num.style = "color:" + set.textColor + ";font-size:" + set.textSize;

                inner.appendChild(fill);
                inner.appendChild(mask);
                inner.appendChild(mask2nd);
                text.appendChild(num);
                timer.appendChild(inner);
                timer.appendChild(text);
                elem.appendChild(timer);
                num.textContent = "--";

                if (set.labels) {
                    var label = document.createElement('SPAN');
                    label.textContent = Object.values(set.timerLabels[t]);
                    label.style = "color:" + set.numberColor + ";font-size:" + set.numberSize;
                    text.appendChild(label);
                }
            }
        };
        this.createElem();

        //set value each timer
        setInterval(function () {
            var remainingTime = new Date(set.countdownTo) - new Date(),
                remaining = {};
            if (remainingTime <= 0) {
                remaining = {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
                var allTimers = document.querySelectorAll("." + mainClassName);
                for (var i = 0; i < allTimers.length; i++) {
                    allTimers[i]
                        .querySelector("." + mainClassName + "__inner")
                        .classList.add(mainClassName + "__inner--fullFill");
                }
                return;
            } else {
                remaining = {
                    days: Math.floor(remainingTime / (1000 * 60 * 60 * 24) % 30),
                    hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
                    seconds: Math.floor((remainingTime / 1000) % 60)
                }
            }

            for (var t = 0; t < Object.keys(set.timerLabels).length; t++) {
                //color fill

                var next = t + 1;
                var selector = Object.keys(set.timerLabels[t]);
                var selectorNext = next < Object.keys(set.timerLabels).length ? Object.keys(set.timerLabels[next]) : false;
                //console.log(next, selectorNext);

                //ustaw wlasciwy mnoznik dla zegara
                if (selector[0] !== "seconds") {
                    _thisWrapper.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__fill").style = "transform:rotate(" + remaining[selectorNext] * (selector[0] === 'days' ? -15 : -6) + "deg);border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor + "";
                }

                //mask flip
                if (selector[0] === "days") {

                    if (remaining[selectorNext] * 15 <= 180
                        && remaining[selectorNext] * 15 >= 0) {
                        _thisWrapper.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask")
                            .classList.add(mainClassName + "__inner__mask--hide");
                    } else {
                        _thisWrapper.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask2")
                            .classList.remove(mainClassName + "__inner__mask--hide");
                    }

                } else if (selector[0] !== "days" && selector[0] !== "seconds") {

                    if (remaining[selectorNext] * 6 <= 180
                        && remaining[selectorNext] * 6 >= 0) {
                        _thisWrapper.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask")
                            .classList.add(mainClassName + "__inner__mask--hide");
                        _thisWrapper.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask2")
                            .classList.remove(mainClassName + "__inner__mask--hide");
                    } else {
                        _thisWrapper
                            .querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask")
                            .classList.remove(mainClassName + "__inner__mask--hide");
                        _thisWrapper
                            .querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask2")
                            .classList.add(mainClassName + "__inner__mask--hide");
                    }
                }

                //seconds
                _thisWrapper.querySelector('.' + mainClassName + '-seconds .' + mainClassName + '__inner__fill')
                    .style = "animation-name:fillSpin;border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor + "";
                _thisWrapper.querySelector('.' + mainClassName + '-seconds .' + mainClassName + '__inner__mask')
                    .style = "animation-name:maskFlip;border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.borderColor + "";
                _thisWrapper.querySelector('.' + mainClassName + '-seconds .' + mainClassName + '__inner__mask2')
                    .style = "animation-name:maskFlip;border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor + "";

                //numbers add
                _thisWrapper.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__text span")
                    .textContent = leadingZero(remaining[selector]);
            }
        }, 1000);
    });
};

// pieTimer.prototype.setter = function() {
//     var _thisWrapper = this.wrapper[0];
//     console.log(_thisWrapper[0]);
//
//     var defaults = {
//         timerLabels: [
//             {"days": "dni"},
//             {"hours": "godziny"},
//             {"minutes": "minuty"},
//             {"seconds": "sekundy"}
//         ],
//         size: 80,
//         borderSize: 7,
//         borderColor: "#bd47a0",
//         progressColor: "#36b8d4",
//         numberColor: "#000",
//         textColor: "#000",
//         countdownTo: "2020 12 05 00:00:00",
//         labels: true
//     };
//
//     var set = Object.assign({
//         countdownTo: _thisWrapper.getAttribute('data-rs-pt-end-date')
//         && _thisWrapper.getAttribute('data-rs-pt-end-date') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-end-date')
//             : defaults.countdownTo,
//         labels: _thisWrapper.getAttribute('data-rs-pt-labels')
//         && Boolean(Number(_thisWrapper.getAttribute('data-rs-pt-labels')))
//             ? _thisWrapper.getAttribute('data-rs-pt-labels')
//             : defaults.labels,
//         size: _thisWrapper.getAttribute('data-rs-pt-size')
//         && _thisWrapper.getAttribute('data-rs-pt-size') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-size')
//             : defaults.size,
//         borderSize: _thisWrapper.getAttribute('data-rs-pt-border-size')
//         && _thisWrapper.getAttribute('data-rs-pt-border-size') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-border-size')
//             : defaults.borderSize,
//         borderColor: _thisWrapper.getAttribute('data-rs-pt-border-color')
//         && _thisWrapper.getAttribute('data-rs-pt-border-color') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-border-color')
//             : defaults.borderColor,
//         progressColor: _thisWrapper.getAttribute('data-rs-pt-progress-color')
//         && _thisWrapper.getAttribute('data-rs-pt-progress-color') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-progress-color')
//             : defaults.progressColor,
//         numberColor: _thisWrapper.getAttribute('data-rs-pt-number-color')
//         && _thisWrapper.getAttribute('data-rs-pt-number-color') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-number-color')
//             : defaults.numberColor,
//         textColor: _thisWrapper.getAttribute('data-rs-pt-text-color')
//         && _thisWrapper.getAttribute('data-rs-pt-text-color') !== ''
//             ? _thisWrapper.getAttribute('data-rs-pt-text-color')
//             : defaults.textColor,
//         timerLabels: _thisWrapper.getAttribute('data-rs-pt-label-names')
//         && _thisWrapper.getAttribute('data-rs-pt-label-names') !== ''
//             ? JSON.parse(_thisWrapper.getAttribute('data-rs-pt-label-names'))
//             : defaults.timerLabels,
//     }, settings);
//
//     this.setValue = function (labels1) {
//
//         console.log('>> timerLabels: ', labels1);
//         var remainingTime = new Date(set.countdownTo) - new Date(),
//             remaining = {};
//         if (remainingTime <= 0) {
//             remaining = {
//                 days: 0,
//                 hours: 0,
//                 minutes: 0,
//                 seconds: 0
//             };
//             var allTimers = document.querySelectorAll("." + mainClassName);
//             for (var i = 0; i < allTimers.length; i++) {
//                 allTimers[i]
//                     .querySelector("." + mainClassName + "__inner")
//                     .classList.add(mainClassName + "__inner--fullFill");
//             }
//             return;
//         } else {
//             remaining = {
//                 days: Math.floor(remainingTime / (1000 * 60 * 60 * 24) % 30),
//                 hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
//                 minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
//                 seconds: Math.floor((remainingTime / 1000) % 60)
//             }
//         }
//
//         for (var t = 0; t < Object.keys(labels1).length; t++) {
//
//             //color fill
//             var next = t + 1;
//             var selector = Object.keys(labels1[t]);
//             var selectorNext = next < Object.keys(labels1).length ? Object.keys(labels1[next]) : false;
//             console.log('next, selnext', next, selectorNext);
//
//             //ustaw wlasciwy mnoznik dla zegara
//             if (selector[0] && selector[0] !== "seconds") {
//
//                 console.log('selector: ', __this);
//                 console.log('>>>>>>>>>>>>>>>', elem);
//
//                 elem.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__fill").style = "transform:rotate(" + remaining[selectorNext] * (selector[0] === 'days' ? -15 : -6) + "deg);border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor + "";
//             }
//
//             //mask flip
//             if (selector[0] === "days") {
//
//                 if (remaining[selectorNext] * 15 <= 180
//                     && remaining[selectorNext] * 15 >= 0) {
//                     elem.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask")
//                         .classList.add(mainClassName + "__inner__mask--hide");
//                 } else {
//                     elem.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask2")
//                         .classList.remove(mainClassName + "__inner__mask--hide");
//                 }
//
//             } else if (selector[0] !== "days" && selector[0] !== "seconds") {
//
//                 if (remaining[selectorNext] * 6 <= 180
//                     && remaining[selectorNext] * 6 >= 0) {
//                     elem.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask")
//                         .classList.add(mainClassName + "__inner__mask--hide");
//                     elem.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask2")
//                         .classList.remove(mainClassName + "__inner__mask--hide");
//                 } else {
//                     elem
//                         .querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask")
//                         .classList.remove(mainClassName + "__inner__mask--hide");
//                     elem
//                         .querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__inner__mask2")
//                         .classList.add(mainClassName + "__inner__mask--hide");
//                 }
//             }
//
//             //seconds
//             elem.querySelector('.' + mainClassName + '-seconds .' + mainClassName + '__inner__fill')
//                 .style = "animation-name:fillSpin;border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor + "";
//             elem.querySelector('.' + mainClassName + '-seconds .' + mainClassName + '__inner__mask')
//                 .style = "animation-name:maskFlip;border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.borderColor + "";
//             elem.querySelector('.' + mainClassName + '-seconds .' + mainClassName + '__inner__mask2')
//                 .style = "animation-name:maskFlip;border-width:" + set.borderSize + "px; top:-" + set.borderSize + "px;left:-" + set.borderSize + "px; border-color:" + set.progressColor + "";
//
//             //numbers add
//             elem.querySelector("." + mainClassName + "-" + selector + " ." + mainClassName + "__text span")
//                 .textContent = __this.leadingZero(remaining[selector]);
//         }
//     };
//
//     setInterval(this.setValue, 1000);
//
// };


var rsPieTimer = function (selector) {
    return new pieTimer(selector);
};
if (document.querySelector('.rs-pie-timer-wrapper')) {
    rsPieTimer(".rs-pie-timer-wrapper");
}