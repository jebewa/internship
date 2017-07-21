/**
 * Image url
 * @typedef {String} Url
 */

/**
 * Diff mode
 * @typedef {String} Mode - difference | fade | swipe
 */

/**
 * Float number
 * @typedef {Number} Float
 */

// jquery4
var $ = function querySelector(domElem, selector) {
  if (arguments.length < 2) {
    selector = domElem;
    domElem = document;
  }
  return domElem.querySelector(selector);
};

/**
 * @class ImageDiff
 */
var ImageDiff = function () {
  /**
   * Init ImageDiff, load new images, set diff mode
   * @param {HTMLElement} domElem - ImageDiff instance (.image-diff)
   * @param {Url} before
   * @param {Url} after
   * @param {Mode} mode
   * @public
   * @constructor
   */
  function ImageDiff(domElem, before, after, mode) {
    this.domElems = {
      before: $(domElem, '.image-diff__before img'),
      after: $(domElem, '.image-diff__after img'),
      beforeWrapper: $(domElem, '.image-diff__before'),
      afterWrapper: $(domElem, '.image-diff__after'),
      wrapper: $(domElem, '.image-diff__wrapper'),
      inner: $(domElem, '.image-diff__inner'),
      self: domElem
    }

    this.domElems.before.onload=this._handleImgLoad();
    this.domElems.after.onload=this._handleImgLoad();

    this.update(before, after, mode);
  }

  ImageDiff.modes = ['difference', 'fade', 'swipe'];

  ImageDiff.getDefaultProps = function getDefaultProps() {
    return {
      value: 1,
      width: 0, height: 0,
      after: {width:0,height:0,url:''},
      before: {width:0,height:0, url:''},
      mode: 'difference' // ImageDiff.modes
    };
  };

  // default props
  ImageDiff.prototype.props = ImageDiff.getDefaultProps();

  /**
   * load new images or change diff mode
   * @param {Url} before
   * @param {Url} after
   * @param {Mode} mode
   * @public
   */
  ImageDiff.prototype.update = function update(before, after, mode) {
    this.props = ImageDiff.getDefaultProps();

    this.props.before.url = before;
    this.props.after.url = after;

    this.domElems.before.src = before;
    this.domElems.after.src = after;

    this._initMode(mode);
  };

  /**
   * @param {Float} value - 0..1
   * @public
   */
  ImageDiff.prototype.swipe = function swipe(value) {
    this._updateValue('swipe', value);
    this.domElems.wrapper.style.width = (this.props.width * (1. - value)) + 'px';
  };

  /**
   * @param {Float} value - 0..1
   * @public
   */
  ImageDiff.prototype.fade = function fade(value) {
    this._updateValue('fade', value);
    this.domElems.wrapper.style.opacity = 1. - value;
  };

  /**
   * @param {Float} value - 0..1
   * @public
   */
  ImageDiff.prototype.tune = function tune(value) {
    var tuner = this[this.props.mode];
    tuner && tuner.call(this, value);
  };

  ImageDiff.prototype._updateValue = function _updateValue(mode, value) {
    if (value < 0-1e-6 || value > 1.+1e-6) {
      throw mode + ' value must be within 0..1, but given:' + value;
    }
    if (mode && this.props.mode !== mode) {
      throw 'current diff mode is ' + this.props.mode + ', not ' + mode;
    }
    if (this.props.mode === 'difference') {
      throw 'current diff mode (' + this.props.mode + ') is not tunable';
    }
    this.props.value = value;
  };

  ImageDiff.prototype._initSize = function _initSize(width, height) {

    if (this.props.width && this.props.height) {
      return;
    }

    this.props.width = width;
    this.props.height = height;

    (function initDomElems(argument) {
      var _this = this;
      var sizes = {width:width, height:height};

      Object.keys(sizes).forEach(function(key) {
        var val = sizes[key];
        ['afterWrapper', 'beforeWrapper', 'wrapper', 'inner', 'self'].forEach(function (elem) {
          _this.domElems[elem].style[key] = val + 'px';
        });
      });
    }).call(this);
  };

  ImageDiff.prototype._initMode = function _initMode(mode) {
    if (!ImageDiff.modes.includes(mode)) {
      throw 'Given mode «' + mode + '» not contained in collection ' + ImageDiff.modes;
    }
    this.props.mode = mode;
    this.domElems.inner.className = 'image-diff__inner image-diff__inner--' + mode;
    this.domElems.wrapper.style.opacity = 1;
    this.domElems.wrapper.style.width = this.props.width;
  };

  ImageDiff.prototype._handleImgLoad = function _handleImgLoad() {
    var _this = this;

    return function () {
      var img = this;
      _this._initSize(img.width, img.height);
    };
  };

  return ImageDiff;
}();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageDiff;
} else if (window) {
  window.ImageDiff = ImageDiff;
}



