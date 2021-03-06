/* 
=========================================================================
   JSManipulate jQuery Plugin v1.0 (2011-08-01)

Javascript image filter & effect library

Developed by Joel Besada (http://www.joelb.me)
Demo page: http://www.joelb.me/jsmanipulate

        PLEASE DO NOT DISTRIBUTE
========================================================================
*/

var filterUtils = {
    HSVtoRGB: function(b, a, c) {
        var g, f, d, e = Math.floor(b * 6),
            h = b * 6 - e,
            b = c * (1 - a),
            j = c * (1 - h * a),
            a = c * (1 - (1 - h) * a);
        switch (e % 6) {
            case 0:
                g = c;
                f = a;
                d = b;
                break;
            case 1:
                g = j;
                f = c;
                d = b;
                break;
            case 2:
                g = b;
                f = c;
                d = a;
                break;
            case 3:
                g = b;
                f = j;
                d = c;
                break;
            case 4:
                g = a;
                f = b;
                d = c;
                break;
            case 5:
                g = c, f = b, d = j
        }
        return [g * 255, f * 255, d * 255]
    },
    RGBtoHSV: function(b, a, c) {
        b /= 255;
        a /= 255;
        c /= 255;
        var g = Math.max(b, a, c),
            f = Math.min(b, a, c),
            d, e = g - f;
        if (g === f) d = 0;
        else {
            switch (g) {
                case b:
                    d = (a - c) / e + (a < c ? 6 : 0);
                    break;
                case a:
                    d = (c - b) / e + 2;
                    break;
                case c:
                    d = (b - a) / e + 4
            }
            d /=
                6
        }
        return [d, g === 0 ? 0 : e / g, g]
    },
    getPixel: function(b, a, c, g, f) {
        var d = (c * g + a) * 4;
        if (a < 0 || a >= g || c < 0 || c >= f) return [b[(this.clampPixel(c, 0, f - 1) * g + this.clampPixel(a, 0, g - 1)) * 4], b[(this.clampPixel(c, 0, f - 1) * g + this.clampPixel(a, 0, g - 1)) * 4 + 1], b[(this.clampPixel(c, 0, f - 1) * g + this.clampPixel(a, 0, g - 1)) * 4 + 2], b[(this.clampPixel(c, 0, f - 1) * g + this.clampPixel(a, 0, g - 1)) * 4 + 3]];
        return [b[d], b[d + 1], b[d + 2], b[d + 3]]
    },
    gaussian: function() {
        return new function() {
            this.haveNextGaussian = !1;
            this.nextGaussian = 0;
            this.random = function() {
                if (this.haveNextGaussian) return this.haveNextGaussian = !1, this.nextGaussian;
                else {
                    var b, a, c;
                    do b = 2 * Math.random() - 1, a = 2 * Math.random() - 1, c = b * b + a * a; while (c >= 1 || c === 0);
                    c = Math.sqrt(-2 * Math.log(c) / c);
                    this.nextGaussian = a * c;
                    this.haveNextGaussian = !0;
                    return b * c
                }
            }
        }
    },
    clampPixel: function(b, a, c) {
        return b < a ? a : b > c ? c : b
    },
    triangle: function(b) {
        b = this.mod(b, 1);
        return 2 * (b < 0.5 ? b : 1 - b)
    },
    mod: function(b, a) {
        var c = parseInt(b / a, 10);
        b -= c * a;
        if (b < 0) return b + a;
        return b
    },
    mixColors: function(b, a, c) {
        var g = this.linearInterpolate(b, a[0], c[0]),
            f = this.linearInterpolate(b, a[1], c[1]),
            d = this.linearInterpolate(b,
                a[2], c[2]),
            b = this.linearInterpolate(b, a[3], c[3]);
        return [g, f, d, b]
    },
    linearInterpolate: function(b, a, c) {
        return a + b * (c - a)
    },
    bilinearInterpolate: function(b, a, c, g, f, d) {
        var e = c[0],
            h = c[1],
            j = c[2],
            k = g[0],
            n = g[1],
            l = g[2],
            t = f[0],
            q = f[1],
            o = f[2],
            m = f[3],
            p = d[0],
            r = d[1],
            f = d[2],
            s = d[3],
            d = 1 - b,
            u = 1 - a,
            c = d * c[3] + b * g[3],
            c = u * c + a * (d * m + b * s),
            e = u * (d * e + b * k) + a * (d * t + b * p),
            h = u * (d * h + b * n) + a * (d * q + b * r);
        return [e, h, u * (d * j + b * l) + a * (d * o + b * f), c]
    },
    tableFilter: function(b, a, c, g) {
        for (var f = 0; f < g; f++)
            for (var d = 0; d < c; d++)
                for (var e = (f * c + d) * 4, h = 0; h < 3; h++) b[e +
                    h] = a[b[e + h]]
    },
    convolveFilter: function(b, a, c, g) {
        var f = [],
            d, e;
        d = e = Math.sqrt(a.length);
        d = parseInt(d / 2, 10);
        for (var h = parseInt(e / 2, 10), j = 0; j < g; j++)
            for (var k = 0; k < c; k++) {
                for (var n = (j * c + k) * 4, l = 0, t = 0, q = 0, o = -d; o <= d; o++)
                    for (var m = j + o, m = 0 <= m && m < g ? m * c : j * c, p = e * (o + d) + h, r = -h; r <= h; r++) {
                        var s = a[p + r];
                        if (s !== 0) {
                            var u = k + r;
                            0 <= u && u < c || (u = k);
                            u = (m + u) * 4;
                            l += s * b[u];
                            t += s * b[u + 1];
                            q += s * b[u + 2]
                        }
                    }
                f[n] = parseInt(l + 0.5, 10);
                f[n + 1] = parseInt(t + 0.5, 10);
                f[n + 2] = parseInt(q + 0.5, 10);
                f[n + 3] = b[n + 3]
            }
        for (a = 0; a < f.length; a++) b[a] = f[a]
    },
    transformFilter: function(b,
        a, c, g) {
        for (var f = [], d = [], e = 0; e < b.length; e++) d[e] = b[e];
        for (e = 0; e < g; e++)
            for (var h = 0; h < c; h++) {
                var j = (e * c + h) * 4;
                a.apply(this, [h, e, f]);
                var k = Math.floor(f[0]),
                    n = Math.floor(f[1]),
                    l = f[0] - k,
                    t = f[1] - n,
                    q, o, m;
                k >= 0 && k < c - 1 && n >= 0 && n < g - 1 ? (k = (c * n + k) * 4, q = [b[k], b[k + 1], b[k + 2], b[k + 3]], o = [b[k + 4], b[k + 5], b[k + 6], b[k + 7]], m = [b[k + c * 4], b[k + c * 4 + 1], b[k + c * 4 + 2], b[k + c * 4 + 3]], k = [b[k + (c + 1) * 4], b[k + (c + 1) * 4 + 1], b[k + (c + 1) * 4 + 2], b[k + (c + 1) * 4 + 3]]) : (q = this.getPixel(b, k, n, c, g), o = this.getPixel(b, k + 1, n, c, g), m = this.getPixel(b, k, n + 1, c, g), k = this.getPixel(b,
                    k + 1, n + 1, c, g));
                l = this.bilinearInterpolate(l, t, q, o, m, k);
                d[j] = l[0];
                d[j + 1] = l[1];
                d[j + 2] = l[2];
                d[j + 3] = l[3]
            }
        for (a = 0; a < d.length; a++) b[a] = d[a]
    }
};

function BlurFilter() {
    this.name = "Blur";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        amount: 3
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 10
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = c << 2,
            f = b.height,
            d = b.data,
            e;
        e = a.amount;
        e < 0 && (e = 0);
        e = e >= 2.5 ? 0.98711 * e - 0.9633 : e >= 0.5 ? 3.97156 - 4.14554 * Math.sqrt(1 - 0.26891 * e) : 2 * e * (3.97156 - 4.14554 * Math.sqrt(0.865545));
        var h = e * e,
            j = h * e,
            k = 1.57825 + 2.44413 * e + 1.4281 * h + 0.422205 * j;
        e = (2.44413 * e + 2.85619 * h + 1.26661 * j) / k;
        for (var h = -(1.4281 * h + 1.26661 * j) / k, j = 0.422205 * j / k, k = 1 - (e + h + j), n = 0, l, t, q,
                o, m, p, n = 0; n < 3; n++)
            for (var r = 0; r < f; r++) {
                l = r * g + n;
                t = r * g + (c - 1 << 2) + n;
                for (p = m = o = q = d[l]; l <= t; l += 4) q = k * d[l] + e * o + h * m + j * p, d[l] = q, p = m, m = o, o = q;
                l = r * g + (c - 1 << 2) + n;
                t = r * g + n;
                for (p = m = o = q = d[l]; l >= t; l -= 4) q = k * d[l] + e * o + h * m + j * p, d[l] = q, p = m, m = o, o = q
            }
        for (n = 0; n < 3; n++)
            for (r = 0; r < c; r++) {
                l = (r << 2) + n;
                t = (f - 1) * g + (r << 2) + n;
                for (p = m = o = q = d[l]; l <= t; l += g) q = k * d[l] + e * o + h * m + j * p, d[l] = q, p = m, m = o, o = q;
                l = (f - 1) * g + (r << 2) + n;
                t = (r << 2) + n;
                for (p = m = o = q = d[l]; l >= t; l -= g) q = k * d[l] + e * o + h * m + j * p, d[l] = q, p = m, m = o, o = q
            }
    }
}

