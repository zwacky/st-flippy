var StFlippy = /** @class */ (function () {
    function StFlippy() {
        this.events = { flipEvents: [], flipBackEvents: [] };
    }
    // private options = { duration: 400, timingFunction: 'ease-in' };
    StFlippy.prototype.componentWillLoad = function () {
        this.init();
    };
    /**
     * add options to the element (duration, timingfunction).
     */
    StFlippy.prototype.componentDidLoad = function () {
        var _this = this;
        var duration = this.flipDuration || 400;
        var timingFunction = this.flipTimingFunction || 'ease-in';
        ['front', 'back']
            .forEach(function (key) {
            var el = _this.element.querySelector(".st-flippy__" + key);
            el['style'].transition = "all " + duration / 1000 + "s " + timingFunction;
        });
    };
    /**
     * handling the `is-flipped` attribute.
     * usually this is used together with modern frameworks.
     */
    StFlippy.prototype.componentWillUpdate = function () {
        if (this.isFlipped !== undefined) {
            this.flipState = this.isFlipped;
        }
    };
    StFlippy.prototype.init = function () {
        var _this = this;
        if (this.isFlipped !== undefined) {
            this.flipState = this.isFlipped;
        }
        else if (this.flipEvents !== undefined) {
            ['flipEvents', 'flipBackEvents'].forEach(function (key) {
                _this.events[key] = (_this[key]) ?
                    _this[key].split(',') :
                    [];
            });
            // adding event listeners
            var allEvents_1 = this.events.flipEvents.concat(this.events.flipBackEvents);
            allEvents_1
                .filter(function (eventType, index) { return allEvents_1.indexOf(eventType) === index; })
                .forEach(function (eventType) { return _this.element.addEventListener(eventType, function (evt) { return _this.processFlip(evt); }); });
            this.flipState = false;
        }
    };
    StFlippy.prototype.processFlip = function (evt) {
        var eventType = evt.type;
        if (this.flipState && this.events.flipBackEvents.indexOf(eventType) !== -1) {
            this.flipState = !this.flipState;
        }
        else if (!this.flipState && this.events.flipEvents.indexOf(eventType) !== -1) {
            this.flipState = !this.flipState;
        }
    };
    StFlippy.prototype.render = function () {
        return (h("div", { "c": "st-flippy " + (this.flipState ? 'st-flippy--flipped' : '') },
            h("div", { "c": { "st-flippy__front": true } },
                h(0, { "a": { "name": "front" } })),
            h("div", { "c": { "st-flippy__back": true } },
                h(0, { "a": { "name": "back" } }))));
    };
    return StFlippy;
}());
export { StFlippy };
