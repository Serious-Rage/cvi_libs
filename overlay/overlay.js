var overlay = {
    version: 1.1,
    released: '2009-07-24 17:58:00',

    init: function(option) {
        function getIfClass(v, s) {
            var c = v.className.split(' ');
            for (var j = 0; j < c.length; j++) {
                if (c[j].indexOf(s) == 0) {
                    return true;
                }
            }
            return false;
        };

        function getByClass(v) {
            var d = document.getElementsByTagName('a'),
                i, j, h, c, e = new Array();
            for (i = 0; i < d.length; i++) {
                h = d[i];
                c = h.className.split(' ');
                for (j = 0; j < c.length; j++) {
                    if (c[j] == v) {
                        e.push(h);
                        break;
                    }
                }
            }
            return e;
        };
        var i, t, x, u, l, isIE = !window.opera && document.all ? true : false;
        l = getByClass(option || 'overlay');
        for (i = 0; i < l.length; i++) {
            u = l[i].getAttribute('href');
            t = l[i].innerHTML;
            t = t.replace(/(<([^>]+)>)/ig, "");
            if (getIfClass(l[i], "title")) {
                t = l[i].title || t;
            }
            x = t || l[i].title || l[i].href;
            if (isIE) {
                l[i].onclick = new Function('overlay._create("' + u + '","' + x + '");return false;');
            } else {
                l[i].setAttribute("onclick", "overlay._create('" + u + "','" + x + "');return false;");
            }
        }
        return false;
    },

    _create: function(l, v) {
        if (!overlay.G("ol")) {
            l = typeof(l) == 'string' ? l : "";
            var o, p, w, h, f, j = 0,
                t = 1,
                s = 34,
                isIE, isG6;
            isIE = !window.opera && document.all ? true : false;
            isG6 = isIE && window.XMLHttpRequest ? true : false;
            o = overlay.T("body");
            p = document.createElement('div');
            p.id = "ol";
            p.style.opacity = 0;
            o.appendChild(p);
            p.innerHTML = '<div id="fd"><\/div>' + '<table id="tb" class="ol" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody>' + '<tr><td width="' + s + '" height="' + s + '" class="ol_lt" id="tb_lt"><\/td><td height="' + s + '" class="ol_t"><\/td><td width="' + s + '" height="' + s + '" class="ol_rt"><\/td><\/tr>' + '<tr><td width="' + s + '" class="ol_l"><\/td><td id="ol_ct" class="ol_ct" height="100%"><iframe src="" id="ol_if" name="ol_if" width="100%" height="' + (window.opera ? 90 : 100) + '%" hspace="0" vspace="0" frameborder="0" scrolling="auto"><\/iframe><\/td><td width="' + s + '" class="ol_r"><\/td><\/tr>' + '<tr><td width="' + s + '" height="' + s + '" class="ol_lb"><\/td><td height="' + s + '" class="ol_b"><\/td><td width="' + s + '" height="' + s + '" class="ol_rb"><\/td><\/tr>' + '<\/tbody><\/table><div id="cl" title="Click to close" onClick="overlay._remove();" onmouseover="overlay._over();" onmouseout="overlay._out();"><\/div>' + '<div id="tx"><div id="tl"><a class="ex" style="" href="' + l + '" target="_blank" title="Open page in new window">' + v + '<\/a><\/div><\/div>';
            if (isG6 || isIE) {
                w = document.documentElement.clientWidth;
                h = document.documentElement.clientHeight;
                if (w <= 0 || h <= 0) {
                    w = o.clientWidth;
                    h = o.clientHeight;
                }
                if (w > 0 && h > 0) {
                    p.style.width = w + 'px';
                    p.style.height = h + 'px';
                    o = overlay.G("fd");
                    o.style.width = w + 'px';
                    o.style.height = h + 'px';
                    o = overlay.G("ol_ct");
                    o.style.width = (w - s - s) + 'px';
                    o.style.height = (h - s - s) + 'px';
                    if (typeof document.documentElement != 'undefined') {
                        p.style.left = document.documentElement.scrollLeft + 'px';
                        p.style.top = document.documentElement.scrollTop + 'px';
                    } else {
                        p.style.left = overlay.T('body').scrollLeft + 'px';
                        p.style.top = overlay.T('body').scrollTop + 'px';
                    }
                    if (window.attachEvent) {
                        window.attachEvent('onscroll', overlay._scroll);
                        window.attachEvent('onresize', overlay._resize);
                    }
                }
            } else {
                overlay.G("cl").className = "ol_cl";
            }
            if (!isIE) {
                s = 0.2;
                f = overlay.G("ol_if");
                if (p.timer) {
                    window.clearInterval(p.timer);
                }
                p.timer = window.setInterval(function() {
                    p.style.opacity = j;
                    j += s;
                    if (j > t) {
                        window.clearInterval(p.timer);
                        p.style.opacity = 1;
                        f.src = l;
                        f.style.backgroundColor = 'white';
                    }
                }, 50);
            } else {
                p.style.opacity = 1;
                f = overlay.G("ol_if");
                f.src = l;
                f.style.backgroundColor = 'white';
            }
        }
        return false;
    },

    _remove: function() {
        if (overlay.G("ol")) {
            if (window.detachEvent) {
                window.detachEvent('onscroll', overlay._scroll);
                window.detachEvent('onresize', overlay._resize);
            }
            document.body.removeChild(overlay.G('ol'));
        }
        if (window.opera) {
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        }
        return false;
    },

    _resize: function(e) {
        if (!e) {
            e = window.event;
        }
        var w = 0,
            h = 0,
            s = 34,
            o = overlay.G('ol');
        if (o) {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
            if (w <= 0 || h <= 0) {
                w = overlay.T('body').clientWidth;
                h = overlay.T('body').clientHeight;
            }
            if (w > 0 && h > 0) {
                o.style.width = w + 'px';
                o.style.height = h + 'px';
                o = overlay.G("fd");
                o.style.width = w + 'px';
                o.style.height = h + 'px';
                o = overlay.G("ol_ct");
                o.style.width = (w - s - s) + 'px';
                o.style.height = (h - s - s) + 'px';
            }
        }
        return false;
    },

    _scroll: function(e) {
        if (!e) {
            e = window.event;
        }
        var o = overlay.G('ol');
        if (o) {
            if (typeof document.documentElement != 'undefined') {
                o.style.left = document.documentElement.scrollLeft + 'px';
                o.style.top = document.documentElement.scrollTop + 'px';
            } else {
                o.style.left = overlay.T('body').scrollLeft + 'px';
                o.style.top = overlay.T('body').scrollTop + 'px';
            }
        }
        return false;
    },

    _over: function() {
        var o = overlay.G("tb_lt");
        if (o && o.className == "ol_lt") {
            o.className = "ol_cl";
        }
        return false;
    },
    _out: function() {
        if (overlay.G("ol")) {
            var o = overlay.G("tb_lt");
            if (o && o.className == "ol_cl") {
                o.className = "ol_lt";
            }
        }
        return false;
    },
    G: function(v) {
        return (document.getElementById(v));
    },
    T: function(v) {
        return (document.getElementsByTagName(v)[0]);
    }
}

var overlayOnload = window.onload;
window.onload = function() {
    if (overlayOnload) overlayOnload();
    overlay.init('overlay');
}
