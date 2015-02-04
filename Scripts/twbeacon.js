"object" != typeof JSON && (JSON = {}),
function () {
    "use strict";

    function f(a) {
        return 10 > a ? "0" + a : a
    }

    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function str(a, b) {
        var c, d, e, f, g, h = gap,
            i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
            case "string":
                return quote(i);
            case "number":
                return isFinite(i) ? String(i) : "null";
            case "boolean":
            case "null":
                return String(i);
            case "object":
                if (!i) return "null";
                if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                    for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
                    return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                }
                if (rep && "object" == typeof rep)
                    for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                else
                    for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function (a, b, c) {
        var d;
        if (gap = "", indent = "", "number" == typeof c)
            for (d = 0; c > d; d += 1) indent += " ";
        else "string" == typeof c && (indent = c); if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
        return str("", {
            "": a
        })
    }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e)
                for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
            "": j
        }, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}();
var TwyoBeacon = function () {
    function a() {
        if (!c) {
            if ("undefined" != typeof window.tyoBeaconData && window.tyoBeaconData.constructor === {}.constructor) return c = window.tyoBeaconData;
            var a = document.getElementById("metatyotracksettings");
            if ('undefined' != typeof a && null !== a){
	c = {
                t: a.getAttribute("content"),
                i: a.getAttribute("data-identifier"),
                y: a.getAttribute("data-type"),
                u: a.getAttribute("data-link")
            };
	    }
	    else{
            c = {
                t: document.title,
                i: window.location.hostname,
                y: 'ext',
                u: window.location.protocol + "//" + window.location.hostname
            }
	    }
        }
        return c
    }

    function b() {
        var a = document.cookie.split(d + "=");
        return 2 === a.length ? JSON.parse(a.pop().split(";").shift()) : []
    }
    var c, d = "tyo_beacon",
        e = "//dev.tetonwyo.org/scripts/twbeacon.ashx";
    return function (b) {
        var c = new Image,
            d = "?t=" + a().t + "&u=" + a().u + "&y=" + a().y + "&i=" + a().i + "&allow=true";
        c.src = encodeURI(("https:" === location.protocol ? "https:" : "http:") + b + d)
    }(e), {
        getList: b
    }
}();