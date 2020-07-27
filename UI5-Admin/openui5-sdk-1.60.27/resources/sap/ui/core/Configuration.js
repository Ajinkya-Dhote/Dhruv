/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','../Device','../Global','../base/Object','./Locale','sap/ui/thirdparty/URI',"sap/base/util/UriParameters","sap/base/util/deepEqual","sap/base/util/Version","sap/base/Log","sap/base/assert"],function(q,D,G,B,L,U,a,d,V,b,c){"use strict";var C,f;var g=B.extend("sap.ui.core.Configuration",{constructor:function(l){this._oCore=l;function r(){function e(){if(D.os.android){var m=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(m){return m[1];}}return navigator.language;}return h((navigator.languages&&navigator.languages[0])||e()||navigator.userLanguage||navigator.browserLanguage)||new L("en");}var u={"theme":{type:"string",defaultValue:"base"},"language":{type:"Locale",defaultValue:r()},"formatLocale":{type:"Locale",defaultValue:null},"calendarType":{type:"string",defaultValue:null},"accessibility":{type:"boolean",defaultValue:true},"autoAriaBodyRole":{type:"boolean",defaultValue:true,noUrl:true},"animation":{type:"boolean",defaultValue:true},"animationMode":{type:g.AnimationMode,defaultValue:undefined},"rtl":{type:"boolean",defaultValue:null},"debug":{type:"boolean",defaultValue:false},"inspect":{type:"boolean",defaultValue:false},"originInfo":{type:"boolean",defaultValue:false},"noConflict":{type:"boolean",defaultValue:false,noUrl:true},"noDuplicateIds":{type:"boolean",defaultValue:true},"trace":{type:"boolean",defaultValue:false,noUrl:true},"modules":{type:"string[]",defaultValue:[],noUrl:true},"areas":{type:"string[]",defaultValue:null,noUrl:true},"onInit":{type:"code",defaultValue:undefined,noUrl:true},"uidPrefix":{type:"string",defaultValue:"__",noUrl:true},"ignoreUrlParams":{type:"boolean",defaultValue:false,noUrl:true},"preload":{type:"string",defaultValue:"auto"},"rootComponent":{type:"string",defaultValue:"",noUrl:true},"preloadLibCss":{type:"string[]",defaultValue:[]},"application":{type:"string",defaultValue:""},"appCacheBuster":{type:"string[]",defaultValue:[]},"bindingSyntax":{type:"string",defaultValue:"default",noUrl:true},"versionedLibCss":{type:"boolean",defaultValue:false},"manifestFirst":{type:"boolean",defaultValue:false},"flexibilityServices":{type:"string",defaultValue:"/sap/bc/lrep"},"whitelistService":{type:"string",defaultValue:null,noUrl:true},"frameOptions":{type:"string",defaultValue:"default",noUrl:true},"frameOptionsConfig":{type:"object",defaultValue:undefined,noUrl:true},"support":{type:"string[]",defaultValue:null},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-appCacheBusterHooks":{type:"object",defaultValue:undefined,noUrl:true},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-viewCache":{type:"boolean",defaultValue:true},"xx-test-mobile":{type:"boolean",defaultValue:false},"xx-depCache":{type:"boolean",defaultValue:false},"xx-domPatching":{type:"boolean",defaultValue:false},"xx-libraryPreloadFiles":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-designMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false},"xx-lesssupport":{type:"boolean",defaultValue:false},"xx-handleValidation":{type:"boolean",defaultValue:false},"xx-fiori2Adaptation":{type:"string[]",defaultValue:[]},"xx-cache-use":{type:"boolean",defaultValue:true},"xx-cache-excludedKeys":{type:"string[]",defaultValue:[]},"xx-cache-serialization":{type:"boolean",defaultValue:false},"xx-nosync":{type:"string",defaultValue:""},"xx-waitForTheme":{type:"boolean",defaultValue:false},"xx-xml-processing":{type:"string",defaultValue:""},"xx-avoidAriaApplicationRole":{type:"boolean",defaultValue:false},"xx-hyphenation":{type:"string",defaultValue:""},"xx-flexBundleRequestForced":{type:"boolean",defaultValue:false},"statistics":{type:"boolean",defaultValue:false}};var w={"xx-test":"1.15","flexBoxPolyfill":"1.14","sapMeTabContainer":"1.14","sapMeProgessIndicator":"1.14","sapMGrowingList":"1.14","sapMListAsTable":"1.14","sapMDialogWithPadding":"1.14","sapCoreBindingSyntax":"1.24"};this.oFormatSettings=new g.FormatSettings(this);var x=this;function y(e,N){if(typeof N==="undefined"||N===null){return;}switch(u[e].type){case"boolean":if(typeof N==="string"){if(u[e].defaultValue){x[e]=N.toLowerCase()!="false";}else{x[e]=N.toLowerCase()==="true"||N.toLowerCase()==="x";}}else{x[e]=!!N;}break;case"string":x[e]=""+N;break;case"code":x[e]=typeof N==="function"?N:String(N);break;case"function":if(typeof N!=="function"){throw new Error("unsupported value");}x[e]=N;break;case"string[]":if(Array.isArray(N)){x[e]=N;}else if(typeof N==="string"){x[e]=N.split(/[ ,;]/).map(function(s){return s.trim();});}else{throw new Error("unsupported value");}break;case"object":if(typeof N!=="object"){throw new Error("unsupported value");}x[e]=N;break;case"Locale":var O=h(N);if(O||u[e].defaultValue==null){x[e]=O;}else{throw new Error("unsupported value");}break;default:var v=u[e].type;if(typeof v==="object"){p(v,N,e);x[e]=N;}else{throw new Error("illegal state");}}}function z(s){var m=document.querySelector("META[name='"+s+"']"),e=m&&m.getAttribute("content");if(e){return e;}}function A(s){var e=z("sap-allowedThemeOrigins");return!!e&&e.split(",").some(function(m){return m==="*"||s===m.trim();});}function E(Q){var m,s;try{m=new U(Q).search("");var v=m.origin();if(v&&A(v)){s=m.toString();}else{s=m.absoluteTo(window.location.href).origin(window.location.origin).normalize().toString();}return s+(s.endsWith('/')?'':'/')+"UI5/";}catch(e){}}for(var n in u){x[n]=u[n].defaultValue;}var F=window["sap-ui-config"]||{};F.oninit=F.oninit||F["evt-oninit"];for(var n in u){if(F.hasOwnProperty(n.toLowerCase())){y(n,F[n.toLowerCase()]);}else if(!/^xx-/.test(n)&&F.hasOwnProperty("xx-"+n.toLowerCase())){y(n,F["xx-"+n.toLowerCase()]);}}if(F.libs){x.modules=F.libs.split(",").map(function(e){return e.trim()+".library";}).concat(x.modules);}var P="compatversion";var H=F[P];var I=V("1.14");this._compatversion={};function _(e){var v=!e?H||I.toString():F[P+"-"+e.toLowerCase()]||H||w[e]||I.toString();v=V(v.toLowerCase()==="edge"?G.version:v);return V(v.getMajor(),v.getMinor());}this._compatversion._default=_();for(var n in w){this._compatversion[n]=_(n);}if(!x.ignoreUrlParams){var J="sap-ui-";var K=new a(window.location.href);if(K.mParams['sap-language']){var N=x.sapLogonLanguage=K.get('sap-language');var O=N&&h(M[N.toUpperCase()]||N);if(O){x.language=O;}else if(N&&!K.get('sap-locale')&&!K.get('sap-ui-language')){b.warning("sap-language '"+N+"' is not a valid BCP47 language tag and will only be used as SAP logon language");}}if(K.mParams['sap-locale']){y("language",K.get('sap-locale'));}if(K.mParams['sap-rtl']){var N=K.get('sap-rtl');if(N==="X"||N==="x"){y('rtl',true);}else{y('rtl',false);}}if(K.mParams['sap-theme']){var N=K.get('sap-theme');if(N===""){x['theme']=u['theme'].defaultValue;}else{y('theme',N);}}if(K.mParams['sap-statistics']){var N=K.get('sap-statistics');y('statistics',N);}for(var n in u){if(u[n].noUrl){continue;}var N=K.get(J+n);if(N==null&&!/^xx-/.test(n)){N=K.get(J+"xx-"+n);}if(N===""){x[n]=u[n].defaultValue;}else{y(n,N);}}if(K.mParams['sap-ui-legacy-date-format']){this.oFormatSettings.setLegacyDateFormat(K.get('sap-ui-legacy-date-format'));}if(K.mParams['sap-ui-legacy-time-format']){this.oFormatSettings.setLegacyTimeFormat(K.get('sap-ui-legacy-time-format'));}if(K.mParams['sap-ui-legacy-number-format']){this.oFormatSettings.setLegacyNumberFormat(K.get('sap-ui-legacy-number-format'));}}x.sapparams=x.sapparams||{};x.sapparams['sap-language']=this.getSAPLogonLanguage();['sap-client','sap-server','sap-system'].forEach(function(s){if(!x.ignoreUrlParams&&K.get(s)){x.sapparams[s]=K.get(s);}else{x.sapparams[s]=z(s);}});this.derivedRTL=L._impliesRTL(x.language);var T=x.theme;var Q;var R=T.indexOf("@");if(R>=0){Q=E(T.slice(R+1));if(Q){x.theme=T.slice(0,R);x.themeRoot=Q;}else{x.theme=(F.theme&&F.theme!==T)?F.theme:"base";R=-1;}}x.theme=this._normalizeTheme(x.theme,Q);var S=x['languagesDeliveredWithCore']=L._coreI18nLocales;var W=x['xx-supportedLanguages'];if(W.length===0||(W.length===1&&W[0]==='*')){W=[];}else if(W.length===1&&W[0]==='default'){W=S||[];}x['xx-supportedLanguages']=W;var X=x['xx-fiori2Adaptation'];if(X.length===0||(X.length===1&&X[0]==='false')){X=false;}else if(X.length===1&&X[0]==='true'){X=true;}x['xx-fiori2Adaptation']=X;if(x["bindingSyntax"]==="default"){x["bindingSyntax"]=(x.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26")<0)?"simple":"complex";}if(!x["whitelistService"]){var Y=z('sap.whitelistService');if(Y){x["whitelistService"]=Y;if(x["frameOptions"]==="default"){x["frameOptions"]="trusted";}}}if(x["frameOptions"]==="default"||(x["frameOptions"]!=="allow"&&x["frameOptions"]!=="deny"&&x["frameOptions"]!=="trusted")){x["frameOptions"]="allow";}var Z=x['preloadLibCss'];if(Z.length>0){Z.appManaged=Z[0].slice(0,1)==="!";if(Z.appManaged){Z[0]=Z[0].slice(1);}if(Z[0]==="*"){Z.shift();x.modules.forEach(function(e){var m=e.match(/^(.*)\.library$/);if(m){Z.unshift(m[1]);}});}}for(var n in u){if(x[n]!==u[n].defaultValue){b.info("  "+n+" = "+x[n]);}}if(this.getAnimationMode()===undefined){if(this.animation){this.setAnimationMode(g.AnimationMode.full);}else{this.setAnimationMode(g.AnimationMode.minimal);}}else{this.setAnimationMode(this.getAnimationMode());}},getVersion:function(){if(this._version){return this._version;}this._version=new V(G.version);return this._version;},getCompatibilityVersion:function(F){if(typeof(F)==="string"&&this._compatversion[F]){return this._compatversion[F];}return this._compatversion._default;},getTheme:function(){return this.theme;},_setTheme:function(T){this.theme=T;return this;},_normalizeTheme:function(T,s){if(T&&s==null&&T.match(/^sap_corbu$/i)){return"sap_goldreflection";}return T;},getLanguage:function(){return this.language.sLocaleId;},getLanguageTag:function(){return this.language.toString();},getSAPLogonLanguage:function(){return this.sapLogonLanguage||this.language.getSAPLogonLanguage();},setLanguage:function(l,s){var e=h(l),O=this.getRTL(),m;o(e,"Configuration.setLanguage: sLanguage must be a valid BCP47 language tag");o(s==null||(typeof s==='string'&&/[A-Z0-9]{2,2}/i.test(s)),"Configuration.setLanguage: sSAPLogonLanguage must be null or be a string of length 2, consisting of digits and latin characters only",true);if(e.toString()!=this.getLanguageTag()||s!==this.sapLogonLanguage){this.language=e;this.sapLogonLanguage=s||undefined;this.sapparams['sap-language']=this.getSAPLogonLanguage();m=this._collect();m.language=this.getLanguageTag();this.derivedRTL=L._impliesRTL(e);if(O!=this.getRTL()){m.rtl=this.getRTL();}this._endCollect();}return this;},getLocale:function(){return this.language;},getSAPParam:function(n){return this.sapparams&&this.sapparams[n];},getXMLProcessingMode:function(){return this["xx-xml-processing"];},setXMLProcessingMode:function(m){this["xx-xml-processing"]=m;return this;},isUI5CacheOn:function(){return this["xx-cache-use"];},setUI5CacheOn:function(e){this["xx-cache-use"]=e;return this;},isUI5CacheSerializationSupportOn:function(){return this["xx-cache-serialization"];},setUI5CacheSerializationSupport:function(e){this["xx-cache-serialization"]=e;return this;},getUI5CacheExcludedKeys:function(){return this["xx-cache-excludedKeys"];},getCalendarType:function(){var n;if(!C){G.getCore().loadLibrary('sap.ui.core');C=sap.ui.require("sap/ui/core/library").CalendarType;}if(!f){f=sap.ui.requireSync("sap/ui/core/LocaleData");}if(this.calendarType){for(n in C){if(n.toLowerCase()===this.calendarType.toLowerCase()){this.calendarType=n;return this.calendarType;}}b.warning("Parameter 'calendarType' is set to "+this.calendarType+" which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale");}var l=this.oFormatSettings.getLegacyDateFormat();switch(l){case"1":case"2":case"3":case"4":case"5":case"6":return C.Gregorian;case"7":case"8":case"9":return C.Japanese;case"A":case"B":return C.Islamic;case"C":return C.Persian;}return f.getInstance(this.getLocale()).getPreferredCalendarType();},setCalendarType:function(s){var m;if(this.calendarType!==s){m=this._collect();this.calendarType=m.calendarType=s;this._endCollect();}return this;},getFormatLocale:function(){return(this.formatLocale||this.language).toString();},setFormatLocale:function(F){var e=h(F),m;o(F==null||typeof F==="string"&&e,"sFormatLocale must be a BCP47 language tag or Java Locale id or null");if(t(e)!==t(this.formatLocale)){this.formatLocale=e;m=this._collect();m.formatLocale=t(e);this._endCollect();}return this;},getLanguagesDeliveredWithCore:function(){return this["languagesDeliveredWithCore"];},getSupportedLanguages:function(){return this["xx-supportedLanguages"];},getAccessibility:function(){return this.accessibility;},getAutoAriaBodyRole:function(){return this.autoAriaBodyRole;},getAvoidAriaApplicationRole:function(){return this.getAutoAriaBodyRole()&&this["xx-avoidAriaApplicationRole"];},getAnimation:function(){return this.animation;},getAnimationMode:function(){return this.animationMode;},setAnimationMode:function(A){p(g.AnimationMode,A,"animationMode");this.animation=(A!==g.AnimationMode.minimal&&A!==g.AnimationMode.none);this.animationMode=A;if(this._oCore&&this._oCore._setupAnimation){this._oCore._setupAnimation();}},getRTL:function(){return this.rtl===null?this.derivedRTL:this.rtl;},getFiori2Adaptation:function(){return this["xx-fiori2Adaptation"];},setRTL:function(r){o(r===null||typeof r==="boolean","bRTL must be null or a boolean");var e=this.getRTL(),m;this.rtl=r;if(e!=this.getRTL()){m=this._collect();m.rtl=this.getRTL();this._endCollect();}return this;},getDebug:function(){return this.debug;},getInspect:function(){return this.inspect;},getOriginInfo:function(){return this.originInfo;},getNoDuplicateIds:function(){return this.noDuplicateIds;},getTrace:function(){return this.trace;},getUIDPrefix:function(){return this.uidPrefix;},getDesignMode:function(){return this["xx-designMode"];},getSuppressDeactivationOfControllerCode:function(){return this["xx-suppressDeactivationOfControllerCode"];},getControllerCodeDeactivated:function(){return this.getDesignMode()&&!this.getSuppressDeactivationOfControllerCode();},getApplication:function(){return this.application;},getRootComponent:function(){return this.rootComponent;},getAppCacheBuster:function(){return this.appCacheBuster;},getAppCacheBusterMode:function(){return this["xx-appCacheBusterMode"];},getAppCacheBusterHooks:function(){return this["xx-appCacheBusterHooks"];},getDisableCustomizing:function(){return this["xx-disableCustomizing"];},getViewCache:function(){return this["xx-viewCache"];},getDomPatching:function(){return this["xx-domPatching"];},getPreload:function(){return this.preload;},getDepCache:function(){return this["xx-depCache"];},getManifestFirst:function(){return this.manifestFirst;},isFlexBundleRequestForced:function(){return this["xx-flexBundleRequestForced"];},getFlexibilityServices:function(){return this.flexibilityServices;},getComponentPreload:function(){return this['xx-componentPreload']||this.preload;},getFormatSettings:function(){return this.oFormatSettings;},getFrameOptions:function(){return this.frameOptions;},getWhitelistService:function(){return this.whitelistService;},getSupportMode:function(){return this.support;},_collect:function(){var m=this.mChanges||(this.mChanges={__count:0});m.__count++;return m;},_endCollect:function(){var m=this.mChanges;if(m&&(--m.__count)===0){delete m.__count;this._oCore&&this._oCore.fireLocalizationChanged(m);delete this.mChanges;}},getStatistics:function(){var r=this.statistics;try{r=r||window.localStorage.getItem("sap-ui-statistics")=="X";}catch(e){}return r;},getNoNativeScroll:function(){return false;},getHandleValidation:function(){return this["xx-handleValidation"];},getHyphenation:function(){return this["xx-hyphenation"];},applySettings:function(s){function e(l,m){var n,r;for(n in m){r="set"+n.slice(0,1).toUpperCase()+n.slice(1);if(n==='formatSettings'&&l.oFormatSettings){e(l.oFormatSettings,m[n]);}else if(typeof l[r]==='function'){l[r](m[n]);}else{b.warning("Configuration.applySettings: unknown setting '"+n+"' ignored");}}}c(typeof s==='object',"mSettings must be an object");this._collect();e(this,s);this._endCollect();return this;}});g.AnimationMode={full:"full",basic:"basic",minimal:"minimal",none:"none"};function h(l){try{if(l&&typeof l==='string'){return new L(l);}}catch(e){}}function t(l){return l?l.toString():null;}var M={"ZH":"zh-Hans","ZF":"zh-Hant","1Q":"en-US-x-saptrc","2Q":"en-US-x-sappsd"};var i={"":{pattern:null},"1":{pattern:"dd.MM.yyyy"},"2":{pattern:"MM/dd/yyyy"},"3":{pattern:"MM-dd-yyyy"},"4":{pattern:"yyyy.MM.dd"},"5":{pattern:"yyyy/MM/dd"},"6":{pattern:"yyyy-MM-dd"},"7":{pattern:"Gyy.MM.dd"},"8":{pattern:"Gyy/MM/dd"},"9":{pattern:"Gyy-MM-dd"},"A":{pattern:"yyyy/MM/dd"},"B":{pattern:"yyyy/MM/dd"},"C":{pattern:"yyyy/MM/dd"}};var j={"":{"short":null,medium:null,dayPeriods:null},"0":{"short":"HH:mm",medium:"HH:mm:ss",dayPeriods:null},"1":{"short":"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["AM","PM"]},"2":{"short":"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["am","pm"]},"3":{"short":"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["AM","PM"]},"4":{"short":"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["am","pm"]}};var k={"":{groupingSeparator:null,decimalSeparator:null}," ":{groupingSeparator:".",decimalSeparator:","},"X":{groupingSeparator:",",decimalSeparator:"."},"Y":{groupingSeparator:" ",decimalSeparator:","}};function o(e,m){if(!e){throw new Error(m);}}function p(e,v,P){var l=[];for(var K in e){if(e.hasOwnProperty(K)){if(e[K]===v){return;}l.push(e[K]);}}throw new Error("Unsupported Enumeration value for "+P+", valid values are: "+l.join(", "));}B.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(e){this.oConfiguration=e;this.mSettings={};this.sLegacyDateFormat=undefined;this.sLegacyTimeFormat=undefined;this.sLegacyNumberFormatSymbolSet=undefined;},getFormatLocale:function(){function e(m){var n=m.oConfiguration.language;if(!q.isEmptyObject(m.mSettings)){var l=n.toString();if(l.indexOf("-x-")<0){l=l+"-x-sapufmt";}else if(l.indexOf("-sapufmt")<=l.indexOf("-x-")){l=l+"-sapufmt";}n=new L(l);}return n;}return this.oConfiguration.formatLocale||e(this);},_set:function(K,v){var O=this.mSettings[K];if(v!=null){this.mSettings[K]=v;}else{delete this.mSettings[K];}if((O!=null||v!=null)&&!d(O,v)){var m=this.oConfiguration._collect();m[K]=v;this.oConfiguration._endCollect();}},getCustomUnits:function(){return this.mSettings["units"]?this.mSettings["units"]["short"]:undefined;},setCustomUnits:function(u){var m=null;if(u){m={"short":u};}this._set("units",m);return this;},addCustomUnits:function(u){var e=this.getCustomUnits();if(e){u=q.extend({},e,u);}this.setCustomUnits(u);return this;},setUnitMappings:function(u){this._set("unitMappings",u);return this;},addUnitMappings:function(u){var e=this.getUnitMappings();if(e){u=q.extend({},e,u);}this.setUnitMappings(u);return this;},getUnitMappings:function(){return this.mSettings["unitMappings"];},getDatePattern:function(s){c(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");return this.mSettings["dateFormats-"+s];},setDatePattern:function(s,P){o(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");this._set("dateFormats-"+s,P);return this;},getTimePattern:function(s){c(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");return this.mSettings["timeFormats-"+s];},setTimePattern:function(s,P){o(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");this._set("timeFormats-"+s,P);return this;},getNumberSymbol:function(T){c(T=="decimal"||T=="group"||T=="plusSign"||T=="minusSign","sType must be decimal, group, plusSign or minusSign");return this.mSettings["symbols-latn-"+T];},setNumberSymbol:function(T,s){o(T=="decimal"||T=="group"||T=="plusSign"||T=="minusSign","sType must be decimal, group, plusSign or minusSign");this._set("symbols-latn-"+T,s);return this;},getCustomCurrencies:function(){return this.mSettings["currency"];},setCustomCurrencies:function(m){o(typeof m==="object"||m==null,"mCurrencyDigits must be an object");Object.keys(m||{}).forEach(function(s){o(typeof s==="string");o(typeof m[s]==="object");});this._set("currency",m);return this;},addCustomCurrencies:function(m){var e=this.getCustomCurrencies();if(e){m=q.extend({},e,m);}this.setCustomCurrencies(m);return this;},setFirstDayOfWeek:function(v){o(typeof v=="number"&&v>=0&&v<=6,"iValue must be an integer value between 0 and 6");this._set("weekData-firstDay",v);return this;},_setDayPeriods:function(w,T){c(w=="narrow"||w=="abbreviated"||w=="wide","sWidth must be narrow, abbreviated or wide");this._set("dayPeriods-format-"+w,T);return this;},getLegacyDateFormat:function(){return this.sLegacyDateFormat||undefined;},setLegacyDateFormat:function(F){F=F?String(F).toUpperCase():"";o(!F||i.hasOwnProperty(F),"sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");var m=this.oConfiguration._collect();this.sLegacyDateFormat=m.legacyDateFormat=F;this.setDatePattern("short",i[F].pattern);this.setDatePattern("medium",i[F].pattern);this.oConfiguration._endCollect();return this;},getLegacyTimeFormat:function(){return this.sLegacyTimeFormat||undefined;},setLegacyTimeFormat:function(F){o(!F||j.hasOwnProperty(F),"sFormatId must be one of ['0','1','2','3','4'] or empty");var m=this.oConfiguration._collect();this.sLegacyTimeFormat=m.legacyTimeFormat=F=F||"";this.setTimePattern("short",j[F]["short"]);this.setTimePattern("medium",j[F]["medium"]);this._setDayPeriods("abbreviated",j[F].dayPeriods);this.oConfiguration._endCollect();return this;},getLegacyNumberFormat:function(){return this.sLegacyNumberFormat||undefined;},setLegacyNumberFormat:function(F){F=F?F.toUpperCase():"";o(!F||k.hasOwnProperty(F),"sFormatId must be one of [' ','X','Y'] or empty");var m=this.oConfiguration._collect();this.sLegacyNumberFormat=m.legacyNumberFormat=F;this.setNumberSymbol("group",k[F].groupingSeparator);this.setNumberSymbol("decimal",k[F].decimalSeparator);this.oConfiguration._endCollect();return this;},setLegacyDateCalendarCustomizing:function(m){o(Array.isArray(m),"aMappings must be an Array");var e=this.oConfiguration._collect();this.aLegacyDateCalendarCustomizing=e.legacyDateCalendarCustomizing=m;this.oConfiguration._endCollect();return this;},getLegacyDateCalendarCustomizing:function(){return this.aLegacyDateCalendarCustomizing;},getCustomLocaleData:function(){return this.mSettings;}});return g;});