function BrightnessFilter() {
    this.name = "Brightness";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 0
    };
    this.valueRanges = {
        amount: {
            min: -1,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.amount === void 0 ? this.defaultValues.amount : a.amount, e = 0; e < g; e++)
            for (var h = 0; h < c; h++) {
                var j = (e * c + h) * 4,
                    k = filterUtils.RGBtoHSV(f[j], f[j + 1], f[j + 2]);
                k[2] += d;
                k[2] < 0 ? k[2] = 0 : k[2] > 1 && (k[2] = 1);
                for (var k = filterUtils.HSVtoRGB(k[0], k[1], k[2]), n = 0; n < 3; n++) f[j + n] =
                    k[n]
            }
    }
}

function BumpFilter() {
    this.name = "Bump";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        filterUtils.convolveFilter(b.data, [-1, -1, 0, -1, 1, 1, 0, 1, 1], b.width, b.height)
    }
}

function CircleSmearFilter() {
    this.name = "Circle Smear";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        size: 4,
        density: 0.5,
        mix: 0.5
    };
    this.valueRanges = {
        size: {
            min: 1,
            max: 10
        },
        density: {
            min: 0,
            max: 1
        },
        mix: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        for (var c = b.width, g = b.height, f = b.data, d = [], e = 0; e < f.length; e++) d[e] = f[e];
        if (a === void 0) a = this.defaultValues;
        var h = a.size === void 0 ? this.defaultValues.size : a.size;
        h < 1 && (h = 1);
        h = parseInt(h, 10);
        e = a.mix === void 0 ? this.defaultValues.mix : a.mix;
        h += 1;
        for (var j = h * h, k = parseInt(2 * (a.density ===
                void 0 ? this.defaultValues.density : a.density) / 30 * c * g / 2, 10), n = 0; n < k; n++)
            for (var l = (Math.random() * Math.pow(2, 32) & 2147483647) % c, t = (Math.random() * Math.pow(2, 32) & 2147483647) % g, q = [f[(t * c + l) * 4], f[(t * c + l) * 4 + 1], f[(t * c + l) * 4 + 2], f[(t * c + l) * 4 + 3]], o = l - h; o < l + h + 1; o++)
                for (var m = t - h; m < t + h + 1; m++) {
                    var p = (o - l) * (o - l) + (m - t) * (m - t);
                    if (o >= 0 && o < c && m >= 0 && m < g && p <= j)
                        for (var p = filterUtils.mixColors(e, [d[(m * c + o) * 4], d[(m * c + o) * 4 + 1], d[(m * c + o) * 4 + 2], d[(m * c + o) * 4 + 3]], q), r = 0; r < 3; r++) d[(m * c + o) * 4 + r] = p[r]
                }
        for (c = 0; c < d.length; c++) f[c] = d[c]
    }
}

function ContrastFilter() {
    this.name = "Contrast";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 1
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 2
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.amount === void 0 ? this.defaultValues.amount : a.amount;
        d < 0 && (d = 0);
        for (var e = [], h = 0; h < 256; h++) e[h] = parseInt(255 * ((h / 255 - 0.5) * d + 0.5), 10);
        filterUtils.tableFilter(f, e, c, g)
    }
}

function CrossSmearFilter() {
    this.name = "Cross Smear";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        distance: 8,
        density: 0.5,
        mix: 0.5
    };
    this.valueRanges = {
        distance: {
            min: 0,
            max: 30
        },
        density: {
            min: 0,
            max: 1
        },
        mix: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        for (var c = b.width, g = b.height, f = b.data, d = [], e = 0; e < f.length; e++) d[e] = f[e];
        if (a === void 0) a = this.defaultValues;
        e = a.distance === void 0 ? this.defaultValues.distance : a.distance;
        e < 0 && (e = 0);
        for (var e = parseInt(e, 10), h = a.mix === void 0 ? this.defaultValues.mix : a.mix, j = parseInt(2 * (a.density ===
                void 0 ? this.defaultValues.density : a.density) * c * g / (e + 1), 10), k = 0; k < j; k++) {
            for (var n = (Math.random() * Math.pow(2, 32) & 2147483647) % c, l = (Math.random() * Math.pow(2, 32) & 2147483647) % g, t = Math.random() * Math.pow(2, 32) % e + 1, q = [f[(l * c + n) * 4], f[(l * c + n) * 4 + 1], f[(l * c + n) * 4 + 2], f[(l * c + n) * 4 + 3]], o, m, p = n - t; p < n + t + 1; p++)
                if (p >= 0 && p < c) {
                    o = [d[(l * c + p) * 4], d[(l * c + p) * 4 + 1], d[(l * c + p) * 4 + 2], d[(l * c + p) * 4 + 3]];
                    o = filterUtils.mixColors(h, o, q);
                    for (m = 0; m < 3; m++) d[(l * c + p) * 4 + m] = o[m]
                }
            for (p = l - t; p < l + t + 1; p++)
                if (p >= 0 && p < g) {
                    o = [d[(p * c + n) * 4], d[(p * c + n) * 4 + 1],
                        d[(p * c + n) * 4 + 2], d[(p * c + n) * 4 + 3]
                    ];
                    o = filterUtils.mixColors(h, o, q);
                    for (m = 0; m < 3; m++) d[(p * c + n) * 4 + m] = o[m]
                }
        }
        for (c = 0; c < d.length; c++) f[c] = d[c]
    }
}

function DiffusionFilter() {
    this.name = "Diffusion";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        scale: 4
    };
    this.valueRanges = {
        scale: {
            min: 1,
            max: 100
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.scale === void 0 ? this.defaultValues.scale : a.scale, e = [], h = [], j = 0; j < 256; j++) {
            var k = Math.PI * 2 * j / 256;
            e[j] = d * Math.sin(k);
            h[j] = d * Math.cos(k)
        }
        transInverse = function(a, b, c) {
            var d = parseInt(Math.random() * 255, 10),
                f = Math.random();
            c[0] = a + f * e[d];
            c[1] = b + f * h[d]
        };
        filterUtils.transformFilter(f,
            transInverse, c, g)
    }
}

function DitherFilter() {
    this.name = "Dither";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        levels: 3,
        color: !0
    };
    this.valueRanges = {
        levels: {
            min: 2,
            max: 30
        },
        color: {
            min: !1,
            max: !0
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data,
            d = [],
            e, h;
        for (h = 0; h < f.length; h++) d[h] = 0;
        if (a === void 0) a = this.defaultValues;
        var j = a.levels === void 0 ? this.defaultValues.levels : a.levels,
            k = a.color === void 0 ? this.defaultValues.color : a.color;
        j <= 1 && (j = 1);
        var n = [0, 0, 0, 0, 0, 7, 3, 5, 1],
            l = 0,
            t = [];
        for (e = 0; e < j; e++) t[e] = parseInt(255 * e / (j - 1),
            10);
        var q = [];
        for (e = 0; e < 256; e++) q[e] = parseInt(j * e / 256, 10);
        for (j = 0; j < g; j++) {
            var o = (j & 1) == 1,
                m;
            o ? (l = (j * c + c - 1) * 4, m = -1) : (l = j * c * 4, m = 1);
            for (var p = 0; p < c; p++) {
                var r = f[l],
                    s = f[l + 1],
                    u = f[l + 2];
                k || (r = s = u = parseInt((r + s + u) / 3, 10));
                var v = t[q[r]],
                    F = t[q[s]];
                e = t[q[u]];
                d[l] = v;
                d[l + 1] = F;
                d[l + 2] = e;
                d[l + 3] = f[l + 3];
                var v = r - v,
                    F = s - F,
                    H = u - e;
                for (e = -1; e <= 1; e++)
                    if (r = e + j, 0 <= r && r < g)
                        for (h = -1; h <= 1; h++)
                            if (r = h + p, 0 <= r && r < c) {
                                var B;
                                B = o ? n[(e + 1) * 3 - h + 1] : n[(e + 1) * 3 + h + 1];
                                if (B !== 0) {
                                    var x = o ? l - h * 4 : l + h * 4,
                                        r = f[x],
                                        s = f[x + 1],
                                        u = f[x + 2];
                                    B /= 16;
                                    r += v * B;
                                    s += F * B;
                                    u += H *
                                        B;
                                    f[x] = r;
                                    f[x + 1] = s;
                                    f[x + 2] = u
                                }
                            }
                l += m * 4
            }
        }
        for (h = 0; h < d.length; h++) f[h] = d[h]
    }
}

