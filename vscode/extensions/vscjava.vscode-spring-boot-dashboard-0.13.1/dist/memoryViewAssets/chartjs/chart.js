"use strict";Math.log2=Math.log2||function(t){return Math.log(t)/Math.LN2},Math.log10=Math.log10||function(t){return Math.log(t)/Math.LN10},function(){var t={avg:function(t){for(var e=0,l=0;l<t.length;++l)e+=t[l];return e/t.length},min:function(e){if(0===e.length)return 0;for(var l=e[0],a=1;a<e.length;++a){var r=e[a];Array.isArray(r)&&(r=t.avg(r)),r<l&&(l=r)}return Math.max(0,l)},max:function(e){for(var l=0,a=0;a<e.length;++a){var r=e[a];Array.isArray(r)&&(r=t.avg(r)),r>l&&(l=r)}return Math.max(0,l)},upperMax:function(e){for(var l=0,a=0;a<e.length;++a){var r=e[a];Array.isArray(r)&&(r=t.max(r)),r>l&&(l=r)}return Math.max(0,l)},lowerMin:function(e){if(0===e.length)return 0;var l=e[0]||1/0;Array.isArray(l)&&(l=t.lowerMin(l));for(var a=1;a<e.length;++a){var r=e[a];null!=r&&(Array.isArray(r)&&(r=t.lowerMin(r)),r<l&&(l=r))}return!isNaN(l)&&isFinite(l)||(l=0),Math.max(0,l)},niceNumbers:function(t,e){var l=Math.floor(Math.log10(t)),a=t/Math.pow(10,l);return(e?a<1.5?1:a<3?2:a<7?5:10:a<=1?1:a<=2?2:a<=5?5:10)*Math.pow(10,l)},getLinearTicks:function(e,l,a){var r=t.niceNumbers(l-e,!1),i=t.niceNumbers(r/(a-1),!0);return[Math.floor(e/i)*i,Math.ceil(l/i)*i,i]},getFont:function(t){return t.style=t.style||"normal",t.variant=t.variant||"normal",t.weight=t.weight||"lighter",t.size=t.size||"12",t.family=t.family||"Arial",[t.style,t.variant,t.weight,t.size+"px",t.family].join(" ")},getAxisRatio:function(t,e,l){return(l-t)/(e-t)}},e=function(){function e(t,e){for(var l in this.mouseListeners=[],this.currentHint=null,this.fillRegions=[],this.options={font:"Helvetica",fontWeight:"normal",fontSizeTitle:24,fontSizeAxes:20,fontSizeTicks:18,fontSizeLabels:18,fontDataTags:18,fontSizeLegend:18,fontSizeHint:18,paddingPercentBars:.1,paddingPercentTicks:.15,paddingPixelsVertical:10,paddingPixelsHorizontal:10,paddingPixelsTicks:10,maxWidthBars:0,fillColorBackground:"rgb(255, 255, 255)",strokeColorBars:"rgb(0, 0, 0)",fillColorBars:"rgba(180, 180, 180, 0.25)",scaleStyle:"linear",barStyle:"none",stackedBarPadding:3,defaultMaxTick:0,pixelsLegendSquare:10,radiusDot:5,fillColorLegend:"rgb(230, 230, 230)",tickFormatter:null,tickFormatterMeasure:null,fillRegion:"normal"},e=e||{},this.options)e.hasOwnProperty(l)&&(this.options[l]=e[l]);this.ctx=t,this.content={},this.labelPositions={}}return e.prototype.update=function(e){if("object"!=typeof e)throw new Error("Collections must be objects.");if(!e.hasOwnProperty("labels")||!e.hasOwnProperty("data"))throw new Error("Collection must specify labels and data.");if(!Array.isArray(e.labels)||!Array.isArray(e.data))throw new Error("Labels and data must be arrays.");if(e.labels.length!==e.data.length)throw new Error("Labels and data length must match.");e._data_standard_deviation=[],e._data_standard_error=[];for(var l=0;l<e.data.length;++l){var a=Array.isArray(e.data[l]);if("log2"===this.options.scaleStyle)if(a)for(var r=0;r<e.data[l].length;++r)e.data[l][r]=Math.log2(e.data[l][r]);else e.data[l]=Math.log2(e.data[l]);if(a){for(var i=t.avg(e.data[l]),o=0,n=0;n<e.data[l].length;++n)o+=Math.pow(i-e.data[l][n],2);o=Math.sqrt(o/(e.data[l].length-1)),e._data_standard_deviation.push(o),e._data_standard_error.push(o/Math.sqrt(e.data[l].length))}else e._data_standard_deviation.push(0),e._data_standard_error.push(0)}this.content=e,this.redraw()},e.prototype.redraw=function(){setTimeout(function(){this._draw()}.bind(this),0)},e.prototype.mousemove=function(t,e){for(var l=null,a=0;a<this.mouseListeners.length&&!(l=this.mouseListeners[a](t,e));++a);if(l&&"object"==typeof l&&l.hasOwnProperty("index")&&l.hasOwnProperty("drawIndex")){var r=this.currentHint;null!=r&&r.index==l.index&&r.drawIndex==l.drawIndex||(this.currentHint=l,this.redraw())}else null!==this.currentHint&&(this.currentHint=null,this.redraw())},e.prototype._draw=function(){var e={};this.mouseListeners=[],this.fillRegions=[];var l=this.options,a=this.ctx,r=this.content,i=a.canvas.width,o=a.canvas.height;a.clearRect(0,0,i,o),a.translate(-.5,-.5);var n,s=i,f=o;null!=l.fillColorBackground&&(a.save(),a.fillStyle=l.fillColorBackground,a.fillRect(0,0,i,o),a.restore());var h=l.paddingPixelsHorizontal;f-=l.paddingPixelsHorizontal,a.fillStyle="rgb(0, 0, 0)",null!=r.title&&(a.save(),a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeTitle,family:l.font}),a.textAlign="center",a.fillText(r.title,i/2,h+l.fontSizeTitle),a.restore(),f-=1.25*l.fontSizeTitle,h+=1.25*l.fontSizeTitle);var g=l.paddingPixelsVertical;s-=l.paddingPixelsVertical;var d,u,y=null;if(null!=r.yAxis&&(y=g+.5*l.fontSizeAxes,s-=1.25*l.fontSizeAxes,g+=1.25*l.fontSizeAxes),a.save(),a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeTicks,family:l.font}),"stacked"===l.barStyle){d=0,u=1/0;for(var x=0;x<r.data.length;++x){var c;if(Array.isArray(c=r.data[x])){for(var v=0,b=0;b<c.length;++b)v+=c[b];d=Math.max(d,v),u=Math.min(u,v)}else d=Math.max(d,r.data[x]),u=Math.min(u,r.data[x])}}else d=t.upperMax(r.data),u=t.lowerMin(r.data);if(0===l.scaleStyle.indexOf("adaptive")){if(-1!==l.scaleStyle.indexOf(":")){var S=parseFloat(l.scaleStyle.split(/[:]/)[1]);u*=S,d*=1+(1-S)/2}}else u=0;if(l.defaultMaxTick>d&&(d=l.defaultMaxTick),null!=r.bars&&Array.isArray(r.bars))for(n=0;n<r.bars.length;++n){var m=r.bars[n].value;isNaN(m)||(d=Math.max(d,m),u=Math.min(u,m))}var T="log2"==l.scaleStyle?Math.ceil(Math.pow(2,d)):Math.ceil(d)+".00";if(null!=l.tickFormatterMeasure&&(T=l.tickFormatterMeasure),T=a.measureText(T).width,s-=T=Math.ceil(T)+l.paddingPixelsTicks,g+=T,a.restore(),l.paddingPixelsVertical,s-=l.paddingPixelsVertical,null!=r.legend&&Array.isArray(r.legend)){a.save(),a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeLegend,family:l.font});for(var A=0,p=0;p<r.legend.length;++p)A=Math.max(A,a.measureText(r.legend[p].label).width);A=Math.ceil(A),A+=l.pixelsLegendSquare+8;var M,k,z=Math.floor((s-2*l.paddingPixelsHorizontal)/A),w=Math.ceil(r.legend.length/z)*l.fontSizeLegend*1.5;for(f-=w,_+=w,a.strokeStyle="rgb(0, 0, 0)",a.fillStyle=l.fillColorLegend,a.beginPath(),a.moveTo(M=g,k=h+f),a.lineTo(M+s,k),a.lineTo(M+s,k+w),a.lineTo(M,k+w),a.lineTo(M,k),a.stroke(),a.fill(),p=0;p<r.legend.length;++p){var L=Math.floor(p/z),P=p%z;a.fillStyle=r.legend[p].color;var C=M+P*A+3,F=k+L*l.fontSizeLegend*1.5+.5*l.fontSizeLegend;a.beginPath(),a.moveTo(C,F),a.lineTo(C+l.pixelsLegendSquare,F),a.lineTo(C+l.pixelsLegendSquare,F+l.pixelsLegendSquare),a.lineTo(C,F+l.pixelsLegendSquare),a.lineTo(C,F),a.fill(),a.stroke(),a.textAlign="left",a.fillStyle="rgb(0, 0, 0)",a.fillText(r.legend[p].label,C+3+l.pixelsLegendSquare,F+.5*l.fontSizeLegend)}a.restore()}var _=l.paddingPixelsHorizontal;f-=l.paddingPixelsHorizontal,null!=r.xAxis&&(a.save(),a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeAxes,family:l.font}),a.fillStyle="rgb(0, 0, 0)",a.textAlign="center",a.fillText(r.xAxis,i-s+s/2,h+f-_),f-=1.5*l.fontSizeAxes,_+=1.5*l.fontSizeAxes,a.restore());var B=s/r.data.length;if(null!=r.topLabels){for(a.save(),a.textAlign="center",a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeLabels,family:l.font}),f-=1.5*l.fontSizeLabels,h+=1.5*l.fontSizeLabels,n=0;n<r.topLabels.length;++n)a.fillText(r.topLabels[n],g+n*B+B/2,h-l.fontSizeLabels/2);a.restore()}a.save();var R=0;if(null!=r.dataTags){a.font=t.getFont({weight:l.fontWeight,size:l.fontDataTags,family:l.font});var H=r.dataTags;for(n=0;n<H.length;++n)if(Array.isArray(H[n]))for(var W=0;W<H[n].length;++W)R=Math.max(R,Math.ceil(a.measureText(H[n][W]).width+5));else R=Math.max(R,Math.ceil(a.measureText(H[n]).width+5))}a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeLabels,family:l.font});var I=Math.floor(B*l.paddingPercentBars/2),q=B-2*I;q<R?(I-=Math.ceil((R-q)/2),I=Math.max(0,I)):l.maxWidthBars>0&&q>l.maxWidthBars&&(I=Math.floor((B-l.maxWidthBars)/2));var N=0,D=1;for(n=0;n<r.labels.length;++n){var O=r.labels[n];if(Array.isArray(O))for(D=Math.max(D,O.length),W=0;W<O.length;++W)N=Math.max(N,a.measureText(O[W]).width);else N=Math.max(N,a.measureText(O).width)}var E=!1;N>B-I?(a.textAlign="right",a.rotate(1.5*Math.PI),E=!0):a.textAlign="center";var V=-l.fontSizeLabels;for(n=0;n<r.labels.length;++n){var j=r.labels[n],G=g+n*B+B/2,J=h+f-l.fontSizeLabels/2;if(E){if((J=[G,G=-(J=h+f-N+5)][0])<V+l.fontSizeLabels)continue;V=J}var K=l.fontSizeLabels*(D-1);if(Array.isArray(j))for(E&&(K=l.fontSizeLabels*(j.length-1.5),K/=2),W=0;W<j.length;++W)a.fillText(j[W],G,J-K),K-=l.fontSizeLabels;else E&&(K=.25*-l.fontSizeLabels),a.fillText(j,G,J-K)}if(E)f-=N+5,_+=N+5;else{var Q=l.fontSizeLabels*D;f-=Q+=.5*l.fontSizeLabels,_+=Q}a.restore();var U=g,X=g+s,Y=h,Z=h+f;for(n=0;n<r.labels.length;++n)e[n]={xStart:g+n*B,xEnd:g+(1+n)*B,yStart:Y,yEnd:Z};a.save(),a.strokeStyle="rgb(0, 0, 0)",a.beginPath(),null!=r.topLabels?(a.moveTo(X,Y),a.lineTo(U,Y)):a.moveTo(U,Y),a.lineTo(U,Z),a.lineTo(X,Z),null!=r.topLabels&&a.lineTo(g+s,h),a.stroke(),a.restore(),null!=r.topLabel&&(a.save(),a.textAlign="right",a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeLabels,family:l.font}),a.fillText(r.topLabel,g-3,h-l.fontSizeLabels/2),a.restore()),null!=r.yAxis&&(a.save(),a.rotate(1.5*Math.PI),a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeAxes,family:l.font}),a.fillStyle="rgb(0, 0, 0)",a.textAlign="center",a.fillText(r.yAxis,-(h+f/2),y),a.restore()),a.save(),a.fillStyle="rgb(0, 0, 0)",a.strokeStyle="rgba(0, 0, 0, 0.20)",a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeTicks,family:l.font}),a.textAlign="right";var $=t.getLinearTicks(0,d,Math.max(2,f/(l.fontSizeTicks*(1+l.paddingPercentTicks)))),tt=d/l.fontSizeTicks;d=$[1],d+=d>1?Math.ceil(tt):tt;for(var et=[];$[0]<=$[1];)et.push($[0]),$[0]+=$[2];for(n=0;n<et.length;++n){var lt=Math.round(f*t.getAxisRatio(u,d,et[n]));lt<0||("log2"==l.scaleStyle&&0!==et[n]?et[n]=Math.round(Math.pow(2,et[n])):et[n]=Math.floor(100*et[n])/100,null!=l.tickFormatter&&"function"==typeof l.tickFormatter?a.fillText(l.tickFormatter(et[n]).toString(),g-l.paddingPixelsTicks,h+f-lt):a.fillText(et[n].toString(),g-l.paddingPixelsTicks,h+f-lt),0!=n&&(a.beginPath(),a.moveTo(g,h+f-lt),a.lineTo(g+s,h+f-lt),a.stroke()))}if(a.restore(),null!=r.bars&&Array.isArray(r.bars)){for(a.save(),n=0;n<r.bars.length;++n){var at=r.bars[n];if(!(at.value>d)){var rt=h+f-Math.round(f*t.getAxisRatio(u,d,at.value));a.strokeStyle=at.style,a.fillStyle=at.style,a.beginPath(),a.moveTo(U,rt),a.lineTo(X,rt),a.stroke(),a.fill()}}a.restore()}a.save();var it=null;for(n=0;n<r.data.length;++n){var ot=null,nt=null;null!=r.fillColor?Array.isArray(r.fillColor)?ot=a.fillStyle=r.fillColor[n]:a.fillStyle=r.fillColor:a.fillStyle=l.fillColorBars,null!=r.strokeColor?Array.isArray(r.strokeColor)?nt=a.strokeStyle=r.strokeColor[n]:a.strokeStyle=r.strokeColor:a.strokeStyle=l.strokeColorBars;var st=r.data[n],ft=Array.isArray(st),ht=g+B*n;if(ft&&"stacked"===l.barStyle){for(var gt=0,dt=0,ut=0;ut<st.length;++ut){null!=ot&&Array.isArray(ot)&&(a.fillStyle=ot[ut]||l.fillColorBars),null!=nt&&Array.isArray(nt)&&(a.strokeStyle=nt[ut]||l.strokeColorBars),gt+=st[ut];var yt=Math.floor(f*t.getAxisRatio(u,d,gt)),xt=h+f-yt;if(Math.abs(yt-dt)<l.stackedBarPadding+2)dt=yt;else{var ct,vt,bt,St,mt,Tt=ut>0?l.stackedBarPadding:0;if(a.beginPath(),a.moveTo(ct=ht+I,vt=h+f-dt-Tt),a.lineTo(ht+I,xt),a.lineTo(bt=ht+(B-1)-I,St=xt),a.lineTo(ht+(B-1)-I,h+f-dt-Tt),ut>0&&a.lineTo(ct,vt),a.stroke(),a.fill(),null!=r.hints&&null!=r.hints[n]&&null!=(_t=r.hints[n][ut])&&this.mouseListeners.push(function(t,e,l,a,r,i,o,n,s){var f=Math.min(a,i),h=Math.max(a,i),g=Math.min(r,o),d=Math.max(r,o);return n<f||n>h||s<g||s>d?null:{index:t,drawIndex:e,rect:{left:f,right:h,top:g,bottom:d},text:l.split("\n")}}.bind(this,n,ut,_t,ct,vt,bt,St)),vt-xt>1.25*l.fontDataTags&&null!=r.dataTags&&null!=(mt=r.dataTags[n])&&null!=(mt=mt[ut])){var At=a.fillStyle;a.fillStyle="rgb(0, 0, 0)",a.font=t.getFont({weight:l.fontWeight,size:l.fontDataTags,family:l.font}),a.textAlign="center",a.fillText(mt,ht+B/2,vt-.25*l.fontDataTags),a.fillStyle=At}dt=yt}}null!=r.barTooltips&&(a.fillStyle="rgb(0, 0, 0)",a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeLabels,family:l.font}),a.textAlign="center",a.fillText(r.barTooltips[n]||"",ht+B/2,xt-3))}else if("line"===l.barStyle){if(ft){var pt=ht+B/2;if("background"===l.fillRegion&&(wt=it,Array.isArray(wt)&&(wt=wt[0]),null!=wt)){var Mt=a.fillStyle;a.fillStyle=wt.color,a.fillRect(wt.x,Y,pt-wt.x,Z-Y),a.fillStyle=Mt}var kt=[];for(ut=0;ut<st.length;++ut){var zt=h+f-Math.round(f*t.getAxisRatio(u,d,st[ut]));null!=it&&(Array.isArray(it)?(Ct=(it[ut]||{}).x,Ft=(it[ut]||{}).y):(Ct=it.x,Ft=it.y),Ct&&Ft&&(Array.isArray(nt)?a.strokeStyle=nt[ut]||l.strokeColorBars:a.strokeStyle=nt||"rgb(0, 0, 0)",a.beginPath(),a.moveTo(Ct,Ft),a.lineTo(pt,zt),a.stroke())),Array.isArray(ot)&&(a.fillStyle=ot[ut]||l.fillColorBars),Array.isArray(nt)&&(a.strokeStyle=nt[ut]||l.strokeColorBars),a.beginPath(),a.arc(pt,zt,l.radiusDot,0,2*Math.PI),a.stroke(),a.fill(),kt[ut]={x:pt,y:zt,color:a.fillStyle}}it=kt,null!=wt&&wt.color!=it[0].color&&this.fillRegions.push({x:it[0].x,y:it[0].y,prev:wt.color,next:it[0].color}),null!=r.balls&&Array.isArray(r.balls)&&n<r.balls.length&&null!=(Lt=r.balls[n])&&(a.beginPath(),a.fillStyle=Lt.fill,a.strokeStyle=Lt.stroke,a.arc(pt,h+f-f*t.getAxisRatio(u,d,u+Lt.value),Lt.radius,0,2*Math.PI),a.stroke(),a.fill())}else{var wt,Lt;if(pt=ht+B/2,zt=h+f-Math.round(f*t.getAxisRatio(u,d,st)),"background"===l.fillRegion&&null!=it&&(wt=it,Array.isArray(wt)&&(wt=wt[0]),Mt=a.fillStyle,a.fillStyle=wt.color,a.fillRect(wt.x,Y,pt-wt.x,Z-Y),a.fillStyle=Mt),a.beginPath(),a.arc(pt,zt,l.radiusDot,0,2*Math.PI),a.stroke(),a.fill(),null!=it)if(Array.isArray(it))for(var Pt in it)it.hasOwnProperty(Pt)&&(Ct=it[Pt].x,Ft=it[Pt].y,Ct&&Ft&&(a.strokeStyle=nt||"rgb(0, 0, 0)",a.beginPath(),a.moveTo(Ct,Ft),a.lineTo(pt,zt),a.stroke()));else{var Ct=it.x,Ft=it.y;Ct&&Ft&&(a.strokeStyle=nt||"rgb(0, 0, 0)",a.beginPath(),a.moveTo(Ct,Ft),a.lineTo(pt,zt),a.stroke())}it={x:pt,y:zt,color:a.fillStyle},null!=wt&&wt.color!=it.color&&this.fillRegions.push({x:it.x,y:it.y,prev:wt.color,next:it.color}),null!=r.balls&&Array.isArray(r.balls)&&n<r.balls.length&&null!=(Lt=r.balls[n])&&(a.beginPath(),a.fillStyle=Lt.fill,a.strokeStyle=Lt.stroke,a.arc(pt,h+f-f*t.getAxisRatio(u,d,u+Lt.value),Lt.radius,0,2*Math.PI),a.stroke(),a.fill())}var _t;null!=r.hints&&null!=(_t=r.hints[n])&&this.mouseListeners.push(function(t,e,l,a,r,i,o,n){var s=Math.min(l,r),f=Math.max(l,r),h=Math.min(a,i),g=Math.max(a,i);return o<s||o>f||n<h||n>g?null:{index:t,drawIndex:ut,rect:{left:s,right:f,top:h,bottom:g},text:e.split("\n")}}.bind(this,n,_t,pt-1,h,pt+1,h+f))}else{ft&&(st=t.avg(st));var Bt,Rt=h+f-Math.round(f*t.getAxisRatio(u,d,st));if(a.beginPath(),a.moveTo(ht+I,h+f),a.lineTo(ht+I,Rt),a.lineTo(ht+(B-1)-I,Rt),a.lineTo(ht+(B-1)-I,h+f),a.stroke(),a.fill(),"error"===l.barStyle&&0!=(Bt=r._data_standard_error[n])){var Ht=Math.round(f*t.getAxisRatio(u,d,Bt));a.beginPath();var Wt=Math.round((B-2*I)/8),It=g+B*n+B/2;a.moveTo(It-Wt,Rt+Ht),a.lineTo(It+Wt,Rt+Ht),a.moveTo(It,Rt+Ht),a.lineTo(It,Rt-Ht),a.moveTo(It-Wt,Rt-Ht),a.lineTo(It+Wt,Rt-Ht),a.stroke()}null!=r.barTooltips&&(a.fillStyle="rgb(0, 0, 0)",a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeLabels,family:l.font}),a.textAlign="center",a.fillText(r.barTooltips[n]||"",ht+B/2,Rt-3))}}if(a.restore(),null!=this.currentHint){a.save();var qt=this.currentHint.rect,Nt=this.currentHint.text;a.fillStyle="rgb(0, 0, 0)",a.font=t.getFont({weight:l.fontWeight,size:l.fontSizeHint,family:l.font}),a.textAlign="left";var Dt=0;for(n=0;n<Nt.length;++n)Dt=Math.max(Dt,Math.ceil(a.measureText(Nt[n]).width));var Ot=1.5*l.fontSizeHint,Et=Nt.length*Ot,Vt=qt.right+10,jt=(qt.top+qt.bottom)/2;for(Vt+(Dt+=10)>i&&(Vt=qt.left-Dt-10),jt-Et/2<0?jt=Math.ceil(Et/2)+1:jt+Et/2>o&&(jt=o-Et/2-1),a.clearRect(Vt,jt-Et/2,Dt,Et),a.beginPath(),a.rect(Vt,jt-Et/2,Dt,Et),a.stroke(),n=0;n<Nt.length;++n)a.fillText(Nt[n],Vt+5,jt-Et/2+l.fontSizeHint+n*Ot);a.restore()}a.translate(.5,.5),this.labelPositions=e},e}();"undefined"!=typeof module&&void 0!==module.exports?module.exports=e:window.BarChart=e}();