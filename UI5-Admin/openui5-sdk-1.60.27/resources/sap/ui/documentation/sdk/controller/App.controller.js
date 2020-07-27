/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/documentation/sdk/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/core/ResizeHandler","sap/ui/Device","sap/ui/core/Fragment","sap/ui/documentation/library","sap/ui/core/IconPool","sap/m/MessageBox","sap/m/library","sap/base/Log","sap/base/util/Version","sap/ui/core/syncStyleClass"],function(q,B,J,R,D,F,c,I,M,m,L,V,s){"use strict";var S=m.SplitAppMode;var U=m.URLHelper,n="/neo-app.json",A="About",d="Feedback",C="Change version";return B.extend("sap.ui.documentation.sdk.controller.App",{onInit:function(){B.prototype.onInit.call(this);var v=new J({busy:false,delay:0,bPhoneSize:false,bShowVersionSwitchInHeader:false,bShowVersionSwitchInMenu:false,bLandscape:D.orientation.landscape,bHasMaster:false,bSearchMode:false,bHideTopicSection:!!window['sap-ui-documentation-hideTopicSection'],bHideApiSection:!!window['sap-ui-documentation-hideApiSection'],sAboutInfoSAPUI5:"Looking for the Demo Kit for a specific SAPUI5 version? "+"Check at <a href = 'https://sapui5.hana.ondemand.com/versionoverview.html'>https://sapui5.hana.ondemand.com/versionoverview.html</a> "+"which versions are available. "+"You can view the version-specific Demo Kit by adding the version number to the URL, e.g. "+"<a href='https://sapui5.hana.ondemand.com/1.52.4/'>https://sapui5.hana.ondemand.com/1.52.4/</a>",sAboutInfoOpenUI5:"Looking for the Demo Kit for a specific OpenUI5 version? "+"Check at <a href = 'https://openui5.hana.ondemand.com/versionoverview.html'>https://openui5.hana.ondemand.com/versionoverview.html</a> "+"which versions are available. "+"You can view the version-specific Demo Kit by adding the version number to the URL, e.g. "+"<a href='https://openui5.hana.ondemand.com/1.52.4/'>https://openui5.hana.ondemand.com/1.52.4/</a>"});this.MENU_LINKS_MAP={"Legal":"https://www.sap.com/corporate/en/legal/impressum.html","Privacy":"https://www.sap.com/corporate/en/legal/privacy.html","Terms of Use":"https://www.sap.com/corporate/en/legal/terms-of-use.html","Copyright":"https://www.sap.com/corporate/en/legal/copyright.html","Trademark":"https://www.sap.com/corporate/en/legal/trademark.html","Disclaimer":"https://help.sap.com/viewer/disclaimer","License":"LICENSE.txt"};this.getOwnerComponent().loadVersionInfo().then(function(){if(this.getModel("versionData").getProperty("/isOpenUI5")){this.MENU_LINKS_MAP["Terms of Use"]="TermsOfUse.txt";}}.bind(this));this.FEEDBACK_SERVICE_URL="https://feedback-sapuisofiaprod.hana.ondemand.com:443/api/v2/apps/5bb7d7ff-bab9-477a-a4c7-309fa84dc652/posts";this._oView=this.getView();this.setModel(v,"appView");this.oHeader=this._oView.byId("headerToolbar");this.oRouter=this.getRouter();this._selectHeader=this._oView.byId("selectHeader");this._tabHeader=this._oView.byId("tabHeader");R.register(this.oHeader,this.onHeaderResize.bind(this));this.oRouter.attachRouteMatched(this.onRouteChange.bind(this));this.oRouter.attachBypassed(this.onRouteNotFound.bind(this));this._registerFeedbackRatingIcons();this._requestVersionInfo();this.byId("splitApp").attachEvent("afterMasterClose",function(e){v.setProperty("/bIsShownMaster",false);},this);},onBeforeRendering:function(){D.orientation.detachHandler(this._onOrientationChange,this);},onAfterRendering:function(){q(document.body).addClass(this.getOwnerComponent().getContentDensityClass());D.orientation.attachHandler(this._onOrientationChange,this);},onExit:function(){D.orientation.detachHandler(this._onOrientationChange,this);},onRouteChange:function(e){if(!this.oRouter.getRoute(e.getParameter("name"))._oConfig.target){return;}var r=e.getParameter("name"),t=this.oRouter.getRoute(r)._oConfig.target[0]+"Tab",T=this._oView.byId(t),k=T?T.getKey():"home",v=this.getModel("appView"),p=v.getProperty("/bPhoneSize"),P=D.system.phone,h=this.getOwnerComponent().getConfigUtil().hasMasterView(r),o,a;this._setHeaderSelectedKey(k);v.setProperty("/bHasMaster",h);this._toggleTabHeaderClass();if(p){this._selectHeader.setVisible(true);}if(P&&h){o=this.getOwnerComponent().getConfigUtil().getMasterView(r);a=o&&o.getId();v.setProperty("/sMasterViewId",a);}this.byId("splitApp").hideMaster();v.setProperty("/bIsShownMaster",false);},onRouteNotFound:function(){this.getRouter().myNavToWithoutHash("sap.ui.documentation.sdk.view.NotFound","XML",false);return;},toggleMaster:function(e){var p=e.getParameter("pressed"),P=D.system.phone,o=this.byId("splitApp"),i=o.getMode()===S.ShowHideMode,a=o.getMode()===S.HideMode,b=this.getModel("appView").getProperty("/sMasterViewId"),t;if(!P&&(i||a)){t=(p)?o.showMaster:o.hideMaster;t.call(o);return;}if(P){if(p){o.to(b);}else{o.backDetail();}}},navigateToSection:function(e){var k=e.getParameter("key"),i;if(!k){i=e.getParameter("selectedItem");i&&(k=i.getKey());}e.preventDefault();if(k&&k!=="home"){this.getRouter().navTo(k,{},true);}else{this.getRouter().navTo("",{},true);this._setHeaderSelectedKey("home");}},handleMenuItemClick:function(e){var t=e.getParameter("item").getText(),T=this.MENU_LINKS_MAP[t];if(t===A){this.aboutDialogOpen();}else if(t===d){this.feedbackDialogOpen();}else if(t===C){this.onChangeVersionButtonPress();}else if(T){U.redirect(T,true);}},aboutDialogOpen:function(){if(!this._oAboutDialog){this._oAboutDialog=new sap.ui.xmlfragment("aboutDialogFragment","sap.ui.documentation.sdk.view.AboutDialog",this);this._oView.addDependent(this._oAboutDialog);}else{this._oAboutDialog.getContent()[0].backToTop();}this._oAboutDialog.open();},aboutDialogClose:function(e){this._oAboutDialog.close();},onAboutVersionDetails:function(e){var v=this.getModel("appView"),o=v.getData(),t=this;c._loadAllLibInfo("","_getLibraryInfo","",function(b,f){var g={};var h=c._getLibraryInfoSingleton();for(var i=0,l=b.length;i<l;i++){b[i]=f[b[i]];b[i].libDefaultComponent=h._getDefaultComponent(b[i]);}g.libs=b;o.oVersionInfo=g;v.setData(o);t.setModel(v,"appView");});var N=F.byId("aboutDialogFragment","aboutNavCon"),a=F.byId("aboutDialogFragment","aboutDetail");N.to(a);},onAboutThirdParty:function(e){var v=this.getModel("appView"),o=v.getData(),t=this;c._loadAllLibInfo("","_getThirdPartyInfo",function(l,g){if(!l){return;}var h={};h.thirdparty=[];for(var j=0;j<l.length;j++){var k=g[l[j]];for(var i=0;i<k.libs.length;i++){var O=k.libs[i];O._lib=l[j];h.thirdparty.push(O);}}h.thirdparty.sort(function(a,b){var p=(a.displayName||"").toUpperCase();var r=(b.displayName||"").toUpperCase();if(p>r){return 1;}else if(p<r){return-1;}else{return 0;}});o.oThirdPartyInfo=h;v.setData(o);t.setModel(v,"appView");});var N=F.byId("aboutDialogFragment","aboutNavCon"),f=F.byId("aboutDialogFragment","aboutThirdParty");N.to(f);},onReleaseDialogOpen:function(e){var l=c._getLibraryInfoSingleton(),v=e.getSource().data("version"),a=e.getSource().data("library"),N=new J(),o=new J(),t=this;if(!this._oReleaseDialog){this._oReleaseDialog=new sap.ui.xmlfragment("releaseDialogFragment","sap.ui.documentation.sdk.view.ReleaseDialog",this);this._oView.addDependent(this._oReleaseDialog);}if(!this._oNotesView){this._oNotesView=sap.ui.view({id:"notesView",viewName:"sap.ui.documentation.sdk.view.ReleaseNotesView",type:"Template"});this._oNotesView.setModel(N);}l._getReleaseNotes(a,v,function(r,v){var b={};if(r&&r[v]&&r[v].notes&&r[v].notes.length>0){t._oNotesView.getModel().setData(r);t._oNotesView.bindObject("/"+v);}else{b.noDataMessage="No changes for this library!";}b.library=a;o.setData(b);});this._oReleaseDialog.setModel(o);this._oReleaseDialog.addContent(this._oNotesView);this._oReleaseDialog.open();},onReleaseDialogClose:function(e){this._oReleaseDialog.close();},onAboutNavBack:function(e){var N=F.byId("aboutDialogFragment","aboutNavCon");N.back();},onChangeVersionButtonPress:function(){this.getVersionSwitchDialog().open();},onCloseVersionDialog:function(){this.getVersionSwitchDialog().close();},onChangeVersionDialogSearch:function(e){var a=e.getParameter("newValue"),f=new sap.ui.model.Filter("version",sap.ui.model.FilterOperator.Contains,a),b=sap.ui.getCore().byId("versionList").getBinding("items");b.filter([f]);},onVersionItemPress:function(e){var o=e.getParameter("listItem"),a=o.getCustomData()[0];if(a&&a.getKey()==="path"){window.location.href=a.getValue();}},getVersionSwitchDialog:function(){if(!this._oChangeVersionDialog){this._createVersionDialog();}return this._oChangeVersionDialog;},versionSwitchCustomComparator:function(g,G){return V(g).compareTo(V(G));},_updateVersionSwitchVisibility:function(){var v=this.getModel("appView"),p=v.getProperty("/bPhoneSize");v.setProperty("/bShowVersionSwitchInHeader",!p&&!!this._aNeoAppVersions);v.setProperty("/bShowVersionSwitchInMenu",p&&!!this._aNeoAppVersions);},_createVersionDialog:function(){this._oChangeVersionDialog=new sap.ui.xmlfragment("sap.ui.documentation.sdk.view.ChangeVersionDialog",this);this._oChangeVersionDialog.setModel(this._buildVersionDialogModel());this._oView.addDependent(this._oChangeVersionDialog);},_buildVersionDialogModel:function(){var o=new J();o.setSizeLimit(1000);o.setData(this._aNeoAppVersions);return o;},feedbackDialogOpen:function(){var t=this;if(!this._oFeedbackDialog){this._oFeedbackDialog=new sap.ui.xmlfragment("feedbackDialogFragment","sap.ui.documentation.sdk.view.FeedbackDialog",this);this._oView.addDependent(this._oFeedbackDialog);this._oFeedbackDialog.textInput=F.byId("feedbackDialogFragment","feedbackInput");this._oFeedbackDialog.contextCheckBox=F.byId("feedbackDialogFragment","pageContext");this._oFeedbackDialog.contextData=F.byId("feedbackDialogFragment","contextData");this._oFeedbackDialog.ratingStatus=F.byId("feedbackDialogFragment","ratingStatus");this._oFeedbackDialog.ratingStatus.value=0;this._oFeedbackDialog.sendButton=F.byId("feedbackDialogFragment","sendButton");this._oFeedbackDialog.ratingBar=[{button:F.byId("feedbackDialogFragment","excellent"),status:"Excellent"},{button:F.byId("feedbackDialogFragment","good"),status:"Good"},{button:F.byId("feedbackDialogFragment","average"),status:"Average"},{button:F.byId("feedbackDialogFragment","poor"),status:"Poor"},{button:F.byId("feedbackDialogFragment","veryPoor"),status:"Very Poor"}];this._oFeedbackDialog.reset=function(){this.sendButton.setEnabled(false);this.textInput.setValue("");this.contextCheckBox.setSelected(true);this.ratingStatus.setText("");this.ratingStatus.setState("None");this.ratingStatus.value=0;this.contextData.setVisible(false);this.ratingBar.forEach(function(r){if(r.button.getPressed()){r.button.setPressed(false);}});};this._oFeedbackDialog.updateContextData=function(){var v=t._getUI5Version(),u=t._getUI5Distribution();if(this.contextCheckBox.getSelected()){this.contextData.setValue("Location: "+t._getCurrentPageRelativeURL()+"\n"+u+" Version: "+v);}else{this.contextData.setValue(u+" Version: "+v);}};this._oFeedbackDialog.updateContextData();}this._oFeedbackDialog.updateContextData();if(!this._oFeedbackDialog.isOpen()){s("sapUiSizeCompact",this.getView(),this._oFeedbackDialog);this._oFeedbackDialog.open();}},onFeedbackDialogSend:function(){var a={};if(this._oFeedbackDialog.contextCheckBox.getSelected()){a={"texts":{"t1":this._oFeedbackDialog.textInput.getValue()},"ratings":{"r1":{"value":this._oFeedbackDialog.ratingStatus.value}},"context":{"page":this._getCurrentPageRelativeURL(),"attr1":this._getUI5Distribution()+":"+sap.ui.version}};}else{a={"texts":{"t1":this._oFeedbackDialog.textInput.getValue()},"ratings":{"r1":{"value":this._oFeedbackDialog.ratingStatus.value}},"context":{"attr1":this._getUI5Distribution()+":"+sap.ui.version}};}this._oFeedbackDialog.setBusyIndicatorDelay(0);this._oFeedbackDialog.setBusy(true);q.ajax({url:this.FEEDBACK_SERVICE_URL,type:"POST",contentType:"application/json",data:JSON.stringify(a)}).done(function(){M.success("Your feedback has been sent.",{title:"Thank you!"});this._oFeedbackDialog.reset();this._oFeedbackDialog.close();this._oFeedbackDialog.setBusy(false);}.bind(this)).fail(function(r,b,e){var E=e;M.error("An error occurred sending your feedback:\n"+E,{title:"Sorry!"});this._oFeedbackDialog.setBusy(false);}.bind(this));},onFeedbackDialogCancel:function(){this._oFeedbackDialog.reset();this._oFeedbackDialog.close();},onShowHideContextData:function(){this._oFeedbackDialog.contextData.setVisible(!this._oFeedbackDialog.contextData.getVisible());},onContextSelect:function(){this._oFeedbackDialog.updateContextData();},onPressRatingButton:function(e){var t=this;var p=e.getSource();t._oFeedbackDialog.ratingBar.forEach(function(r){if(p!==r.button){r.button.setPressed(false);}else{if(!r.button.getPressed()){a("None","",0);}else{switch(r.status){case"Excellent":a("Success",r.status,5);break;case"Good":a("Success",r.status,4);break;case"Average":a("None",r.status,3);break;case"Poor":a("Warning",r.status,2);break;case"Very Poor":a("Error",r.status,1);}}}});function a(b,T,v){t._oFeedbackDialog.ratingStatus.setState(b);t._oFeedbackDialog.ratingStatus.setText(T);t._oFeedbackDialog.ratingStatus.value=v;if(v){t._oFeedbackDialog.sendButton.setEnabled(true);}else{t._oFeedbackDialog.sendButton.setEnabled(false);}}},onSearch:function(e){var Q=e.getParameter("query");if(!Q){return;}this.getRouter().navTo("search",{searchParam:Q},false);},onHeaderResize:function(e){var w=e.size.width,p=D.system.phone||w<D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this.getModel("appView").setProperty("/bPhoneSize",p);this._tabHeader.setVisible(!p);this._selectHeader.setVisible(p);},_onOrientationChange:function(){this.getModel("appView").setProperty("/bLandscape",D.orientation.landscape);this._toggleTabHeaderClass();},onToggleSearchMode:function(e){var b=e.getParameter("isOpen"),v=this.getModel("appView"),p=v.getProperty("/bPhoneSize");v.setProperty("/bSearchMode",b);this._toggleTabHeaderClass();if(b){setTimeout(function(){this._oView.byId("searchControl").getAggregation("_searchField").getFocusDomRef().focus();}.bind(this),0);if(p){this._selectHeader.setVisible(false);}}else if(p){this._selectHeader.setVisible(true);}},_registerFeedbackRatingIcons:function(){I.addIcon("icon-face-very-bad","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E086",suppressMirroring:true});I.addIcon("icon-face-bad","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E087",suppressMirroring:true});I.addIcon("icon-face-neutral","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E089",suppressMirroring:true});I.addIcon("icon-face-happy","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E08B",suppressMirroring:true});I.addIcon("icon-face-very-happy","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E08C",suppressMirroring:true});},_requestVersionInfo:function(){Promise.resolve(q.ajax(n)).then(function(N){var v=this.getModel("versionData"),i=v.getProperty("/isInternal"),b=v.getProperty("/isSnapshotVersion");if(!(N&&N.routes)){L.warning("No versions were found");return;}N.routes.pop();this._aNeoAppVersions=N.routes;if(!i&&!b){this._aNeoAppVersions=this._aNeoAppVersions.filter(function(r){return r.target.version.indexOf("-beta")===-1;});}this._aNeoAppVersions=this._aNeoAppVersions.map(function(r){var o=V(r.target.version),a={};a.patchVersion=o.getPatch();a.groupTitle=o.getMajor()+"."+o.getMinor();a.version=o.toString();a.path=r.path;return a;});this._updateVersionSwitchVisibility();}.bind(this),function(){L.warning("No neo-app.json was detected");});},_getUI5Version:function(){return this.getModel("versionData").getProperty("/version");},_getUI5VersionGav:function(){return this.getModel("versionData").getProperty("/versionGav");},_getUI5Distribution:function(){var v=this._getUI5VersionGav();var u="SAPUI5";if(v&&/openui5/i.test(v)){u="OpenUI5";}return u;},_getCurrentPageRelativeURL:function(){var p=window.location;return p.pathname+p.hash+p.search;},_isToggleButtonVisible:function(){var v=this.getModel("appView"),h=v.getProperty("/bHasMaster"),p=v.getProperty("/bPhoneSize"),l=v.getProperty("/bLandscape"),b=v.getProperty("/bSearchMode");return h&&(p||!l)&&!b;},_toggleTabHeaderClass:function(){var p=this.getModel("appView").getProperty("/bPhoneSize");if(this._isToggleButtonVisible()){this._tabHeader.setVisible(!p);this._selectHeader.setVisible(p);}else if(p){this._selectHeader.setVisible(false);}},_setHeaderSelectedKey:function(k){this._selectHeader.setSelectedKey(k);this._tabHeader.setSelectedKey(k);}});});
