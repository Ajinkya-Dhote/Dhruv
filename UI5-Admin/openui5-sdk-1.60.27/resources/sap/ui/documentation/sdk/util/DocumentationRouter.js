/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/routing/Router','sap/ui/core/routing/History','sap/ui/thirdparty/hasher'],function(R,H,a){"use strict";var n={sampleLegacyRoute:"sample",codeLegacyRoute:"code",codeFileLegacyRoute:"code_file"};a.raw=true;return R.extend("sap.ui.documentation.sdk.util.DocumentationRouter",{constructor:function(){R.prototype.constructor.apply(this,arguments);this.getRoute("entitySamplesLegacyRoute").attachPatternMatched(this._onEntityOldRouteMatched,this);this.getRoute("entityAboutLegacyRoute").attachPatternMatched(this._onEntityOldRouteMatched,this);this.getRoute("entityPropertiesLegacyRoute").attachPatternMatched({entityType:"controlProperties"},this._forwardToAPIRef,this);this.getRoute("entityAggregationsLegacyRoute").attachPatternMatched({entityType:"aggregations"},this._forwardToAPIRef,this);this.getRoute("entityAssociationsLegacyRoute").attachPatternMatched({entityType:"associations"},this._forwardToAPIRef,this);this.getRoute("entityEventsLegacyRoute").attachPatternMatched({entityType:"events"},this._forwardToAPIRef,this);this.getRoute("entityMethodsLegacyRoute").attachPatternMatched({entityType:"methods"},this._forwardToAPIRef,this);this.getRoute("topicIdLegacyRoute").attachPatternMatched(this._onOldTopicRouteMatched,this);this.getRoute("apiIdLegacyRoute").attachPatternMatched(this._onOldApiRouteMatched,this);this.getRoute("sampleLegacyRoute").attachPatternMatched(this._onNewSampleRouteMatched,this);this.getRoute("codeLegacyRoute").attachPatternMatched(this._onNewSampleRouteMatched,this);this.getRoute("codeFileLegacyRoute").attachPatternMatched(this._onNewSampleRouteMatched,this);},_onNewSampleRouteMatched:function(e){var p=e.getParameter("name"),A=e.getParameter("arguments"),N={id:A.sampleId};if(p==="codeFileLegacyRoute"){N.fileName=A.fileName;}this.navTo(n[p],N);},_onEntityOldRouteMatched:function(e){this.navTo("entity",{id:e.getParameter("arguments").id});},_forwardToAPIRef:function(e,d){d||(d={});d['id']=e.getParameter("arguments").id;this.navTo("apiId",d);},_onOldTopicRouteMatched:function(e){this.navTo("topicId",{id:e.getParameter("arguments").id.replace(/.html$/,"")});},_onOldApiRouteMatched:function(e){var E,s,S,i=e.getParameter("arguments").id;if(i){S=i.split("#");if(S.length===2){i=S[0];E=S[1];S=E.split(":");if(S.length===2){E=S[0];s=S[1];}}i=i.replace(/.html$/,"");if(E==='event'){E="events";}}this.navTo("apiId",{id:i,entityType:E,entityId:s});},myNavBack:function(r,d){var h=H.getInstance();var p=h.getPreviousHash();if(p!==undefined){window.history.go(-1);}else{var b=true;this.navTo(r,d,b);}},myNavToWithoutHash:function(v,b,m,d){var c=this._getOwnerComponent(),r=c.byId(c.getManifestEntry("/sap.ui5/rootView").id),A=r.byId("splitApp"),V=this.getView(v,b);A.addPage(V,m);A.toDetail(V.getId(),"show",d);},_getOwnerComponent:function(){return this._oOwner;},_destroySampleComponent:function(){var c=this._getOwnerComponent()._oCurrentOpenedSample;if(c){c.destroy();c=null;}},navTo:function(){this._destroySampleComponent();R.prototype.navTo.apply(this,arguments);}});});