function EdgeFilter() {
    this.name = "Edge Detection";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    var b = [-1, -2, -1, 0, 0, 0, 1, 2, 1],
        a = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    this.filter = function(c) {
        for (var g = c.width, f = c.height, c = c.data, d = [], e = 0; e < f; e++)
            for (var h = 0; h < g; h++) {
                var j = (e * g + h) * 4,
                    k = 0,
                    n = bh = gh = 0;
                bv = gv = 0;
                for (var l = -1; l <= 1; l++)
                    for (var t = e + l, t = t >= 0 && t < f ? t * g * 4 : e * g * 4, q = 3 * (l + 1) + 1, o = -1; o <= 1; o++) {
                        var m = h + o;
                        m >= 0 && m < g || (m = h);
                        m *= 4;
                        var p = c[t + m],
                            r = c[t + m + 1],
                            m = c[t + m + 2],
                            s = b[q + o],
                            u = a[q + o];
                        k += parseInt(s * p, 10);
                        bh +=
                            parseInt(s * r, 10);
                        gh += parseInt(s * m, 10);
                        n += parseInt(u * p, 10);
                        gv += parseInt(u * r, 10);
                        bv += parseInt(u * m, 10)
                    }
                p = parseInt(Math.sqrt(k * k + n * n) / 1.8, 10);
                r = parseInt(Math.sqrt(gh * gh + gv * gv) / 1.8, 10);
                m = parseInt(Math.sqrt(bh * bh + bv * bv) / 1.8, 10);
                d[j] = p;
                d[j + 1] = r;
                d[j + 2] = m;
                d[j + 3] = c[j + 3]
            }
        for (g = 0; g < d.length; g++) c[g] = d[g]
    }
}

function EmbossFilter() {
    this.name = "Emboss";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        height: 1,
        angle: 135,
        elevation: 30
    };
    this.valueRanges = {
        height: {
            min: 1,
            max: 10
        },
        angle: {
            min: 0,
            max: 360
        },
        elevation: {
            min: 0,
            max: 180
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.height === void 0 ? this.defaultValues.height : a.height, e = a.angle === void 0 ? this.defaultValues.angle : a.angle, h = a.elevation === void 0 ? this.defaultValues.elevation : a.elevation, e = e / 180 * Math.PI, h =
                h / 180 * Math.PI, j = 3 * d, d = [], k = 0; k < f.length; k += 4) d[k / 4] = (f[k] + f[k + 1] + f[k + 2]) / 3;
        var n, l, t, q, k = parseInt(Math.cos(e) * Math.cos(h) * 255.9, 10),
            e = parseInt(Math.sin(e) * Math.cos(h) * 255.9, 10),
            h = parseInt(Math.sin(h) * 255.9, 10);
        t = parseInt(1530 / j, 10);
        j = t * t;
        t *= h;
        for (var o = 0, m = 0; m < g; m++, o += c)
            for (var p = o, r = p + c, s = r + c, u = 0; u < c; u++, p++, r++, s++) {
                var v = (m * c + u) * 4;
                m !== 0 && m < g - 2 && u !== 0 && u < c - 2 ? (n = d[p - 1] + d[r - 1] + d[s - 1] - d[p + 1] - d[r + 1] - d[s + 1], l = d[s - 1] + d[s] + d[s + 1] - d[p - 1] - d[p] - d[p + 1], n = n === 0 && l === 0 ? h : (q = n * k + l * e + t) < 0 ? 0 : parseInt(q / Math.sqrt(n *
                    n + l * l + j), 10)) : n = h;
                f[v] = f[v + 1] = f[v + 2] = n
            }
    }
}

function ExposureFilter() {
    this.name = "Exposure";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        exposure: 1
    };
    this.valueRanges = {
        exposure: {
            min: 0,
            max: 5
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.exposure === void 0 ? this.defaultValues.exposure : a.exposure, e = [], h = 0; h < 256; h++) e[h] = parseInt(255 * (1 - Math.exp(-(h / 255) * d)), 10);
        filterUtils.tableFilter(f, e, c, g)
    }
}

function GainFilter() {
    this.name = "Gain/Bias";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        gain: 0.5,
        bias: 0.5
    };
    this.valueRanges = {
        gain: {
            min: 0,
            max: 1
        },
        bias: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.gain === void 0 ? this.defaultValues.gain : a.gain, e = a.bias === void 0 ? this.defaultValues.bias : a.bias, h = [], j = 0; j < 256; j++) {
            var k = j / 255,
                n = (1 / d - 2) * (1 - 2 * k),
                k = k < 0.5 ? k / (n + 1) : (n - k) / (n - 1);
            k /= (1 / e - 2) * (1 - k) + 1;
            h[j] = parseInt(255 * k, 10)
        }
        filterUtils.tableFilter(f,
            h, c, g)
    }
}

function GammaFilter() {
    this.name = "Gamma";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 1
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 2
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.amount === void 0 ? this.defaultValues.amount : a.amount;
        d < 0 && (d = 0);
        for (var e = [], h = 0; h < 256; h++) e[h] = 255 * Math.pow(h / 255, 1 / d) + 0.5;
        filterUtils.tableFilter(f, e, c, g)
    }
}

function GrayscaleFilter() {
    this.name = "Grayscale";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        for (var a = b.width, c = b.height, b = b.data, g = 0; g < c; g++)
            for (var f = 0; f < a; f++) {
                var d = (g * a + f) * 4;
                b[d] = b[d + 1] = b[d + 2] = b[d] * 0.3 + b[d + 1] * 0.59 + b[d + 2] * 0.11
            }
    }
}

function HueFilter() {
    this.name = "Hue";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 0
    };
    this.valueRanges = {
        amount: {
            min: -1,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.amount === void 0 ? this.defaultValues.amount : a.amount, e = 0; e < g; e++)
            for (var h = 0; h < c; h++) {
                var j = (e * c + h) * 4,
                    k = filterUtils.RGBtoHSV(f[j], f[j + 1], f[j + 2]);
                for (k[0] += d; k[0] < 0;) k[0] += 360;
                for (var k = filterUtils.HSVtoRGB(k[0], k[1], k[2]), n = 0; n < 3; n++) f[j + n] = k[n]
            }
    }
}

function InvertFilter() {
    this.name = "Invert";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        for (var a = b.width, c = b.height, b = b.data, g = 0; g < c; g++)
            for (var f = 0; f < a; f++)
                for (var d = (g * a + f) * 4, e = 0; e < 3; e++) b[d + e] = 255 - b[d + e]
    }
}

function KaleidoscopeFilter() {
    this.name = "Kaleidoscope";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        angle: 0,
        rotation: 0,
        sides: 3,
        centerX: 0.5,
        centerY: 0.5
    };
    this.valueRanges = {
        angle: {
            min: 0,
            max: 360
        },
        rotation: {
            min: 0,
            max: 360
        },
        sides: {
            min: 1,
            max: 30
        },
        centerX: {
            min: 0,
            max: 1
        },
        centerY: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.angle === void 0 ? this.defaultValues.angle : a.angle,
            e = a.rotation === void 0 ? this.defaultValues.rotation : a.rotation,
            h = a.sides ===
            void 0 ? this.defaultValues.sides : a.sides,
            j = c * (a.centerX === void 0 ? this.defaultValues.centerX : a.centerX),
            k = g * (a.centerY === void 0 ? this.defaultValues.centerY : a.centerY),
            d = d / 180 * Math.PI,
            e = e / 180 * Math.PI;
        filterUtils.transformFilter(f, function(a, b, c) {
            a -= j;
            var f = b - k,
                b = Math.sqrt(a * a + f * f),
                a = Math.atan2(f, a) - d - e,
                a = filterUtils.triangle(a / Math.PI * h * 0.5);
            a += d;
            c[0] = j + b * Math.cos(a);
            c[1] = k + b * Math.sin(a)
        }, c, g)
    }
}

function LensDistortionFilter() {
    this.name = "Lens Distortion";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        refraction: 1.5,
        radius: 50,
        centerX: 0.5,
        centerY: 0.5
    };
    this.valueRanges = {
        refraction: {
            min: 1,
            max: 10
        },
        radius: {
            min: 1,
            max: 200
        },
        centerX: {
            min: 0,
            max: 1
        },
        centerY: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.refraction === void 0 ? this.defaultValues.refraction : a.refraction,
            e = a.radius === void 0 ? this.defaultValues.radius : a.radius,
            h = e * e,
            j = c * (a.centerX ===
                void 0 ? this.defaultValues.centerX : a.centerX),
            k = g * (a.centerY === void 0 ? this.defaultValues.centerY : a.centerY);
        filterUtils.transformFilter(f, function(a, b, c) {
            var e = a - j,
                f = b - k,
                g = e * e,
                p = f * f;
            if (p >= h - h * g / h) c[0] = a, c[1] = b;
            else {
                var r = 1 / d,
                    s = Math.sqrt((1 - g / h - p / h) * h),
                    u = s * s,
                    e = Math.acos(e / Math.sqrt(g + u)),
                    g = Math.PI / 2 - e,
                    g = Math.asin(Math.sin(g) * r),
                    g = Math.PI / 2 - e - g;
                c[0] = a - Math.tan(g) * s;
                a = Math.acos(f / Math.sqrt(p + u));
                g = Math.PI / 2 - a;
                g = Math.asin(Math.sin(g) * r);
                g = Math.PI / 2 - a - g;
                c[1] = b - Math.tan(g) * s
            }
        }, c, g)
    }
}

