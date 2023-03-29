(()=>{"use strict";var t={279:(t,e,r)=>{r.r(e)},629:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Canvas=void 0,e.Canvas=class{constructor(t={}){this.init(t)}init(t){var e;const{selector:r,element:n,initWidth:o,initHeight:i}=t;let a;"string"==typeof r&&r.length>0&&(a=document.querySelector(r)),this.element=null!==(e=null!=n?n:a)&&void 0!==e?e:document.createElement("canvas");const s=this.element.getContext("webgl");if(null==s)throw new Error("Unable to get webgl context");this.context=s,this.initWidth=null!=o?o:this.element.width,this.initHeight=null!=i?i:this.element.height,this.element.width=this.initWidth,this.element.height=this.initHeight,this.addListeners(t)}addListeners(t){"function"==typeof t.onPointerDown&&window.addEventListener("pointerdown",t.onPointerDown),"function"==typeof t.onPointerMove&&window.addEventListener("pointermove",t.onPointerMove),"function"==typeof t.onPointerUp&&(window.addEventListener("pointerup",t.onPointerUp),window.addEventListener("pointercancel",t.onPointerUp))}removeListeners(t){"function"==typeof t.onPointerDown&&window.removeEventListener("pointerdown",t.onPointerDown),"function"==typeof t.onPointerMove&&window.removeEventListener("pointermove",t.onPointerMove),"function"==typeof t.onPointerUp&&window.removeEventListener("pointerup",t.onPointerUp)}}},356:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.IcoSphere=void 0;class r{static icosahedronElements(){const t=(1+Math.sqrt(5))/2;return[[-1,t,0,1,t,0,-1,-t,0,1,-t,0,0,-1,t,0,1,t,0,-1,-t,0,1,-t,t,0,-1,t,0,1,-t,0,-1,-t,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1]]}static icosahedronVertices(){const[t,e]=r.icosahedronElements(),n=e.length,o=[],i=[];for(let a=0;a<n;a+=3){const n=r.getFaceVertices(a,e,t);Array.prototype.push.apply(o,n);const s=[Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()];Array.prototype.push.apply(i,s)}return[o,i]}static splitVertices(t,e){const n=[],o={},i=t.length;for(let a=0;a<i;a+=9){const i=t[a],s=t[a+1],l=t[a+2],c=t[a+3],d=t[a+4],h=t[a+5],u=t[a+6],f=t[a+7],p=t[a+8],[m,v,M]=r.getMidpoint(i,s,l,c,d,h,o),[w,y,P]=r.getMidpoint(c,d,h,u,f,p,o),[g,A,E]=r.getMidpoint(u,f,p,i,s,l,o),b=[i,s,l,m,v,M,g,A,E,m,v,M,c,d,h,w,y,P,g,A,E,w,y,P,u,f,p,m,v,M,w,y,P,g,A,E],_=[e[a],e[a+1],e[a+2],Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),e[a+3],e[a+4],e[a+5],Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),e[a+6],e[a+7],e[a+8],Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()];Array.prototype.push.apply(n,b),Array.prototype.push.apply(e,_)}return[n,e]}static getFaceVertices(t,e,r){const n=[e[t],e[t+1],e[t+2]],o=[3*n[0],3*n[1],3*n[2]];return[r[o[0]],r[o[0]+1],r[o[0]+2],r[o[1]],r[o[1]+1],r[o[1]+2],r[o[2]],r[o[2]+1],r[o[2]+2]]}static midpoint(t,e,r,n,o,i){return[(t+n)/2,(e+o)/2,(r+i)/2]}static pointToKey(t,e,r){return t.toPrecision(6)+","+e.toPrecision(6)+","+r.toPrecision(6)}static getMidpoint(t,e,n,o,i,a,s){const[l,c,d]=r.midpoint(t,e,n,o,i,a),h=r.pointToKey(l,c,d),u=s[h];return null!=u?u:(s[h]=[l,c,d],[l,c,d])}static getPointIndexOf(t,e,r,n){let o,i,a,s=-1;return(o=n.indexOf(t))>-1&&(i=n.indexOf(e))>-1&&(a=n.indexOf(r))>-1&&a-i==1&&i-o==1&&(s=o),s}static subDivide(t,e){const n=[],o=[],i={},a=e.length;for(let s=0;s<a;s+=3){const[a,l,c,d,h,u,f,p,m]=r.getFaceVertices(s,e,t),[v,M,w]=r.getMidpoint(a,l,c,d,h,u,i),[y,P,g]=r.getMidpoint(d,h,u,f,p,m,i),[A,E,b]=r.getMidpoint(f,p,m,a,l,c,i),_=[a,l,c,d,h,u,f,p,m,v,M,w,y,P,g,A,E,b],L=[],S=[];for(let t=0;t<18;t+=3){let e=r.getPointIndexOf(_[t],_[t+1],_[t+2],o);-1===e&&(e=(L.push(_[t])-1)/3,L.push(_[t+1]),L.push(_[t+2])),S.push(e)}Array.prototype.push.apply(o,L),Array.prototype.push.apply(n,S)}return[o,n]}static normalize(t,e,r){const n=Math.sqrt(t*t+e*e+r*r);return 0===n?[0,0,0]:[t/n,e/n,r/n]}}e.IcoSphere=r},675:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Loader=void 0,e.Loader=class{static async getText(t){const e=await fetch(t);if(!e.ok)throw Error("Unable to load file as text");return await e.text()}}},897:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Matrix4=void 0;class r{constructor(){this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}setRotate(t,e,r,n){let o,i,a,s,l,c,d,h,u,f;const p=Math.PI*t/180,m=this.elements;o=Math.sin(p);const v=Math.cos(p);return 0!==e&&0===r&&0===n?(e<0&&(o=-o),m[0]=1,m[4]=0,m[8]=0,m[12]=0,m[1]=0,m[5]=v,m[9]=-o,m[13]=0,m[2]=0,m[6]=o,m[10]=v,m[14]=0,m[3]=0,m[7]=0,m[11]=0,m[15]=1):0===e&&0!==r&&0===n?(r<0&&(o=-o),m[0]=v,m[4]=0,m[8]=o,m[12]=0,m[1]=0,m[5]=1,m[9]=0,m[13]=0,m[2]=-o,m[6]=0,m[10]=v,m[14]=0,m[3]=0,m[7]=0,m[11]=0,m[15]=1):0===e&&0===r&&0!==n?(n<0&&(o=-o),m[0]=v,m[4]=-o,m[8]=0,m[12]=0,m[1]=o,m[5]=v,m[9]=0,m[13]=0,m[2]=0,m[6]=0,m[10]=1,m[14]=0,m[3]=0,m[7]=0,m[11]=0,m[15]=1):(i=Math.sqrt(e*e+r*r+n*n),1!==i&&(a=1/i,e*=a,r*=a,n*=a),s=1-v,l=e*r,c=r*n,d=n*e,h=e*o,u=r*o,f=n*o,m[0]=e*e*s+v,m[1]=l*s+f,m[2]=d*s-u,m[3]=0,m[4]=l*s-f,m[5]=r*r*s+v,m[6]=c*s+h,m[7]=0,m[8]=d*s+u,m[9]=c*s-h,m[10]=n*n*s+v,m[11]=0,m[12]=0,m[13]=0,m[14]=0,m[15]=1),this}setPerspective(t,e,r,n){if(r===n||0===e)throw new Error("null frustum");if(r<=0)throw new Error("near <= 0");if(n<=0)throw new Error("far <= 0");const o=Math.PI*t/180/2,i=Math.sin(o);if(0===i)throw new Error("null frustum");const a=1/(n-r),s=Math.cos(o)/i,l=this.elements;return l[0]=s/e,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=s,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=-(n+r)*a,l[11]=-1,l[12]=0,l[13]=0,l[14]=-2*r*n*a,l[15]=0,this}multiply(t){let e,r,n,o,i,a;const s=this.elements,l=this.elements;if(r=t.elements,s===r)for(r=new Float32Array(16),e=0;e<16;++e)r[e]=s[e];for(e=0;e<4;e++)n=l[e],o=l[e+4],i=l[e+8],a=l[e+12],s[e]=n*r[0]+o*r[1]+i*r[2]+a*r[3],s[e+4]=n*r[4]+o*r[5]+i*r[6]+a*r[7],s[e+8]=n*r[8]+o*r[9]+i*r[10]+a*r[11],s[e+12]=n*r[12]+o*r[13]+i*r[14]+a*r[15];return this}setLookAt(t,e,r,n,o,i,a,s,l){let c,d,h,u,f,p;c=n-t,d=o-e,h=i-r;const m=1/Math.sqrt(c*c+d*d+h*h);c*=m,d*=m,h*=m,u=d*l-h*s,f=h*a-c*l,p=c*s-d*a;const v=1/Math.sqrt(u*u+f*f+p*p);u*=v,f*=v,p*=v;const M=f*h-p*d,w=p*c-u*h,y=u*d-f*c,P=this.elements;return P[0]=u,P[1]=M,P[2]=-c,P[3]=0,P[4]=f,P[5]=w,P[6]=-d,P[7]=0,P[8]=p,P[9]=y,P[10]=-h,P[11]=0,P[12]=0,P[13]=0,P[14]=0,P[15]=1,this.translate(-t,-e,-r)}translate(t,e,r){const n=this.elements;return n[12]+=n[0]*t+n[4]*e+n[8]*r,n[13]+=n[1]*t+n[5]*e+n[9]*r,n[14]+=n[2]*t+n[6]*e+n[10]*r,n[15]+=n[3]*t+n[7]*e+n[11]*r,this}lookAt(t,e,n,o,i,a,s,l,c){return this.multiply((new r).setLookAt(t,e,n,o,i,a,s,l,c))}setInverseOf(t){let e,r;const n=t.elements,o=this.elements,i=new Float32Array(16);if(i[0]=n[5]*n[10]*n[15]-n[5]*n[11]*n[14]-n[9]*n[6]*n[15]+n[9]*n[7]*n[14]+n[13]*n[6]*n[11]-n[13]*n[7]*n[10],i[4]=-n[4]*n[10]*n[15]+n[4]*n[11]*n[14]+n[8]*n[6]*n[15]-n[8]*n[7]*n[14]-n[12]*n[6]*n[11]+n[12]*n[7]*n[10],i[8]=n[4]*n[9]*n[15]-n[4]*n[11]*n[13]-n[8]*n[5]*n[15]+n[8]*n[7]*n[13]+n[12]*n[5]*n[11]-n[12]*n[7]*n[9],i[12]=-n[4]*n[9]*n[14]+n[4]*n[10]*n[13]+n[8]*n[5]*n[14]-n[8]*n[6]*n[13]-n[12]*n[5]*n[10]+n[12]*n[6]*n[9],i[1]=-n[1]*n[10]*n[15]+n[1]*n[11]*n[14]+n[9]*n[2]*n[15]-n[9]*n[3]*n[14]-n[13]*n[2]*n[11]+n[13]*n[3]*n[10],i[5]=n[0]*n[10]*n[15]-n[0]*n[11]*n[14]-n[8]*n[2]*n[15]+n[8]*n[3]*n[14]+n[12]*n[2]*n[11]-n[12]*n[3]*n[10],i[9]=-n[0]*n[9]*n[15]+n[0]*n[11]*n[13]+n[8]*n[1]*n[15]-n[8]*n[3]*n[13]-n[12]*n[1]*n[11]+n[12]*n[3]*n[9],i[13]=n[0]*n[9]*n[14]-n[0]*n[10]*n[13]-n[8]*n[1]*n[14]+n[8]*n[2]*n[13]+n[12]*n[1]*n[10]-n[12]*n[2]*n[9],i[2]=n[1]*n[6]*n[15]-n[1]*n[7]*n[14]-n[5]*n[2]*n[15]+n[5]*n[3]*n[14]+n[13]*n[2]*n[7]-n[13]*n[3]*n[6],i[6]=-n[0]*n[6]*n[15]+n[0]*n[7]*n[14]+n[4]*n[2]*n[15]-n[4]*n[3]*n[14]-n[12]*n[2]*n[7]+n[12]*n[3]*n[6],i[10]=n[0]*n[5]*n[15]-n[0]*n[7]*n[13]-n[4]*n[1]*n[15]+n[4]*n[3]*n[13]+n[12]*n[1]*n[7]-n[12]*n[3]*n[5],i[14]=-n[0]*n[5]*n[14]+n[0]*n[6]*n[13]+n[4]*n[1]*n[14]-n[4]*n[2]*n[13]-n[12]*n[1]*n[6]+n[12]*n[2]*n[5],i[3]=-n[1]*n[6]*n[11]+n[1]*n[7]*n[10]+n[5]*n[2]*n[11]-n[5]*n[3]*n[10]-n[9]*n[2]*n[7]+n[9]*n[3]*n[6],i[7]=n[0]*n[6]*n[11]-n[0]*n[7]*n[10]-n[4]*n[2]*n[11]+n[4]*n[3]*n[10]+n[8]*n[2]*n[7]-n[8]*n[3]*n[6],i[11]=-n[0]*n[5]*n[11]+n[0]*n[7]*n[9]+n[4]*n[1]*n[11]-n[4]*n[3]*n[9]-n[8]*n[1]*n[7]+n[8]*n[3]*n[5],i[15]=n[0]*n[5]*n[10]-n[0]*n[6]*n[9]-n[4]*n[1]*n[10]+n[4]*n[2]*n[9]+n[8]*n[1]*n[6]-n[8]*n[2]*n[5],r=n[0]*i[0]+n[1]*i[4]+n[2]*i[8]+n[3]*i[12],0===r)return this;for(r=1/r,e=0;e<16;e++)o[e]=i[e]*r;return this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}set(t){let e;const r=t.elements,n=this.elements;if(r===n)return this;for(e=0;e<16;++e)n[e]=r[e];return this}rotate(t,e,n,o){return this.multiply((new r).setRotate(t,e,n,o))}}e.Matrix4=r},306:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Pointer=void 0,e.Pointer=class{constructor(){this.touchButton=0,this.points=[],this.onPointerDown=t=>{this.findAndRemovePoint(t.pointerId),0===t.button&&this.points.push({id:t.pointerId,type:t.pointerType,button:t.button,startX:t.clientX,startY:t.clientY,curX:t.clientX,curY:t.clientY,prevX:t.clientX,prevY:t.clientY,diffStartX:0,diffStartY:0,diffPrevX:0,diffPrevY:0})},this.onPointerMove=t=>{const e=this.findPoint(t.pointerId);null!=e&&(e.prevX=e.curX,e.prevY=e.curY,e.curX=t.clientX,e.curY=t.clientY,e.diffStartX=e.startX-t.clientX,e.diffStartY=e.startY-t.clientY,e.diffPrevX=t.clientX-e.prevX,e.diffPrevY=t.clientY-e.prevY)},this.onPointerUp=t=>{this.findAndRemovePoint(t.pointerId)}}findPoint(t){return this.points.find((e=>e.id===t))}findPointIdx(t){return this.points.findIndex((e=>e.id===t))}findAndRemovePoint(t){let e=-1;null!=t&&(e=this.findPointIdx(t)),e>-1&&this.points.splice(e,1)}}},464:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.WebGL=void 0;class r{static initShader(t,e,r){const n=t.createShader(e);if(null==n)throw new Error(`Unable to createShader of type ${e}`);if(t.shaderSource(n,r),t.compileShader(n),!0!==t.getShaderParameter(n,t.COMPILE_STATUS)){const e=t.getShaderInfoLog(n);throw t.deleteShader(n),new Error(null!=e?e:"Empty compile status shader info")}return n}static initWebGL(t,e,n){const o=r.initShader(t,t.VERTEX_SHADER,e),i=r.initShader(t,t.FRAGMENT_SHADER,n),a=t.createProgram();if(null==a)throw new Error("Unable to create shader programm");return t.attachShader(a,o),t.attachShader(a,i),t.linkProgram(a),t.useProgram(a),a}static initVertexBuffers(t,e){let n=[],o=[];return n=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,-1],o=[0,1,2,0,2,3,0,3,4,0,4,5,0,5,6,0,6,1,1,6,7,1,7,2,7,4,3,7,3,2,4,7,6,4,6,5],r.initArrayBuffer(t,e,"a_Position",new Float32Array(n),t.FLOAT,3),r.initArrayBuffer(t,e,"a_Normal",new Float32Array(n),t.FLOAT,3),t.bindBuffer(t.ARRAY_BUFFER,null),r.initElementArrayBuffer(t,new Uint16Array(o)),o.length}static getAttribute(t,e,r){const n=t.getAttribLocation(e,r);if(n<0)throw new Error;return n}static getUniform(t,e,r){const n=t.getUniformLocation(e,r);if(null==n)throw new Error(`Unable to get uniform location ${r}`);return n}static initArrayBuffer(t,e,n,o,i,a){const s=t.createBuffer();if(null==s)throw new Error("Unable to create buffer");t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,o,t.STATIC_DRAW);const l=r.getAttribute(t,e,n);t.vertexAttribPointer(l,a,i,!1,0,0),t.enableVertexAttribArray(l)}static initElementArrayBuffer(t,e){const r=t.createBuffer();if(null==r)throw new Error("Unable to create buffer");t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,e,t.STATIC_DRAW)}static drawFrame(t,e,r,n){t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.viewport(0,0,e,r),t.drawArrays(t.TRIANGLES,0,n/3)}static initMatrices(t,e){return[r.getUniform(t,e,"u_ModelMatrix"),r.getUniform(t,e,"u_MvpMatrix"),r.getUniform(t,e,"u_NormalMatrix"),r.getUniform(t,e,"u_LightColor"),r.getUniform(t,e,"u_LightPosition"),r.getUniform(t,e,"u_AmbientLight")]}}e.WebGL=r}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{r(279);const t=r(675),e=r(306),n=r(629),o=r(897),i=r(464),a=r(356),s=document.querySelector(".ellipsis");null!=s&&(s.style.display="none");let l="";(async function(){const[r,s]=await Promise.all([t.Loader.getText("./shaders/ico_sphere.vert"),t.Loader.getText("./shaders/ico_sphere.frag")]),c=new e.Pointer,d=new n.Canvas({selector:"canvas",initWidth:window.innerWidth,initHeight:window.innerHeight,onPointerDown:c.onPointerDown,onPointerMove:c.onPointerMove,onPointerUp:c.onPointerUp}),h=document.querySelector("#split_count");if(null==h)throw new Error("Unable to select split element");const u=document.querySelector("#rotate");if(null==u)throw new Error("Unable to select rotate element");const f=document.querySelector("#rotate_speed");if(null==f)throw new Error("Unable to select speed element");const p=new o.Matrix4,m=d.context,v=i.WebGL.initWebGL(m,r,s);let M,w,y=0,P=0,g=0;const A=i.WebGL.getUniform(m,v,"u_MvpMatrix"),E=new o.Matrix4;E.setPerspective(30,d.initWidth/d.initHeight,1,100),E.lookAt(0,0,5,0,0,0,0,1,0),p.set(E);const b=()=>{if((()=>{if(l!==h.value){l=h.value,[M,w]=a.IcoSphere.icosahedronVertices();for(let t=Number(h.value);t>1;t--)[M,w]=a.IcoSphere.splitVertices(M,w);const t=M.length;for(let e=0;e<t;e+=3){const[t,r,n]=a.IcoSphere.normalize(M[e],M[e+1],M[e+2]);M[e]=t,M[e+1]=r,M[e+2]=n}i.WebGL.initArrayBuffer(m,v,"a_Position",new Float32Array(M),m.FLOAT,3),i.WebGL.initArrayBuffer(m,v,"a_Color",new Float32Array(w),m.FLOAT,3)}})(),c.points.length>0){const t=c.points[0];(t.diffPrevX>0||t.diffPrevY>0)&&(t.diffPrevX>0&&(y+=t.diffPrevX*parseFloat(f.value),t.diffPrevX=0),t.diffPrevY>0&&(P+=t.diffPrevY*parseFloat(f.value),t.diffPrevY=0),p.set(E),(y>0||P>0)&&p.rotate(Math.hypot(y,P),y,P,0))}else u.checked&&(p.set(E),y+=parseFloat(f.value),y%=360,P+=parseFloat(f.value),P%=360,g+=parseFloat(f.value),g%=360,p.rotate(y,1,0,0),p.rotate(P,0,1,0),p.rotate(g,0,0,1));m.uniformMatrix4fv(A,!1,p.elements),i.WebGL.drawFrame(m,d.initWidth,d.initHeight,M.length),requestAnimationFrame(b)};b()})().catch((t=>{var e;console.error(t);const r=document.querySelector(".error-message");null!=r&&(r.classList.remove("hidden"),r.innerText=Boolean(t)&&Boolean(t.message)?t.message:t);const n=document.querySelector(".error-stack");null!=n&&(n.classList.remove("hidden"),n.innerText=Boolean(t)&&Boolean(t.stack)?t.stack:"");const o=document.querySelectorAll('[data-view="app"]');if(o.length>0)for(const t of o)null===(e=t.parentElement)||void 0===e||e.removeChild(t)}))})()})();