"use strict";var Exception=function(r,e){this.name=r,this.message=e,this.prototype=new Error,this.prototype.constructor=this};this.onmessage=function(r){try{switch(this.aborted=!1,r.data.action){case"encrypt":new Crypto(r.data.name,r.data.buffer,r.data.pass,0);break;case"decrypt":new Crypto(null,null,r.data.pass,1);break;case"encode":new JPEGEncoder(r.data.method,r.data.buffer,r.data.width,r.data.height);break;case"decode":new JPEGDecoder(r.data.method,r.data.buffer)}}catch(e){postMessage({type:"error",name:e.name,msg:e.message})}};var Crypto=function(r,e,n,a){if(0==a){var o,t=new Uint8Array(e),f=t.length,c=10+2*r.length+f,c=""!=n?16*Math.ceil(c/16):c,i=new Uint8Array(c),s=0;i[s++]=3,i[s++]=20,i[s++]=21,i[s++]=147,i[s++]=f>>24,i[s++]=255&f>>16,i[s++]=255&f>>8,i[s++]=255&f,i[s++]=r.length>>8,i[s++]=255&r.length;for(var p=0;p<r.length;p++)o=r.charCodeAt(p),i[s++]=o>>8,i[s++]=255&o;for(var p=0;f>p;p++)i[s++]=t[p];Crypto.prototype.data=""!=n?new AES256(i,n,a):i,postMessage({type:"encrypt",size:c})}else{var u,v,r,i,t="undefined"!=typeof Crypto.prototype.data?Crypto.prototype.data:[],f=t.length,s=0;if(0==f)throw new Exception("decrypt","Nothing to decrypt");if(t=""!=n?new AES256(t,n,a):t,u=t[4]<<24|t[5]<<16|t[6]<<8|t[7],v=t[8]<<8|t[9],3!=t[0]||20!=t[1]||21!=t[2]||147!=t[3])throw new Exception("decrypt","Wrong password");if(0==u||0==v)throw new Exception("decrypt","Empty data");s=10,r=new Array(v);for(var p=0;v>p;p++)r[p]=t[s++]<<8,r[p]|=t[s++],r[p]=String.fromCharCode(r[p]);i=new Uint8Array(u);for(var p=0;u>p;p++)i[p]=t[s++];postMessage({type:"decrypt",name:r.join(""),buffer:i.buffer},[i.buffer])}},SHA3=function(){var r,e,n,a,o,t;return r=[0,10,20,5,15,16,1,11,21,6,7,17,2,12,22,23,8,18,3,13,14,24,9,19,4],e="1,8082,808a,80008000,808b,80000001,80008081,8009,8a,88,80008009,8000000a,8000808b,8b,8089,8003,8002,80,800a,8000000a,80008081,8080".split(",").map(function(r){return parseInt(r,16)}),n=[0,1,30,28,27,4,12,6,23,20,3,10,11,25,7,9,13,15,21,8,18,2,29,24,14],a=function(r,e){return r<<e|r>>>32-e},o=function(r){return("00"+r.toString(16)).slice(-2)},t=function(r){return o(255&r)+o(r>>>8)+o(r>>>16)+o(r>>>24)},function(o){var t,f,c,i,s,p,u,v,d,l;for(l=[],t=0;25>t;t+=1)l[t]=0;for(p=[],u=[],d=[],o+="Ġ";0!==o.length%16;)o+="\0";for(f=0;f<o.length;f+=16){for(c=0;16>c;c+=2)l[c/2]^=o.charCodeAt(f+c)+65536*o.charCodeAt(f+c+1);for(v=0;22>v;v+=1){for(i=0;5>i;i+=1)p[i]=l[i]^l[i+5]^l[i+10]^l[i+15]^l[i+20];for(i=0;5>i;i+=1)u[i]=p[(i+4)%5]^a(p[(i+1)%5],1);for(t=0;25>t;t+=1)d[r[t]]=a(l[t]^u[t%5],n[t]);for(i=0;5>i;i+=1)for(s=0;25>s;s+=5)l[s+i]=d[s+i]^~d[s+(i+1)%5]&d[s+(i+2)%5];l[0]^=e[v]}}return l.slice(0,8)}}(),AES256=function(r,e,n){function a(){AES256.prototype.tables=[[[],[],[],[],[]],[[],[],[],[],[]]];var r,e,n,a,o,t,f,c,i,s=AES256.prototype.tables[0],p=AES256.prototype.tables[1],u=s[4],v=p[4],d=[],l=[];for(r=0;256>r;r++)l[(d[r]=r<<1^283*(r>>7))^r]=r;for(e=n=0;!u[e];e^=a||1,n=l[n]||1)for(f=n^n<<1^n<<2^n<<3^n<<4,f=99^(f>>8^255&f),u[e]=f,v[f]=e,t=d[o=d[a=d[e]]],i=16843009*t^65537*o^257*a^16843008*e,c=257*d[f]^16843008*f,r=0;4>r;r++)s[r][e]=c=c<<24^c>>>8,p[r][f]=i=i<<24^i>>>8;for(r=0;5>r;r++)s[r]=s[r].slice(0),p[r]=p[r].slice(0)}function o(r){AES256.prototype.tables||a();var e,n,o,t,c,i=AES256.prototype.tables[0][4],s=(AES256.prototype.tables[0],AES256.prototype.tables[1]),p=r.length,u=1;for(f=[t=r,c=[]],e=p;4*p+28>e;e++)o=t[e-1],(0===e%p||8===p&&4===e%p)&&(o=i[o>>>24]<<24^i[255&o>>16]<<16^i[255&o>>8]<<8^i[255&o],0===e%p&&(o=o<<8^o>>>24^u<<24,u=u<<1^283*(u>>7))),t[e]=t[e-p]^o;for(n=0;e;n++,e--)o=t[3&n?e:e-4],c[n]=4>=e||4>n?o:s[0][i[o>>>24]]^s[1][i[255&o>>16]]^s[2][i[255&o>>8]]^s[3][i[255&o]]}function t(r,e){var n,a,o,t,c=f[e],i=r[0]^c[0],s=r[e?3:1]^c[1],p=r[2]^c[2],u=r[e?1:3]^c[3],v=c.length/4-2,d=4,l=[0,0,0,0],h=AES256.prototype.tables[e],y=h[0],w=h[1],m=h[2],b=h[3],g=h[4];for(t=0;v>t;t++)n=y[i>>>24]^w[255&s>>16]^m[255&p>>8]^b[255&u]^c[d],a=y[s>>>24]^w[255&p>>16]^m[255&u>>8]^b[255&i]^c[d+1],o=y[p>>>24]^w[255&u>>16]^m[255&i>>8]^b[255&s]^c[d+2],u=y[u>>>24]^w[255&i>>16]^m[255&s>>8]^b[255&p]^c[d+3],d+=4,i=n,s=a,p=o;for(t=0;4>t;t++)l[e?3&-t:t]=g[i>>>24]<<24^g[255&s>>16]<<16^g[255&p>>8]<<8^g[255&u]^c[d++],n=i,i=s,s=p,p=u,u=n;return l}var f,c,i,s,p,u,v,d,l,h=4,y=0,w=new Uint8Array((r.length>>4<<4)+4);if(0==n?(v=0|-Math.random()*(1<<30),w[0]=v>>24,w[1]=255&v>>16,w[2]=255&v>>8,w[3]=255&v):v=r[0]<<24|r[1]<<16|r[2]<<8|r[3],o(SHA3(e+v)),1==n&&(h=0,u=4,c=r[u+0]<<24|r[u+1]<<16|r[u+2]<<8|r[u+3],i=r[u+4]<<24|r[u+5]<<16|r[u+6]<<8|r[u+7],s=r[u+8]<<24|r[u+9]<<16|r[u+10]<<8|r[u+11],p=r[u+12]<<24|r[u+13]<<16|r[u+14]<<8|r[u+15],d=t([c,i,s,p],n),51647891!=d[0]))throw new Exception("decrypt","Wrong password");for(u=4-h;u<w.length;u+=16)c=r[u+0]<<24|r[u+1]<<16|r[u+2]<<8|r[u+3],i=r[u+4]<<24|r[u+5]<<16|r[u+6]<<8|r[u+7],s=r[u+8]<<24|r[u+9]<<16|r[u+10]<<8|r[u+11],p=r[u+12]<<24|r[u+13]<<16|r[u+14]<<8|r[u+15],d=t([c,i,s,p],n),w[h++]=d[0]>>24,w[h++]=255&d[0]>>16,w[h++]=255&d[0]>>8,w[h++]=255&d[0],w[h++]=d[1]>>24,w[h++]=255&d[1]>>16,w[h++]=255&d[1]>>8,w[h++]=255&d[1],w[h++]=d[2]>>24,w[h++]=255&d[2]>>16,w[h++]=255&d[2]>>8,w[h++]=255&d[2],w[h++]=d[3]>>24,w[h++]=255&d[3]>>16,w[h++]=255&d[3]>>8,w[h++]=255&d[3],l=0|100*u/w.length,l>y+9&&(y=l,postMessage({type:"progress",progress:l,name:(0==n?"en":"de")+"crypt"}));return w},JPEGEncoder=function(r,e,n,a){function o(){for(var e=0!=r?34:0,n=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],a=0;64>a;a++){var o=P((n[a]*e+50)/100);1>o?o=1:o>255&&(o=255),C[N[a]]=o}for(var t=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],f=0;64>f;f++){var c=P((t[f]*e+50)/100);1>c?c=1:c>255&&(c=255),M[N[f]]=c}for(var i=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],s=0,p=0;8>p;p++)for(var u=0;8>u;u++)I[s]=1/(8*C[N[s]]*i[p]*i[u]),L[s]=1/(8*M[N[s]]*i[p]*i[u]),s++}function t(){switch(r){case"auto":r=1;break;case"join":r=1;break;case"steg":r=0;break;default:throw new Exception("encode","Unknown method")}}function f(r,e){for(var n=0,a=0,o=new Array,t=1;16>=t;t++){for(var f=1;f<=r[t];f++)o[e[a]]=[],o[e[a]][0]=n,o[e[a]][1]=t,a++,n++;n*=2}return o}function c(){A=f(B,K),E=f(X,Y),k=f(Q,R),x=f(Z,$)}function i(){for(var r=1,e=2,n=1;15>=n;n++){for(var a=r;e>a;a++)U[32767+a]=n,S[32767+a]=[],S[32767+a][1]=n,S[32767+a][0]=a;for(var o=-(e-1);-r>=o;o++)U[32767+o]=n,S[32767+o]=[],S[32767+o][1]=n,S[32767+o][0]=e-1+o;r<<=1,e<<=1}}function s(){for(var r=0;256>r;r++)z[r]=19595*r,z[r+256>>0]=38470*r,z[r+512>>0]=7471*r+32768,z[r+768>>0]=-11059*r,z[r+1024>>0]=-21709*r,z[r+1280>>0]=32768*r+8421375,z[r+1536>>0]=-27439*r,z[r+1792>>0]=-5329*r}function p(r){for(var e=r[0],n=r[1]-1;n>=0;)e&1<<n&&(W|=1<<j),n--,j--,0>j&&(255==W?(u(255),u(0)):u(W),j=7,W=0)}function u(r){F.push(r)}function v(r){u(255&r>>8),u(255&r)}function d(r,e){var n,a,o,t,f,c,i,s,p,u=0,v=8;for(p=0;v>p;++p){n=r[u],a=r[u+1],o=r[u+2],t=r[u+3],f=r[u+4],c=r[u+5],i=r[u+6],s=r[u+7];var d=n+s,l=n-s,h=a+i,y=a-i,w=o+c,m=o-c,b=t+f,g=t-f,A=d+b,E=d-b,k=h+w,x=h-w;r[u]=A+k,r[u+4]=A-k;var P=.707106781*(x+E);r[u+2]=E+P,r[u+6]=E-P,A=g+m,k=m+y,x=y+l;var C=.382683433*(A-x),M=.5411961*A+C,I=1.306562965*x+C,L=.707106781*k,S=l+L,U=l-L;r[u+5]=U+M,r[u+3]=U-M,r[u+1]=S+I,r[u+7]=S-I,u+=8}for(u=0,p=0;v>p;++p){n=r[u],a=r[u+8],o=r[u+16],t=r[u+24],f=r[u+32],c=r[u+40],i=r[u+48],s=r[u+56];var G=n+s,J=n-s,T=a+i,O=a-i,z=o+c,F=o-c,W=t+f,j=t-f,H=G+W,q=G-W,V=T+z,N=T-z;r[u]=H+V,r[u+32]=H-V;var B=.707106781*(N+q);r[u+16]=q+B,r[u+48]=q-B,H=j+F,V=F+O,N=O+J;var K=.382683433*(H-N),Q=.5411961*H+K,R=1.306562965*N+K,X=.707106781*V,Y=J+X,Z=J-X;r[u+40]=Z+Q,r[u+24]=Z-Q,r[u+8]=Y+R,r[u+56]=Y-R,u++}for(p=0;64>p;++p)D[p]=0|r[p]*e[p];return D}function l(){v(65504),v(16),u(74),u(70),u(73),u(70),u(0),u(1),u(1),u(0),v(1),v(1),u(0),u(0)}function h(r,e){v(65472),v(17),u(8),v(e),v(r),u(3),u(1),u(17),u(0),u(2),u(17),u(1),u(3),u(17),u(1)}function y(){v(65499),v(132),u(0);for(var r=0;64>r;r++)u(C[r]);u(1);for(var e=0;64>e;e++)u(M[e])}function w(){v(65476),v(418),u(0);for(var r=0;16>r;r++)u(B[r+1]);for(var e=0;11>=e;e++)u(K[e]);u(16);for(var n=0;16>n;n++)u(Q[n+1]);for(var a=0;161>=a;a++)u(R[a]);u(1);for(var o=0;16>o;o++)u(X[o+1]);for(var t=0;11>=t;t++)u(Y[t]);u(17);for(var f=0;16>f;f++)u(Z[f+1]);for(var c=0;161>=c;c++)u($[c])}function m(){v(65498),v(12),u(3),u(1),u(0),u(2),u(17),u(3),u(17),u(0),u(63),u(0)}function b(e,n,a,o,t){for(var f,c=t[0],i=t[240],s=16,u=63,v=64,l=d(e,n),h=0;v>h;++h)G[N[h]]=l[h];if(0==r){for(var y=0;36>y;y++)G[y]>>1&&(G[y]>>=2,G[y]<<=2,G[y]|=V>q?3&H[q>>3]>>6-(7&q):0|3&10*Math.random(),q+=2,0==G[y]>>2&&(G[y]|=4));for(var y=36;64>y;y++)G[y]=0}var w=G[0]-a;a=G[0],0==w?p(o[0]):(f=32767+w,p(o[U[f]]),p(S[f]));for(var m=63;m>0&&0==G[m];m--);if(0==m)return p(c),a;for(var b,y=1;m>=y;){for(var g=y;0==G[y]&&m>=y;++y);var A=y-g;if(A>=s){b=A>>4;for(var E=1;b>=E;++E)p(i);A=15&A}f=32767+G[y],p(t[(A<<4)+U[f]]),p(S[f]),y++}return m!=u&&p(c),a}function g(){var o=(new Date).getTime();F=new Array,W=0,j=7,v(65496),l(),y(),h(n,a),w(),m();var t=0,f=0,c=0;W=0,j=7;for(var i,s,u,d,g,P,C,M,S,U,D=4*n,G=0,N=0;a>N;){for(s=0;D>s;){for(P=D*N+s,C=P,M=-1,S=0,U=0;64>U;U++)S=U>>3,M=4*(7&U),C=P+S*D+M,N+S>=a&&(C-=D*(N+1+S-a)),s+M>=D&&(C-=s+M-D+4),u=e.data[C++],d=e.data[C++],g=e.data[C++],J[U]=(z[u]+z[d+256>>0]+z[g+512>>0]>>16)-128,T[U]=(z[u+768>>0]+z[d+1024>>0]+z[g+1280>>0]>>16)-128,O[U]=(z[u+1280>>0]+z[d+1536>>0]+z[g+1792>>0]>>16)-128;t=b(J,I,t,A,k),f=b(T,L,f,E,x),c=b(O,L,c,E,x),s+=32}N+=8,i=0|100*N/a,i>G+9&&(postMessage({type:"progress",name:"encode",progress:i}),G=i)}if(j>=0){var B=[];B[1]=j+1,B[0]=(1<<j+1)-1,p(B)}if(v(65497),0!=r){q=V;for(var K=0;V>>3>K;K++)F.push(H[K]);v(65497)}var Q=new Uint8Array(F),R=(new Date).getTime()-o;F=[],postMessage({type:"encode",time:R,isize:Q.length,csize:q/8,rate:12.5*q/Q.length,buffer:Q.buffer},[Q.buffer])}var A,E,k,x,P=(Math.round,Math.floor),C=new Int8Array(64),M=new Int8Array(64),I=new Float32Array(64),L=new Float32Array(64),S=new Array(65535),U=new Array(65535),D=new Int16Array(64),G=new Int16Array(64),J=new Float32Array(64),T=new Float32Array(64),O=new Float32Array(64),z=new Int32Array(2048),F=[],W=0,j=7,H="undefined"!=typeof Crypto.prototype.data?"undefined"!=typeof Crypto.prototype.data[0]?Crypto.prototype.data:[]:[],q=0,V=8*H.length,N=new Int8Array([0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63]);new Int8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);var B=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],K=[0,1,2,3,4,5,6,7,8,9,10,11],Q=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],R=new Uint8Array([1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250]),X=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],Y=[0,1,2,3,4,5,6,7,8,9,10,11],Z=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],$=new Uint8Array([0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250]);t(),c(),i(),s(),o(),g()},JPEGDecoder=function(r,e){function n(r,e){for(var n,a,o=0,t=[],f=16;f>0&&!r[f-1];)f--;t.push({children:[],index:0});var c,i=t[0];for(n=0;f>n;n++){for(a=0;a<r[n];a++){for(i=t.pop(),i.children[i.index]=e[o];i.index>0;)i=t.pop();for(i.index++,t.push(i);t.length<=n;)t.push(c={children:[],index:0}),i.children[i.index]=c.children,i=c;o++}f>n+1&&(t.push(c={children:[],index:0}),i.children[i.index]=c.children,i=c)}return t[0].children}function a(r,e,n,a,o,t,c,i,s){function p(){if(D>0)return D--,1&U>>D;if(U=r[e++],255==U){var n=r[e++];if(n)throw new Exception("decode","Unexpected JPEG marker")}return D=7,U>>>7}function u(r){for(var e,n=r;null!==(e=p());){if(n=n[e],"number"==typeof n)return n;if("object"!=typeof n)throw new Exception("decode","Invalid JPEG huffman sequence")}return null}function v(r){for(var e=0;r>0;){var n=p();if(null===n)return;e=e<<1|n,r--}return e}function d(r){var e=v(r);return e>=1<<r-1?e:e+(-1<<r)+1}function l(r,e){var n=u(r.huffmanTableDC),a=0===n?0:d(n);e[0]=r.pred+=a;for(var o=1;64>o;){var t=u(r.huffmanTableAC),c=15&t,i=t>>4;if(0!==c){o+=i;var s=f[o];e[s]=d(c),o++}else{if(15>i)break;o+=16}}}function h(r,e){var n=u(r.huffmanTableDC),a=0===n?0:d(n)<<s;e[0]=r.pred+=a}function y(r,e){e[0]|=p()<<s}function w(r,e){if(G>0)return G--,void 0;for(var n=t,a=c;a>=n;){var o=u(r.huffmanTableAC),i=15&o,p=o>>4;if(0!==i){n+=p;var l=f[n];e[l]=d(i)*(1<<s),n++}else{if(15>p){G=v(p)+(1<<p)-1;break}n+=16}}}function m(r,e){for(var n=t,a=c,o=0;a>=n;){var i=f[n];switch(J){case 0:var l=u(r.huffmanTableAC),h=15&l,o=l>>4;if(0===h)15>o?(G=v(o)+(1<<o),J=4):(o=16,J=1);else{if(1!==h)throw new Exception("decode","Invalid JPEG ACn encoding");A=d(h),J=o?2:3}continue;case 1:case 2:e[i]?e[i]+=p()<<s:(o--,0===o&&(J=2==J?3:0));break;case 3:e[i]?e[i]+=p()<<s:(e[i]=A<<s,J=0);break;case 4:e[i]&&(e[i]+=p()<<s)}n++}4===J&&(G--,0===G&&(J=0))}function b(r,e,n,a,o){var t=0|n/I,f=n%I,c=t*r.v+a,i=f*r.h+o;e(r,r.blocks[c][i])}function g(r,e,n){var a=0|n/r.blocksPerLine,o=n%r.blocksPerLine;e(r,r.blocks[a][o])}var A,E,k,x,P,C,M,I=(n.precision,n.samplesPerLine,n.scanLines,n.mcusPerLine),L=n.progressive,S=(n.maxH,n.maxV,e),U=0,D=0,G=0,J=0,T=a.length;M=L?0===t?0===i?h:y:0===i?w:m:l;var O,z,F=0;z=1==T?a[0].blocksPerLine*a[0].blocksPerColumn:I*n.mcusPerColumn,o||(o=z);for(var W,j;z>F;){for(k=0;T>k;k++)a[k].pred=0;if(G=0,1==T)for(E=a[0],C=0;o>C;C++)g(E,M,F),F++;else for(C=0;o>C;C++){for(k=0;T>k;k++)for(E=a[k],W=E.h,j=E.v,x=0;j>x;x++)for(P=0;W>P;P++)b(E,M,F,x,P);F++}if(D=0,O=r[e]<<8|r[e+1],!(O>=65488&&65495>=O))break;e+=2}return e-S}function o(){switch(r){case void 0:case"auto":r=2;break;case"join":r=1;break;case"steg":r=0;break;default:throw new Exception("decode","Unknown s-method")}}function t(e){function o(){var r=e[p]<<8|e[p+1];return p+=2,r}function t(){var r=o(),n=e.subarray(p,p+r-2);return p+=n.length,n}function c(r){var e,n,a=0,o=0;for(n in r.components)r.components.hasOwnProperty(n)&&(e=r.components[n],a<e.h&&(a=e.h),o<e.v&&(o=e.v));var t=Math.ceil(r.samplesPerLine/8/a),f=Math.ceil(r.scanLines/8/o);for(n in r.components)if(r.components.hasOwnProperty(n)){e=r.components[n];for(var c=Math.ceil(Math.ceil(r.samplesPerLine/8)*e.h/a),i=Math.ceil(Math.ceil(r.scanLines/8)*e.v/o),s=t*e.h,p=f*e.v,u=[],v=0;p>v;v++){for(var d=[],l=0;s>l;l++)d.push(new Int32Array(64));u.push(d)}e.blocksPerLine=c,e.blocksPerColumn=i,e.blocks=u}r.maxH=a,r.maxV=o,r.mcusPerLine=t,r.mcusPerColumn=f}var i,s,p=0,u=(e.length,(new Date).getTime()),v=null,d=null,l=[],h=[],y=[],w=[],m=o();if(65496!=m)throw new Exception("decode","Invalid JPEG");for(m=o();65497!=m;){var b,g;switch(m){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var A=t();65504===m&&74===A[0]&&70===A[1]&&73===A[2]&&70===A[3]&&0===A[4]&&(v={version:{major:A[5],minor:A[6]},densityUnits:A[7],xDensity:A[8]<<8|A[9],yDensity:A[10]<<8|A[11],thumbWidth:A[12],thumbHeight:A[13],thumbData:A.subarray(14,14+3*A[12]*A[13])}),65518===m&&65===A[0]&&100===A[1]&&111===A[2]&&98===A[3]&&101===A[4]&&0===A[5]&&(d={version:A[6],flags0:A[7]<<8|A[8],flags1:A[9]<<8|A[10],transformCode:A[11]});break;case 65499:for(var E=o(),k=E+p-2;k>p;){var x=e[p++],P=new Int32Array(64);if(0===x>>4)for(g=0;64>g;g++){var C=f[g];P[C]=e[p++]}else{if(1!==x>>4)throw new Exception("decode","Invalid JPEG table spec");for(g=0;64>g;g++){var C=f[g];P[C]=o()}}l[15&x]=P}break;case 65472:case 65474:o(),i={},i.progressive=65474===m,i.precision=e[p++],i.scanLines=o(),i.samplesPerLine=o(),i.components={},i.componentsOrder=[];var M,I=e[p++];for(b=0;I>b;b++){M=e[p];var L=e[p+1]>>4,S=15&e[p+1],U=e[p+2];i.componentsOrder.push(M),i.components[M]={h:L,v:S,quantizationTable:l[U]},p+=3}c(i),h.push(i);break;case 65476:var D=o();for(b=2;D>b;){var G=e[p++],J=new Uint8Array(16),T=0;for(g=0;16>g;g++,p++)T+=J[g]=e[p];var O=new Uint8Array(T);for(g=0;T>g;g++,p++)O[g]=e[p];b+=17+T,(0===G>>4?w:y)[15&G]=n(J,O)}break;case 65501:o(),s=o();break;case 65498:o();var z,F=e[p++],W=[];for(b=0;F>b;b++){z=i.components[e[p++]];var j=e[p++];z.huffmanTableDC=w[j>>4],z.huffmanTableAC=y[15&j],W.push(z)}var H=e[p++],q=e[p++],V=e[p++],N=a(e,p,i,W,s,H,q,V>>4,15&V);p+=N;break;case 65280:p+=1;break;default:if(255==e[p-3]&&e[p-2]>=192&&e[p-2]<=254){p-=3;break}p+=2}m=o()}if(0!=r&&e.length-p>9){var B=e.subarray(p);m=e.subarray(-2),255==m[0]&&217==m[1]&&(B=B.subarray(0,-2))}else{var K=0;if(2!=l.length)throw new Exception("decode","Wrong JPEG tables count");for(var b=0;64>b;b++)K+=l[0][b]+l[1][b];if(128!=K)throw new Exception("decode","File not encrypted");if(1!=h.length)throw new Exception("decode","Wrong JPEG frames count");if(3!=i.componentsOrder.length)throw new Exception("decode","Wrong JPEG components count");for(var Q,R,X,z=i.components[i.componentsOrder[0]],Y=z.blocksPerLine,Z=z.blocksPerColumn,$=0,_=0,B=[],re=-1,ee=0;Z>ee;ee++){for(var ne=0;Y>ne;ne++)for(var b=0;3>b;b++){z=i.components[i.componentsOrder[b]],R=z.blocks[ee][ne];for(var g=0;64>g;g++)R[f[g]]>>1&&(3&_||re++,X=3&R[f[g]],B[re]|=X<<((3&~_++)<<1))}Q=0|100*(ee+1)/Z,Q>$+9&&(postMessage({type:"progress",name:"decode",progress:Q}),$=Q)}}Crypto.prototype.data=new Uint8Array(B);var ae=(new Date).getTime()-u;postMessage({type:"decode",time:ae,isize:e.length,csize:B.length,rate:100*B.length/e.length})}var f=new Int8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);o(),t(new Uint8Array(e))};