function LineSmearFilter() {
    this.name = "Line Smear";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        distance: 8,
        density: 0.5,
        angle: 0,
        mix: 0.5
    };
    this.valueRanges = {
        distance: {
            min: 1,
            max: 30
        },
        density: {
            min: 0,
            max: 1
        },
        angle: {
            min: 0,
            max: 360
        },
        mix: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data,
            d = [],
            e;
        for (e = 0; e < f.length; e++) d[e] = f[e];
        if (a === void 0) a = this.defaultValues;
        var h = a.distance === void 0 ? this.defaultValues.distance : a.distance;
        h < 1 && (h = 1);
        for (var h = parseInt(h, 10), j = a.density === void 0 ? this.defaultValues.density :
                a.density, k = a.angle === void 0 ? this.defaultValues.angle : a.angle, n = a.mix === void 0 ? this.defaultValues.mix : a.mix, k = k / 180 * Math.PI, l = Math.sin(k), k = Math.cos(k), j = parseInt(2 * j * c * g / 2, 10), t = 0; t < j; t++) {
            var q = (Math.random() * Math.pow(2, 32) & 2147483647) % c,
                o = (Math.random() * Math.pow(2, 32) & 2147483647) % g,
                m = (Math.random() * Math.pow(2, 32) & 2147483647) % h + 1,
                p = [f[(o * c + q) * 4], f[(o * c + q) * 4 + 1], f[(o * c + q) * 4 + 2], f[(o * c + q) * 4 + 3]],
                r = parseInt(m * k, 10),
                m = parseInt(m * l, 10),
                s = q - r,
                u = o - m;
            q += r;
            o += m;
            var v, F, H, B;
            H = q < s ? -1 : 1;
            B = o < u ? -1 : 1;
            var r = q - s,
                m =
                o - u,
                r = Math.abs(r),
                m = Math.abs(m),
                x;
            if (s < c && s >= 0 && u < g && u >= 0) {
                e = [d[(u * c + s) * 4], d[(u * c + s) * 4 + 1], d[(u * c + s) * 4 + 2], d[(u * c + s) * 4 + 3]];
                x = filterUtils.mixColors(n, e, p);
                for (e = 0; e < 3; e++) d[(u * c + s) * 4 + e] = x[e]
            }
            if (Math.abs(r) > Math.abs(m)) {
                v = 2 * m - r;
                F = 2 * m;
                for (r = 2 * (m - r); s != q;)
                    if (v <= 0 ? v += F : (v += r, u += B), s += H, s < c && s >= 0 && u < g && u >= 0) {
                        e = [d[(u * c + s) * 4], d[(u * c + s) * 4 + 1], d[(u * c + s) * 4 + 2], d[(u * c + s) * 4 + 3]];
                        x = filterUtils.mixColors(n, e, p);
                        for (e = 0; e < 3; e++) d[(u * c + s) * 4 + e] = x[e]
                    }
            } else {
                v = 2 * r - m;
                F = 2 * r;
                for (r = 2 * (r - m); u != o;)
                    if (v <= 0 ? v += F : (v += r, s += H), u += B,
                        s < c && s >= 0 && u < g && u >= 0) {
                        e = [d[(u * c + s) * 4], d[(u * c + s) * 4 + 1], d[(u * c + s) * 4 + 2], d[(u * c + s) * 4 + 3]];
                        x = filterUtils.mixColors(n, e, p);
                        for (e = 0; e < 3; e++) d[(u * c + s) * 4 + e] = x[e]
                    }
            }
        }
        for (e = 0; e < d.length; e++) f[e] = d[e]
    }
}

function MaximumFilter() {
    this.name = "Maximum";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        for (var a = b.width, c = b.height, b = b.data, g = [], f = 0; f < c; f++)
            for (var d = 0; d < a; d++) {
                for (var e = (f * a + d) * 4, h = 0, j = 0, k = 0, n = -1; n <= 1; n++) {
                    var l = f + n;
                    if (l >= 0 && l < c)
                        for (var t = -1; t <= 1; t++) {
                            var q = d + t;
                            q >= 0 && q < a && (q = (l * a + q) * 4, h = Math.max(h, b[q]), j = Math.max(j, b[q + 1]), k = Math.max(k, b[q + 2]))
                        }
                }
                g[e] = h;
                g[e + 1] = j;
                g[e + 2] = k;
                g[e + 3] = b[e + 3]
            }
        for (a = 0; a < g.length; a++) b[a] = g[a]
    }
}

function MedianFilter() {
    this.name = "Median";
    this.isDirAnimatable = !1;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        for (var a = b.width, c = b.height, b = b.data, g = [], f = 0; f < c; f++)
            for (var d = 0; d < a; d++) {
                for (var e = (f * a + d) * 4, h = [], j = [], k = [], n = -1; n <= 1; n++) {
                    var l = f + n;
                    if (l >= 0 && l < c)
                        for (var t = -1; t <= 1; t++) {
                            var q = d + t;
                            q >= 0 && q < a && (q = (l * a + q) * 4, h.push(b[q]), j.push(b[q + 1]), k.push(b[q + 2]))
                        }
                }
                n = function(a, b) {
                    return a - b
                };
                h.sort(n);
                j.sort(n);
                k.sort(n);
                g[e] = h[4];
                g[e + 1] = j[4];
                g[e + 2] = k[4];
                g[e + 3] = b[e + 3]
            }
        for (a = 0; a < g.length; a++) b[a] =
            g[a]
    }
}

function MinimumFilter() {
    this.name = "Minimum";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        for (var a = b.width, c = b.height, b = b.data, g = [], f = 0; f < c; f++)
            for (var d = 0; d < a; d++) {
                for (var e = (f * a + d) * 4, h = 255, j = 255, k = 255, n = -1; n <= 1; n++) {
                    var l = f + n;
                    if (l >= 0 && l < c)
                        for (var t = -1; t <= 1; t++) {
                            var q = d + t;
                            q >= 0 && q < a && (q = (l * a + q) * 4, h = Math.min(h, b[q]), j = Math.min(j, b[q + 1]), k = Math.min(k, b[q + 2]))
                        }
                }
                g[e] = h;
                g[e + 1] = j;
                g[e + 2] = k;
                g[e + 3] = b[e + 3]
            }
        for (a = 0; a < g.length; a++) b[a] = g[a]
    }
}

function NoiseFilter() {
    this.name = "Noise";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 25,
        density: 1,
        monochrome: !0
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 100
        },
        density: {
            min: 0,
            max: 1
        },
        monochrome: {
            min: !1,
            max: !0
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.amount === void 0 ? this.defaultValues.amount : a.amount, e = a.density === void 0 ? this.defaultValues.density : a.density, h = a.monochrome === void 0 ? this.defaultValues.monochrome : a.monochrome, j = 0; j < g; j++)
            for (var k =
                    0; k < c; k++) {
                var n = (j * c + k) * 4;
                if (Math.random() <= e) {
                    var l;
                    if (h) l = parseInt((2 * Math.random() - 1) * d, 10), f[n] += l, f[n + 1] += l, f[n + 2] += l;
                    else
                        for (var t = 0; t < 3; t++) l = parseInt((2 * Math.random() - 1) * d, 10), f[n + t] += l
                }
            }
    }
}

function OilFilter() {
    this.name = "Oil Painting";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        range: 3
    };
    this.valueRanges = {
        range: {
            min: 0,
            max: 5
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data,
            d = [];
        if (a === void 0) a = this.defaultValues;
        for (var e = a.range === void 0 ? this.defaultValues.range : a.range, e = parseInt(e, 10), h = [], j = [], k = [], n = [], l = [], t = [], q = 0; q < g; q++)
            for (var o = 0; o < c; o++) {
                for (var m = (q * c + o) * 4, p = 0; p < 256; p++) h[p] = j[p] = k[p] = n[p] = l[p] = t[p] = 0;
                for (p = -e; p <= e; p++) {
                    var r = q + p;
                    if (0 <= r && r < g) {
                        r *= c;
                        for (var s = -e; s <= e; s++) {
                            var u = o + s;
                            if (0 <= u && u < c) {
                                var v = f[(r + u) * 4],
                                    F = f[(r + u) * 4 + 1],
                                    u = f[(r + u) * 4 + 2],
                                    H = v * 256 / 256,
                                    B = F * 256 / 256,
                                    x = u * 256 / 256;
                                n[H] += v;
                                l[B] += F;
                                t[x] += u;
                                h[H]++;
                                j[B]++;
                                k[x]++
                            }
                        }
                    }
                }
                s = r = p = 0;
                for (v = 1; v < 256; v++) h[v] > h[p] && (p = v), j[v] > j[r] && (r = v), k[v] > k[s] && (s = v);
                p = n[p] / h[p];
                r = l[r] / j[r];
                s = t[s] / k[s];
                d[m] = p;
                d[m + 1] = r;
                d[m + 2] = s;
                d[m + 3] = f[m + 3]
            }
        for (c = 0; c < d.length; c++) f[c] = d[c]
    }
}

