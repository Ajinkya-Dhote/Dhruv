/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./TableExtension","./TableUtils","sap/ui/Device","sap/ui/core/Popup","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/control"],function(l,T,a,D,P,L,q){"use strict";var S=l.SelectionMode;var K=["sapMBtnBase","sapMInputBase","sapMLnk","sapMSlt","sapMCb","sapMRI","sapMSegBBtn","sapUiIconPointer","sapMBtnIcon"];var E={_getEventPosition:function(e,t){var p;function g(o){if(!t._isTouchEvent(o)){return null;}var f=["touches","targetTouches","changedTouches"];for(var i=0;i<f.length;i++){var s=f[i];if(e[s]&&e[s][0]){return e[s][0];}if(e.originalEvent[s]&&e.originalEvent[s][0]){return e.originalEvent[s][0];}}return null;}p=g(e)||e;return{x:p.pageX,y:p.pageY};},_skipClick:function(e,t,o){if(!o.isOfType(a.CELLTYPE.DATACELL|a.CELLTYPE.ROWACTION)){return false;}if(e.isMarked()){return true;}var f=t.control(0);if(f){var $=f.$();if($.length){for(var i=0;i<K.length;i++){if($.hasClass(K[i])){return typeof f.getEnabled==="function"?f.getEnabled():true;}}}}var h=false;if(window.getSelection){var s=window.getSelection();h=s.rangeCount?!s.getRangeAt(0).collapsed:false;}if(h){L.debug("DOM Selection detected -> Click event on table skipped, Target: "+e.target);return true;}return false;},_handleClickSelection:function(e,$,t){a.toggleRowSelection(t,$,null,function(r){if((D.browser.msie||D.browser.edge)&&e.shiftKey){t._clearTextSelection();}var s=t.getSelectionMode();if(s===S.Single){if(!t.isIndexSelected(r)){t.setSelectedIndex(r);}else{t.clearSelection();}}else{var f=!!(e.metaKey||e.ctrlKey);if(s===S.MultiToggle){f=true;}if(e.shiftKey){var i=t.getSelectedIndex();if(i>=0){t.addSelectionInterval(i,r);}else{t.setSelectedIndex(r);}}else{if(!t.isIndexSelected(r)){if(f){t.addSelectionInterval(r,r);}else{t.setSelectedIndex(r);}}else{if(f){t.removeSelectionInterval(r,r);}else{if(t._getSelectedIndicesCount()===1){t.clearSelection();}else{t.setSelectedIndex(r);}}}}}return true;});}};var C={initColumnResizing:function(t,e){if(t._bIsColumnResizerMoving){return;}t._bIsColumnResizerMoving=true;t.$().toggleClass("sapUiTableResizing",true);var $=q(document),f=t._isTouchEvent(e);t._$colResize=t.$("rsz");t._iColumnResizeStart=E._getEventPosition(e,t).x;$.bind((f?"touchend":"mouseup")+".sapUiTableColumnResize",C.exitColumnResizing.bind(t));$.bind((f?"touchmove":"mousemove")+".sapUiTableColumnResize",C.onMouseMoveWhileColumnResizing.bind(t));t._disableTextSelection();},exitColumnResizing:function(e){C._resizeColumn(this,this._iLastHoveredColumnIndex);},onMouseMoveWhileColumnResizing:function(e){var i=E._getEventPosition(e,this).x;if(this._iColumnResizeStart&&i<this._iColumnResizeStart+3&&i>this._iColumnResizeStart-3){return;}if(this._isTouchEvent(e)){e.stopPropagation();e.preventDefault();}this._$colResize.toggleClass("sapUiTableColRszActive",true);var o=this._getVisibleColumns()[this._iLastHoveredColumnIndex];var f=i-this._iColumnResizeStart;var g=this.$().find("th[data-sap-ui-colid=\""+o.getId()+"\"]").width();var w=Math.max(g+f*(this._bRtlMode?-1:1),a.Column.getMinColumnWidth());var r=this.$().find(".sapUiTableCnt").offset().left;var h=Math.floor((i-r)-(this._$colResize.width()/2));this._$colResize.css("left",h+"px");o._iNewWidth=w;},_cleanupColumResizing:function(t){if(t._$colResize){t._$colResize.toggleClass("sapUiTableColRszActive",false);t._$colResize=null;}t._iColumnResizeStart=null;t._bIsColumnResizerMoving=false;t.$().toggleClass("sapUiTableResizing",false);t._enableTextSelection();var $=q(document);$.unbind("touchmove.sapUiTableColumnResize");$.unbind("touchend.sapUiTableColumnResize");$.unbind("mousemove.sapUiTableColumnResize");$.unbind("mouseup.sapUiTableColumnResize");},_resizeColumn:function(t,i){var v=t._getVisibleColumns();var o;if(i>=0&&i<v.length){o=v[i];if(o._iNewWidth){a.Column.resizeColumn(t,t.indexOfColumn(o),o._iNewWidth);delete o._iNewWidth;}}C._cleanupColumResizing(t);o.focus();},doAutoResizeColumn:function(t,i){var v=t._getVisibleColumns(),o;if(i>=0&&i<v.length){o=v[i];if(!o.getAutoResizable()||!o.getResizable()){return;}var n=C._calculateAutomaticColumnWidth.apply(t,[o,i]);if(n){o._iNewWidth=n;C._resizeColumn(t,i);}}},_calculateAutomaticColumnWidth:function(o,i){o=o||this.getColumns()[i];var $=this.$();var e=q("<div>").addClass("sapUiTableHiddenSizeDetector");$.append(e);var f=$.find("td[data-sap-ui-colid = \""+o.getId()+"\"]:not([colspan])").filter(function(g,h){return h.style.display!="none";}).children().clone();f.find("[id]").removeAttr("id");var w=e.append(f).width()+4;w=Math.min(w,$.find(".sapUiTableCnt").width());w=Math.max(w+4,a.Column.getMinColumnWidth());e.remove();return w;},initColumnTracking:function(t){t.$().find(".sapUiTableCtrlScr, .sapUiTableCtrlScrFixed").mousemove(function(e){var o=this.getDomRef();if(!o||this._bIsColumnResizerMoving){return;}var p=e.clientX,f=o.getBoundingClientRect(),g=0,r=this._bRtlMode?10000:-10000;for(var i=0;i<this._aTableHeaders.length;i++){var h=this._aTableHeaders[i].getBoundingClientRect();if(this._bRtlMode){if((p<h.right-5)&&(p>=h.left)){g=i;r=h.left-f.left;break;}}else{if((p>h.left+5)&&(p<=h.right)){g=i;r=h.right-f.left;break;}}}var j=this._getVisibleColumns()[g];if(j&&j.getResizable()){this.$("rsz").css("left",r+"px");this._iLastHoveredColumnIndex=g;}}.bind(t));}};var I={initInteractiveResizing:function(t,e){var B=q(document.body),s=t.$("sb"),$=q(document),o=s.offset(),h=s.height(),w=s.width(),f=t._isTouchEvent(e);B.bind("selectstart",I.onSelectStartWhileInteractiveResizing);B.append("<div id=\""+t.getId()+"-ghost\" class=\"sapUiTableInteractiveResizerGhost\" style =\" height:"+h+"px; width:"+w+"px; left:"+o.left+"px; top:"+o.top+"px\" ></div>");s.append("<div id=\""+t.getId()+"-rzoverlay\" style =\"left: 0px; right: 0px; bottom: 0px; top: 0px; position:absolute\" ></div>");$.bind((f?"touchend":"mouseup")+".sapUiTableInteractiveResize",I.exitInteractiveResizing.bind(t));$.bind((f?"touchmove":"mousemove")+".sapUiTableInteractiveResize",I.onMouseMoveWhileInteractiveResizing.bind(t));t._disableTextSelection();},exitInteractiveResizing:function(e){var B=q(document.body),$=q(document),t=this.$(),g=this.$("ghost"),i=E._getEventPosition(e,this).y;var n=i-t.find(".sapUiTableCCnt").offset().top-g.height()-t.find(".sapUiTableFtr").height();this._updateRows(this._calculateRowsToDisplay(n),a.RowsUpdateReason.Resize);this._setRowContentHeight(n);g.remove();this.$("rzoverlay").remove();B.unbind("selectstart",I.onSelectStartWhileInteractiveResizing);$.unbind("touchend.sapUiTableInteractiveResize");$.unbind("touchmove.sapUiTableInteractiveResize");$.unbind("mouseup.sapUiTableInteractiveResize");$.unbind("mousemove.sapUiTableInteractiveResize");this._enableTextSelection();},onSelectStartWhileInteractiveResizing:function(e){e.preventDefault();e.stopPropagation();return false;},onMouseMoveWhileInteractiveResizing:function(e){var i=E._getEventPosition(e,this).y;var m=this.$().offset().top;if(i>m){this.$("ghost").css("top",i+"px");}}};var R={initReordering:function(t,i,e){var o=t.getColumns()[i],$=o.$(),f=t.$();t._disableTextSelection();f.addClass("sapUiTableDragDrop");var g=$.clone();g.find("*").addBack(g).removeAttr("id").removeAttr("data-sap-ui").removeAttr("tabindex");g.attr("id",t.getId()+"-roghost").addClass("sapUiTableColReorderGhost").css({"left":-10000,"top":-10000,"z-index":P.getNextZIndex()});g.toggleClass(a.getContentDensity(t),true);g.appendTo(document.body);t._$ReorderGhost=t.getDomRef("roghost");f.find("td[data-sap-ui-colid='"+o.getId()+"']").toggleClass("sapUiTableColReorderFade",true);var h=q("<div id='"+t.getId()+"-roind' class='sapUiTableColReorderIndicator'><div class='sapUiTableColReorderIndicatorArrow'></div><div class='sapUiTableColReorderIndicatorInner'></div></div>");h.appendTo(t.getDomRef("sapUiTableCnt"));t._$ReorderIndicator=t.getDomRef("roind");t._iDnDColIndex=i;var j=q(document),k=t._isTouchEvent(e);j.bind((k?"touchend":"mouseup")+".sapUiColumnMove",R.exitReordering.bind(t));j.bind((k?"touchmove":"mousemove")+".sapUiColumnMove",R.onMouseMoveWhileReordering.bind(t));},onMouseMoveWhileReordering:function(e){var o=E._getEventPosition(e,this),i=o.x,f=o.y,O=this._iNewColPos;this._iNewColPos=this._iDnDColIndex;e.preventDefault();var p=R.findColumnForPosition(this,i);if(!p||!p.id){this._iNewColPos=O;return;}var s=40,g=this.getDomRef("sapUiTableColHdrScr"),$=q(g),h=g.getBoundingClientRect(),j=$.outerWidth(),k=this._bRtlMode?$.scrollLeftRTL():$.scrollLeft();this._bReorderScroll=false;if(i>h.left+j-s&&k+j<g.scrollWidth){this._bReorderScroll=true;R.doScroll(this,!this._bRtlMode);R.adaptReorderMarkerPosition(this,p,false);}else if(i<h.left+s&&k>0){this._bReorderScroll=true;R.doScroll(this,this._bRtlMode);R.adaptReorderMarkerPosition(this,p,false);}q(this._$ReorderGhost).css({"left":i+5,"top":f+5});if(this._bReorderScroll||!p){return;}if(p.before||(p.after&&p.index==this._iDnDColIndex)){this._iNewColPos=p.index;}else if(p.after&&p.index!=this._iDnDColIndex){this._iNewColPos=p.index+1;}if(!a.Column.isColumnMovableTo(this.getColumns()[this._iDnDColIndex],this._iNewColPos)){this._iNewColPos=O;}else{R.adaptReorderMarkerPosition(this,p,true);}},exitReordering:function(e){var o=this._iDnDColIndex;var n=this._iNewColPos;var $=q(document);$.unbind("touchmove.sapUiColumnMove");$.unbind("touchend.sapUiColumnMove");$.unbind("mousemove.sapUiColumnMove");$.unbind("mouseup.sapUiColumnMove");this._bReorderScroll=false;this.$().removeClass("sapUiTableDragDrop");delete this._iDnDColIndex;delete this._iNewColPos;q(this._$ReorderGhost).remove();delete this._$ReorderGhost;q(this._$ReorderIndicator).remove();delete this._$ReorderIndicator;this.$().find(".sapUiTableColReorderFade").removeClass("sapUiTableColReorderFade");this._enableTextSelection();a.Column.moveColumnTo(this.getColumns()[o],n);if(this._mTimeouts.reApplyFocusTimerId){window.clearTimeout(this._mTimeouts.reApplyFocusTimerId);}var t=this;this._mTimeouts.reApplyFocusTimerId=window.setTimeout(function(){var O=a.getFocusedItemInfo(t).cell;a.focusItem(t,0,e);a.focusItem(t,O,e);},0);},findColumnForPosition:function(t,e){var h,H,r,w,p,B,A;for(var i=0;i<t._aTableHeaders.length;i++){h=t._aTableHeaders[i];H=q(h);r=h.getBoundingClientRect();w=H.outerWidth();p={left:r.left,center:r.left+w/2,right:r.left+w,width:w,index:parseInt(H.attr("data-sap-ui-headcolindex"),10),id:H.attr("data-sap-ui-colid")};B=e>=p.left&&e<=p.center;A=e>=p.center&&e<=p.right;if(B||A){p.before=t._bRtlMode?A:B;p.after=t._bRtlMode?B:A;return p;}}return null;},doScroll:function(t,f){if(t._mTimeouts.horizontalReorderScrollTimerId){window.clearTimeout(t._mTimeouts.horizontalReorderScrollTimerId);t._mTimeouts.horizontalReorderScrollTimerId=null;}if(t._bReorderScroll){var s=f?30:-30;if(t._bRtlMode){s=(-1)*s;}t._mTimeouts.horizontalReorderScrollTimerId=setTimeout(R.doScroll.bind(t,t,f),60);var $=t.$("sapUiTableColHdrScr");var e=t._bRtlMode?"scrollLeftRTL":"scrollLeft";$[e]($[e]()+s);}},adaptReorderMarkerPosition:function(t,p,s){if(!p||!t._$ReorderIndicator){return;}var i=p.left-t.getDomRef().getBoundingClientRect().left;if(t._bRtlMode&&p.before||!t._bRtlMode&&p.after){i=i+p.width;}q(t._$ReorderIndicator).css({"left":i+"px"}).toggleClass("sapUiTableColReorderIndicatorActive",s);}};var b={ROWAREAS:[".sapUiTableRowHdr",".sapUiTableRowAction",".sapUiTableCtrlFixed > tbody > .sapUiTableTr",".sapUiTableCtrlScroll > tbody > .sapUiTableTr"],initRowHovering:function(t){var $=t.$();for(var i=0;i<b.ROWAREAS.length;i++){b._initRowHoveringForArea(t,$,b.ROWAREAS[i]);}},_initRowHoveringForArea:function(t,$,A){$.find(A).hover(function(){b._onHover(t,$,A,this);},function(){b._onUnhover(t,$,A,this);});},_onHover:function(t,$,A,e){var i=$.find(A).index(e);t.getRows()[i]._setHovered(true);},_onUnhover:function(t,$,A,e){var i=$.find(A).index(e);t.getRows()[i]._setHovered(false);}};var c={onmousedown:function(e){var p=this._getPointerExtension();var $=a.getCell(this,e.target);var o=a.getCellInfo($);var t=q(e.target);var f;var m;var M;this._getKeyboardExtension().initItemNavigation();if(e.button===0){if(e.target===this.getDomRef("sb")){I.initInteractiveResizing(this,e);}else if(e.target===this.getDomRef("rsz")){e.preventDefault();e.stopPropagation();C.initColumnResizing(this,e);}else if(t.hasClass("sapUiTableColResizer")){var i=t.closest(".sapUiTableCol").attr("data-sap-ui-colindex");this._iLastHoveredColumnIndex=parseInt(i,10);C.initColumnResizing(this,e);}else if(o.isOfType(a.CELLTYPE.COLUMNHEADER)){f=this.getColumns()[o.columnIndex];m=f.getAggregation("menu");M=m&&m.bOpen;if(!M){p._bShowMenu=true;this._mTimeouts.delayedMenuTimerId=setTimeout(function(){delete p._bShowMenu;},200);}if(this.getEnableColumnReordering()&&!(this._isTouchEvent(e)&&t.hasClass("sapUiTableColDropDown"))){this._getPointerExtension().doReorderColumn(o.columnIndex,e);}}if((D.browser.firefox&&!!(e.metaKey||e.ctrlKey))||t.closest(".sapUiTableHSb",this.getDomRef()).length===1||t.closest(".sapUiTableVSb",this.getDomRef()).length===1){e.preventDefault();}}if(e.button===2){if(E._skipClick(e,t,o)){p._bShowDefaultMenu=true;return;}if(o.isOfType(a.CELLTYPE.COLUMNHEADER)){f=this.getColumns()[o.columnIndex];m=f.getAggregation("menu");M=m&&m.bOpen;if(!M){p._bShowMenu=true;}else{p._bHideMenu=true;}}else if(o.isOfType(a.CELLTYPE.ANYCONTENTCELL)){if(a.Menu.hasContextMenu(this)){p._bShowMenu=true;}else{M=this._oCellContextMenu&&this._oCellContextMenu.bOpen;var g=M&&this._oCellContextMenu.oOpenerRef!==$[0];if(!M||g){p._bShowMenu=true;}else{p._bHideMenu=true;}}}else{p._bShowDefaultMenu=true;}}},onmouseup:function(e){clearTimeout(this._mTimeouts.delayedColumnReorderTimerId);},ondblclick:function(e){if(D.system.desktop&&e.target===this.getDomRef("rsz")){e.preventDefault();C.doAutoResizeColumn(this,this._iLastHoveredColumnIndex);}},onclick:function(e){clearTimeout(this._mTimeouts.delayedColumnReorderTimerId);if(e.isMarked()){return;}var t=q(e.target);if(t.hasClass("sapUiAnalyticalTableSum")){e.preventDefault();return;}else if(t.hasClass("sapUiTableGroupMenuButton")){this._onContextMenu(e);e.preventDefault();return;}else if(t.hasClass("sapUiTableGroupIcon")||t.hasClass("sapUiTableTreeIcon")){if(a.Grouping.toggleGroupHeaderByRef(this,e.target)){return;}}var $=a.getCell(this,e.target);var o=a.getCellInfo($);if(o.isOfType(a.CELLTYPE.COLUMNHEADER)){var p=this._getPointerExtension();if(p._bShowMenu){a.Menu.openContextMenu(this,e.target,false);delete p._bShowMenu;}}else{if(E._skipClick(e,t,o)){return;}if(!this._findAndfireCellEvent(this.fireCellClick,e)){if(o.isOfType(a.CELLTYPE.COLUMNROWHEADER)){this._toggleSelectAll();}else{E._handleClickSelection(e,$,this);}}else{e.preventDefault();}}},oncontextmenu:function(e){var p=this._getPointerExtension();if(p._bShowDefaultMenu){e.setMarked("handledByPointerExtension");delete p._bShowDefaultMenu;}else if(p._bShowMenu){e.setMarked("handledByPointerExtension");e.preventDefault();a.Menu.openContextMenu(this,e.target,false,null,e);delete p._bShowMenu;}else if(p._bHideMenu){e.setMarked("handledByPointerExtension");e.preventDefault();delete p._bHideMenu;}}};var d=T.extend("sap.ui.table.TablePointerExtension",{_init:function(t,s,m){this._delegate=c;a.addDelegate(this._delegate,t,true);t._iLastHoveredColumnIndex=0;t._bIsColumnResizerMoving=false;t._iFirstReorderableIndex=s==T.TABLETYPES.TREE?1:0;return"PointerExtension";},_attachEvents:function(){var t=this.getTable();if(t){C.initColumnTracking(t);b.initRowHovering(t);}},_detachEvents:function(){var t=this.getTable();if(t){var $=t.$();$.find(".sapUiTableCtrlScr, .sapUiTableCtrlScrFixed").unbind();$.find(".sapUiTableCtrl > tbody > tr").unbind();$.find(".sapUiTableRowHdr").unbind();}},_debug:function(){this._ExtensionHelper=E;this._ColumnResizeHelper=C;this._InteractiveResizeHelper=I;this._ReorderHelper=R;this._ExtensionDelegate=c;this._RowHoverHandler=b;this._KNOWNCLICKABLECONTROLS=K;},doAutoResizeColumn:function(i){var t=this.getTable();if(t){C.doAutoResizeColumn(t,i);}},doReorderColumn:function(i,e){var t=this.getTable();if(t&&a.Column.isColumnMovable(t.getColumns()[i])){t._mTimeouts.delayedColumnReorderTimerId=setTimeout(function(){R.initReordering(this,i,e);}.bind(t),200);}},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(this._delegate);}this._delegate=null;T.prototype.destroy.apply(this,arguments);}});return d;});