// !!!!!!!!!!!!!!!OPENSOURCE IMAGEDIFF CODE ABOVE; OWN ADDITIONS, ADJUSTMENTS AND OTHER CODE BELOW!!!!!!!!!!!





// first to give a standard image as first source for the main image to avoid ever having a white screen in the viewer
// update: select first thumb src on load
// update: here the local stored div is put that determines which image set to take + it takes the first image from that set and places it in the viewer automatically

var anjouChoice = localStorage.getItem("myValue");
console.log(anjouChoice);
if(anjouChoice == "first_one") {
    document.getElementById("thumbs1").style.display = "block";
    document.getElementById('im').src = document.getElementById('first_thumb').src;
    document.getElementById("first_des").style.display = "block";
}
else if (anjouChoice == "second_one") {
    document.getElementById("thumbs2").style.display = "block";
    document.getElementById('im').src = document.getElementById('second_thumb').src;
    document.getElementById("first_des").style.display = "block";
}
else if(anjouChoice == "third_one") {
    document.getElementById("thumbs3").style.display = "block";
    document.getElementById('im').src = document.getElementById('third_thumb').src;
    document.getElementById("first_des").style.display = "block";
}
if(anjouChoice == "fourth_one") {
    document.getElementById("thumbs4").style.display = "block";
    document.getElementById('im').src = document.getElementById('fourth_thumb').src;
    document.getElementById("first_des").style.display = "none";
    document.getElementById("second_des").style.display = "block";
}
else if(anjouChoice == "fifth_one") {
    document.getElementById("thumbs5").style.display = "block";
    document.getElementById('im').src = document.getElementById('fifth_thumb').src;
    document.getElementById("first_des").style.display = "none";
    document.getElementById("second_des").style.display = "block";
}
else if(anjouChoice == "sixth_one") {
    document.getElementById("thumbs6").style.display = "block";
    document.getElementById('im').src = document.getElementById('sixth_thumb').src;
    document.getElementById("first_des").style.display = "none";
    document.getElementById("second_des").style.display = "block";
}

// function for defining which one was selected



//    function to change first(main) images source --> gets source from clicked thumbnail and assigns it to image src
// update: from the selection button it either changes the source of the first image or the second with the source of the selected thumbnail
function changeIt(element) {
    var selIm = document.getElementById("selectImage").value;
    console.log(element);
    // var descrip = element.alt; for potential append of image specific information to modal
    var thing = element.src;
    if (selIm === "mainIm") {
        document.getElementById('im').src = thing;
        jQuery("#list_first").remove();                       // dynamically append the name of the image(source) to a list element in the
                                                              // description div and remove this again when a new one is selected
                                                              // in this case it is for the source of the image but you could also do it
                                                              // for a custom description for the image
        // jQuery("#description").append('<li id="list_first"><strong style="color:darkred"> Image 1: </strong>' + descrip + '</li>'); for potential append of image specific information to modal
        document.getElementById("brightness-slider").value = 1;   // set brightness back to 0 when image is changed
        if (document.getElementById("zooming").value !== "100%") {
            document.getElementById("zooming").value = "100%";        // Only when image 1 is changed: set zoom back to 100%
            document.getElementById("image-diff").style.overflow = "hidden";
            if (isFirefox === false) {
                var firstDiv = document.getElementById ("image-diff__inner");
                firstDiv.style.zoom = "100%";
            }

            else if (isFirefox === true)  {         // --> also when image 2 is changed?

                var val = 1
                var firstDiv = document.getElementById ("image-diff__inner");

                var dd="scale("+ val +")";

                firstDiv.style.MozTransform = dd;
                firstDiv.style.MozTransformOrigin = "0 0";
            }
    }


    }

    else if (selIm === "compIm") {
        document.getElementById('comp').src = thing;
        document.getElementById("image-diff").style.content = "Image 2";  //try to change content dynamically but does not work
        jQuery("#list_second").remove();
        // jQuery("#description").append('<li id="list_second"><strong style="color:darkred"> Image 2: </strong>' + descrip + '</li>'); for potential append of image specific information to modal
        document.getElementById("brightness-slider").value = 1;         // brightness back to 0 when im2 is changed
    }
    var bright = document.getElementById('im');
    var brightComp = document.getElementById('comp');
    bright.setAttribute('style', 'filter:brightness(1); -webkit-filter:brightness(1); -moz-filter:brightness(1)');      // at request: sets brightness back after changing of image
    brightComp.setAttribute('style', 'filter:brightness(1); -webkit-filter:brightness(1); -moz-filter:brightness(1)');  // probably less redundant way to do this!

}




