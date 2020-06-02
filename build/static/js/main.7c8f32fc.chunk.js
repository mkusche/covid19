(this["webpackJsonpcovid19-react"]=this["webpackJsonpcovid19-react"]||[]).push([[0],{439:function(e,t,a){e.exports=a(955)},444:function(e,t,a){},445:function(e,t,a){},446:function(e,t,a){},955:function(e,t,a){"use strict";a.r(t);var r=a(5),i=a.n(r),n=a(261),l=a.n(n),o=(a(444),a(197)),c=a(198),s=a(201),d=a(200),m=(a(264),a(265),a(445),a(199)),u=(a(446),a(119)),h=a(47),b=a.n(h),p=a(75),v=a.n(p),E=a(57),g=a.n(E),f=a(51),y=a(15),D=a(142),T=a.n(D),S=a(43),C=a(202),I=a.n(C),x=a(262),w=a.n(x),z=a(438),A=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(e){var r;function i(e,t,a){var r=[];return I.a.ajax({url:e,async:!1,crossDomain:!0,accept:{"Access-Control-Allow-Origin":"*"},success:function(e){for(var i=w.a.parse(e),n=1;n<i.data.length-1;n++){var l="US"===i.data[n][1]||"China"===i.data[n][1]||"Canada"===i.data[n][1]||"Australia"===i.data[n][1]||"Germany"===i.data[n][3]||"Italy"===i.data[n][3]||"Spain"===i.data[n][3]||"Brazil"===i.data[n][3]||"Mexico"===i.data[n][3]||"Chile"===i.data[n][3]||"Japan"===i.data[n][3]||"Colombia"===i.data[n][3]||"Peru"===i.data[n][3]||"Russia"===i.data[n][3]||"Ukraine"===i.data[n][3],o="";l?o=i.data[n][1]:(o=i.data[n][0]?i.data[n][0]+", ":"",o+=i.data[n][1]);var c=t.find((function(e){return e.attributes.region===o}));if(c)for(var s=0,d=4;d<i.data[n].length;d++)c.attributes[a][d-4]||(c.attributes[a][d-4]={}),c.attributes[a][d-4].value||(c.attributes[a][d-4].value=0),c.attributes[a][d-4].increase||(c.attributes[a][d-4].increase=0),c.attributes[a][d-4].date=new Date(i.data[0][d]),c.attributes[a][d-4].value+=parseInt(i.data[n][d]),c.attributes[a][d-4].increase+=parseInt(i.data[n][d])-s,1===n?r.push({date:new Date(i.data[0][d]),value:parseInt(i.data[n][d]),increase:parseInt(i.data[n][d])-s}):(r[d-4].value+=parseInt(i.data[n][d]),r[d-4].increase+=parseInt(i.data[n][d])-s),s=parseInt(i.data[n][d])}}}),r}return Object(o.a)(this,a),(r=t.call(this,e)).state={confirmedDaily:[],recoveredDaily:[],deathsDaily:[],currentData:{regionName:"World",totalConfirmed:"0",totalActive:"0",totalRecovered:"0",totalDeaths:"0"}},r.confirmedDailyWorld=[],r.recoveredDailyWorld=[],r.deathsDailyWorld=[],r.totalWorld={totalConfirmed:0,totalActive:0,totalRecovered:0,totalDeaths:0},r.mapRegions=[],r.screen=function(e){return e<700?"sm":"lg"},r.storeVectorMap=function(e){r.vectorMap=e.instance,setTimeout((function(){return r.vectorMap.render()}),300),r.vectorMap.render()},r.bounds=[-180,85,180,-60],r.sizeGroups=function(){for(var e=[],t=0;t<11;t++)e.push(10*t);for(var a=1;a<11;a++)e.push(100*a);for(var r=1;r<101;r++)e.push(1e3*r);for(var i=1;i<101;i++)e.push(1e4*i);for(var n=1;n<201;n++)e.push(1e4*n);return e}(),r.getData=function(){var e=Object(m.a)(r),t=[];return I.a.ajax({url:"https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports",async:!1,crossDomain:!0,accept:{"Access-Control-Allow-Origin":"*"},success:function(a){var r=a[a.length-2];I.a.ajax({url:r.download_url,async:!1,crossDomain:!0,accept:{"Access-Control-Allow-Origin":"*"},success:function(a){for(var r=w.a.parse(a),n=function(){var a="US"===r.data[l][3]||"China"===r.data[l][3]||"Canada"===r.data[l][3]||"Australia"===r.data[l][3]||"Germany"===r.data[l][3]||"Italy"===r.data[l][3]||"Spain"===r.data[l][3]||"Brazil"===r.data[l][3]||"Mexico"===r.data[l][3]||"Chile"===r.data[l][3]||"Japan"===r.data[l][3]||"Colombia"===r.data[l][3]||"Peru"===r.data[l][3]||"Russia"===r.data[l][3]||"Ukraine"===r.data[l][3],i="";a?i=r.data[l][3]:(i+=r.data[l][2]?r.data[l][2]+", ":"",i+=r.data[l][3]);var n=t.find((function(e){return e.attributes.region===i&&a}));if(n)n.attributes.confirmed+=parseInt(r.data[l][7]),n.attributes.recovered+=parseInt(r.data[l][9]),n.attributes.deaths+=parseInt(r.data[l][8]),n.attributes.active+=parseInt(r.data[l][10]);else{var o=parseFloat(r.data[l][5]),c=parseFloat(r.data[l][6]);"US"===i&&(o=39.5,c=-98.35),"Canada"===i&&(o=62.24,c=-96.4835),"China"===i&&(o=35.33,c=103.23),"Australia"===i&&(o=-23.7,c=132.8),"Germany"===i&&(o=51.2,c=10.5),"Italy"===i&&(o=41.9,c=12.6),"Spain"===i&&(o=40.5,c=-3.7),"Mexico"===i&&(o=23.6,c=-102.5),"Brazil"===i&&(o=-14.2,c=-51.9),"Chile"===i&&(o=-36.7,c=-71.1),"Chile"===i&&(o=-36.7,c=-71.1),"Japan"===i&&(o=36.2,c=138.2),"Colombia"===i&&(o=4.6,c=-74.3),"Peru"===i&&(o=-9.2,c=-75),"Russia"===i&&(o=61.5,c=105.3),"Ukraine"===i&&(o=48.4,c=31.2),isNaN(o)||t.push({coordinates:[c,o],attributes:{region:i,confirmed:parseInt(r.data[l][7]),recovered:parseInt(r.data[l][9]),deaths:parseInt(r.data[l][8]),active:parseInt(r.data[l][10]),confirmedDaily:[],recoveredDaily:[],deathsDaily:[]}})}e.totalWorld.totalConfirmed+=parseInt(r.data[l][7]),e.totalWorld.totalActive+=parseInt(r.data[l][10]),e.totalWorld.totalRecovered+=parseInt(r.data[l][9]),e.totalWorld.totalDeaths+=parseInt(r.data[l][8])},l=1;l<r.data.length-1;l++)n();e.confirmedDailyWorld=i("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",t,"confirmedDaily"),e.recoveredDailyWorld=i("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",t,"recoveredDaily"),e.deathsDailyWorld=i("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",t,"deathsDaily");for(var o=0;o<t.length;o++)"US"===t[o].attributes.region&&(t[o].attributes.region="United States"),"Czechia"===t[o].attributes.region&&(t[o].attributes.region="Czech Rep."),"Korea, South"===t[o].attributes.region&&(t[o].attributes.region="Korea"),"Taiwan*"===t[o].attributes.region&&(t[o].attributes.region="Taiwan");var c=e.state.currentData;c.totalConfirmed=Object(S.formatNumber)(e.totalWorld.totalConfirmed),c.totalActive=Object(S.formatNumber)(e.totalWorld.totalActive),c.totalRecovered=Object(S.formatNumber)(e.totalWorld.totalRecovered),c.totalDeaths=Object(S.formatNumber)(e.totalWorld.totalDeaths),e.state.confirmedDaily=e.confirmedDailyWorld,e.state.recoveredDaily=e.recoveredDailyWorld,e.state.deathsDaily=e.deathsDailyWorld,e.state.currentData=c}})}}),t},r.tooltipText=function(e){if("marker"===e.layer.type){var t=Object(S.formatNumber)(parseInt(e.attribute("confirmedDaily")[e.attribute("confirmedDaily").length-1].increase)),a=Object(S.formatNumber)(parseInt(e.attribute("recoveredDaily")[e.attribute("recoveredDaily").length-1].increase)),r=Object(S.formatNumber)(parseInt(e.attribute("deathsDaily")[e.attribute("deathsDaily").length-1].increase));return{text:"<b>"+e.attribute("region")+"</b><br />&nbsp;<br />Confirmed: "+Object(S.formatNumber)(parseInt(e.attribute("confirmed")))+" ("+t+")<br />Recovered: "+Object(S.formatNumber)(parseInt(e.attribute("recovered")))+" ("+a+")<br />Active: "+Object(S.formatNumber)(parseInt(e.attribute("active")))+"<br />Deaths: "+Object(S.formatNumber)(parseInt(e.attribute("deaths")))+" ("+r+")"}}},r.chartTooltipText=function(e){return{text:e.argument.toLocaleDateString("en-US")+": "+Object(S.formatNumber)(parseInt(e.value))}},r.markerClick=function(e){if(e.target&&"marker"===e.target.layer.type){e.component.center(e.target.coordinates()).zoomFactor(6);var t=e.target.attribute("confirmedDaily"),a=e.target.attribute("recoveredDaily"),i=e.target.attribute("deathsDaily"),n=r.state.currentData;n.regionName=e.target.attribute("region"),n.totalConfirmed=Object(S.formatNumber)(parseInt(e.target.attribute("confirmed"))),n.totalActive=Object(S.formatNumber)(parseInt(e.target.attribute("active"))),n.totalRecovered=Object(S.formatNumber)(parseInt(e.target.attribute("recovered"))),n.totalDeaths=Object(S.formatNumber)(parseInt(e.target.attribute("deaths"))),r.setState({confirmedDaily:t,recoveredDaily:a,deathsDaily:i,currentData:n});for(var l=0;l<r.mapRegions.length;l++)e.target.attribute("region")===r.mapRegions[l].attribute("name")?r.mapRegions[l].applySettings({color:"#FFAE42"}):r.mapRegions[l].applySettings({color:"#D2D2D2"})}},r.resetClick=function(){r.vectorMap.center(null),r.vectorMap.zoomFactor(null);var e=r.state.currentData;e.regionName="World",e.totalConfirmed=Object(S.formatNumber)(r.totalWorld.totalConfirmed),e.totalActive=Object(S.formatNumber)(r.totalWorld.totalActive),e.totalRecovered=Object(S.formatNumber)(r.totalWorld.totalRecovered),e.totalDeaths=Object(S.formatNumber)(r.totalWorld.totalDeaths),r.setState({confirmedDaily:r.confirmedDailyWorld,recoveredDaily:r.recoveredDailyWorld,deathsDaily:r.deathsDailyWorld,currentData:e});for(var t=0;t<r.mapRegions.length;t++)r.mapRegions[t].applySettings({color:"#D2D2D2"})},r.summarizeGridText=function(e){return Object(S.formatNumber)(e.value)},r.getRegions=function(e){r.mapRegions=e},r.dataSource=r.getData(),r}return Object(c.a)(a,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(b.a,{singleColumnScreen:"sm",id:"responsice-box",screenByWidth:this.screen,height:function(){return window.innerHeight}},i.a.createElement(h.Row,{ratio:3}),i.a.createElement(h.Row,{ratio:3,screen:"xs"}),i.a.createElement(h.Row,{ratio:1}),i.a.createElement(h.Col,{ratio:2}),i.a.createElement(h.Col,{ratio:1,screen:"lg"}),i.a.createElement(h.Col,{ratio:0,screen:"lg"}),i.a.createElement(h.Item,null,i.a.createElement(h.Location,{row:0,col:0,screen:"lg"}),i.a.createElement(h.Location,{row:0,col:0,colspan:2,screen:"sm"}),i.a.createElement("div",{className:"dx-card responsive-paddings"},i.a.createElement("div",{id:"region"},i.a.createElement("h2",{id:"region-name"},this.state.currentData.regionName)),i.a.createElement(u.Button,{id:"reset",text:"Reset",onClick:this.resetClick}),i.a.createElement(f.TabPanel,{className:"map-tab-panel"},i.a.createElement(f.Item,{title:"World Map"},i.a.createElement(v.a,{id:"vector-map",ref:this.storeVectorMap,bounds:this.bounds,onClick:this.markerClick},i.a.createElement(p.Layer,{dataSource:z.world,hoverEnabled:!1,customize:this.getRegions,color:"#D2D2D2"}),i.a.createElement(p.Layer,{dataSource:this.dataSource,name:"bubbles",elementType:"bubble",dataField:"confirmed",minSize:5,maxSize:100,opacity:"0.8",sizeGroups:this.sizeGroups,color:"#ff3300"},i.a.createElement(p.Label,{enabled:!1})),i.a.createElement(p.Layer,{dataSource:this.dataSource,name:"bubbles",elementType:"bubble",dataField:"recovered",minSize:1,maxSize:100,opacity:"0.8",sizeGroups:this.sizeGroups,color:"#149414"},i.a.createElement(p.Label,{enabled:!1})),i.a.createElement(p.Layer,{dataSource:this.dataSource,name:"bubbles",elementType:"bubble",dataField:"deaths",minSize:1,maxSize:100,opacity:"0.8",sizeGroups:this.sizeGroups,color:"#000000"},i.a.createElement(p.Label,{enabled:!1})),i.a.createElement(p.Tooltip,{enabled:!0,customizeTooltip:this.tooltipText})),i.a.createElement(T.a,{id:"totals-form"},i.a.createElement(D.GroupItem,{colCount:2},i.a.createElement(D.GroupItem,null,i.a.createElement("div",{className:"dx-field"},i.a.createElement("div",{className:"dx-field-label"},"Confirmed Cases"),i.a.createElement("div",{className:"dx-field-value"},i.a.createElement(u.TextBox,{readOnly:!0,hoverStateEnabled:!1,value:this.state.currentData.totalConfirmed}))),i.a.createElement("div",{className:"dx-field"},i.a.createElement("div",{className:"dx-field-label"},"Active Cases"),i.a.createElement("div",{className:"dx-field-value"},i.a.createElement(u.TextBox,{readOnly:!0,hoverStateEnabled:!1,value:this.state.currentData.totalActive})))),i.a.createElement(D.GroupItem,null,i.a.createElement("div",{className:"dx-field"},i.a.createElement("div",{className:"dx-field-label"},"Recovered Cases"),i.a.createElement("div",{className:"dx-field-value"},i.a.createElement(u.TextBox,{readOnly:!0,hoverStateEnabled:!1,value:this.state.currentData.totalRecovered}))),i.a.createElement("div",{className:"dx-field"},i.a.createElement("div",{className:"dx-field-label"},"Deaths"),i.a.createElement("div",{className:"dx-field-value"},i.a.createElement(u.TextBox,{readOnly:!0,hoverStateEnabled:!1,value:this.state.currentData.totalDeaths}))))))),i.a.createElement(f.Item,{title:"Table"},i.a.createElement(g.a,{id:"gridContainer",dataSource:this.dataSource,showBorders:!1,showColumnLines:!1,showRowLines:!1,focusedRowEnabled:!0,rowAlternationEnabled:!0,height:window.innerHeight-140,keyExpr:"attributes.region"},i.a.createElement(E.Selection,{mode:"single"}),i.a.createElement(E.Scrolling,{mode:"virtual"}),i.a.createElement(E.Column,{dataField:"attributes.region",caption:"Country"}),i.a.createElement(E.Column,{dataField:"attributes.confirmed",width:100,caption:"Confirmed",dataType:"number",defaultSortOrder:"desc"}),i.a.createElement(E.Column,{dataField:"attributes.recovered",width:100,caption:"Recovered",dataType:"number"}),i.a.createElement(E.Column,{dataField:"attributes.deaths",width:100,caption:"Deaths",dataType:"number"}),i.a.createElement(E.Column,{dataField:"attributes.active",width:100,caption:"Active",dataType:"number"}),i.a.createElement(E.Summary,null,i.a.createElement(E.TotalItem,{column:"Confirmed",summaryType:"sum",customizeText:this.summarizeGridText}),i.a.createElement(E.TotalItem,{column:"Recovered",summaryType:"sum",customizeText:this.summarizeGridText}),i.a.createElement(E.TotalItem,{column:"Deaths",summaryType:"sum",customizeText:this.summarizeGridText}),i.a.createElement(E.TotalItem,{column:"Active",summaryType:"sum",customizeText:this.summarizeGridText}))))))),i.a.createElement(h.Item,null,i.a.createElement(h.Location,{row:0,col:1,screen:"lg"}),i.a.createElement(h.Location,{row:1,col:0,colspan:2,screen:"sm"}),i.a.createElement("div",{className:"dx-card responsive-paddings"},i.a.createElement(f.TabPanel,{className:"tab-panel"},i.a.createElement(f.Item,{title:"Confirmed Daily"},i.a.createElement(y.Chart,{dataSource:this.state.confirmedDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"increase",argumentField:"date",barPadding:0,type:"bar",color:"#ff3300"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText}))),i.a.createElement(f.Item,{title:"Recovered Daily"},i.a.createElement(y.Chart,{dataSource:this.state.recoveredDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"increase",argumentField:"date",barPadding:0,type:"bar",color:"#149414"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText}))),i.a.createElement(f.Item,{title:"Deaths Daily"},i.a.createElement(y.Chart,{dataSource:this.state.deathsDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"increase",argumentField:"date",barPadding:0,type:"bar",color:"#000000"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText})))),i.a.createElement(f.TabPanel,{className:"tab-panel"},i.a.createElement(f.Item,{title:"Confirmed Linear"},i.a.createElement(y.Chart,{dataSource:this.state.confirmedDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"value",argumentField:"date",barPadding:0,type:"spline",color:"#ff3300"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText}))),i.a.createElement(f.Item,{title:"Recovered Linear"},i.a.createElement(y.Chart,{dataSource:this.state.recoveredDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"value",argumentField:"date",barPadding:0,type:"spline",color:"#149414"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText}))),i.a.createElement(f.Item,{title:"Deaths Linear"},i.a.createElement(y.Chart,{dataSource:this.state.deathsDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"value",argumentField:"date",barPadding:0,type:"spline",color:"#000000"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText})))),i.a.createElement(f.TabPanel,{className:"tab-panel"},i.a.createElement(f.Item,{title:"Confirmed Log."},i.a.createElement(y.Chart,{dataSource:this.state.confirmedDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"value",argumentField:"date",barPadding:0,type:"spline",color:"#ff3300"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.ValueAxis,{type:"logarithmic"}),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText}))),i.a.createElement(f.Item,{title:"Recovered Log."},i.a.createElement(y.Chart,{dataSource:this.state.recoveredDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"value",argumentField:"date",barPadding:0,type:"spline",color:"#149414"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.ValueAxis,{type:"logarithmic"}),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText}))),i.a.createElement(f.Item,{title:"Deaths Log."},i.a.createElement(y.Chart,{dataSource:this.state.deathsDaily},i.a.createElement(y.Size,{height:window.innerHeight/3-70}),i.a.createElement(y.Series,{valueField:"value",argumentField:"date",barPadding:0,type:"spline",color:"#000000"}),i.a.createElement(y.Legend,{visible:!1}),i.a.createElement(y.ArgumentAxis,null,i.a.createElement(y.TickInterval,{days:20}),i.a.createElement(y.Label,{overlappingBehavior:"hide"})),i.a.createElement(y.ValueAxis,{type:"logarithmic"}),i.a.createElement(y.Tooltip,{enabled:!0,customizeTooltip:this.chartTooltipText})))))),i.a.createElement(h.Item,null,i.a.createElement(h.Location,{row:1,col:0,screen:"lg"}),i.a.createElement(h.Location,{row:2,col:0,screen:"sm"}),i.a.createElement("div",null,"Datasource: ",i.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"Johns Hopkins CSSE")))))}}]),a}(i.a.Component),N=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return i.a.createElement(A,null)}}]),a}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[439,1,2]]]);
//# sourceMappingURL=main.7c8f32fc.chunk.js.map