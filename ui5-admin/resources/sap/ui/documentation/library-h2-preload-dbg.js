/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/documentation/library',["sap/ui/thirdparty/jquery",'sap/ui/core/util/LibraryInfo',"sap/base/Log",'sap/ui/core/library','sap/m/library'],function(q,L,a){'use strict';sap.ui.getCore().initLibrary({name:'sap.ui.documentation',version:'1.60.27',dependencies:['sap.ui.core','sap.m'],types:[],interfaces:[],controls:["sap.ui.documentation.sdk.controls.Search","sap.ui.documentation.sdk.controls.ObjectPageSubSection","sap.ui.documentation.sdk.controls.LightTable","sap.ui.documentation.sdk.controls.Row"],elements:[],noLibraryCSS:true});var t=sap.ui.documentation;var _;
t._getLicense=function(){var u="./LICENSE.txt";return q.ajax({url:u,dataType:"text"});};
t._getAppInfo=function(c){var u=sap.ui.resource("","sap-ui-version.json");q.ajax({url:u,dataType:"json",error:function(x,s,e){a.error("failed to load library list from '"+u+"': "+s+", "+e);c(null);},success:function(A,s,x){if(!A){a.error("failed to load library list from '"+u+"': "+s+", Data: "+A);c(null);return;}c(A);}});};
t._getLibraryInfoSingleton=function(){if(!_){_=new L();}return _;};
t._loadAllLibInfo=function(A,I,r,c){if(typeof r==="function"){c=r;r=undefined;}var l=t._getLibraryInfoSingleton();var f=I=="_getLibraryInfoAndReleaseNotes";if(f){I="_getLibraryInfo";}t._getAppInfo(function(o){if(!(o&&o.libraries)){c(null,null);return;}var b=0,d=o.libraries,e=d.length,g={},h={},j=[],k,m;for(var i=0;i<e;i++){k=d[i].name;m=d[i].version;j.push(k);h[k]=m;l[I](k,function(E){var D=function(){b++;if(b==e){c(j,g,o);}};g[E.library]=E;if(!g[E.library].version){g[E.library].version=h[E.library];}if(f){if(!r){r=h[E.library];}l._getReleaseNotes(E.library,r,function(R){g[E.library].relnotes=R;D();});}else{D();}});}});};
return t;});
sap.ui.require.preload({
	"sap/ui/documentation/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.documentation","type":"library","embeds":["sdk"],"applicationVersion":{"version":"1.60.27"},"title":"SAPUI5 library for the Demokit 2.0.","description":"SAPUI5 library for the Demokit 2.0.","resources":"resources.json","offline":true,"openSourceComponents":[{"name":"esprima","packagedWithMySelf":true,"version":"0.0.0"},{"name":"google-code-prettify","packagedWithMySelf":true,"version":"0.0.0"}]},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.60","libs":{"sap.ui.core":{"minVersion":"1.60.27"},"sap.ui.layout":{"minVersion":"1.60.27"},"sap.m":{"minVersion":"1.60.27"}}},"library":{"i18n":false,"css":false,"content":{"controls":["sap.ui.documentation.sdk.controls.Search","sap.ui.documentation.sdk.controls.ObjectPageSubSection","sap.ui.documentation.sdk.controls.LightTable","sap.ui.documentation.sdk.controls.Row"],"elements":[],"types":[],"interfaces":[]}}}}'
},"sap/ui/documentation/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/documentation/library.js":["sap/base/Log.js","sap/m/library.js","sap/ui/core/library.js","sap/ui/core/util/LibraryInfo.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/Component.js":["sap/base/util/Version.js","sap/m/ColumnListItem.js","sap/ui/Device.js","sap/ui/VersionInfo.js","sap/ui/core/UIComponent.js","sap/ui/documentation/sdk/controller/ErrorHandler.js","sap/ui/documentation/sdk/controller/util/APIInfo.js","sap/ui/documentation/sdk/controller/util/ConfigUtil.js","sap/ui/documentation/sdk/model/models.js","sap/ui/documentation/sdk/util/DocumentationRouter.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/blocks/IndexEntry.js":["sap/ui/documentation/sdk/model/formatter.js","sap/uxap/BlockBase.js"],
"sap/ui/documentation/sdk/blocks/IndexEntry.view.xml":["sap/m/CustomListItem.js","sap/m/List.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/blocks/IndexEntry.controller.js","sap/ui/documentation/sdk/controls/JSDocText.js"],
"sap/ui/documentation/sdk/controller/ApiDetail.controller.js":["sap/base/Log.js","sap/ui/core/library.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/APIInfo.js","sap/ui/documentation/sdk/controller/util/ControlsInfo.js","sap/ui/documentation/sdk/model/formatter.js","sap/ui/documentation/sdk/util/ToggleFullScreenHandler.js","sap/ui/model/json/JSONModel.js"],
"sap/ui/documentation/sdk/controller/ApiDetailIndexDeprecatedExperimental.controller.js":["sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/APIInfo.js","sap/ui/documentation/sdk/controller/util/JSDocUtil.js","sap/ui/documentation/sdk/model/formatter.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/ApiDetailInitial.controller.js":["sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/ApiMaster.controller.js":["sap/base/Log.js","sap/m/library.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/MasterTreeBaseController.js","sap/ui/documentation/sdk/model/formatter.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],
"sap/ui/documentation/sdk/controller/App.controller.js":["sap/base/Log.js","sap/base/util/Version.js","sap/m/MessageBox.js","sap/m/library.js","sap/ui/Device.js","sap/ui/core/Fragment.js","sap/ui/core/IconPool.js","sap/ui/core/ResizeHandler.js","sap/ui/core/syncStyleClass.js","sap/ui/documentation/library.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/BaseController.js":["sap/m/library.js","sap/ui/Device.js","sap/ui/core/mvc/Controller.js","sap/ui/core/routing/History.js","sap/ui/documentation/library.js","sap/ui/documentation/sdk/controller/util/APIInfo.js"],
"sap/ui/documentation/sdk/controller/Code.controller.js":["jquery.sap.global.js","sap/ui/core/Component.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/ControlsInfo.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/Controls.controller.js":["sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/ControlsMaster.controller.js":["jquery.sap.global.js","sap/base/util/UriParameters.js","sap/base/util/Version.js","sap/m/GroupHeaderListItem.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/ControlsInfo.js","sap/ui/model/Filter.js","sap/ui/model/Sorter.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js","sap/ui/util/Storage.js"],
"sap/ui/documentation/sdk/controller/DemoApps.controller.js":["sap/base/Log.js","sap/m/MessageBox.js","sap/m/MessageToast.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/model/formatter.js","sap/ui/documentation/sdk/model/libraryData.js","sap/ui/documentation/sdk/model/sourceFileDownloader.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/Downloads.controller.js":["sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/Entity.controller.js":["sap/m/HBox.js","sap/m/Label.js","sap/m/Link.js","sap/m/ObjectAttribute.js","sap/m/Text.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/APIInfo.js","sap/ui/documentation/sdk/controller/util/ControlsInfo.js","sap/ui/documentation/sdk/controller/util/EntityInfo.js","sap/ui/documentation/sdk/controller/util/JSDocUtil.js","sap/ui/documentation/sdk/util/ToggleFullScreenHandler.js","sap/ui/model/json/JSONModel.js"],
"sap/ui/documentation/sdk/controller/ErrorHandler.js":["sap/m/MessageBox.js","sap/ui/base/Object.js"],
"sap/ui/documentation/sdk/controller/Group.controller.js":["sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/License.controller.js":["sap/ui/documentation/library.js","sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/MasterTreeBaseController.js":["sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/TreeUtil.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/ReleaseNotes.controller.js":["sap/base/Log.js","sap/base/util/Version.js","sap/ui/documentation/library.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/Sample.controller.js":["sap/base/Log.js","sap/m/Text.js","sap/m/library.js","sap/ui/Device.js","sap/ui/core/Component.js","sap/ui/core/ComponentContainer.js","sap/ui/core/HTML.js","sap/ui/core/routing/History.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/ControlsInfo.js","sap/ui/documentation/sdk/util/ToggleFullScreenHandler.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/SearchPage.controller.js":["sap/base/Log.js","sap/m/GroupHeaderListItem.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/SubApiDetail.controller.js":["sap/m/HBox.js","sap/m/Label.js","sap/m/Link.js","sap/m/ObjectAttribute.js","sap/m/Popover.js","sap/m/Text.js","sap/m/library.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/APIInfo.js","sap/ui/documentation/sdk/controller/util/ControlsInfo.js","sap/ui/documentation/sdk/model/formatter.js","sap/ui/documentation/sdk/util/ToggleFullScreenHandler.js","sap/ui/model/json/JSONModel.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/TermsOfUse.controller.js":["sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/Tools.controller.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js"],
"sap/ui/documentation/sdk/controller/TopicDetail.controller.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/documentation/sdk/controller/util/XML2JSONUtils.js","sap/ui/documentation/sdk/util/ToggleFullScreenHandler.js","sap/ui/model/json/JSONModel.js"],
"sap/ui/documentation/sdk/controller/TopicDetailInitial.controller.js":["sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/TopicMaster.controller.js":["sap/base/Log.js","sap/m/library.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/MasterTreeBaseController.js","sap/ui/model/json/JSONModel.js"],
"sap/ui/documentation/sdk/controller/Welcome.controller.js":["sap/base/Log.js","sap/m/library.js","sap/ui/Device.js","sap/ui/documentation/sdk/controller/BaseController.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js"],
"sap/ui/documentation/sdk/controller/util/APIInfo.js":["sap/base/Log.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/util/ConfigUtil.js":["sap/base/strings/capitalize.js","sap/ui/base/Object.js"],
"sap/ui/documentation/sdk/controller/util/ControlsInfo.js":["sap/base/Log.js","sap/ui/documentation/library.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/util/EntityInfo.js":["sap/base/Log.js","sap/base/util/ObjectPath.js","sap/ui/documentation/sdk/controller/util/APIInfo.js","sap/ui/documentation/sdk/thirdparty/jsanalyzer/ModuleAnalyzer.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controller/util/JSDocUtil.js":["sap/base/strings/escapeRegExp.js"],
"sap/ui/documentation/sdk/controller/util/XML2JSONUtils.js":["sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/controls/BorrowedList.js":["sap/ui/core/Control.js"],
"sap/ui/documentation/sdk/controls/DemokitTreeItem.js":["sap/m/TreeItemBase.js"],
"sap/ui/documentation/sdk/controls/DemokitTreeItemRenderer.js":["sap/m/TreeItemBaseRenderer.js","sap/ui/core/Renderer.js"],
"sap/ui/documentation/sdk/controls/JSDocText.js":["sap/base/security/sanitizeHTML.js","sap/ui/core/Control.js"],
"sap/ui/documentation/sdk/controls/LightTable.js":["sap/ui/core/Control.js"],
"sap/ui/documentation/sdk/controls/ObjectPageSubSection.js":["sap/ui/core/Control.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/controls/ParamText.js":["sap/ui/Device.js","sap/ui/core/Control.js"],
"sap/ui/documentation/sdk/controls/Row.js":["sap/ui/core/Element.js"],
"sap/ui/documentation/sdk/controls/Search.js":["sap/m/Button.js","sap/m/SearchField.js","sap/m/library.js","sap/ui/core/Control.js"],
"sap/ui/documentation/sdk/controls/TitleLink.js":["sap/m/Title.js","sap/m/Toolbar.js","sap/ui/Device.js","sap/ui/core/library.js"],
"sap/ui/documentation/sdk/model/formatter.js":["sap/ui/documentation/sdk/controller/util/JSDocUtil.js"],
"sap/ui/documentation/sdk/model/libraryData.js":["sap/base/Log.js","sap/ui/documentation/library.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/model/models.js":["sap/ui/Device.js","sap/ui/model/json/JSONModel.js"],
"sap/ui/documentation/sdk/model/sourceFileDownloader.js":["sap/ui/thirdparty/jquery.js"],
"sap/ui/documentation/sdk/util/DocumentationRouter.js":["sap/m/routing/Router.js","sap/ui/core/routing/History.js","sap/ui/thirdparty/hasher.js"],
"sap/ui/documentation/sdk/view/AboutDialog.fragment.xml":["sap/m/Button.js","sap/m/Dialog.js","sap/m/Image.js","sap/m/Link.js","sap/m/MessageStrip.js","sap/m/NavContainer.js","sap/m/Page.js","sap/m/Text.js","sap/m/VBox.js","sap/ui/core/CustomData.js","sap/ui/core/Fragment.js","sap/ui/core/Title.js","sap/ui/documentation/sdk/controls/JSDocText.js","sap/ui/layout/VerticalLayout.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/GridLayout.js","sap/ui/layout/form/ResponsiveGridLayout.js"],
"sap/ui/documentation/sdk/view/ApiDetail.view.xml":["sap/m/Page.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ApiDetail.controller.js"],
"sap/ui/documentation/sdk/view/ApiDetailDeprecated.view.xml":["sap/m/FeedListItem.js","sap/m/List.js","sap/m/MessageStrip.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ApiDetailIndexDeprecatedExperimental.controller.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/view/ApiDetailExperimental.view.xml":["sap/m/FeedListItem.js","sap/m/List.js","sap/m/MessageStrip.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ApiDetailIndexDeprecatedExperimental.controller.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/view/ApiDetailInitial.view.xml":["sap/m/Image.js","sap/m/Label.js","sap/m/Page.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ApiDetailInitial.controller.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/documentation/sdk/view/Footer.fragment.xml","sap/ui/layout/BlockLayout.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/BlockLayoutRow.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/ApiDetailSince.view.xml":["sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/blocks/IndexEntry.js","sap/ui/documentation/sdk/controller/ApiDetailIndexDeprecatedExperimental.controller.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/view/ApiMaster.view.xml":["sap/m/Button.js","sap/m/CheckBox.js","sap/m/Page.js","sap/m/SearchField.js","sap/m/Toolbar.js","sap/m/Tree.js","sap/ui/core/CustomData.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ApiMaster.controller.js","sap/ui/documentation/sdk/controls/DemokitTreeItem.js"],
"sap/ui/documentation/sdk/view/App.view.xml":["sap/m/Bar.js","sap/m/Button.js","sap/m/IconTabFilter.js","sap/m/IconTabHeader.js","sap/m/Image.js","sap/m/Menu.js","sap/m/MenuButton.js","sap/m/MenuItem.js","sap/m/ObjectStatus.js","sap/m/OverflowToolbarLayoutData.js","sap/m/Page.js","sap/m/ScrollContainer.js","sap/m/Select.js","sap/m/SplitApp.js","sap/m/ToggleButton.js","sap/m/ToolbarSpacer.js","sap/tnt/ToolHeader.js","sap/ui/core/ExtensionPoint.js","sap/ui/core/Item.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/App.controller.js","sap/ui/documentation/sdk/controls/Search.js"],
"sap/ui/documentation/sdk/view/BlockLayoutCell.fragment.xml":["sap/m/Label.js","sap/m/Link.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/HorizontalLayout.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/BlockLayoutTeaserCell.fragment.xml":["sap/m/Label.js","sap/m/Link.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/Grid.js","sap/ui/layout/HorizontalLayout.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/ChangeVersionDialog.fragment.xml":["sap/m/Bar.js","sap/m/Button.js","sap/m/Dialog.js","sap/m/List.js","sap/m/SearchField.js","sap/m/StandardListItem.js","sap/ui/core/CustomData.js","sap/ui/core/Fragment.js"],
"sap/ui/documentation/sdk/view/Code.view.xml":["sap/m/Bar.js","sap/m/Button.js","sap/m/IconTabFilter.js","sap/m/IconTabHeader.js","sap/m/Page.js","sap/m/PageAccessibleLandmarkInfo.js","sap/m/Title.js","sap/ui/codeeditor/CodeEditor.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Code.controller.js","sap/ui/layout/FixFlex.js"],
"sap/ui/documentation/sdk/view/Controls.view.xml":["sap/m/Image.js","sap/m/ScrollContainer.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Controls.controller.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/documentation/sdk/view/Footer.fragment.xml","sap/ui/layout/BlockLayout.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/BlockLayoutRow.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/ControlsMaster.view.xml":["sap/m/Button.js","sap/m/Label.js","sap/m/List.js","sap/m/Page.js","sap/m/SearchField.js","sap/m/StandardListItem.js","sap/m/Toolbar.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ControlsMaster.controller.js"],
"sap/ui/documentation/sdk/view/DemoApps.view.xml":["sap/m/Button.js","sap/m/Image.js","sap/m/InputListItem.js","sap/m/Page.js","sap/m/PageAccessibleLandmarkInfo.js","sap/m/Panel.js","sap/m/ScrollContainer.js","sap/m/SelectDialog.js","sap/m/Text.js","sap/m/Title.js","sap/m/Toolbar.js","sap/ui/core/CustomData.js","sap/ui/core/Fragment.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/DemoApps.controller.js","sap/ui/documentation/sdk/view/Footer.fragment.xml","sap/ui/layout/BlockLayout.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/BlockLayoutRow.js","sap/ui/layout/Grid.js","sap/ui/layout/HorizontalLayout.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/Downloads.view.xml":["sap/m/Label.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Downloads.controller.js"],
"sap/ui/documentation/sdk/view/Empty.view.xml":["sap/m/Label.js","sap/ui/core/mvc/XMLView.js"],
"sap/ui/documentation/sdk/view/Entity.view.xml":["sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/FormattedText.js","sap/m/Label.js","sap/m/Table.js","sap/m/Text.js","sap/ui/core/HTML.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Entity.controller.js","sap/ui/layout/Grid.js","sap/ui/layout/VerticalLayout.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageHeaderActionButton.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/view/FeedbackDialog.fragment.xml":["sap/m/Button.js","sap/m/CheckBox.js","sap/m/Dialog.js","sap/m/FlexItemData.js","sap/m/FormattedText.js","sap/m/HBox.js","sap/m/Label.js","sap/m/Link.js","sap/m/MessageStrip.js","sap/m/ObjectStatus.js","sap/m/TextArea.js","sap/m/ToggleButton.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],
"sap/ui/documentation/sdk/view/Footer.fragment.xml":["sap/m/FlexBox.js","sap/m/Image.js","sap/m/Link.js","sap/ui/core/Fragment.js","sap/ui/layout/BlockLayoutCell.js"],
"sap/ui/documentation/sdk/view/Group.view.xml":["sap/m/Page.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Group.controller.js"],
"sap/ui/documentation/sdk/view/LegalDisclaimerPopover.fragment.xml":["sap/m/Image.js","sap/m/Label.js","sap/m/Popover.js","sap/m/Text.js","sap/ui/core/Fragment.js"],
"sap/ui/documentation/sdk/view/License.view.xml":["sap/m/Page.js","sap/m/Text.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/License.controller.js"],
"sap/ui/documentation/sdk/view/NotFound.view.xml":["sap/m/MessagePage.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/BaseController.controller.js"],
"sap/ui/documentation/sdk/view/ReleaseDialog.fragment.xml":["sap/m/Button.js","sap/m/Dialog.js","sap/m/Text.js","sap/ui/core/Fragment.js"],
"sap/ui/documentation/sdk/view/ReleaseNotes.view.xml":["sap/m/Link.js","sap/m/Panel.js","sap/m/Select.js","sap/m/Text.js","sap/ui/core/Item.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/ReleaseNotes.controller.js","sap/ui/layout/VerticalLayout.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/view/Sample.view.xml":["sap/m/Bar.js","sap/m/Button.js","sap/m/Page.js","sap/m/PageAccessibleLandmarkInfo.js","sap/m/Title.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Sample.controller.js"],
"sap/ui/documentation/sdk/view/SearchPage.view.xml":["sap/m/FeedListItem.js","sap/m/List.js","sap/m/ObjectAttribute.js","sap/m/OverflowToolbar.js","sap/m/Title.js","sap/m/VBox.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/SearchPage.controller.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js","sap/uxap/ObjectPageSubSection.js"],
"sap/ui/documentation/sdk/view/SubApiDetail.view.xml":["sap/m/Page.js","sap/ui/core/ExtensionPoint.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/SubApiDetail.controller.js","sap/ui/documentation/sdk/controls/JSDocText.js","sap/ui/documentation/sdk/controls/ObjectPageSubSection.js","sap/ui/layout/Grid.js","sap/ui/layout/VerticalLayout.js","sap/uxap/ObjectPageHeader.js","sap/uxap/ObjectPageHeaderActionButton.js","sap/uxap/ObjectPageLayout.js","sap/uxap/ObjectPageSection.js"],
"sap/ui/documentation/sdk/view/TermsOfUse.view.xml":["sap/m/Page.js","sap/m/Text.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/TermsOfUse.controller.js"],
"sap/ui/documentation/sdk/view/Tools.view.xml":["sap/m/Button.js","sap/m/HBox.js","sap/m/Image.js","sap/m/Input.js","sap/m/Label.js","sap/m/Link.js","sap/m/Page.js","sap/m/Panel.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Tools.controller.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/documentation/sdk/view/Footer.fragment.xml","sap/ui/layout/BlockLayout.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/BlockLayoutRow.js","sap/ui/layout/Grid.js","sap/ui/layout/HorizontalLayout.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/TopicDetail.view.xml":["sap/f/DynamicPage.js","sap/f/DynamicPageHeader.js","sap/f/DynamicPageTitle.js","sap/m/Button.js","sap/m/Text.js","sap/ui/core/HTML.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/TopicDetail.controller.js"],
"sap/ui/documentation/sdk/view/TopicDetailInitial.view.xml":["sap/m/Button.js","sap/m/Image.js","sap/m/MessageStrip.js","sap/m/Page.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/TopicDetailInitial.controller.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/documentation/sdk/view/Footer.fragment.xml","sap/ui/layout/BlockLayout.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/BlockLayoutRow.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/TopicMaster.view.xml":["sap/m/Button.js","sap/m/Page.js","sap/m/SearchField.js","sap/m/StandardTreeItem.js","sap/m/Toolbar.js","sap/m/Tree.js","sap/ui/core/CustomData.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/TopicMaster.controller.js"],
"sap/ui/documentation/sdk/view/VersionInfo.view.xml":["sap/ui/core/HTML.js","sap/ui/core/mvc/XMLView.js"],
"sap/ui/documentation/sdk/view/Welcome.view.xml":["sap/m/Button.js","sap/m/HBox.js","sap/m/Image.js","sap/m/Page.js","sap/m/Text.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/core/mvc/XMLView.js","sap/ui/documentation/sdk/controller/Welcome.controller.js","sap/ui/documentation/sdk/controls/TitleLink.js","sap/ui/documentation/sdk/view/Footer.fragment.xml","sap/ui/layout/BlockLayout.js","sap/ui/layout/BlockLayoutCell.js","sap/ui/layout/BlockLayoutRow.js","sap/ui/layout/Grid.js","sap/ui/layout/GridData.js","sap/ui/layout/HorizontalLayout.js","sap/ui/layout/VerticalLayout.js"],
"sap/ui/documentation/sdk/view/appSettingsDialog.fragment.xml":["sap/m/Button.js","sap/m/Dialog.js","sap/m/HBox.js","sap/m/Label.js","sap/m/Select.js","sap/m/Switch.js","sap/m/VBox.js","sap/ui/core/Fragment.js","sap/ui/core/Item.js"],
"sap/ui/documentation/sdk/view/viewSettingsDialog.fragment.xml":["sap/m/ViewSettingsDialog.js","sap/m/ViewSettingsFilterItem.js","sap/m/ViewSettingsItem.js","sap/ui/core/Fragment.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map