//    Contrary to the original code there is no direct url for the variables but get them from the HTML so they can be easily changed
beforeUrl = document.getElementById("im").src,
    afterUrl = document.getElementById('comp').src;


var imageDiff = new ImageDiff(document.getElementById('image-diff'), beforeUrl, afterUrl, 'swipe');
var control = $('.image-diff__control');
imageDiff.domElems.before.addEventListener('load', function(){
    control.style.width = imageDiff.domElems.before.width;
    tune();
});

control.style.width = imageDiff.domElems.before.width;
control.addEventListener('input', function(){
    tune();
});

var modeRadio = $('.image-diff__mode-radio-group'),
    modeRadioVal;
modeRadio.addEventListener('click', function() {
    var mode = document.querySelector('input[name="mode"]:checked').value;
    if (mode !== modeRadioVal) {
        imageDiff.update(document.getElementById("im").src, document.getElementById('comp').src, mode); // first the two parameters were
        mode = modeRadioVal;                                                                            // 'beforeUrl' and 'afterUrl'
        tune();                                                                                 //--> changed it so the images stay the same when
    }                                                                                           // changing compare mode!! 'great succes ;)'
});

function tune() {
    if (imageDiff.props.mode !== 'difference') {
        imageDiff.tune(+control.value);
        control.disabled = false;
    } else {
        control.disabled = true;
    }
}




//Simple zoom function from https://www.codeproject.com/Questions/566986/Howplustopluszoomplusdivpluscontentplusbyplususing
//    Made it zoom on the wall div --> problem: also zooms the slider and zoom buttons
//    function zoomings(optionSel)
//    {
//        var OptionSelected = optionSel.selectedIndex;
//        var val = optionSel.options[OptionSelected].text;
////alert(val);
//        var div = document.getElementById ("image-diff");
//        div.style.zoom = val;
//    }


//code Below even better: makes it also function in Firefox; explorer still poses a lot of problems
// because of the problematic div zooming, I changed it to zooming on the images --> assigned first image to original variable and
// assigned new variable with the same process to the other image --> does not work! Second image gets zoomed but contains its position thus centering in and over the first image
// update/fix: after trying to zoom on all the divs inside the image-diff, it turns out that it is "image-diff__inner" is the way to go
// --> perfectly zooms on the wanted section. Next: better orientation within the zooming then the scrollbars --> in css
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
function zoomings(optionSel)
{
    console.log(isFirefox);

    if (isFirefox === true)
    {   var OptionSelected = optionSel.selectedIndex;
        var optionT = document.getElementById ("zooming");
        var len=optionT.options[OptionSelected].text.length-1;
        var val = optionT.options[OptionSelected].text.substring(0,len)/100;
        var firstDiv = document.getElementById ("image-diff__inner");


        var dd="scale("+ val +")";
        console.log(dd);
        firstDiv.style.MozTransform = dd;
        firstDiv.style.MozTransformOrigin = "0 0";
        if (val === 1) {
            document.getElementById("image-diff").style.overflow = "hidden";    // No scroll-bars when zoom 100%
        }
        else{
            document.getElementById("image-diff").style.overflow = "scroll";    // Scroll-bars when zoom not 100%
        }

    }
    else{
        var OptionSelected = optionSel.selectedIndex;
        var val = optionSel.options[OptionSelected].text;
        var firstDiv = document.getElementById ("image-diff__inner");
        firstDiv.style.zoom = val;
        if (val === "100%") {
            document.getElementById("image-diff").style.overflow = "hidden";    // No scroll-bars when zoom 100%
        }
        else{
            document.getElementById("image-diff").style.overflow = "scroll";    // Scroll-bars when zoom not 100%
        }

    }
}


