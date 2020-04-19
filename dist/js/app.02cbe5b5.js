(function(t){function e(e){for(var r,o,s=e[0],c=e[1],u=e[2],l=0,p=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);d&&d(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],r=!0,s=1;s<a.length;s++){var c=a[s];0!==n[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},n={app:0},i=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d"),a("483b"),a("aeed");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("Covid19Map")],1)},i=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dx-card responsive-paddings"},[a("DxVectorMap",{ref:"vectorMap",attrs:{id:"vector-map",bounds:t.bounds,touchEnabled:!0},on:{click:t.markerClick}},[a("DxLayer",{attrs:{"data-source":t.mapsWorld,"hover-enabled":!1}}),a("DxLayer",{attrs:{"data-source":t.markers,"size-groups":t.sizeGroups,"min-size":5,"max-size":100,opacity:.8,name:"bubbles","element-type":"bubble",color:"#ff3300","data-field":"confirmed"}}),a("DxLayer",{attrs:{"data-source":t.markers,"size-groups":t.sizeGroups,"min-size":1,"max-size":100,opacity:.8,name:"bubbles","element-type":"bubble",color:"#149414","data-field":"recovered"}}),a("DxLayer",{attrs:{"data-source":t.markers,"size-groups":t.sizeGroups,"min-size":1,"max-size":100,opacity:.8,name:"bubbles",color:"#000000","element-type":"bubble","data-field":"deaths"}}),a("DxTooltip",{attrs:{enabled:!0,"customize-tooltip":t.tooltipText}})],1),a("DxButton",{attrs:{id:"reset",text:"Reset"},on:{click:t.reset}})],1)},s=[],c=(a("7db0"),a("352a")),u=a("1157"),d=a.n(u),l=a("369b"),p=a.n(l),b=a("b761"),f=a("6191"),v=a("5097"),m=a.n(v),h={name:"Covid19Map",components:{DxVectorMap:b["DxVectorMap"],DxLayer:b["DxLayer"],DxTooltip:b["DxTooltip"],DxButton:f["DxButton"]},data:function(){return{markers:this.getDataSource(),mapsWorld:c["world"],bounds:[-180,85,180,-60],sizeGroups:this.getSizeGroups()}},methods:{getSizeGroups:function(){for(var t=[],e=0;e<11;e++)t.push(10*e);for(var a=1;a<11;a++)t.push(100*a);for(var r=1;r<101;r++)t.push(1e3*r);for(var n=1;n<101;n++)t.push(1e4*n);return t},getDataSource:function(){var t=this,e=new m.a({load:function(){var e=d.a.Deferred();return d.a.ajax({url:"https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports",async:!0,success:function(a){var r=a[a.length-2],n=[];d.a.ajax({url:r.download_url,async:!1,success:function(e){for(var a=p.a.parse(e),r=function(){var t="US"===a.data[i][3]||"China"===a.data[i][3]||"Canada"===a.data[i][3]||"Australia"===a.data[i][3],e="";t?e=a.data[i][3]:(e+=a.data[i][2]?a.data[i][2]+", ":"",e+=a.data[i][3]);var r=n.find((function(a){return a.attributes.region===e&&t}));if(r)r.attributes.confirmed+=parseInt(a.data[i][7]),r.attributes.recovered+=parseInt(a.data[i][9]),r.attributes.deaths+=parseInt(a.data[i][8]),r.attributes.active+=parseInt(a.data[i][10]);else{var o=parseFloat(a.data[i][5]),s=parseFloat(a.data[i][6]);"US"===e&&(o=39.5,s=-98.35),"Canada"===e&&(o=62.24,s=-96.4835),"China"===e&&(o=35.33,s=103.23),"Australia"===e&&(o=-23.7,s=132.8),isNaN(o)||n.push({coordinates:[s,o],attributes:{region:e,confirmed:parseInt(a.data[i][7]),recovered:parseInt(a.data[i][9]),deaths:parseInt(a.data[i][8]),active:parseInt(a.data[i][10]),confirmedDaily:[],recoveredDaily:[],deathsDaily:[]}})}},i=1;i<a.data.length-1;i++)r();t.addDailyData("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",n,"confirmedDaily"),t.addDailyData("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",n,"recoveredDaily"),t.addDailyData("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",n,"deathsDaily")}}),e.resolve(n)}}),e.promise()}});return e},addDailyData:function(t,e,a){d.a.ajax({url:t,async:!1,crossDomain:!0,accept:{"Access-Control-Allow-Origin":"*"},success:function(t){for(var r=p.a.parse(t),n=1;n<r.data.length-1;n++){var i="US"===r.data[n][1]||"China"===r.data[n][1]||"Canada"===r.data[n][1]||"Australia"===r.data[n][1],o="";i?o=r.data[n][1]:(o=r.data[n][0]?r.data[n][0]+", ":"",o+=r.data[n][1]);var s=e.find((function(t){return t.attributes.region===o}));if(s)for(var c=0,u=4;u<r.data[n].length;u++)s.attributes[a][u-4]||(s.attributes[a][u-4]=[]),s.attributes[a][u-4].value||(s.attributes[a][u-4].value=0),s.attributes[a][u-4].increase||(s.attributes[a][u-4].increase=0),s.attributes[a][u-4].date=r.data[0][u],s.attributes[a][u-4].value+=parseInt(r.data[n][u]),s.attributes[a][u-4].increase+=parseInt(r.data[n][u])-c,c=parseInt(r.data[n][u])}}})},tooltipText:function(t){if("marker"===t.layer.type){var e=t.attribute("confirmedDaily")[t.attribute("confirmedDaily").length-1].increase,a=t.attribute("recoveredDaily")[t.attribute("recoveredDaily").length-1].increase,r=t.attribute("deathsDaily")[t.attribute("deathsDaily").length-1].increase;return{text:"<b>"+t.attribute("region")+"</b><br />&nbsp;<br />Confirmed: "+t.attribute("confirmed")+" ("+e+")<br />Recovered: "+t.attribute("recovered")+" ("+a+")<br />Active: "+t.attribute("active")+"<br />Deaths: "+t.attribute("deaths")+" ("+r+")"}}},markerClick:function(t){t.target&&"marker"===t.target.layer.type&&t.component.center(t.target.coordinates()).zoomFactor(10)},reset:function(){var t=this.$refs.vectorMap.instance;t.center(null),t.zoomFactor(null)}}},y=h,_=(a("ed0b"),a("2877")),D=Object(_["a"])(y,o,s,!1,null,null,null),g=D.exports,x={name:"App",components:{Covid19Map:g}},S=x,C=Object(_["a"])(S,n,i,!1,null,null,null),I=C.exports;r["default"].config.productionTip=!1,new r["default"]({render:function(t){return t(I)}}).$mount("#app")},8128:function(t,e,a){},ed0b:function(t,e,a){"use strict";var r=a("8128"),n=a.n(r);n.a}});
//# sourceMappingURL=app.02cbe5b5.js.map