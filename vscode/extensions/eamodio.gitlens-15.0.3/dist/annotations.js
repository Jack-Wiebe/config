exports.id=459,exports.ids=[459],exports.modules={5884:(e,t,r)=>{r.d(t,{z:()=>BlameAnnotationProviderBase});var o=r(1398),i=r(7931),n=r(153),a=r(4832),s=r(6707),l=r(4983),u=r(7253),h=Object.defineProperty,d=Object.getOwnPropertyDescriptor;let c=1073741824-1;let BlameAnnotationProviderBase=class BlameAnnotationProviderBase extends l.w{blame;hoverProviderDisposable;constructor(e,t,r,o){super(e,t,r,o),this.blame=e.git.getBlame(this.trackedDocument.uri,r.document),r.document.isDirty&&o.setForceDirtyStateChangeOnNextDocumentChange()}clear(){null!=this.hoverProviderDisposable&&(this.hoverProviderDisposable.dispose(),this.hoverProviderDisposable=void 0),super.clear()}async validate(){let e=await this.blame;return!!e?.lines.length}async getBlame(e){e&&(this.blame=this.container.git.getBlame(this.trackedDocument.uri,this.editor.document));let t=await this.blame;if(t?.lines.length)return t}getComputedHeatmap(e){let t,r,o;let i=[];for(let o of e.lines)r!==o.sha&&(r=o.sha,null!=(t=e.commits.get(o.sha))&&i.push(t.date));i.sort((e,t)=>e.getTime()-t.getTime());let n=new Date;n.setDate(n.getDate()-(a.H.get("heatmap.ageThreshold")||90));let s=n.getTime(),l=[],h=[];for(let e of i)e.getTime()<s?h.push(e):l.push(e);o=l.length&&h.length?{hot:p(l),cold:p(h)}:p(i);let d=(e,t)=>Array.isArray(o)?o:t?o.hot.concat(o.cold):e.getTime()<s?o.cold:o.hot,c=(e,t)=>{let r=e.getTime(),o=0;for(let e=0;e<t.length&&(o=e,!(r>=t[e]));e++);return o};return{coldThresholdTimestamp:s,colors:(0,u.v7)(),computeRelativeAge:e=>c(e,d(e)),computeOpacity:e=>{let t=d(e,!0);return Math.max(.2,Math.round((1-c(e,t)/t.length)*100)/100)}}}registerHoverProviders(e){let t=a.H.get("hovers");t.enabled&&t.annotations.enabled&&(e.details||e.changes)&&(this.hoverProviderDisposable?.dispose(),this.hoverProviderDisposable=o.languages.registerHoverProvider({pattern:this.editor.document.uri.fsPath},{provideHover:(t,r,o)=>this.provideHover(e,t,r,o)}))}async provideHover(e,t,r,s){if("line"!==a.H.get("hovers.annotations.over")&&0!==r.character||this.editor.document.uri.toString()!==t.uri.toString())return;let l=await this.getBlame();if(null==l)return;let u=l.lines[r.line],h=l.commits.get(u.sha);if(null==h)return;let d=(await Promise.all([e.details?this.getDetailsHoverMessage(h,t):void 0,e.changes?(0,n.PV)(this.container,h,await i.nk.fromUri(t.uri),r.line,t):void 0])).filter(e=>!!e);return new o.Hover(d,t.validateRange(new o.Range(r.line,0,r.line,c)))}async getDetailsHoverMessage(e,t){let r=this.editor.selection.active.line,o=r+1;r=(e.lines.find(e=>e.line===o)??e.lines[0]).originalLine-1;let s=a.H.get("hovers");return(0,n.MX)(this.container,e,await i.nk.fromUri(t.uri),r,{autolinks:s.autolinks.enabled,dateFormat:a.H.get("defaultDateFormat"),format:s.detailsMarkdownFormat,pullRequests:s.pullRequests.enabled,timeout:250})}};function p(e){let t=[],r=Math.floor(e.length/2),o=e.length%2?e[r].getTime():(e[r-1].getTime()+e[r].getTime())/2,i=(e[e.length-1].getTime()-o)/5;for(let e=5;e>0;e--)t.push(o+i*e);t.push(o),i=(o-e[0].getTime())/4;for(let e=1;e<=4;e++)t.push(o-i*e);return t}((e,t,r,o)=>{for(var i,n=d(t,r),a=e.length-1;a>=0;a--)(i=e[a])&&(n=i(t,r,n)||n);return o&&n&&h(t,r,n)})([(0,s.Rm)({args:!1})],BlameAnnotationProviderBase.prototype,"getComputedHeatmap",1)},641:(e,t,r)=>{r.d(t,{GutterBlameAnnotationProvider:()=>GutterBlameAnnotationProvider});var o=r(1398),i=r(3807),n=r(236),a=r(2927),s=r(4832),l=r(6707),u=r(4026),h=r(3446),d=r(937),c=r(3166),p=r(7253),g=r(5884),m=r(5488),f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,y=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),b=(e,t,r,o)=>{for(var i,n=o>1?void 0:o?v(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(n=(o?i(t,r,n):i(n))||n);return o&&n&&f(t,r,n),n},w=(e,t,r)=>{if(null!=t){var o;if("object"!=typeof t&&"function"!=typeof t)throw TypeError("Object expected");if(r&&(o=t[y("asyncDispose")]),void 0===o&&(o=t[y("dispose")]),"function"!=typeof o)throw TypeError("Object not disposable");e.push([r,o,t])}else r&&e.push([r]);return t},D=(e,t,r)=>{var o="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},i=e=>t=r?new o(e,t,"An error was suppressed during disposal"):(r=!0,e),n=o=>{for(;o=e.pop();)try{var a=o[1]&&o[1].call(o[2]);if(o[0])return Promise.resolve(a).then(n,e=>(i(e),n()))}catch(e){i(e)}if(r)throw t};return n()};let P=1073741824-1;let GutterBlameAnnotationProvider=class GutterBlameAnnotationProvider extends g.z{constructor(e,t,r){super(e,"blame",t,r)}clear(){if(super.clear(),null!=m.I.gutterBlameHighlight)try{this.editor.setDecorations(m.I.gutterBlameHighlight,[])}catch{}}async onProvideAnnotation(e,t){var r=[];try{let e,a,l,u,g,f;let v=(0,h.dQ)(),y=await this.getBlame(t?.recompute);if(null==y)return!1;let b=w(r,(0,d.u)(v)),D=s.H.get("blame"),P=(0,c.Vx)(D.format).reduce((e,t)=>(e[t.key]=t.options,e),Object.create(null));n.c.has(D.format,"tips")&&(e=await this.container.git.getBranchesAndTagsTipsFn(y.repoPath));let H={dateFormat:null===D.dateFormat?s.H.get("defaultDateFormat"):D.dateFormat,getBranchAndTagTips:e,tokenOptions:P},k={family:s.H.get("blame.fontFamily"),size:s.H.get("blame.fontSize"),weight:s.H.get("blame.fontWeight")},x=D.avatars,S=s.H.get("defaultGravatarsStyle"),A=D.separateLines,O=(0,p.kM)(A,D.heatmap,D.avatars,D.format,H,k),R=[],T=new Map,B=x?new Map:void 0,F=!1;for(let e of(D.heatmap.enabled&&(g=this.getComputedHeatmap(y)),y.lines)){let t=e.line-1;if(u===e.sha){if(null==l)continue;l={...l},D.compact&&!F&&(null==f&&(f=i.EO.Space.repeat((0,c.RG)(l.renderOptions.before.contentText))),l.renderOptions={before:{...l.renderOptions.before,contentText:f}},A&&(l.renderOptions.before.textDecoration=`none;box-sizing: border-box${x?";padding: 0 0 0 18px":""}${k.family?`;font-family: ${k.family}`:""}${k.size?`;font-size: ${k.size}px`:""}`),F=!0),l.range=new o.Range(t,0,t,0),R.push(l);continue}if(F=!1,u=e.sha,a=y.commits.get(e.sha),null!=a){if(l=T.get(e.sha),null!=l){l={...l,range:new o.Range(t,0,t,0)},R.push(l);continue}l=(0,p.w)(a,D.format,H,O),null!=g&&(0,p.nx)(l,a.date,g),l.range=new o.Range(t,0,t,0),R.push(l),x&&null!=a.author.email&&await this.applyAvatarDecoration(a,l,S,B),T.set(e.sha,l)}}return b?.restart({suffix:" to compute gutter blame annotations"}),R.length&&(this.setDecorations([{decorationType:m.I.gutterBlameAnnotation,rangesOrOptions:R}]),b?.stop({suffix:" to apply all gutter blame annotations"})),this.registerHoverProviders(s.H.get("hovers.annotations")),!0}catch(e){var a=e,l=!0}finally{D(r,a,l)}}async selection(e){let t;if(!1===e||null==m.I.gutterBlameHighlight)return;let r=await this.blame;if(!r?.lines.length)return;if(e?.sha!=null)t=e.sha;else if(e?.line!=null){if(e.line>=0){let o=r.lines[e.line];t=o?.sha}}else t=u.$1(r.commits.values())?.sha;if(!t){this.editor.setDecorations(m.I.gutterBlameHighlight,[]);return}let i=(0,a.x1)(r.lines,e=>e.sha===t?this.editor.document.validateRange(new o.Range(e.line-1,0,e.line-1,P)):void 0);this.editor.setDecorations(m.I.gutterBlameHighlight,i)}async applyAvatarDecoration(e,t,r,o){let i=o.get(e.author.email??"");if(null==i){let t=(await e.getAvatarUri({defaultStyle:r,size:16})).toString(!0);i={contentText:"",height:"16px",width:"16px",textDecoration:`none;position:absolute;top:1px;left:5px;background:url(${encodeURI(t)});background-size:16px 16px;margin-left: 0 !important`},o.set(e.author.email??"",i)}t.renderOptions.after=i}};b([(0,l.Rm)()],GutterBlameAnnotationProvider.prototype,"onProvideAnnotation",1),b([(0,l.Rm)({args:!1})],GutterBlameAnnotationProvider.prototype,"selection",1)},7971:(e,t,r)=>{r.d(t,{GutterChangesAnnotationProvider:()=>GutterChangesAnnotationProvider});var o=r(1398),i=r(153),n=r(4832),a=r(6707),s=r(3446),l=r(3131),u=r(937),h=r(4983),d=r(5488),c=Object.defineProperty,p=Object.getOwnPropertyDescriptor,g=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),m=(e,t,r)=>{if(null!=t){var o;if("object"!=typeof t&&"function"!=typeof t)throw TypeError("Object expected");if(r&&(o=t[g("asyncDispose")]),void 0===o&&(o=t[g("dispose")]),"function"!=typeof o)throw TypeError("Object not disposable");e.push([r,o,t])}else r&&e.push([r]);return t},f=(e,t,r)=>{var o="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},i=e=>t=r?new o(e,t,"An error was suppressed during disposal"):(r=!0,e),n=o=>{for(;o=e.pop();)try{var a=o[1]&&o[1].call(o[2]);if(o[0])return Promise.resolve(a).then(n,e=>(i(e),n()))}catch(e){i(e)}if(r)throw t};return n()};let v=1073741824-1;let GutterChangesAnnotationProvider=class GutterChangesAnnotationProvider extends h.w{hoverProviderDisposable;sortedHunkStarts;state;constructor(e,t,r){super(e,"changes",t,r)}canReuse(e){return!(this.annotationContext?.sha!==e?.sha||this.annotationContext?.only!==e?.only)}clear(){this.state=void 0,null!=this.hoverProviderDisposable&&(this.hoverProviderDisposable.dispose(),this.hoverProviderDisposable=void 0),super.clear()}nextChange(){if(null==this.sortedHunkStarts)return;let e=-1,t=this.editor.selection.active.line;for(let r of this.sortedHunkStarts)if(r>t){e=r;break}-1===e&&(e=this.sortedHunkStarts[0]),e>0&&(this.editor.selection=new o.Selection(e,0,e,0),this.editor.revealRange(new o.Range(e,0,e,0),o.TextEditorRevealType.InCenterIfOutsideViewport))}previousChange(){if(null==this.sortedHunkStarts)return;let e=-1,t=this.editor.selection.active.line;for(let r of this.sortedHunkStarts){if(r>=t)break;e=r}-1===e&&(e=this.sortedHunkStarts[this.sortedHunkStarts.length-1]),e>0&&(this.editor.selection=new o.Selection(e,0,e,0),this.editor.revealRange(new o.Range(e,0,e,0),o.TextEditorRevealType.InCenterIfOutsideViewport))}async onProvideAnnotation(e,t){var r=[];try{let i,n;let a=(0,s.dQ)(),h=this.trackedDocument.uri.sha,c=e?.sha!=null&&e.sha!==h?`${e.sha}^`:void 0,p=null==h&&null==c;if(p){let e=await this.container.git.getOldestUnpushedRefForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri);if(null!=e)e=`${e}^`,i=await this.container.git.getCommitForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri,{ref:e}),null!=i?null!=c?c=e:(h=e,c=""):p=!1;else{let e=await this.container.git.getStatusForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri),t=e?.getPseudoCommits(this.container,await this.container.git.getCurrentUser(this.trackedDocument.uri.repoPath));t?.length?(i=await this.container.git.getCommitForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri),h="HEAD"):this.trackedDocument.dirty?h="HEAD":p=!1}}p||(i=await this.container.git.getCommitForFile(this.trackedDocument.uri.repoPath,this.trackedDocument.uri,{ref:c??h}),null==i||(null!=c||(h=`${i.ref}^`),c=i.ref));let g=(await Promise.allSettled(null==c&&this.editor.document.isDirty?[this.container.git.getDiffForFileContents(this.trackedDocument.uri,h,this.editor.document.getText()),this.container.git.getDiffForFile(this.trackedDocument.uri,h,c)]:[this.container.git.getDiffForFile(this.trackedDocument.uri,h,c)])).map(e=>(0,l.Ro)(e)).filter(e=>!!e);if(!g?.length)return!1;let f=m(r,(0,u.u)(a)),y=new Map,b=e?.sha!=null&&e?.only?await this.container.git.getBlame(this.trackedDocument.uri,this.editor?.document):void 0;for(let t of(this.sortedHunkStarts=[],g))for(let r of t.hunks){if(null!=b){let t=!0,o=e.sha;for(let e=r.current.position.start-1;e<r.current.position.end;e++)b.lines[e]?.sha===o&&(t=!1);if(t)continue}for(let[e,t]of r.lines){if("unchanged"===t.state)continue;let r=this.editor.document.validateRange(new o.Range(new o.Position(e-1,0),new o.Position(e-1,v)));this.sortedHunkStarts.push(r.start.line),null==n&&(n=new o.Selection(r.start,r.end));let i=y.get(t.state);null==i?(i={decorationType:"added"===t.state?d.I.changesLineAddedAnnotation:"removed"===t.state?d.I.changesLineDeletedAnnotation:d.I.changesLineChangedAnnotation,rangesOrOptions:[{range:r}]},y.set(t.state,i)):i.rangesOrOptions.push({range:r})}}return this.sortedHunkStarts.sort((e,t)=>e-t),f?.restart({suffix:" to compute recent changes annotations"}),y.size&&(this.setDecorations([...y.values()]),f?.stop({suffix:" to apply all recent changes annotations"}),null==n||e?.selection===!1||t?.restoring||(this.editor.selection=n,this.editor.revealRange(n,o.TextEditorRevealType.InCenterIfOutsideViewport))),this.state={commit:i,diffs:g},this.registerHoverProvider(),!0}catch(e){var i=e,n=!0}finally{f(r,i,n)}}registerHoverProvider(){let e=n.H.get("hovers");e.enabled&&e.annotations.enabled&&(this.hoverProviderDisposable?.dispose(),this.hoverProviderDisposable=o.languages.registerHoverProvider({pattern:this.editor.document.uri.fsPath},{provideHover:(e,t,r)=>this.provideHover(e,t,r)}))}async provideHover(e,t,r){if(null==this.state||"line"!==n.H.get("hovers.annotations.over")&&0!==t.character)return;let{commit:a,diffs:s}=this.state;for(let r of s)for(let n of r.hunks){let r=n.previous.count>n.current.count;if(t.line>=n.current.position.start-1&&t.line<=n.current.position.end-(r?0:1)){let s=await (0,i.ec)(a,this.trackedDocument.uri,t.line,n);if(null==s)return;return new o.Hover(s,e.validateRange(new o.Range(n.current.position.start-1,0,n.current.position.end-(r?0:1),v)))}}}};((e,t,r,o)=>{for(var i,n=p(t,r),a=e.length-1;a>=0;a--)(i=e[a])&&(n=i(t,r,n)||n);return o&&n&&c(t,r,n)})([(0,a.Rm)()],GutterChangesAnnotationProvider.prototype,"onProvideAnnotation",1)},5747:(e,t,r)=>{r.d(t,{GutterHeatmapBlameAnnotationProvider:()=>GutterHeatmapBlameAnnotationProvider});var o=r(1398),i=r(6707),n=r(3446),a=r(937),s=r(7253),l=r(5884),u=Object.defineProperty,h=Object.getOwnPropertyDescriptor,d=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),c=(e,t,r)=>{if(null!=t){var o;if("object"!=typeof t&&"function"!=typeof t)throw TypeError("Object expected");if(r&&(o=t[d("asyncDispose")]),void 0===o&&(o=t[d("dispose")]),"function"!=typeof o)throw TypeError("Object not disposable");e.push([r,o,t])}else r&&e.push([r]);return t},p=(e,t,r)=>{var o="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},i=e=>t=r?new o(e,t,"An error was suppressed during disposal"):(r=!0,e),n=o=>{for(;o=e.pop();)try{var a=o[1]&&o[1].call(o[2]);if(o[0])return Promise.resolve(a).then(n,e=>(i(e),n()))}catch(e){i(e)}if(r)throw t};return n()};let GutterHeatmapBlameAnnotationProvider=class GutterHeatmapBlameAnnotationProvider extends l.z{constructor(e,t,r){super(e,"heatmap",t,r)}async onProvideAnnotation(e,t){var r=[];try{let e;let i=(0,n.dQ)(),l=await this.getBlame(t?.recompute);if(null==l)return!1;let u=c(r,(0,a.u)(i)),h=new Map,d=this.getComputedHeatmap(l);for(let t of l.lines){let r=t.line-1;e=l.commits.get(t.sha),null!=e&&(0,s.n0)(e.date,d,new o.Range(r,0,r,0),h)}return u?.restart({suffix:" to compute heatmap annotations"}),h.size&&(this.setDecorations([...h.values()]),u?.stop({suffix:" to apply all heatmap annotations"})),!0}catch(e){var i=e,l=!0}finally{p(r,i,l)}}};((e,t,r,o)=>{for(var i,n=h(t,r),a=e.length-1;a>=0;a--)(i=e[a])&&(n=i(t,r,n)||n);return o&&n&&u(t,r,n)})([(0,i.Rm)()],GutterHeatmapBlameAnnotationProvider.prototype,"onProvideAnnotation",1)}};