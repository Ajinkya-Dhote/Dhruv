/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/uxap/designtime/BlockBase.designtime',[],function(){"use strict";return{aggregations:{"_views":{ignore:false}}};},false);
/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/uxap/designtime/ObjectPageHeader.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/uxap/designtime/ObjectPageHeader.icon.svg"}},aggregations:{actions:{domRef:":sap-domref .sapUxAPObjectPageHeaderIdentifierActions",actions:{move:{changeType:"moveControls"}}}}};},false);
sap.ui.predefine('sap/uxap/designtime/ObjectPageHeaderActionButton.designtime',[],function(){"use strict";return{actions:{remove:{changeType:"hideControl"},rename:function(b){if(b.getIcon()){return null;}return{changeType:"rename",domRef:function(c){return c.$().find(".sapMBtnContent")[0];}};},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/uxap/designtime/ObjectPageLayout.designtime',["sap/uxap/library"],function(l){"use strict";return{name:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("LAYOUT_CONTROL_NAME");},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("LAYOUT_CONTROL__PLURAL");}},aggregations:{sections:{domRef:function(e){return e.$("sectionsContainer").get(0);},childNames:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME");},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME_PLURAL");}},actions:{move:"moveControls"},beforeMove:function(O){if(O){O._suppressScroll();}},afterMove:function(O){if(O){O.attachEventOnce("onAfterRenderingDOMReady",function(){O._resumeScroll(false);});}}},headerContent:{domRef:function(e){return e._getHeaderContent()?e._getHeaderContent().getDomRef():null;},actions:{move:function(e){if(!e||e.getMetadata().getName()!=='sap.uxap.ObjectPageSection'){return"moveControls";}}}}},scrollContainers:[{domRef:"> .sapUxAPObjectPageWrapper",aggregations:function(e){if((!e._hasDynamicTitle()&&e.getAlwaysShowContentHeader())||(e._hasDynamicTitle()&&e.getPreserveHeaderStateOnScroll())){return["sections"];}else{return["sections","headerContent"];}}},{domRef:function(e){return e.$("vertSB-sb").get(0);}}],templates:{create:"sap/uxap/designtime/ObjectPageLayout.create.fragment.xml"}};},false);
sap.ui.predefine('sap/uxap/designtime/ObjectPageSection.designtime',["sap/uxap/library"],function(l){"use strict";return{name:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME");},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME_PLURAL");}},palette:{group:"CONTAINER",icons:{svg:"sap/uxap/designtime/ObjectPageSection.icon.svg"}},actions:{remove:{changeType:"stashControl"},reveal:{changeType:"unstashControl"},rename:function(){return{changeType:"rename",domRef:".sapUxAPObjectPageSectionTitle",isEnabled:function(e){return e.$("title").get(0)!=undefined;}};}},aggregations:{subSections:{domRef:":sap-domref .sapUxAPObjectPageSectionContainer",actions:{move:{changeType:"moveControls"}}}}};},false);
sap.ui.predefine('sap/uxap/designtime/ObjectPageSubSection.designtime',[],function(){"use strict";return{palette:{group:"CONTAINER",icons:{svg:"sap/uxap/designtime/ObjectPageSubSection.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"},rename:function(){return{changeType:"rename",domRef:".sapUxAPObjectPageSubSectionHeaderTitle",isEnabled:function(e){return e.$("headerTitle").get(0)!=undefined;}};}},aggregations:{actions:{domRef:":sap-domref .sapUxAPObjectPageSubSectionHeaderActions",actions:{move:{changeType:"moveControls"}}}}};},false);
sap.ui.predefine('sap/uxap/designtime/library.designtime',[],function(){"use strict";return{};});
//# sourceMappingURL=library-preload.designtime.js.map