function OpacityFilter() {
    this.name = "Opacity";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 1
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.amount === void 0 ? this.defaultValues.amount : a.amount, e = 0; e < g; e++)
            for (var h = 0; h < c; h++) f[(e * c + h) * 4 + 3] = 255 * d
    }
}

function PinchFilter() {
    this.name = "Pinch/Whirl";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        amount: 0.5,
        radius: 100,
        angle: 0,
        centerX: 0.5,
        centerY: 0.5
    };
    this.valueRanges = {
        amount: {
            min: -1,
            max: 1
        },
        radius: {
            min: 1,
            max: 200
        },
        angle: {
            min: 0,
            max: 360
        },
        centerX: {
            min: 0,
            max: 1
        },
        centerY: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.amount === void 0 ? this.defaultValues.amount : a.amount,
            e = a.angle === void 0 ? this.defaultValues.angle : a.angle,
            h = a.centerX === void 0 ?
            this.defaultValues.centerX : a.centerX,
            j = a.centerY === void 0 ? this.defaultValues.centerY : a.centerY,
            k = a.radius === void 0 ? this.defaultValues.radius : a.radius,
            n = k * k,
            e = e / 180 * Math.PI,
            l = c * h,
            t = g * j;
        filterUtils.transformFilter(f, function(a, b, c) {
            var f = a - l,
                g = b - t,
                h = f * f + g * g;
            h > n || h === 0 ? (c[0] = a, c[1] = b) : (a = Math.sqrt(h / n), b = Math.pow(Math.sin(Math.PI * 0.5 * a), -d), f *= b, g *= b, a = 1 - a, b = e * a * a, a = Math.sin(b), b = Math.cos(b), c[0] = l + b * f - a * g, c[1] = t + a * f + b * g)
        }, c, g)
    }
}

function PixelationFilter() {
    this.name = "Pixelation";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        size: 5
    };
    this.valueRanges = {
        size: {
            min: 1,
            max: 50
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.size === void 0 ? this.defaultValues.size : a.size, d = parseInt(d, 10), e, h, j, k = 0; k < g; k += d)
            for (var n = 0; n < c; n += d) {
                var l = Math.min(d, c - n),
                    t = Math.min(d, g - k),
                    q = l * t,
                    o = 0,
                    m = 0,
                    p = 0;
                for (e = k; e < k + t; e++)
                    for (h = n; h < n + l; h++) j = (e * c + h) * 4, o += f[j], m += f[j + 1], p += f[j + 2];
                for (e = k; e < k + t; e++)
                    for (h =
                        n; h < n + l; h++) j = (e * c + h) * 4, f[j] = o / q, f[j + 1] = m / q, f[j + 2] = p / q
            }
    }
}

function PosterizeFilter() {
    this.name = "Posterize";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        levels: 6
    };
    this.valueRanges = {
        levels: {
            min: 2,
            max: 30
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.levels === void 0 ? this.defaultValues.levels : parseInt(a.levels, 10);
        if (!(d <= 1)) {
            for (var e = [], h = 0; h < 256; h++) e[h] = parseInt(255 * parseInt(h * d / 256, 10) / (d - 1), 10);
            filterUtils.tableFilter(f, e, c, g)
        }
    }
}

function RGBAdjustFilter() {
    this.name = "RGBAdjust";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        red: 1,
        green: 1,
        blue: 1
    };
    this.valueRanges = {
        red: {
            min: 0,
            max: 2
        },
        green: {
            min: 0,
            max: 2
        },
        blue: {
            min: 0,
            max: 2
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.red === void 0 ? this.defaultValues.red : a.red,
            e = a.green === void 0 ? this.defaultValues.green : a.green,
            h = a.blue === void 0 ? this.defaultValues.blue : a.blue;
        d < 0 && (d = 0);
        e < 0 && (e = 0);
        h < 0 && (h = 0);
        for (var j = 0; j < g; j++)
            for (var k = 0; k <
                c; k++) {
                var n = (j * c + k) * 4;
                f[n] *= d;
                f[n + 1] *= e;
                f[n + 2] *= h
            }
    }
}

function SaturationFilter() {
    this.name = "Saturation";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 1
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 2
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.amount === void 0 ? this.defaultValues.amount : a.amount, e = (1 - d) * 0.3 + d, h = (1 - d) * 0.3, j = (1 - d) * 0.3, k = (1 - d) * 0.59, n = (1 - d) * 0.59 + d, l = (1 - d) * 0.59, t = (1 - d) * 0.11, q = (1 - d) * 0.11, d = (1 - d) * 0.11 + d, o = 0; o < g; o++)
            for (var m = 0; m < c; m++) {
                var p = (o * c + m) * 4,
                    r = f[p],
                    s = f[p + 1],
                    u = f[p + 2];
                f[p] =
                    e * r + k * s + t * u;
                f[p + 1] = h * r + n * s + q * u;
                f[p + 2] = j * r + l * s + d * u
            }
    }
}

function SawtoothRippleFilter() {
    this.name = "Sawtooth Ripples";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        xAmplitude: 5,
        yAmplitude: 5,
        xWavelength: 16,
        yWavelength: 16
    };
    this.valueRanges = {
        xAmplitude: {
            min: 0,
            max: 30
        },
        yAmplitude: {
            min: 0,
            max: 30
        },
        xWavelength: {
            min: 1,
            max: 50
        },
        yWavelength: {
            min: 1,
            max: 50
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.xAmplitude === void 0 ? this.defaultValues.xAmplitude : a.xAmplitude,
            e = a.yAmplitude === void 0 ? this.defaultValues.yAmplitude :
            a.yAmplitude,
            h = a.xWavelength === void 0 ? this.defaultValues.xWavelength : a.xWavelength,
            j = a.yWavelength === void 0 ? this.defaultValues.yWavelength : a.yWavelength;
        filterUtils.transformFilter(f, function(a, b, c) {
            var f = a / j,
                g = filterUtils.mod(b / h, 1),
                f = filterUtils.mod(f, 1);
            c[0] = a + d * g;
            c[1] = b + e * f
        }, c, g)
    }
}

function SepiaFilter() {
    this.name = "Sepia";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        amount: 10
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 30
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.amount === void 0 ? this.defaultValues.amount : a.amount;
        d *= 2.55;
        for (var e = 0; e < g; e++)
            for (var h = 0; h < c; h++) {
                var j = (e * c + h) * 4,
                    k, n, l;
                k = n = l = f[j] * 0.3 + f[j + 1] * 0.59 + f[j + 2] * 0.11;
                k += 40;
                n += 20;
                l -= d;
                f[j] = k;
                f[j + 1] = n;
                f[j + 2] = l
            }
    }
}

function SharpenFilter() {
    this.name = "Sharpen";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        filterUtils.convolveFilter(b.data, [0, -0.2, 0, -0.2, 1.8, -0.2, 0, -0.2, 0], b.width, b.height)
    }
}

function SineRippleFilter() {
    this.name = "Sine Ripples";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        xAmplitude: 5,
        yAmplitude: 5,
        xWavelength: 16,
        yWavelength: 16
    };
    this.valueRanges = {
        xAmplitude: {
            min: 0,
            max: 30
        },
        yAmplitude: {
            min: 0,
            max: 30
        },
        xWavelength: {
            min: 1,
            max: 50
        },
        yWavelength: {
            min: 1,
            max: 50
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.xAmplitude === void 0 ? this.defaultValues.xAmplitude : a.xAmplitude,
            e = a.yAmplitude === void 0 ? this.defaultValues.yAmplitude : a.yAmplitude,
            h = a.xWavelength === void 0 ? this.defaultValues.xWavelength : a.xWavelength,
            j = a.yWavelength === void 0 ? this.defaultValues.yWavelength : a.yWavelength;
        filterUtils.transformFilter(f, function(a, b, c) {
            var f = Math.sin(a / j);
            c[0] = a + d * Math.sin(b / h);
            c[1] = b + e * f
        }, c, g)
    }
}

function SolarizeFilter() {
    this.name = "Solarize";
    this.isDirAnimatable = !0;
    this.defaultValues = {};
    this.valueRanges = {};
    this.filter = function(b) {
        for (var a = b.width, c = b.height, b = b.data, g = [], f = 0; f < 256; f++) g[f] = parseInt(255 * (f / 255 > 0.5 ? 2 * (f / 255 - 0.5) : 2 * (0.5 - f / 255)), 10);
        filterUtils.tableFilter(b, g, a, c)
    }
}