// alternative zoomin with a slider! But still need to include in changing images + overflow hidden when value 1
// works in Firefox and chrome

// document.getElementById('zoom-slider').addEventListener('input', function (e) {
//     var amount = this.value;
//     var bright = document.getElementById('im');
//     // Created two variables to control both images brightness simultaniously
//     var brightComp = document.getElementById('comp');
//     document.getElementById ("image-diff__inner").style.zoom = amount;
//     document.getElementById ("image-diff__inner").style.MozTransform = "scale("+ amount +")";
//     console.log(amount);
//     if (amount === "1") {
//         document.getElementById("image-diff").style.overflow = "hidden";    // No scroll-bars when zoom 100%
//     }
//     else {
//         document.getElementById("image-diff").style.overflow = "scroll";
//     }
// });


//brightness control slider. --> see http://jsfiddle.net/cjwprostar/0bdwzej0/ for slider and http://stackoverflow.com/questions/17754604/want-to-create-a-simple-image-brightness-control-slider for (parts of) code
    document.getElementById('brightness-slider').addEventListener('input', function (e) {
        var amount = this.value;
        var bright = document.getElementById('im');
        // Created two variables to control both images brightness simultaniously
        var brightComp = document.getElementById('comp');
        bright.setAttribute('style', 'filter:brightness(' + amount + '); -webkit-filter:brightness(' + amount + '); -moz-filter:brightness(' + amount + ')');
        brightComp.setAttribute('style', 'filter:brightness(' + amount + '); -webkit-filter:brightness(' + amount + '); -moz-filter:brightness(' + amount + ')');
    });



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("info");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "flex"; //changed the display style from block to flex to let it expand together with the content
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// the calling of the api and dynamically placing it into the modal will not work with $.get (--> unclear why).
// Instead use jQuery.get. But the lists and other things will not be created for reasons unclear
// update: works when replacing $ with 'jQuery'
//    jQuery("#searchRef").on("click", function() {
function searchCore() {
    jQuery("#core").empty(); // emptying the div before appending new references
    var searchRef = (jQuery("#requestRef").val().split(" ")); // if there are more than one searchwords: split them and
    //  inside an array --> do this with jquery instead of js
    searchRef = searchRef.join("%20");  // splitting and joining the input because when there are multiple search-terms they have to be joined
                                        // into one string with %20 to create an AND search
    var whatever = jQuery.get({
        url: "https://core.ac.uk:443/api-v2/articles/search/"+ searchRef +"?page=1&pageSize=3&metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=mD28Egkx5ZV7SdjXsMC3FrhLYRewoayG"
    })
        .done(function (response) {
            var dataArray = response.data;
            console.log(dataArray);
            if (dataArray == null) {                // do not cause error and empty div when there is no result for a query
                jQuery("#core").append("No results matching this search!");
            }
            else {
                for (var i = 0; i < 3; i++) {                  // --> only the first three references
                    var currentItems = dataArray[i];
                    var authors = currentItems.authors;
                    var title = currentItems.title;
                    var year = currentItems.datePublished;
                    var fullText = '<a href="' + currentItems.fulltextUrls[0] + '" target="_blank">' + currentItems.fulltextUrls[0] + "</a>";       // target _blank for opening links in new tab
                    var result = "<br><li>" + authors + ", " + title + ", " + year + ", " + fullText + "</li>";
                    jQuery("#core").append(result); // could maybe also append div as a whole together with the content
                }
            }
        });
    return false
}


