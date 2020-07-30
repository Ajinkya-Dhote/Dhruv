/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/CustomStyleClassSupport','sap/ui/core/Element'],function(q,l,C,E){"use strict";var T=E.extend("sap.ui.commons.TreeNode",{metadata:{library:"sap.ui.commons",properties:{text:{type:"string",group:"Misc",defaultValue:null},expanded:{type:"boolean",group:"Misc",defaultValue:true},hasExpander:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},isSelected:{type:"boolean",group:"Misc",defaultValue:false},selectable:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"nodes",aggregations:{nodes:{type:"sap.ui.commons.TreeNode",multiple:true,singularName:"node"}},associations:{selectedForNodes:{type:"sap.ui.commons.TreeNode",multiple:true,singularName:"selectedForNode",visibility:"hidden"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{toggleOpenState:{parameters:{opened:{type:"boolean"}}},selected:{}}}});T.prototype.getSelectedForNodes=function(){return this.getAssociation("selectedForNodes",[]);};T.ANIMATION_DURATION=600;C.apply(T.prototype);T.prototype.expand=function(b,d){this.setProperty("expanded",true,true);var a=null;if(!d){a=e.bind(this);}var D=this.$();if(D.hasClass("sapUiTreeNodeCollapsed")){D.toggleClass("sapUiTreeNodeCollapsed");D.toggleClass("sapUiTreeNodeExpanded");D.attr("aria-expanded","true");var o=this.$("children");if(o){if(b){o.show();}else{o.stop(true,true);o.show(T.ANIMATION_DURATION,a);}o.css({display:'block'});}this.fireToggleOpenState({opened:true});}if(b){var n=this._getNodes();for(var i=0;i<n.length;i++){n[i].expand(b,true);}a&&a();}};T.prototype.collapse=function(b,d){this.setProperty("expanded",false,true);var a=null;if(!d){a=c.bind(this);}var D=this.$();if(D.hasClass("sapUiTreeNodeExpanded")){D.toggleClass("sapUiTreeNodeCollapsed");D.toggleClass("sapUiTreeNodeExpanded");D.attr("aria-expanded","false");var o=this.$("children");if(o){if(b){o.hide();}else{o.stop(true,true);o.hide(T.ANIMATION_DURATION,a);}}this.fireToggleOpenState({opened:false});}if(b){var n=this._getNodes();for(var i=0;i<n.length;i++){n[i].collapse(b,true);}a&&a();}};T.prototype.select=function(s){var t=this.getTree();if(t){t.setSelection(this,s);}else{this._select();}};function e(){var t=this.getTree();if(t){t._adjustSelectionOnExpanding(this);}}function c(){var t=this.getTree();if(t){t._adjustSelectionOnCollapsing(this);t._adjustFocus();}}T.prototype._select=function(s){this.setProperty("isSelected",true,true);if(!s){this.fireSelected();}if(this.getDomRef()){this.$().closest(".sapUiTreeNode").addClass("sapUiTreeNodeSelected").attr("aria-selected","true");this.scrollIntoView();}};T.prototype._deselect=function(s){this.setProperty("isSelected",false,true);if(this.getDomRef()){this.$().removeClass("sapUiTreeNodeSelected").removeAttr("aria-selected");}};T.prototype._getNodes=function(){return this.mAggregations.nodes||[];};T.prototype.hasSelectedHiddenChild=function(){var n=this._getNodes();for(var i=0;i<n.length;i++){if((!n[i].isVisible()&&n[i].getIsSelected())||n[i].hasSelectedHiddenChild()){return true;}}return false;};T.prototype.setIsSelected=function(i){var t=this.getTree();if(!this.getSelectable()){return this;}if(i==this.getProperty("isSelected")){return this;}if(t){t._setNodeSelection(this,i,true);}else{this.setProperty("isSelected",i,true);}return this;};T.prototype.setSelectable=function(s){if(!s&&this.getIsSelected()){this.setIsSelected(false);}this.setProperty("selectable",s);return this;};T.prototype.onclick=function(o){var d=o.target,t=this.getTree();if(q(d).is(".sapUiTreeNode")||q(d).is(".sapUiTreeNodeNotSelectable")){if(q(d).is(".sapUiTreeNodeNotSelectable")){d=q(d).closest(".sapUiTreeNode")[0];}if(q(d).hasClass("sapUiTreeNodeExpanded")){this.collapse();}else{this.expand();}t.placeFocus(d);d.focus();}else if(q(d).is(".sapUiTreeNodeContent")||q(d).is(".sapUiTreeIcon")){var s=sap.ui.commons.Tree.SelectionType.Select;if(t.getSelectionMode()==sap.ui.commons.TreeSelectionMode.Multi){if(o.shiftKey){s=sap.ui.commons.Tree.SelectionType.Range;}if(o.metaKey||o.ctrlKey){s=sap.ui.commons.Tree.SelectionType.Toggle;}}t.setSelection(this,false,s);d=q(d).closest(".sapUiTreeNode")[0];t.placeFocus(d);d.focus();}};T.prototype.onsapselect=function(o){if(this.getSelectable()){this.getTree().setSelection(this);}else if(this.getExpanded()){this.collapse();}else{this.expand();}};T.prototype.onsapexpand=function(o){this.expand();};T.prototype.onsapcollapse=function(o){this.collapse();};T.prototype.onsapleft=function(o){if(sap.ui.getCore().getConfiguration().getRTL()){this.expand();}else{this.collapse();}o.preventDefault();};T.prototype.onsapright=function(o){if(sap.ui.getCore().getConfiguration().getRTL()){this.collapse();}else{this.expand();}o.preventDefault();};T.prototype.focus=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("tabindex","0");d.focus();}};T.prototype.blur=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("tabindex","-1");}};T.prototype.getTree=function(){var p=this.getParent();while(p instanceof T){p=p.getParent();}return p;};T.prototype.hasChildren=function(){var s=this._getNodes();if(s.length){return true;}return false;};T.prototype.isVisible=function(){var p=this.getParent();while(p instanceof T){if(!p.getExpanded()){return false;}p=p.getParent();}return true;};T.prototype.scrollIntoView=function(){var n=this.$(),t=this.getTree().$(),$=t.find(".sapUiTreeCont"),o=n[0].offsetTop,s=$.scrollTop(),h=$.height(),N,O=n[0].offsetLeft,S=$.scrollLeft(),w=$.width(),i;if(o>s+h||o<s){N=o-Math.floor(h*0.5);N=Math.max(N,0);}if(O>S+w||O<S){i=O-Math.floor(w*0.5);i=Math.max(i,0);}if(N!==undefined||i!==undefined){var m={};if(N!==undefined){m.scrollTop=N;}if(i!==undefined){m.scrollLeft=i;}$.stop(true,true).animate(m);}};T.prototype.getTooltip_AsString=function(){var t;var o=this.getTooltip();if(typeof o==="string"||o instanceof String){t=o;}if(!t){t=this.getText();}return t;};return T;},true);