function SparkleFilter() {
    this.name = "Sparkle";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        rays: 50,
        size: 25,
        amount: 50,
        randomness: 25,
        centerX: 0.5,
        centerY: 0.5
    };
    this.valueRanges = {
        rays: {
            min: 1,
            max: 100
        },
        size: {
            min: 1,
            max: 200
        },
        amount: {
            min: 0,
            max: 100
        },
        randomness: {
            min: 0,
            max: 50
        },
        centerX: {
            min: 0,
            max: 1
        },
        centerY: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.rays === void 0 ? this.defaultValues.rays : a.rays, d = parseInt(d, 10), e = a.size === void 0 ? this.defaultValues.size :
                a.size, h = a.amount === void 0 ? this.defaultValues.amount : a.amount, j = a.randomness === void 0 ? this.defaultValues.randomness : a.randomness, k = (a.centerX === void 0 ? this.defaultValues.centerX : a.centerX) * c, n = (a.centerY === void 0 ? this.defaultValues.centerY : a.centerY) * g, l = [], t = filterUtils.gaussian(), q = 0; q < d; q++) l[q] = e + j / 100 * e * t.random();
        for (j = 0; j < g; j++)
            for (t = 0; t < c; t++) {
                var q = (j * c + t) * 4,
                    o = t - k,
                    m = j - n,
                    p = o * o + m * m,
                    o = (Math.atan2(m, o) + Math.PI) / (Math.PI * 2) * d,
                    m = parseInt(o, 10);
                o -= m;
                e !== 0 && (m = filterUtils.linearInterpolate(o, l[m %
                    d], l[(m + 1) % d]), p = m * m / (p + 1.0E-4), p = Math.pow(p, (100 - h) / 50), o -= 0.5, o = 1 - o * o, o *= p);
                o = filterUtils.clampPixel(o, 0, 1);
                p = filterUtils.mixColors(o, [f[q], f[q + 1], f[q + 2], f[q + 3]], [255, 255, 255, 255]);
                for (o = 0; o < 3; o++) f[q + o] = p[o]
            }
    }
}

function SquareSmearFilter() {
    this.name = "Square Smear";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        size: 4,
        density: 0.5,
        mix: 0.5
    };
    this.valueRanges = {
        size: {
            min: 1,
            max: 10
        },
        density: {
            min: 0,
            max: 1
        },
        mix: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data,
            d = [],
            e;
        for (e = 0; e < f.length; e++) d[e] = f[e];
        if (a === void 0) a = this.defaultValues;
        e = a.size === void 0 ? this.defaultValues.size : a.size;
        e < 1 && (e = 1);
        e = parseInt(e, 10);
        for (var h = a.mix === void 0 ? this.defaultValues.mix : a.mix, j = e + 1, k = parseInt(2 * (a.density ===
                void 0 ? this.defaultValues.density : a.density) / 30 * c * g / 2, 10), n = 0; n < k; n++)
            for (var l = (Math.random() * Math.pow(2, 32) & 2147483647) % c, t = (Math.random() * Math.pow(2, 32) & 2147483647) % g, q = [f[(t * c + l) * 4], f[(t * c + l) * 4 + 1], f[(t * c + l) * 4 + 2], f[(t * c + l) * 4 + 3]], o = l - j; o < l + j + 1; o++)
                for (var m = t - j; m < t + j + 1; m++)
                    if (o >= 0 && o < c && m >= 0 && m < g) {
                        var p = filterUtils.mixColors(h, [d[(m * c + o) * 4], d[(m * c + o) * 4 + 1], d[(m * c + o) * 4 + 2], d[(m * c + o) * 4 + 3]], q);
                        for (e = 0; e < 3; e++) d[(m * c + o) * 4 + e] = p[e]
                    }
        for (e = 0; e < d.length; e++) f[e] = d[e]
    }
}

function ThresholdFilter() {
    this.name = "Black & White";
    this.isDirAnimatable = !0;
    this.defaultValues = {
        threshold: 127
    };
    this.valueRanges = {
        threshold: {
            min: 0,
            max: 255
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        for (var d = a.threshold === void 0 ? this.defaultValues.threshold : a.threshold, e = 0; e < g; e++)
            for (var h = 0; h < c; h++) {
                var j = (e * c + h) * 4,
                    k = 0;
                (f[j] + f[j + 1] + f[j + 2]) / 3 > d && (k = 255);
                f[j] = f[j + 1] = f[j + 2] = k
            }
    }
}

function TriangleRippleFilter() {
    this.name = "Triangle Ripples";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        xAmplitude: 5,
        yAmplitude: 5,
        xWavelength: 16,
        yWavelength: 16
    };
    this.valueRanges = {
        xAmplitude: {
            min: 0,
            max: 30
        },
        yAmplitude: {
            min: 0,
            max: 30
        },
        xWavelength: {
            min: 1,
            max: 50
        },
        yWavelength: {
            min: 1,
            max: 50
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.xAmplitude === void 0 ? this.defaultValues.xAmplitude : a.xAmplitude,
            e = a.yAmplitude === void 0 ? this.defaultValues.yAmplitude :
            a.yAmplitude,
            h = a.xWavelength === void 0 ? this.defaultValues.xWavelength : a.xWavelength,
            j = a.yWavelength === void 0 ? this.defaultValues.yWavelength : a.yWavelength;
        filterUtils.transformFilter(f, function(a, b, c) {
            var f = a / j,
                g = filterUtils.triangle(b / h, 1),
                f = filterUtils.triangle(f, 1);
            c[0] = a + d * g;
            c[1] = b + e * f
        }, c, g)
    }
}

function TwirlFilter() {
    this.name = "Twirl";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        radius: 100,
        angle: 180,
        centerX: 0.5,
        centerY: 0.5
    };
    this.valueRanges = {
        radius: {
            min: 1,
            max: 200
        },
        angle: {
            min: 0,
            max: 360
        },
        centerX: {
            min: 0,
            max: 1
        },
        centerY: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.angle === void 0 ? this.defaultValues.angle : a.angle,
            e = a.centerX === void 0 ? this.defaultValues.centerX : a.centerX,
            h = a.centerY === void 0 ? this.defaultValues.centerY : a.centerY,
            j = a.radius === void 0 ? this.defaultValues.radius : a.radius,
            k = j * j,
            d = d / 180 * Math.PI,
            n = c * e,
            l = g * h;
        filterUtils.transformFilter(f, function(a, b, c) {
            var e = a - n,
                f = b - l,
                g = e * e + f * f;
            g > k ? (c[0] = a, c[1] = b) : (g = Math.sqrt(g), a = Math.atan2(f, e) + d * (j - g) / j, c[0] = n + g * Math.cos(a), c[1] = l + g * Math.sin(a))
        }, c, g)
    }
}

function VignetteFilter() {
    this.name = "Vignette";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        amount: 0.3
    };
    this.valueRanges = {
        amount: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data,
            d = [];
        if (a === void 0) a = this.defaultValues;
        var d = a.amount === void 0 ? this.defaultValues.amount : a.amount,
            e = document.createElement("canvas");
        e.width = c;
        e.height = g;
        var e = e.getContext("2d"),
            h;
        h = Math.sqrt(Math.pow(c / 2, 2) + Math.pow(g / 2, 2));
        e.putImageData(b, 0, 0);
        e.globalCompositeOperation = "source-over";
        h = e.createRadialGradient(c /
            2, g / 2, 0, c / 2, g / 2, h);
        h.addColorStop(0, "rgba(0,0,0,0)");
        h.addColorStop(0.5, "rgba(0,0,0,0)");
        h.addColorStop(1, "rgba(0,0,0," + d + ")");
        e.fillStyle = h;
        e.fillRect(0, 0, c, g);
        d = e.getImageData(0, 0, c, g).data;
        for (c = 0; c < d.length; c++) f[c] = d[c]
    }
}

