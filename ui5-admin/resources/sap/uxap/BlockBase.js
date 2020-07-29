/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/CustomData","./BlockBaseMetadata","sap/ui/model/Context","sap/ui/Device","sap/ui/layout/form/ResponsiveGridLayout","./library","sap/ui/core/Component","sap/ui/layout/library","sap/base/Log"],function(q,C,a,B,b,D,R,l,c,d,L){"use strict";var S=d.form.SimpleFormLayout;var e=l.BlockBaseFormAdjustment;var f=C.extend("sap.uxap.BlockBase",{metadata:{designtime:"sap/uxap/designtime/BlockBase.designtime",library:"sap.uxap",properties:{"mode":{type:"string",group:"Appearance"},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"columnLayout":{type:"sap.uxap.BlockBaseColumnLayout",group:"Behavior",defaultValue:"auto"},"formAdjustment":{type:"sap.uxap.BlockBaseFormAdjustment",group:"Behavior",defaultValue:e.BlockColumns},"showSubSectionMore":{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"mappings",aggregations:{"mappings":{type:"sap.uxap.ModelMapping",multiple:true,singularName:"mapping"},"_views":{type:"sap.ui.core.Control",multiple:true,singularName:"view",visibility:"hidden"}},associations:{"selectedView":{type:"sap.ui.core.Control",multiple:false}},views:{}},renderer:"sap.uxap.BlockBaseRenderer"},B);f.prototype.init=function(){if(!this.getMetadata().hasViews()){this.getMetadata().setView("defaultXML",{viewName:this.getMetadata().getName(),type:"XML"});}this._oMappingApplied={};this._bLazyLoading=false;this._bConnected=false;this._oUpdatedModels={};this._oParentObjectPageSubSection=null;};f.prototype.onBeforeRendering=function(){var p;this._applyMapping();if(!this.getMode()||this.getMode()===""){if(this.getMetadata().getView("defaultXML")){this.setMode("defaultXML");}else{L.error("BlockBase ::: there is no mode defined for rendering "+this.getMetadata().getName()+". You can either set a default mode on the block metadata or set the mode property before rendering the block.");}}this._applyFormAdjustment();p=this._getObjectPageLayout();this._bLazyLoading=p&&(p.getEnableLazyLoading()||p.getUseIconTabBar());};f.prototype.onAfterRendering=function(){var p=this._getObjectPageLayout();if(p){p._requestAdjustLayout();}};f.prototype.setParent=function(p,A,s){C.prototype.setParent.call(this,p,A,s);if(p instanceof l.ObjectPageSubSection){this._bLazyLoading=true;this._oParentObjectPageSubSection=p;}};f.prototype.setModel=function(m,n){this._applyMapping(n);return C.prototype.setModel.call(this,m,n);};f.prototype._applyMapping=function(){if(this._shouldLazyLoad()){L.debug("BlockBase ::: Ignoring the _applyMapping as the block is not connected");}else{this.getMappings().forEach(function(m,i){var M,o,I=m.getInternalModelName(),E=m.getExternalPath(),s=m.getExternalModelName(),p;if(E){if(I==""||E==""){throw new Error("BlockBase :: incorrect mapping, one of the modelMapping property is empty");}M=this.getModel(s);if(!M){return;}p=M.resolve(E,this.getBindingContext(s));o=this.getBindingContext(I);if(!this._isMappingApplied(I)||(this.getModel(I)!==this.getModel(s))||(o&&(o.getPath()!==p))){L.info("BlockBase :: mapping external model "+s+" to "+I);this._oMappingApplied[I]=true;C.prototype.setModel.call(this,M,I);this.setBindingContext(new b(M,p),I);}}},this);}};f.prototype._isMappingApplied=function(i){return this.getModel(i)&&this._oMappingApplied[i];};f.prototype.propagateProperties=function(n){if(this._shouldLazyLoad()&&!this._oUpdatedModels.hasOwnProperty(n)){this._oUpdatedModels[n]=true;}else{this._applyMapping(n);}return C.prototype.propagateProperties.call(this,n);};f.prototype.getSupportedModes=function(){var s=q.extend({},this.getMetadata().getViews());for(var k in s){s[k]=k;}return s;};f.prototype.setMode=function(m){m=this._validateMode(m);if(this.getMode()!==m){this.setProperty("mode",m,false);if(!this._shouldLazyLoad()){this._initView(m);}}return this;};f.prototype.setColumnLayout=function(s){if(this._oParentObjectPageSubSection){this._oParentObjectPageSubSection.invalidate();}this.setProperty("columnLayout",s);};f.prototype.clone=function(){var A=-1,s=this.getAssociation("selectedView"),v=this.getAggregation("_views")||[];if(s){v.forEach(function(V,i){if(V.getId()===s){A=i;}return A<0;});}var n=C.prototype.clone.call(this);if(A>=0){n.setAssociation("selectedView",n.getAggregation("_views")[A]);}return n;};f.prototype._validateMode=function(m){this.validateProperty("mode",m);if(!this.getMetadata().getView(m)){var s=this.getMetadata()._sClassName||this.getId();if(this.getMetadata().getView("defaultXML")){L.warning("BlockBase :: no view defined for block "+s+" for mode "+m+", loading defaultXML instead");m="defaultXML";}else{throw new Error("BlockBase :: no view defined for block "+s+" for mode "+m);}}return m;};f.prototype._getSelectedViewContent=function(){var v=null,s,V;s=this.getAssociation("selectedView");V=this.getAggregation("_views");if(V){for(var i=0;!v&&i<V.length;i++){if(V[i].getId()===s){v=V[i];}}}return v;};f.prototype.createView=function(p,m){var o,g;g=function(){return sap.ui.view(this.getId()+"-"+m,p);}.bind(this);o=c.getOwnerComponentFor(this);if(o){return o.runAsOwner(g);}else{return g();}};f.prototype._initView=function(m){var v,V=this.getAggregation("_views")||[],p=this.getMetadata().getView(m);V.forEach(function(o,i){if(o.data("layoutMode")===m){v=o;}});if(!v){v=this._initNewView(m);}this.setAssociation("selectedView",v,true);if(v.getController()&&v.getController().onParentBlockModeChange){v.getController().onParentBlockModeChange(m);}else{L.info("BlockBase ::: could not notify "+p.viewName+" of loading in mode "+m+": missing controller onParentBlockModeChange method");}return v;};f.prototype._initNewView=function(m){var v=this._getSelectedViewContent(),p=this.getMetadata().getView(m);if(!v||p.viewName!=v.getViewName()){v=this.createView(p,m);if(v){if(v.getController()){v.getController().oParentBlock=this;}v.addCustomData(new a({"key":"layoutMode","value":m}));this.addAggregation("_views",v,true);}else{throw new Error("BlockBase :: no view defined in metadata.views for mode "+m);}}return v;};f.FORM_ADUSTMENT_OFFSET=32;f._FORM_ADJUSTMENT_CONST={breakpoints:{XL:D.media._predefinedRangeSets.StdExt.points[2]-f.FORM_ADUSTMENT_OFFSET,L:D.media._predefinedRangeSets.StdExt.points[1]-f.FORM_ADUSTMENT_OFFSET,M:D.media._predefinedRangeSets.StdExt.points[0]-f.FORM_ADUSTMENT_OFFSET},labelSpan:{XL:12,L:12,M:12,S:12},emptySpan:{XL:0,L:0,M:0,S:0},columns:{XL:1,L:1,M:1}};f._PARENT_GRID_SIZE=12;f.prototype._computeFormAdjustmentFields=function(v,o,F,p){if(v&&o&&F&&p){var g=this._computeFormColumns(o,F,p),h=this._computeFormBreakpoints(o,F);return q.extend({},f._FORM_ADJUSTMENT_CONST,{columns:g},{breakpoints:h});}};f.prototype._computeFormColumns=function(o,F,p){var g=q.extend({},f._FORM_ADJUSTMENT_CONST.columns);if(F===e.BlockColumns){var i=f._PARENT_GRID_SIZE/p.XL,h=f._PARENT_GRID_SIZE/p.L,j=f._PARENT_GRID_SIZE/p.M;g.XL=o.getSpanXL()/i;g.L=o.getSpanL()/h;g.M=o.getSpanM()/j;}return g;};f.prototype._computeFormBreakpoints=function(o,F){var g=q.extend({},f._FORM_ADJUSTMENT_CONST.breakpoints);if(F===e.BlockColumns){g.XL=Math.round(g.XL*o.getSpanXL()/f._PARENT_GRID_SIZE);g.L=Math.round(g.L*o.getSpanL()/f._PARENT_GRID_SIZE);g.M=Math.round(g.M*o.getSpanM()/f._PARENT_GRID_SIZE);}return g;};f.prototype._applyFormAdjustment=function(){var o=this.getLayoutData(),F=this.getFormAdjustment(),v=this._getSelectedViewContent(),p=this._oParentObjectPageSubSection,g;if(F&&(F!==e.None)&&v&&o&&p){var P=p._oLayoutConfig;v.getContent().forEach(function(i){if(i.getMetadata().getName()==="sap.ui.layout.form.SimpleForm"){i.setLayout(S.ResponsiveGridLayout);if(!g){g=this._computeFormAdjustmentFields(v,o,F,P);}this._applyFormAdjustmentFields(g,i);i.setWidth("100%");}else if(i.getMetadata().getName()==="sap.ui.layout.form.Form"){var h=i.getLayout(),r;if(h&&h.getMetadata().getName()==="sap.ui.layout.form.ResponsiveGridLayout"){r=h;}else{r=new R();i.setLayout(r);}if(!g){g=this._computeFormAdjustmentFields(v,o,F,P);}this._applyFormAdjustmentFields(g,r);i.setWidth("100%");}},this);}};f.prototype._applyFormAdjustmentFields=function(F,o){o.setColumnsXL(F.columns.XL);o.setColumnsL(F.columns.L);o.setColumnsM(F.columns.M);o.setLabelSpanXL(F.labelSpan.XL);o.setLabelSpanL(F.labelSpan.L);o.setLabelSpanM(F.labelSpan.M);o.setLabelSpanS(F.labelSpan.S);o.setEmptySpanXL(F.emptySpan.XL);o.setEmptySpanL(F.emptySpan.L);o.setEmptySpanM(F.emptySpan.M);o.setEmptySpanS(F.emptySpan.S);o.setBreakpointXL(F.breakpoints.XL);o.setBreakpointL(F.breakpoints.L);o.setBreakpointM(F.breakpoints.M);};f.prototype._getObjectPageLayout=function(){return l.Utilities.getClosestOPL(this);};f.prototype.setVisible=function(v,s){var p=this._getObjectPageLayout();this.setProperty("visible",v,s);p&&p._requestAdjustLayoutAndUxRules();return this;};f.prototype.setShowSubSectionMore=function(v,i){if(v!=this.getShowSubSectionMore()){this.setProperty("showSubSectionMore",v,true);if(this._oParentObjectPageSubSection){this._oParentObjectPageSubSection.refreshSeeMoreVisibility();}}return this;};f.prototype.connectToModels=function(){if(!this._bConnected){L.debug("BlockBase :: Connecting block to the UI5 model tree");this._bConnected=true;if(this._bLazyLoading){var m=this.getMode();m&&this._initView(m);}this.invalidate();}};f.prototype._allowPropagationToLoadedViews=function(A){if(!this._bConnected){return;}this.mSkipPropagation._views=!A;};f.prototype.updateBindingContext=function(s,g,m,u){if(!this._shouldLazyLoad()){return C.prototype.updateBindingContext.call(this,s,g,m,u);}else{L.debug("BlockBase ::: Ignoring the updateBindingContext as the block is not visible for now in the ObjectPageLayout");}};f.prototype.updateBindings=function(u,m){if(!this._shouldLazyLoad()){return C.prototype.updateBindings.call(this,u,m);}else{L.debug("BlockBase ::: Ignoring the updateBindingContext as the block is not visible for now in the ObjectPageLayout");}};f.prototype._shouldLazyLoad=function(){return!!this._oParentObjectPageSubSection&&this._bLazyLoading&&!this._bConnected;};return f;});
