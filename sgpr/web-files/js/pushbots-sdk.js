!function(a){"use strict";function o(){a.logging_enabled&&"undefined"!=typeof console&&"undefined"!=typeof console.log&&"undefined"!=typeof console.log.apply&&console.log.apply(console,arguments)}function p(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return JSON.stringify(a)===JSON.stringify({})}function q(){switch(e){case"safari":if("safari"in window&&"pushNotification"in window.safari){var b=window.safari.pushNotification.permission(config.pushbots_push_id);s(b)}break;case"chrome":case"firefox":if(d){var c=document.createElement("link");c.rel="manifest",c.href="pushbots-push-manifest.json",document.head.appendChild(c)}"serviceWorker"in navigator&&(o("Ask for Notifications Permission"),i=Date.now(),Notification.requestPermission(function(a){var b=Date.now(),c=b-i;switch(j=!(c<50),a){case"granted":switch(e){case"chrome":case"firefox":z()}break;case"default":break;case"denied":}}),navigator.serviceWorker.register("./pushbots-worker.js").then(function(a){a.installing?o("Service worker installing"):a.waiting?o("Service worker installed"):a.active&&o("Service worker active")}))}}function r(a){switch(e){case"chrome":if("subscriptionId"in a)var b=a.subscriptionId;else var b=a.endpoint;return b.replace(new RegExp("^(https://android.googleapis.com/gcm/send/|https://updates.push.services.mozilla.com/push/|https://updates.push.services.mozilla.com/wpush/v1/)"),"");case"firefox":var b=a.endpoint;return b.replace(new RegExp("^(https://android.googleapis.com/gcm/send/|https://updates.push.services.mozilla.com/push/|https://updates.push.services.mozilla.com/wpush/v1/)"),"")}}function s(a){o(a)}function t(a){return a.replace("://www.","://").replace("://www2.","://")}function u(){return!(t(window.location.href.toLowerCase()).indexOf(t(a.domain.toLowerCase()))===-1)}function v(){var a,b=navigator.userAgent,c=b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],d=b.match(/(edge(?=\/))\/?\s*(\d+)/i)||[];return"Edge"===d[1]?{title:d[1],ver:d[2]}:/trident/i.test(c[1])?(a=/\brv[ :]+(\d+)/g.exec(b)||[],{title:"IE",ver:a[1]||""}):"Chrome"===c[1]&&(a=b.match(/\bOPR\/(\d+)/),null!=a)?{title:"Opera",ver:a[1]}:(c=c[2]?[c[1],c[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(a=b.match(/version\/(\d+)/i))&&c.splice(1,1,a[1]),{title:c[0],ver:c[1]})}function w(){const a=navigator.userAgent;return a.indexOf("Android")!=-1?"Android":a.indexOf("iPhone")!=-1||a.indexOf("iPod")!=-1||a.indexOf("iPad")!=-1?"iOS":""}function x(){d=0===window.location.href.indexOf("https://"),d=!0}function y(){var a=window.crypto||window.msCrypto;if(a&&a.getRandomValues){var b=new Uint16Array(8);a.getRandomValues(b),b[3]=4095&b[3]|16384,b[4]=16383&b[4]|32768;var c=function(a){for(var b=a.toString(16);b.length<4;)b="0"+b;return b};return c(b[0])+c(b[1]+c(b[2])+c(b[3])+c(b[4])+c(b[5])+c(b[6])+c(b[7]))}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"===a?b:3&b|8;return c.toString(16)})}function z(){switch(e){case"chrome":case"firefox":navigator.serviceWorker.ready.then(function(b){o(b),b.pushManager.subscribe({userVisibleOnly:!0}).then(function(b){o(b);for(var c=r(b),d=b.getKey?b.getKey("p256dh"):"",e=d?btoa(String.fromCharCode.apply(null,new Uint8Array(d))):"",f=b.getKey?b.getKey("auth"):"",g=f?btoa(String.fromCharCode.apply(null,new Uint8Array(f))):"",h=0;h<a.events.length;h++)"onRegistered"===a.events[h][0]&&a.events[h][1]({subscriptionId:c,rawKey:d,subscriptionPublicKey:e});A(c,e,g)})});break;case"safari":var b=window.safari.pushNotification.permission(config.pushbots_push_id);if("granted"===b.permission){var c=b.deviceToken;A(c)}}}function A(a,b,c){n.createItem("pushbots_ids",{type:"subscriptionId",value:a},function(d){o("[PB] subscribe :: \nSubscriptionId: "+a+"\nSubscriptionPublicKey: "+b+"\nAuthSecret: "+c),n.fetchItem("pushbots_ids","userId",function(d){var e={token:a,udid:k,platform:m,key:b,authSecret:c,timeZone:60*-(new Date).getTimezoneOffset(),metrics:{osVersion:f.ver,locale:navigator.language.substring(0,2)||"en",PushBotslibVersion:"1.0.0-alpha"}};void 0===d.target.result?B(e,"POST",h+"/2/subscriptions",null):B(e,"PUT",h+"/2/subscriptions/"+d.target.result.value,d.target.result.value)})})}function B(b,c,d,e){try{var f=new XMLHttpRequest,g=JSON.stringify(b);f.open(c,d),f.setRequestHeader("X-pushbots-appid",a.app_id),f.setRequestHeader("content-type","application/json; charset=UTF-8"),f.onload=function(){let c=null;this.response&&(c=JSON.parse(this.response)),o(c);let d=this.status;switch(d){case 200:case 201:n.createItem("pushbots_ids",{type:"userId",value:e?e:c._id},function(f){if(o(e),201===d){for(var g=0;g<a.events.length;g++)"onRegisteredOnPushBots"===a.events[g][0]&&a.events[g][1]({subscriptionId:b.subscriptionId,userId:e?e:c._id});o(d+": Registered user on PushBots successfully."),a.welcome&&a.sendNotification(a.welcome)}else o(d+": Updated user on PushBots successfully.")});break;case 202:n.deleteAllStore("pushbots_ids",function(a){B(subscriptionId,subscriptionPublicKey,authSecret,"POST",h+"/2/subscriptions")});break;default:o("Response Status code: "+d)}},f.send(g)}catch(a){o("Cannot register on Pushbots: "+a)}}function C(){if("undefined"!=typeof a.q&&a.q.length>0){for(var b=0;b<a.q.length;b++)if("function"==typeof a.q[b])a.q[b]();else{var c=a.q[b][0],d=a.q[b].slice(1);"function"==typeof a[c]&&a[c].apply(null,d)}a.q=[]}setTimeout(C,600)}var b=!1,d=!1,e="",f={},h="https://api.pushbots.com",i=0,j=!1,k=null,l=null,m=null;a.init=function(c){if(!b){if(b=!0,c=c||{},a.app_id=c.app_id||a.app_id||null,a.domain=c.domain||a.domain||null,a.welcome=c.welcome||a.welcome||!1,a.logging_enabled=c.logging_enabled||a.logging_enabled||!1,"boolean"==typeof c.auto_subscribe||"boolean"==typeof a.auto_subscribe?a.auto_subscribe=c.auto_subscribe||a.auto_subscribe:a.auto_subscribe=!0,!a.app_id)return o("PushBots Application Id is required."),!1;var d=new RegExp("^[0-9a-fA-F]{24}$"),g=d.test(a.app_id);if(!g)return o("PushBots Application Id is invalid."),!1;if(a.events.constructor!==Array&&(a.events=[]),a.q.constructor!==Array&&(a.q=[]),!u())return o("You can only use this script on: "+a.domain),!1;if(l=w(),"iOS"==l)return o("Application can not work on iOS"),!1;if(x(),f=v(),e=f.title.toLowerCase(),"safari"==e)return o(e+" browser is not yet supported, stay tuned!"),!1;if("firefox"==e&&parseFloat(f.ver)<44)return o("Application can not work with Firefox browser version less then 44"),!1;if("chrome"==e&&parseFloat(f.ver)<50)return o("Application can not work with chrome browser version less then 50"),!1;if("firefox"==e&&"Android"==l)return o("Application can not work with Firefox on Android"),!1;"chrome"==e?m=2:"firefox"==e&&(m=3),C(),a.auto_subscribe&&a.register()}},a.register=function(){n.fetchAll("pushbots_ids",function(b){p(b)?(k=y(),n.createItem("pushbots_ids",{type:"uuid",value:k},function(b){n.createItem("pushbots_ids",{type:"appID",value:a.app_id},function(a){d&&q()})})):b.appID!=a.app_id?(o("Application Id has been changed, resetting data before starting"),n.deleteAllStore("pushbots_ids",function(b){a.register()})):d&&(o(b),q())})},a.tag=function(b){b.constructor===Array&&b.length>0&&a.update({tags_add:b})},a.untag=function(b){b.constructor===Array&&b.length>0&&a.update({tags_remove:b})},a.subscribe=function(b){"boolean"==typeof b&&a.update({subscribed:b})},a.alias=function(b){b.constructor===String&&a.update({alias:b})},a.update=function(a){n.fetchItem("pushbots_ids","userId",function(b){a.timeZone=60*-(new Date).getTimezoneOffset(),a.metrics={osVersion:f.ver,locale:navigator.language.substring(0,2)||"en",PushBotslibVersion:"1.0.0-alpha"},void 0!=b.target.result?B(a,"PUT",h+"/2/subscriptions/"+b.target.result.value,b.target.result.value):o("User is not registered on PushBots!")})},a.sendNotification=function(a){a.platform=m,console.log(a),n.fetchItem("pushbots_ids","userId",function(b){void 0!=b.target.result?B(a,"POST",h+"/2/push/notrack/"+b.target.result.value,b.target.result.value):o("User is not registered on PushBots!")})};var n={databaseName:"pushbots_db",databaseVersion:1,datastore:null,openDB:function(a){var c=this;if(c.datastore)return void a();var d=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,e=d.open(this.databaseName,this.databaseVersion);e.onerror=function(a){o("Database error: "+a.target.errorCode)},e.onsuccess=function(b){c.datastore=b.target.result,a()},e.onupgradeneeded=function(a){var b=a.target.result;b.createObjectStore("pushbots_ids",{keyPath:"type"})}},fetchAll:function(a,b){var c=this;this.openDB(function(){var d=c.datastore.transaction([a],"readonly"),e=d.objectStore(a),f={};d.oncomplete=function(a){b(f)};var g=e.openCursor();g.onerror=function(a){o(a)},g.onsuccess=function(a){var b=a.target.result;b&&(f[b.value.type]=b.value.value,b.continue())}})},fetchItem:function(a,b,c){var d=this;this.openDB(function(){var e=d.datastore.transaction([a],"readonly"),f=e.objectStore(a);f.get(b).onsuccess=c})},createItem:function(a,b,c){var d=this;this.openDB(function(){var e=d.datastore,f=e.transaction([a],"readwrite"),g=f.objectStore(a),h=g.put(b);h.onsuccess=function(a){c(b.value)}})},deleteAllStore:function(a,b){var c=this;this.openDB(function(){var d=c.datastore,e=d.transaction([a],"readwrite"),f=e.objectStore(a),g=f.clear();g.onsuccess=b})},deleteItem:function(a,b,c){var d=this;this.openDB(function(){var e=d.datastore,f=e.transaction([a],"readwrite"),g=f.objectStore(a),h=g.delete(b);h.onsuccess=c})}}}(window.PB=window.PB||{});