/**
 * Opreate
 * Author: yugang <yugang@myhexin.com>
 */

if (!$) throw new Error('Error! need Zepto or jQuery.');

/**
 * style prefix 
 * param {String} style => the prop should to prefix
 * return the prop prefixed
 */
let prefixStyle = (style) => {
    var elementStyle = document.createElement('div').style;
    var vendor = (function () {
        var transformNames = {
            webkit: 'webkitTransform',
            Moz: 'MozTransform',
            O: 'OTransform',
            ms: 'msTransform',
            standard: 'transform'
        }
        for (var key in transformNames) {
            if (elementStyle[transformNames[key]] !== undefined) {
                return key
            }
        }
        return false
    })()

    if (vendor === false) {
        return false
    } else if (vendor === 'standard') {
        return style
    } else {
        var prop = "-" + vendor.charAt(0).toLowerCase() + vendor.substr(1) + "-" + style.charAt(0).toUpperCase() + style.substr(1);
        return prop;
    }
}


export default {prefixStyle}
