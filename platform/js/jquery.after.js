// jquery loaded, restore original environment
if (window.module) {
    module = window.module;
}

// prepare for loading jquery mobile
$(document).on("mobileinit", function () {
    // reset this to get rid of extra 1px of height during page transitioning
    $.mobile.defaultHomeScroll = 0;

    // use height of page container
    $.mobile.getScreenHeight = function () {
        // Native innerHeight returns more accurate value for this across platforms,
        // jQuery version is here as a normalized fallback for platforms like Symbian
        return $.mobile.pageContainer.innerHeight() || window.innerHeight || $.mobile.window.height();
    };
});