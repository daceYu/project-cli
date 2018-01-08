(function(e, m) {
    function g() {
        var h = j.getBoundingClientRect().width;
        540 < h / a && (h = 540 * a);
        h = h / 10;
        j.style.fontSize = h + "px";
        k.rem = e.rem = h
    }
    var b = location.pathname.split("/"); - 1 < b.indexOf("public") && (b = b[b.indexOf("public") - 1].split("_")[0]);
    var b = e.document,
        j = b.documentElement,
        f = b.querySelector('meta[name="viewport"]'),
        d = b.querySelector('meta[name="flexible"]'),
        a = 0,
        c = 0,
        l, k = m.flexible || (m.flexible = {});
    if (f) {
        if (console.warn("将根据已有的meta标签来设置缩放比例"),
            d = f.getAttribute("content").match(/initial\-scale=([\d\.]+)/)) c = parseFloat(d[1]), a = parseInt(1 / c)
    } else if (d) {
        var i = d.getAttribute("content");
        i && (d = i.match(/initial\-dpr=([\d\.]+)/), i = i.match(/maximum\-dpr=([\d\.]+)/), d && (a = parseFloat(d[1]), c = parseFloat((1 / a).toFixed(2))), i && (a = parseFloat(i[1]), c = parseFloat((1 / a).toFixed(2))))
    }
    if (!a && !c) e.navigator.appVersion.match(/android/gi), c = e.navigator.appVersion.match(/iphone/gi), d = e.devicePixelRatio, a = c ? 3 <= d && (!a || 3 <= a) ? 3 : 2 <= d && (!a || 2 <= a) ? 2 : 1 : 1, c = 1 / a;
    j.setAttribute("data-dpr",
        a);
    f || (f = b.createElement("meta"), f.setAttribute("name", "viewport"), f.setAttribute("content", "initial-scale=" + c + ", maximum-scale=" + c + ", minimum-scale=" + c + ", user-scalable=no"), j.firstElementChild ? j.firstElementChild.appendChild(f) : (c = b.createElement("div"), c.appendChild(f), b.write(c.innerHTML)));
    e.addEventListener("resize", function() {
        clearTimeout(l);
        l = setTimeout(g, 300)
    }, !1);
    e.addEventListener("pageshow", function(a) {
        a.persisted && (clearTimeout(l), l = setTimeout(g, 300))
    }, !1);
    "complete" === b.readyState ? g() :
        b.addEventListener("DOMContentLoaded", function() {
            g()
        }, !1);
    g();
    k.dpr = e.dpr = a;
    k.refreshRem = g;
    k.rem2px = function(a) {
        var b = parseFloat(a) * this.rem;
        "string" === typeof a && a.match(/rem$/) && (b += "px");
        return b
    };
    k.px2rem = function(a) {
        var b = parseFloat(a) / this.rem;
        "string" === typeof a && a.match(/px$/) && (b += "rem");
        return b
    }
})(window, window.lib || (window.lib = {}))