function WaterRippleFilter() {
    this.name = "Water Ripples";
    this.isDirAnimatable = !1;
    this.defaultValues = {
        phase: 0,
        radius: 50,
        wavelength: 16,
        amplitude: 10,
        centerX: 0.5,
        centerY: 0.5
    };
    this.valueRanges = {
        phase: {
            min: 0,
            max: 100
        },
        radius: {
            min: 1,
            max: 200
        },
        wavelength: {
            min: 1,
            max: 100
        },
        amplitude: {
            min: 1,
            max: 100
        },
        centerX: {
            min: 0,
            max: 1
        },
        centerY: {
            min: 0,
            max: 1
        }
    };
    this.filter = function(b, a) {
        var c = b.width,
            g = b.height,
            f = b.data;
        if (a === void 0) a = this.defaultValues;
        var d = a.wavelength === void 0 ? this.defaultValues.wavelength : a.wavelength,
            e = a.amplitude ===
            void 0 ? this.defaultValues.amplitude : a.amplitude,
            h = a.phase === void 0 ? this.defaultValues.phase : a.phase,
            j = a.radius === void 0 ? this.defaultValues.radius : a.radius,
            k = j * j,
            n = c * (a.centerX === void 0 ? this.defaultValues.centerX : a.centerX),
            l = g * (a.centerY === void 0 ? this.defaultValues.centerY : a.centerY);
        filterUtils.transformFilter(f, function(a, b, c) {
            var f = a - n,
                g = b - l,
                r = f * f + g * g;
            if (r > k) c[0] = a, c[1] = b;
            else {
                var r = Math.sqrt(r),
                    s = e * Math.sin(r / d * Math.PI * 2 - h);
                s *= (j - r) / j;
                r !== 0 && (s *= d / r);
                c[0] = a + f * s;
                c[1] = b + g * s
            }
        }, c, g)
    }
}
var JSManipulate = {
    blur: new BlurFilter,
    brightness: new BrightnessFilter,
    bump: new BumpFilter,
    circlesmear: new CircleSmearFilter,
    contrast: new ContrastFilter,
    crosssmear: new CrossSmearFilter,
    diffusion: new DiffusionFilter,
    dither: new DitherFilter,
    edge: new EdgeFilter,
    emboss: new EmbossFilter,
    exposure: new ExposureFilter,
    gain: new GainFilter,
    gamma: new GammaFilter,
    grayscale: new GrayscaleFilter,
    hue: new HueFilter,
    invert: new InvertFilter,
    kaleidoscope: new KaleidoscopeFilter,
    lensdistortion: new LensDistortionFilter,
    linesmear: new LineSmearFilter,
    maximum: new MaximumFilter,
    median: new MedianFilter,
    minimum: new MinimumFilter,
    noise: new NoiseFilter,
    oil: new OilFilter,
    opacity: new OpacityFilter,
    pinch: new PinchFilter,
    pixelate: new PixelationFilter,
    posterize: new PosterizeFilter,
    rgbadjust: new RGBAdjustFilter,
    saturation: new SaturationFilter,
    sawtoothripple: new SawtoothRippleFilter,
    sepia: new SepiaFilter,
    sharpen: new SharpenFilter,
    sineripple: new SineRippleFilter,
    solarize: new SolarizeFilter,
    sparkle: new SparkleFilter,
    squaresmear: new SquareSmearFilter,
    threshold: new ThresholdFilter,
    triangleripple: new TriangleRippleFilter,
    twirl: new TwirlFilter,
    vignette: new VignetteFilter,
    waterripple: new WaterRippleFilter
};
(function(b) {
    function a(a) {
        this.opacity = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a.amount * 100 + ")";
        this.blur = "progid:DXImageTransform.Microsoft.Blur(pixelradius=" + a.amount + ")";
        this.grayscale = "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)";
        this.invert = "progid:DXImageTransform.Microsoft.BasicImage(invert=1)"
    }

    function c() {
        return !!document.createElement("canvas").getContext
    }

    function g(a, c) {
        var e = c[0];
        if (e)
            if (u[e]) return u[e].apply(a, Array.prototype.slice.call(c, 1));
            else b.error("Error: Method " +
                e + " does not exist on jQuery.jsManipulate");
        return null
    }

    function f(a, e) {
        if (a[0].tagName === "CANVAS" || !c()) return a;
        var d = a.attr("width"),
            f = a.attr("height"),
            g = b("<canvas>");
        g.attr({
            width: d,
            height: f
        });
        for (var h = a[0].attributes, k = {}, j = 0; j < h.length; j++) {
            var n = h[j].nodeName;
            if (n !== "src") k[n] = h[j].nodeValue
        }
        g.attr(k);
        var l = g[0].getContext("2d"),
            m = new Image;
        m.src = a.attr("src");
        m.onload = function() {
            l.drawImage(m, 0, 0, d, f);
            g.data("imgData", {
                originalData: g[0].getContext("2d").getImageData(0, 0, g[0].width, g[0].height)
            });
            g.data("filterValues", {});
            e && e(g)
        };
        a.replaceWith(g);
        return g
    }

    function d(a, e) {
        if (!c()) return g(a, e), a;
        var d = a.attr("width"),
            f = a.attr("height"),
            h = b("<canvas>");
        h.attr({
            width: d,
            height: f
        });
        var k = h[0].getContext("2d"),
            j = new Image;
        j.src = a.attr("src");
        j.onload = function() {
            k.drawImage(j, 0, 0, d, f);
            var b = h[0].getContext("2d").getImageData(0, 0, h[0].width, h[0].height);
            a.data("imgData", {
                originalData: b
            });
            a.data("currentData", b);
            h.data("filterValues", {});
            g(a, e)
        };
        return a
    }

    function e(a) {
        if (typeof a === "string") {
            if (p[a.toUpperCase()]) return p[a.toUpperCase()]
        } else if (typeof a ===
            "function") return a;
        return m
    }

    function h(a, b, c) {
        if (typeof a === "string" && (a = a.toUpperCase(), a !== "NONE"))
            if (a === "RIGHT") return [0, b, c, c];
            else if (a === "LEFT") return [b, 0, c, c];
        else if (a === "DOWN") return [b, b, 0, c];
        else if (a === "UP") return [b, b, c, 0];
        return [-1, -1, -1, -1]
    }

    function j(a, b) {
        if (typeof a === "boolean") return a;
        return String(a).indexOf("+=") !== -1 ? b + parseFloat(a.substring(2)) : String(a).indexOf("-=") !== -1 ? b - parseFloat(a.substring(2)) : parseFloat(a)
    }

    function k(a, b, c, e, d) {
        if (a[0].tagName === "CANVAS" && a.data("imgData") ===
            void 0) {
            var f = a[0].getContext("2d").getImageData(0, 0, a[0].width, a[0].height);
            a.data("imgData", {
                originalData: f
            })
        }
        a = a.data("imgData").originalData;
        return n(a, b, c, e, d)
    }

    function n(a, b, c, e, d) {
        if (e <= 0 || d <= 0) return null;
        for (var f = document.createElement("canvas").getContext("2d").createImageData(e, d), g = 0, h = c; h < c + d; h++)
            for (var j = b; j < b + e; j++) {
                var k = (h * a.width + j) * 4;
                for (i = 0; i < 4; i++) f.data[g++] = a.data[k + i]
            }
        return f
    }

    function l(a) {
        return a[0].tagName === "CANVAS" ? a[0].getContext("2d").getImageData(0, 0, a[0].width,
            a[0].height) : a.data("currentData")
    }

    function t(a, b, c, e, d) {
        if (a[0].tagName === "CANVAS") a[0].getContext("2d").putImageData(b, c, e);
        else {
            var f = d,
                d = a[0].width,
                g = a[0].height;
            if (f === void 0) f = document.createElement("canvas"), f.width = d, f.height = g, f = f.getContext("2d");
            f.putImageData(b, c, e);
            a.data("currentData", f.getImageData(0, 0, d, g));
            b = f.canvas.toDataURL("image/png");
            a.attr("src", b)
        }
    }

    function q(a) {
        if (a)
            if (r[a]) return r[a];
            else b.error("Filter: " + a + " does not exist");
        else b.error("No filter defined");
        return null
    }

    function o(a, b, c, e) {
        return b + a / e * c
    }

    function m(a, b, c, e) {
        return -c * (a /= e) * (a - 2) + b
    }
    var p = {
            IN: function(a, b, c, e) {
                return c * (a /= e) * a + b
            },
            OUT: m,
            INOUT: function(a, b, c, e) {
                if ((a /= e / 2) < 1) return c / 2 * a * a + b;
                a--;
                return -c / 2 * (a * (a - 2) - 1) + b
            },
            NONE: o,
            LINEAR: o
        },
        r = JSManipulate,
        s = {
            filter: null,
            values: null,
            stack: !1,
            onComplete: null,
            easing: m,
            direction: "none",
            smoothing: "auto",
            time: 1E3,
            steps: 15
        },
        u = {
            apply: function(e) {
                var d = e.filter,
                    f = e.stack;
                f === void 0 && (f = !1);
                var g = e.onComplete,
                    h = q(d),
                    n = b.extend({}, h.defaultValues),
                    m;
                return this.each(function() {
                    var o =
                        b(this);
                    o.data("filterValues") === void 0 && o.data("filterValues", {});
                    var p = !0,
                        q = o.data("filterValues");
                    q[d] === void 0 && (q[d] = b.extend({}, h.defaultValues), p = !1);
                    for (m in e.values) e.values.hasOwnProperty(m) && (n[m] = j(e.values[m], q[d][m]), n[m] !== q[d][m] && (p = !1));
                    if (c()) {
                        var s = 0;
                        for (m in h.defaultValues) h.defaultValues.hasOwnProperty(m) && s++;
                        if (!p || !(s > 0 && o.data("stacked") === !1 && !f)) {
                            if (p = f ? l(o) : k(o, 0, 0, o[0].width, o[0].height)) h.filter(p, n), t(o, p, 0, 0);
                            for (var u in r) r.hasOwnProperty(u) && u !== d && q[u] && (q[u] =
                                b.extend({}, h.defaultValues));
                            q[d] = b.extend({}, n);
                            o.data("stacked", f)
                        }
                    } else q = (new a(n))[d], q !== void 0 && o.css("filter", q);
                    o.trigger("filterComplete");
                    g && g()
                })
            },
            animate: function(a) {
                if (!c()) return this.trigger("filterComplete"), g && g(), this;
                var d = b.extend({}, s);
                a && b.extend(d, a);
                var f = d.stack,
                    g = d.onComplete,
                    m = d.filter,
                    o = q(m),
                    p = b.extend({}, o.defaultValues),
                    u = e(d.easing),
                    I = parseInt(d.steps, 10),
                    C = parseInt(d.time, 10),
                    V = C / I,
                    A;
                return this.each(function() {
                    var a = b(this);
                    a.data("filterValues") === void 0 && a.data("filterValues", {});
                    var c = !0,
                        e = a.data("filterValues"),
                        q = {};
                    e[m] === void 0 && (e[m] = b.extend({}, o.defaultValues), c = !1);
                    for (A in d.values) d.values.hasOwnProperty(A) && (p[A] = j(d.values[A], e[m][A]), p[A] !== e[m][A] && (c = !1));
                    for (A in p) p.hasOwnProperty(A) && (q[A] = {
                        from: e[m][A],
                        to: p[A]
                    });
                    var s = 0;
                    for (A in o.defaultValues) o.defaultValues.hasOwnProperty(A) && s++;
                    if (c && s > 0 && a.data("stacked") === !1 && !f) a.trigger("filterComplete"), g && g();
                    else {
                        for (var v in r) r.hasOwnProperty(v) && v !== m && e[v] && (e[v] = b.extend({}, o.defaultValues));
                        var N;
                        f && (N = l(a));
                        e[m] = b.extend({}, p);
                        var S = d.smoothing === "auto" ? -1 : d.smoothing <= 0 ? 1 : d.smoothing,
                            J = 0,
                            w = [-1, -1, -1, -1];
                        r[m].isDirAnimatable && (w = h(d.direction, a[0].width, a[0].height));
                        w[0] === -1 && (S = 1);
                        var K = 1,
                            D = 0,
                            E = 0,
                            y = a[0].width,
                            z = a[0].height,
                            W = y,
                            X = z;
                        w[0] > w[1] && (c = w[0], w[0] = w[1], w[1] = c, K = -1);
                        w[2] > w[3] && (c = w[2], w[2] = w[3], w[3] = c, K = -1);
                        var O = w[0] !== w[1],
                            P = null,
                            Q = null,
                            L = null,
                            M = null,
                            G = null,
                            R = null,
                            T, Y = function() {
                                var b = S;
                                if (S !== 1) {
                                    if (J > 0 && (G = f ? n(N, Math.floor(D), Math.floor(E), Math.ceil(y + 1), Math.ceil(z + 1)) : k(a, Math.floor(D),
                                            Math.floor(E), Math.ceil(y + 1), Math.ceil(z + 1)))) o.filter(G, p), t(a, G, Math.floor(D), Math.floor(E), R);
                                    J === I && setTimeout(function() {
                                        if (G = f ? n(N, Math.floor(D), Math.floor(E), Math.ceil(y), Math.ceil(z)) : k(a, Math.floor(D), Math.floor(E), Math.ceil(y), Math.ceil(z))) o.filter(G, p), t(a, G, Math.floor(D), Math.floor(E), R);
                                        clearInterval(T)
                                    }, C / I)
                                }
                                if (J === I) clearInterval(T), a.data("stacked", f), a.trigger("filterComplete"), g && g();
                                else {
                                    J++;
                                    a.trigger("filterStep", {
                                        step: J
                                    });
                                    var b = C / I * J,
                                        c, e, d;
                                    if (w[0] === -1)
                                        for (c in q) {
                                            if (q.hasOwnProperty(c)) e =
                                                q[c].from, d = q[c].to, p[c] = e > d ? e - u.apply(this, [b, 0, e - d, C]) : e + u.apply(this, [b, 0, d - e, C])
                                        } else O ? K === 1 ? (D = Math.floor(u.apply(this, [b - V, w[0], w[1], C])), y = Math.floor(u.apply(this, [b, w[0], w[1], C])) - D) : K === -1 && (D = w[1] - Math.ceil(u.apply(this, [b, w[0], w[1], C])), y = W - D) : K === 1 ? (E = Math.ceil(u.apply(this, [b - V, w[2], w[3], C])), z = Math.ceil(u.apply(this, [b, w[2], w[3], C])) - E) : K === -1 && (E = w[3] - Math.ceil(u.apply(this, [b, w[2], w[3], C])), z = X - E);
                                    if (y > 0 && z > 0) {
                                        b = S;
                                        b === -1 && (b = O ? Math.ceil(y / 2) + 5 : Math.ceil(z / 2) + 5);
                                        for (var h = O ? y / b : y,
                                                j = !O ? z / b : z, m = 0; m < b; m++)
                                            if (Math.ceil(h) > 0 && Math.ceil(j) > 0) {
                                                var l = {};
                                                if (b === 1) l = p;
                                                else
                                                    for (c in q)
                                                        if (q.hasOwnProperty(c)) e = q[c].from, d = q[c].to, l[c] = (d - e) / b, l[c] *= K === 1 ? m : b - m, l[c] = d - l[c]; var r = p.radius !== void 0 && p.centerY !== void 0 && p.centerX !== void 0;
                                                e = !1;
                                                r && (P || (P = q.radius.from * 2), Q || (Q = q.radius.from * 2), h = l.radius * 2, j = l.radius * 2, P > h && (h = P), Q > j && (j = Q), P = l.radius * 2, Q = l.radius * 2, e = !0);
                                                d = O ? D + h * m : D;
                                                var s = !O ? E + j * m : E;
                                                if (r) {
                                                    d = y * l.centerX - h / 2;
                                                    var s = z * l.centerY - j / 2,
                                                        r = d,
                                                        v = s;
                                                    L || (L = y * q.centerX.from - h / 2);
                                                    M || (M = z *
                                                        q.centerY.from - h / 2);
                                                    h += Math.abs(d - L) * 2;
                                                    j += Math.abs(s - M) * 2;
                                                    d -= Math.abs(d - L);
                                                    s -= Math.abs(s - M);
                                                    L < d && (d = L);
                                                    M < s && (s = M);
                                                    L = r;
                                                    M = v;
                                                    l.centerX = 0.5;
                                                    l.centerY = 0.5
                                                }
                                                e && J === 1 && (G = f ? n(N, 0, 0, a[0].width, a[0].height) : k(a, 0, 0, a[0].width, a[0].height), t(a, G, 0, 0, a[0].width, a[0].height));
                                                d < 0 ? (l.centerX += d / h, d = 0) : d + h >= a[0].width && (l.centerX -= (a[0].width - (d + h)) / h, h += a[0].width - (d + h) - 1);
                                                s < 0 ? (l.centerY += s / j, s = 0) : s + j >= a[0].height && (l.centerY -= (a[0].height - (s + j)) / h, j += a[0].height - (s + j) - 1);
                                                if (G = w[0] === -1 && p.radius === void 0 ? f ? n(N,
                                                        0, 0, y, z) : k(a, 0, 0, y, z) : f ? n(N, Math.floor(d), Math.floor(s), Math.ceil(h) + 1, Math.ceil(j) + 1) : k(a, Math.floor(d), Math.floor(s), Math.ceil(h) + 1, Math.ceil(j) + 1)) o.filter(G, l), t(a, G, Math.floor(d), Math.floor(s), R)
                                            }
                                    }
                                    W = D;
                                    X = E
                                }
                            };
                        if (this.tagName === "CANVAS") T = setInterval(Y, C / I);
                        else {
                            c = document.createElement("canvas");
                            c.width = a.width;
                            c.height = a.height;
                            var R = c.getContext("2d"),
                                U = new Image;
                            U.src = a.attr("src");
                            U.onload = function() {
                                R.drawImage(U, 0, 0, a[0].width, a[0].height);
                                T = setInterval(Y, C / I)
                            }
                        }
                    }
                })
            },
            restore: function() {
                return this.each(function() {
                    var a =
                        b(this),
                        c = k(a, 0, 0, a[0].width, a[0].height);
                    c && t(a, c, 0, 0)
                })
            },
            convert: f,
            getFilters: function() {
                return r
            },
            getEasingFunctions: function() {
                return p
            },
            getAnimationParameters: function() {
                return s
            }
        };
    b.fn.jsManipulate = function(a) {
        var c = arguments;
        if (this.length === 0) {
            if (a)
                if (u[a]) return u[a].apply();
                else b.error("Error: Method " + a + " does not exist on jQuery.jsManipulate")
        } else return this.each(function() {
            if (this.tagName === "IMG") {
                if (u[a] === f) return f(b(this), c[1]);
                var e = b(this).data("imgData");
                return e === void 0 ? d(b(this),
                    c) : e.originalData === void 0 ? d(b(this), c) : g(b(this), c)
            } else if (this.tagName === "CANVAS") return g(b(this), c);
            else b.error("JSIF Error: Invalid tag, only use jsManipulate on canvas or img objects.");
            return this
        });
        return this
    }
})(jQuery);