/**
 * cvi_filter_lib.js 2.0 (13-Jan-2011) (c) by Christian Effenberger 
 * All Rights Reserved. Source: filter.netzgesta.de
 * Library supports: booklet.js|
 * cvi_bevel.js|cvi_corner.js|cvi_curl.js|cvi_edge.js|cvi_strip.js|
 * cvi_glossy.js|cvi_instant.js|cvi_reflex.js|cvi_slide.js|cvi_sphere.js
 * Distributed under Netzgestade Non-commercial Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.html
 **/

var cvi_matrix = new Object(); // External kernel matrix definitions
// REMEMBER: Used names should not match any of the filter names!!!
cvi_matrix.blur = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
]; // blurs the image using the Gaussian method.
cvi_matrix.median = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]; // smoothes grainy images.
cvi_matrix.sharpen = [
    [0, -1, 0],
    [-1, 9, -1],
    [0, -1, 0]
]; // makes the image sharper.
cvi_matrix.sharper = [
    [-1, -1, -1],
    [-1, 16, -1],
    [-1, -1, -1]
]; // makes the image even sharper.
cvi_matrix.sharp = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
]; // makes the image sharper.
cvi_matrix.sharpest = [
    [-1, -2, -1],
    [-2, 13, -2],
    [-1, -2, -1]
]; // makes the image sharper.
cvi_matrix.bumplt = [
    [1, 1, 0],
    [1, 1, -1],
    [0, -1, -1]
]; // embosses the image. 
cvi_matrix.bumpbr = [
    [-1, -1, 0],
    [-1, 1, 1],
    [0, 1, 1]
]; // embosses the image. 
/*** add H E R E your personal convolution kernels  ***/
/*** additional edge detection convolution kernels  ***/
cvi_matrix.laplace1 = [
    [-1, 0, -1],
    [0, 4, 0],
    [-1, 0, -1]
]; // embosses the image. 
cvi_matrix.laplace2 = [
    [0, 1, 0],
    [1, -4, 1],
    [0, 1, 0]
]; // embosses the image. 
cvi_matrix.laplace3 = [
    [1, 1, 1],
    [1, -8, 1],
    [1, 1, 1]
]; // embosses the image. 
cvi_matrix.laplace4 = [
    [1, 2, 1],
    [2, -12, 2],
    [1, 2, 1]
]; // embosses the image. 
cvi_matrix.embossbr = [
    [-1, -1, 0],
    [-1, 0, 1],
    [0, 1, 1]
]; // embosses the image. normalize with s=[1,0]
cvi_matrix.embosslt = [
    [1, 1, 0],
    [1, 0, -1],
    [0, -1, -1]
]; // embosses the image. normalize with s=[1,0]
cvi_matrix.edge1 = [
    [-5, 0, 0],
    [0, 0, 0],
    [0, 0, 5]
]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge2 = [
    [-5, -5, -5],
    [-5, 39, -5],
    [-5, -5, -5]
]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge3 = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge4 = [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1]
]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge5 = [
    [-1, -1, -1],
    [2, 2, 2],
    [-1, -1, -1]
]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge6 = [
    [1, 1, 1],
    [1, -7, 1],
    [1, 1, 1]
]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge7 = [
    [-1, 0, 1],
    [0, 0, 0],
    [1, 0, -1]
]; // edge detection. use s=[0-255,0-255]

eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if ('0'.replace(0, e) == 0) {
        while (c--) r[e(c)] = k[c];
        k = [function(e) {
            return r[e] || e
        }];
        e = function() {
            return '([9A-Z]|[12]\\w)'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('T 1z={version:2.0,released:\'2011-01-13 12:00:00\',2h:1o,2i:1o,2j:-1,CBunabled:navigator.userAgent.indexOf(\'WebKit\')!=-1&&!1p.external&&!1q.defaultCharset?1:0,add:17(N,K,Y,w,h){17 2k(h,s,b){T c,f,u,p,q,t;c=9.C(A,9.D(0,9.H(b/U*A)));B(s==0){O[c,c,c]}F{u=h%1e;f=u%60;p=9.C(A,9.D(0,9.H((b*(U-s))/10000*A)));q=9.C(A,9.D(0,9.H((b*(2l-s*f))/2m*A)));t=9.C(A,9.D(0,9.H((b*(2l-s*(60-f)))/2m*A)));switch(9.floor(u/60)){1h 0:O[c,t,p];1h 1:O[q,c,p];1h 2:O[p,c,t];1h 3:O[p,q,c];1h 4:O[t,p,c];1h 5:O[c,p,q]}}O[0,0,0]};17 1S(r,g,b){T rr,gr,br,h,a=9.D(r,g,b),i=9.C(r,g,b),d=a-i,n=a/A,s=(a!=0)?d/a:0;B(s==0){h=0}F{rr=(a-r)/d;gr=(a-g)/d;br=(a-b)/d;B(r==a){h=br-gr}F B(g==a){h=2+rr-br}F{h=4+gr-rr}h/=6;B(h<0){h++}}O[9.H(h*1e),9.H(s*U),9.H(n*U)]};17 2n(y,u,v){O[9.C(A,9.D(0,9.H(y+v/0.2o))),9.C(A,9.D(0,9.H(y-0.39466*u-0.5806*v))),9.C(A,9.D(0,9.H(y+u/0.2p)))]};17 2q(r,g,b){T y=0.1r*r+0.1s*g+0.1t*b;O[y,(b-y)*0.2p,(r-y)*0.2o]};17 1T(v,e){B(1p.2r){1p.2r.1T(v+e)}F B(1p.2s){2s.postError(v+e)}F{1p.1q.title=v}O 1u};17 1D(a,t){O(P Y[a]===t?Y[a]:1i[a])};B(N&&N.tagName.toUpperCase()=="CANVAS"){B(N.1j){T s,a,d,r,g,b,p,c,f,i,j,k,l,m,n,o,q,t,u,v,x=0,y=0,z=0,cb=1u,1v,L,Z,E,M,1i,1E,1U=1u,1V=P(1W)==="17"?1X:1u;E=N.1j(\'2d\');B(E.W){1E=1X}1i={"f":1z.2h,"m":1z.2i,"s":1z.2j};M=K.1j(\'2d\');B(Y){G(i in 1i){B(!Y[i]){Y[i]=1i[i]}}}F{Y=1i}f=1D(\'f\',\'string\');m=1D(\'m\',\'Q\');c=(P Y[\'s\']===\'Q\')?Y[\'s\']||-1:parseFloat(9.D(0,9.C(A,1D(\'s\',\'number\'))))||-1;B(M&&1E&&f!=1o&&w>0&&h>0&&!f.1Y(/(1Z|20|21|22|23)/i)){2t{2t{s=E.W(0,0,1,1)}2u(24){B(P(2v)==="Q"){2v.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")}s=E.W(0,0,1,1)}}2u(24){1U=1X;1T(24.message,". Explanations:\\2w://en.wikipedia.2x/wiki/Same_origin_policy\\2w://www.w3.2x/TR/XMLHttpRequest/#exceptions")}}B(M&&f!=1o&&w>0&&h>0){w+=4;h+=4;B(1U||!1E||f.1Y(/(1Z|20|21|22|23)/i)){B(f=="23"){k=(c[0]>0?9.C(0.26,9.D(0.27,c[0])):0.5);m=(c[1]>=0?9.C(1,9.D(0,c[1])):0.4);l=(c[2]>0?Boolean(c[2]):0);v=(c[3]>0?9.C(8,9.D(1,c[3])):4);T 1k=1q.28(\'29\');1k.18=h-4;1k.19=w-4;T 1w=1q.28(\'29\');1w.18=h-4;1w.19=w-4;T 1x=1q.28(\'29\');1x.18=h-4;1x.19=w-4;T 2y=1k.1j(\'2d\'),2z=1w.1j(\'2d\'),11=1x.1j(\'2d\');2y.I(K,0,0,w-4,h-4);B(1V){1W(E,v,x,y,w,h)}F{t=9.H(v*5);b=9.H(w*.75);q=9.H(h*.75);G(i=0;i<t;i++){r=9.D(2,9.H(b-(2*i)));g=9.D(2,9.H(q-(2*i)));M.1l(0,0,w-4,h-4);M.I(N,0,0,w,h,0,0,r,g);E.1l(0,0,w,h);E.I(K,0,0,r,g,0,0,w,h)}}2z.I(N,2,2,w-4,h-4,0,0,w-4,h-4);E.I(1k,0,0,w-4,h-4,2,2,w-4,h-4);M.1l(0,0,w-4,h-4);11.1l(0,0,w-4,h-4);11.I(1k,0,0);11.2A="source-over";11.I(1w,0,0);11.2A="destination-out";T 14=11.createLinearGradient(0,0,(l?w-4:0),(l?0:h-4));14.1f(0,"1g(0,0,0,0)");B(k-(m/2)-0.05>=0.27){14.1f(k-(m/2)-0.05,"1g(0,0,0,0)")}B(k-(m/2)>=0.27){14.1f(k-(m/2),"1g(0,0,0,1)")}14.1f(k,"1g(0,0,0,1)");B(k+(m/2)<=0.26){14.1f(k+(m/2),"1g(0,0,0,1)")}B(k+(m/2)+0.05<=0.26){14.1f(k+(m/2)+0.05,"1g(0,0,0,0)")}14.1f(1,"1g(0,0,0,0)");11.fillStyle=14;11.fillRect(0,0,w-4,h-4);E.I(1x,0,0,w,h)}F B(f=="1Z"){v=(c>0?9.C(8,9.D(1,c)):1);t=9.H(v*5);b=9.H(w*.75);q=9.H(h*.75);G(i=0;i<t;i++){r=9.D(2,9.H(b-(2*i)));g=9.D(2,9.H(q-(2*i)));M.1l(0,0,w-4,h-4);M.I(N,0,0,w,h,0,0,r,g);E.1l(0,0,w,h);E.I(K,0,0,r,g,0,0,w,h)}M.I(N,0,0,w,h,0,0,w-4,h-4)}F B(f=="20"){M.I(N,0,0,w,h,0,0,w-4,h-4);v=(c>0?c:1);p=E.1a;b=.25;m=b/v;G(i=0;i<v;i++){E.1a=b-(m*i);E.I(K,0,0,K.19,K.18,-i,-i,w+(2*i),h+(2*i))}E.1a=p;M.I(N,0,0,w,h,0,0,w-4,h-4)}F B(f=="21"){M.I(N,0,0,w,h,0,0,w-4,h-4);v=(c[0]>0?c[0]:1);r=(c[1]>=0?9.C(1e,c[1]):0);p=E.1a;i=0;b=.25;m=b/v;T xo,yo,R,S,sx=1,sy=1,xi=0,yi=0,15;z=((r-90)*9.PI)/2b;xo=9.H(v*9.cos(z))+xi;yo=9.H(v*9.sin(z))+yi;R=xo-xi;S=yo-yi;B(R<0){sx=-1;R=-R}B(S<0){sy=-1;S=-S}R=R<<1;S=S<<1;B(S<R){15=S-(R>>1);2B(xi!=xo){B(15>=0){yi+=sy;15-=R}15+=S;xi+=sx;i++;E.1a=b-(m*i);E.I(K,0,0,K.19,K.18,xi,yi,w,h)}}F{15=R-(S>>1);2B(yi!=yo){B(15>=0){xi+=sx;15-=S}15+=R;yi+=sy;i++;E.1a=b-(m*i);E.I(K,0,0,K.19,K.18,xi,yi,w,h)}}E.1a=p;M.I(N,0,0,w,h,0,0,w-4,h-4)}F B(f=="22"){M.I(N,0,0,w,h,0,0,w-4,h-4);v=(c>0?c:1);b=.25;m=b/v;E.2c();E.translate(w/2,h/2);G(i=0;i<v;i++){E.1a=b-(m*i);E.2c();E.2C((9.PI*i)/2b);E.I(K,0,0,K.19,K.18,0-(w/2),0-(h/2),w,h);E.2e();E.2c();E.2C((9.PI*-i)/2b);E.I(K,0,0,K.19,K.18,0-(w/2),0-(h/2),w,h);E.2e()}E.2e();M.I(N,0,0,w,h,0,0,w-4,h-4)}}F{B(f=="convolve"&&(P m===\'Q\')&&m!=1o||(P 2D[f]===\'Q\')){s=E.W(x,y,w,h);a=s.V;d=E.W(x,y,w,h);j=h;i=w;n=w*4;k=2D[f]||m;t=(c[0]>=0?c[0]:k[0][0]+k[0][1]+k[0][2]+k[1][0]+k[1][1]+k[1][2]+k[2][0]+k[2][1]+k[2][2]);m=(c[1]>=0?9.C(A,c[1]):0);G(j=h;j>0;j--){q=[(j-2)*n,(j-1)*n,j*n];G(i=w;i>0;i--){o=[q[0]+(i-2)*4,q[1]+(i-1)*4,q[2]+i*4];r=(a[o[0]-4]*k[0][0]+a[o[0]]*k[0][1]+a[o[0]+4]*k[0][2]+a[o[1]-4]*k[1][0]+a[o[1]]*k[1][1]+a[o[1]+4]*k[1][2]+a[o[2]-4]*k[2][0]+a[o[2]]*k[2][1]+a[o[2]+4]*k[2][2])/t;g=(a[o[0]-3]*k[0][0]+a[o[0]+1]*k[0][1]+a[o[0]+5]*k[0][2]+a[o[1]-3]*k[1][0]+a[o[1]+1]*k[1][1]+a[o[1]+5]*k[1][2]+a[o[2]-3]*k[2][0]+a[o[2]+1]*k[2][1]+a[o[2]+5]*k[2][2])/t;b=(a[o[0]-2]*k[0][0]+a[o[0]+2]*k[0][1]+a[o[0]+6]*k[0][2]+a[o[1]-2]*k[1][0]+a[o[1]+2]*k[1][1]+a[o[1]+6]*k[1][2]+a[o[2]-2]*k[2][0]+a[o[2]+2]*k[2][1]+a[o[2]+6]*k[2][2])/t;d.V[o[1]]=9.C(A,9.D(0,r+m));d.V[o[1]+1]=9.C(A,9.D(0,g+m));d.V[o[1]+2]=9.C(A,9.D(0,b+m))}}E.1L(d,x,y)}F B(f=="outline"){v=(c[0]>=0?9.C(A,c[0]):1);b=(c[1]>=0?9.C(A,c[1]):0);t=(c[2]!=\'\'?c[2].1Y(/1m|1M|1N|1O|1P/i)?c[2]:\'1m\':\'1m\');s=E.W(x,y,w,h);a=s.V;d=E.W(x,y,w,h);u=X 1n();u.1m=X 1n();u.1m.y=[1,2,1,0,0,0,-1,-2,-1];u.1m.x=[1,0,-1,2,0,-2,1,0,-1];u.1M=X 1n();u.1M.y=[3,10,3,0,0,0,-3,-10,-3];u.1M.x=[3,0,-3,10,0,-10,3,0,-3];u.1N=X 1n();u.1N.y=[-1,-1,-1,0,0,0,1,1,1];u.1N.x=[1,0,-1,1,0,-1,1,0,-1];u.1O=X 1n();u.1O.y=[5,5,5,-3,0,-3,-3,-3,-3];u.1O.x=[5,-3,-3,5,0,-3,5,-3,-3];u.1P=X 1n();u.1P.y=[-1,0,0,0,1,0,0,0,0];u.1P.x=[0,0,-1,0,1,0,0,0,0];g=u[t].y;r=u[t].x;G(i=0,n=a.J;i<n;i+=4){o=[[i-(w+1)*4,i-w*4,i-(w-1)*4],[i-4,i,i+4],[i+(w-1)*4,i+w*4,i+(w+1)*4]];l=g[0]*(a[o[0][0]]||0)+g[1]*(a[o[0][1]]||0)+g[2]*(a[o[0][2]]||0)+g[3]*(a[o[1][0]]||0)+g[4]*(a[o[1][1]]||0)+g[5]*(a[o[1][2]]||0)+g[6]*(a[o[2][0]]||0)+g[7]*(a[o[2][1]]||0)+g[8]*(a[o[2][2]]||0);m=r[0]*(a[o[0][0]]||0)+r[1]*(a[o[0][1]]||0)+r[2]*(a[o[0][2]]||0)+r[3]*(a[o[1][0]]||0)+r[4]*(a[o[1][1]]||0)+r[5]*(a[o[1][2]]||0)+r[6]*(a[o[2][0]]||0)+r[7]*(a[o[2][1]]||0)+r[8]*(a[o[2][2]]||0);q=9.C(A,9.D(0,(9.sqrt((l*l)+(m*m))/v)+b));d.V[i]=d.V[i+1]=d.V[i+2]=q}E.1L(d,x,y)}F B(1V&&f=="stackblur"){1W(E,c,x,y,w,h)}F B(f=="anaglyph"){M.I(N,2,2,w-4,h-4,0,0,w-4,h-4);E.I(K,0,0,w-4,h-4,0,0,w,h);s=E.W(0,2,w-4,h-4);a=s.V;d=E.W(4,2,w-4,h-4).V;G(i=0,n=a.J;i<n;i+=4){a[i]=d[i]}E.1L(s,2,2);M.I(N,2,2,w-4,h-4,0,0,w-4,h-4)}F{s=E.W(x,y,w,h);a=s.V;B(f=="invertalpha"){G(i=0,n=a.J;i<n;i+=4){a[i+3]=A-a[i+3]}}F B(f=="invert"){G(i=0,n=a.J;i<n;i+=4){a[i]=A-a[i];a[i+1]=A-a[i+1];a[i+2]=A-a[i+2]}}F B(f=="grayscale"){G(i=0,n=a.J;i<n;i+=4){t=9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t);a[i]=a[i+1]=a[i+2]=t}}F B(f=="alphamask"){G(i=0,n=a.J;i<n;i+=4){t=9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t);a[i]=a[i+1]=a[i+2]=0;a[i+3]=A-t}}F B(f=="multiplyalpha"){G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];t=a[i+3]/A;a[i]=9.C(A,9.D(0,r*t));a[i+1]=9.C(A,9.D(0,g*t));a[i+2]=9.C(A,9.D(0,b*t))}}F B(f=="unmultiplyalpha"){G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];t=A/a[i+3];a[i]=9.C(A,9.D(0,r*t));a[i+1]=9.C(A,9.D(0,g*t));a[i+2]=9.C(A,9.D(0,b*t))}}F B(f=="solarize"){G(i=0,n=a.J;i<n;i+=4){B(a[i]>1d){a[i]=A-a[i]}B(a[i+1]>1d){a[i+1]=A-a[i+1]}B(a[i+2]>1d){a[i+2]=A-a[i+2]}}}F B(f=="threshold"){v=(c>=0?9.C(2,c)*1d:1d);G(i=0,n=a.J;i<n;i+=4){t=9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t);t=t>=v?A:0;a[i]=t;a[i+1]=t;a[i+2]=t}}F B(f=="gamma"){g=(c>=0?c:1);t=X 1Q();G(i=0;i<1y;i++){t[i]=9.C(A,9.D(0,(A*9.pow(i/A,1/g))+0.5))}G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=t[r];a[i+1]=t[g];a[i+2]=t[b]}}F B(f=="colorkey"){l=(P c[0]===\'Q\')?c[0]:[0,0,0];k=(P c[1]===\'Q\')?c[1]:[A,A,A];G(i=0,n=a.J;i<n;i+=4){B((a[i]>=l[0]&&a[i]<=k[0])&&(a[i+1]>=l[1]&&a[i+1]<=k[1])&&(a[i+2]>=l[2]&&a[i+2]<=k[2])){a[i+3]=0}}}F B(f=="exposure"){v=(c>0?9.C(A,9.D(0,c)):1);B(v!=1){t=X 1Q();G(i=0;i<1y;i++){t[i]=9.C(A,9.D(0,A*(1-9.exp(-(i/A)*v))))}G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=t[r];a[i+1]=t[g];a[i+2]=t[b]}}}F B(f=="brightness"){v=(c>=0?c:1);G(i=0,n=a.J;i<n;i+=4){a[i]=9.C(A,9.D(0,a[i]*v));a[i+1]=9.C(A,9.D(0,a[i+1]*v));a[i+2]=9.C(A,9.D(0,a[i+2]*v))}}F B(f=="adjustyuva"){k=(c[0]>=0?c[0]:1);t=(c[1]>=0?c[1]:1);m=(c[2]>=0?c[2]:1);v=(c[3]>=0?c[3]:1);G(i=0,n=a.J;i<n;i+=4){1v=2q(a[i],a[i+1],a[i+2]);Z=2n(1v[0]*k,1v[1]*t,1v[2]*m);a[i]=Z[0];a[i+1]=Z[1];a[i+2]=Z[2];a[i+3]=9.C(A,9.D(0,a[i+3]*v))}}F B(f=="chromakey"){k=(c[0]>=0?9.C(1e,c[0]):1d);t=(c[1]>=0?9.C(1e,c[1]*3.6):36);m=(c[2]>=0?9.C(U,c[2]):88);r=(c[3]>=0?9.C(U,c[3]):30);b=(c[4]>=0?9.C(U,9.D(r,c[4])):82);G(i=0,n=a.J;i<n;i+=4){v=1S(a[i],a[i+1],a[i+2]);B(v[1]>=m&&(v[2]>=r&&v[2]<=b)&&(v[0]-k<t)&&(v[0]-k>(-t))){a[i+3]=9.abs(v[0]-k)/t}}}F B(f=="sepia"){G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=9.C(A,9.D(0,r*.393+g*.769+b*.189));a[i+1]=9.C(A,9.D(0,r*.349+g*.686+b*.168));a[i+2]=9.C(A,9.D(0,r*.272+g*.534+b*.131))}}F B(f=="mixrgb"){k=(P c[0]===\'Q\')?c[0]:[0,0,0];l=(P c[1]===\'Q\')?c[1]:[0,0,0];G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=9.C(A,9.D(0,(k[0]*(l[2]*g+(A-l[2])*b)/A+(A-k[0])*r)/A));a[i+1]=9.C(A,9.D(0,(k[1]*(l[0]*b+(A-l[0])*r)/A+(A-k[1])*g)/A));a[i+2]=9.C(A,9.D(0,(k[2]*(l[1]*r+(A-l[1])*g)/A+(A-k[2])*b)/A))}}F B(f=="posterize"){v=(c>0?9.C(16,9.D(1,c)):1);t=X 1Q();G(i=0;i<1y;i++){t[i]=A*(v*i/1y)/(v-1)}G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=9.C(A,9.D(0,t[r]));a[i+1]=9.C(A,9.D(0,t[g]));a[i+2]=9.C(A,9.D(0,t[b]))}}F B(f=="adjustrgba"){r=(c[0]>=0?c[0]:1);g=(c[1]>=0?c[1]:1);b=(c[2]>=0?c[2]:1);v=(c[3]>=0?c[3]:1);G(i=0,n=a.J;i<n;i+=4){a[i]=9.C(A,9.D(0,a[i]*r));a[i+1]=9.C(A,9.D(0,a[i+1]*g));a[i+2]=9.C(A,9.D(0,a[i+2]*b));a[i+3]=9.C(A,9.D(0,a[i+3]*v))}}F B(f=="contrast"){v=(c>=0?c:1);G(i=0,n=a.J;i<n;i+=4){a[i]=9.C(A,9.D(0,((((a[i]/A)-0.5)*v)+0.5)*A));a[i+1]=9.C(A,9.D(0,((((a[i+1]/A)-0.5)*v)+0.5)*A));a[i+2]=9.C(A,9.D(0,((((a[i+2]/A)-0.5)*v)+0.5)*A))}}F B(f=="adjusthsba"){k=(c[0]>=0?c[0]:1);t=(c[1]>=0?c[1]:1);m=(c[2]>=0?c[2]:1);v=(c[3]>=0?c[3]:1);G(i=0,n=a.J;i<n;i+=4){L=1S(a[i],a[i+1],a[i+2]);L[0]*=k;B(L[0]<0){L[0]=0}F B(L[0]>1e){L[0]=1e}L[1]*=t;B(L[1]<0){L[1]=0}F B(L[1]>U){L[1]=U}L[2]*=m;B(L[2]<0){L[2]=0}F B(L[2]>U){L[2]=U}Z=2k(L[0],L[1],L[2]);a[i]=Z[0];a[i+1]=Z[1];a[i+2]=Z[2];a[i+3]=9.C(A,9.D(0,a[i+3]*v))}}F B(f=="tritone"){k=(P c[0]===\'Q\')?c[0]:[A,0,0];l=(P c[1]===\'Q\')?c[1]:[0,A,0];m=(P c[2]===\'Q\')?c[2]:[0,0,A];t=X 1Q();G(i=0;i<2f;i++){q=i/1d;t[i]=[k[0]+q*(l[0]-k[0]),k[1]+q*(l[1]-k[1]),k[2]+q*(l[2]-k[2])]}G(i=2f;i<1y;i++){q=(i-1d)/2f;t[i]=[l[0]+q*(m[0]-l[0]),l[1]+q*(m[1]-l[1]),l[2]+q*(m[2]-l[2])]}G(i=0,n=a.J;i<n;i+=4){v=9.C(A,9.D(0,9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t)));a[i]=t[v][0];a[i+1]=t[v][1];a[i+2]=t[v][2]}}E.1L(s,x,y)}}}}}O 1u}}', [], 164, '|||||||||Math|||||||||||||||||||||||||||255|if|min|max|ctx|else|for|round|drawImage|length|img|hsb|bcx|obj|return|typeof|object|dx|dy|var|100|data|getImageData|new|opts|rgb||ftx|||stl|frc||function|height|width|globalAlpha|||127|360|addColorStop|rgba|case|defopts|getContext|bfa|clearRect|sobel|Object|null|window|document|299|587|114|false|yuv|bfb|bfc|256|cvi_filter||||getArg|prepared|||||||putImageData|scharr|prewitt|kirsh|roberts|Array||rgb2hsb|log|exception|sba|cvi_stackblur|true|match|smooth|zoomblur|motionblur|spinblur|tiltshift|err||999|001|createElement|canvas||180|save||restore|128||defaultF|defaultM|defaultS|hsb2rgb|6000|600000|yuv2rgb|877|493|rgb2yuv|console|opera|try|catch|netscape|nhttp|org|btx|atx|globalCompositeOperation|while|rotate|cvi_matrix'.split('|'), 0, {}))
