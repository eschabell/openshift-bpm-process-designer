Ext.ns("Oryx.Plugins");
ORYX.Plugins.PetriNetSoundnessChecker=ORYX.Plugins.AbstractPlugin.extend({hideOverlays:function(){if(!this.overlayIds){return
}Ext.each(this.overlayIds,function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:a})
}.bind(this))
},getChildShapesByResourceIds:function(b){var a=[];
Ext.each(b,function(c){a.push(this.facade.getCanvas().getChildShapeByResourceId(c))
}.bind(this));
return a
},showOverlay:function(a,b,e,c){if(!this.overlayIds){this.overlayIds=[]
}if(!(a instanceof Array)){a=[a]
}a=a.map(function(f){var g=f;
if(typeof f=="string"){g=this.facade.getCanvas().getChildShapeByResourceId(f);
g=g||this.facade.getCanvas().getChildById(f,true)
}return g
}.bind(this)).compact();
var d=this.type+ORYX.Editor.provideId();
this.overlayIds.push(d);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:d,shapes:a,attributes:b,node:e,nodePosition:c||"NW"})
},construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:"Check soundness",functionality:this.showCheckerWindow.bind(this),group:"Verification",icon:ORYX.BASE_FILE_PATH+"images/checker_validation.png",description:"Checks current Petri net for different soundness criteria.",index:3,minShape:0,maxShape:0})
},showCheckerWindow:function(){var d=this;
var b=Ext.extend(Ext.tree.TreeNode,{constructor:function(g){if(!g.icon&&!this.icon){g.icon=b.UNKNOWN_STATUS
}b.superclass.constructor.apply(this,arguments);
Ext.apply(this,g);
if(this.clickHandler){this.on("click",this.clickHandler.bind(this))
}},setIcon:function(g){this.ui.getIconEl().src=g
},getIcon:function(g){return this.ui.getIconEl().src
},reset:function(){d.hideOverlays();
this.hideMarking();
d.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.RESET_ERRORS_EVENT})
},hideMarking:function(){if(!d.marking){return
}for(place in d.marking){var g=d.facade.getCanvas().getChildShapeByResourceId(place);
if(g){g.setProperty("oryx-numberoftokens",0)
}}d.facade.getCanvas().update();
d.marking=undefined
},showMarking:function(h){d.marking=h;
for(place in h){var g=d.facade.getCanvas().getChildShapeByResourceId(place);
g.setProperty("oryx-numberoftokens",h[place])
}d.facade.getCanvas().update()
},showErrors:function(g){Ext.each(this.childNodes,function(h){if(h&&h.itemCls==="error"){h.remove()
}});
Ext.each(this.childNodes,function(h){if(h.getIcon().search(b.LOADING_STATUS)>-1){h.setIcon(b.UNKNOWN_STATUS)
}});
Ext.each(g,function(h){this.insertBefore(new b({icon:b.ERROR_STATUS,text:h,itemCls:"error"}),this.childNodes[0])
}.bind(this))
},showOverlayWithStep:function(g){Ext.each(g,function(i,h){d.showOverlay(d.facade.getCanvas().getChildShapeByResourceId(i),{fill:"#FB7E02"},ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{style:"font-size: 16px; font-weight: bold;"},(h+1)+"."]),"SE")
})
},showOverlay:function(g){if(g.length===0){return
}if(!g[0] instanceof ORYX.Core.Node){g=d.getChildShapesByResourceIds(g)
}d.showOverlay(g,{fill:"#FB7E02"})
}});
b.UNKNOWN_STATUS=ORYX.PATH+"images/soundness_checker/asterisk_yellow.png";
b.ERROR_STATUS=ORYX.PATH+"images/soundness_checker/exclamation.png";
b.OK_STATUS=ORYX.PATH+"images/soundness_checker/accept.png";
b.LOADING_STATUS=ORYX.PATH+"images/soundness_checker/loading.gif";
var c=Ext.extend(b,{constructor:function(g){g.qtip="<b>Termination Criteria</b>: Makes sure that any process instance that starts in the initial state will eventually reach the final state. If any dead locks are detected, click to show one counter example.";
c.superclass.constructor.apply(this,arguments)
},clickHandler:function(h){h.reset();
if(this.deadLocks.length==0){return
}var g=h.deadLocks[0];
this.showOverlayWithStep(g.path);
this.showMarking(g.marking)
},update:function(g){this.deadLocks=g;
this.setIcon(this.deadLocks.length==0?b.OK_STATUS:b.ERROR_STATUS);
this.setText("There is "+(this.deadLocks.length==0?"no":"a")+" path that leads to a deadlock.")
}});
var f=Ext.extend(b,{constructor:function(g){g.qtip="<b>Proper Termination Criteria</b>: The final state is the only state reachable from the initial state in which there is a token in the final place. If any improper terminating states are detected, click to show one counter example.";
f.superclass.constructor.apply(this,arguments)
},clickHandler:function(h){h.reset();
if(h.improperTerminatings.length==0){return
}var g=h.improperTerminatings[0];
this.showOverlayWithStep(g.path);
this.showMarking(g.marking)
},update:function(g){this.improperTerminatings=g;
this.setIcon(this.improperTerminatings.length==0?b.OK_STATUS:b.ERROR_STATUS);
this.setText("There are "+this.improperTerminatings.length+" markings covering the final marking.")
}});
var a=Ext.extend(b,{constructor:function(g){g.qtip="<b>No Dead Transitions Criteria</b>: Each transition can contribute to at least one process instance. Click to see all dead transitions.";
a.superclass.constructor.apply(this,arguments)
},clickHandler:function(g){g.reset();
this.showOverlay(this.deadTransitions)
},update:function(g){this.deadTransitions=g;
this.setIcon(this.deadTransitions.length==0?b.OK_STATUS:b.ERROR_STATUS);
this.setText("There are "+this.deadTransitions.length+" dead transitions.")
}});
var e=Ext.extend(b,{constructor:function(g){g.qtip="<b>Transition Participation Criteria</b>: Each transition participates in at least one process instance that starts in the initial state and reaches the final state. Click to see all transitions not participating in any process instance.";
e.superclass.constructor.apply(this,arguments)
},clickHandler:function(g){g.reset();
this.showOverlay(this.notParticipatingTransitions)
},update:function(g){this.notParticipatingTransitions=g;
this.setIcon(this.notParticipatingTransitions.length==0?b.OK_STATUS:b.ERROR_STATUS);
this.setText("There are "+this.notParticipatingTransitions.length+" transitions that cannot participate in a properly terminating firing sequence.")
}});
this.checkerWindow=new Ext.Window({title:"Soundness Checker",autoScroll:true,width:"500",tbar:[{text:"Check",handler:function(){this.checkerWindow.check()
}.bind(this)},{text:"Hide Errors",handler:function(){this.checkerWindow.getTree().getRootNode().reset()
}.bind(this)},"->",{text:"Close",handler:function(){this.checkerWindow.close()
}.bind(this)}],getTree:function(){return this.items.get(0)
},check:function(g){this.prepareCheck(g);
this.checkSyntax(this.checkSoundness.bind(this))
},prepareCheck:function(h){var g=this.getTree().getRootNode();
g.reset();
Ext.each(g.childNodes,function(i){if(h){i.expand(true)
}i.collapse(true);
i.setIcon(b.LOADING_STATUS)
})
},checkSyntax:function(g){d.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.CHECK_FOR_ERRORS_EVENT,onErrors:function(){Ext.Msg.alert("Syntax Check","Some syntax errors have been found, please correct them!");
this.turnLoadingIntoUnknownStatus()
}.bind(this),onNoErrors:function(){g()
}})
},turnLoadingIntoUnknownStatus:function(){Ext.each(this.getTree().getRootNode().childNodes,function(g){if(g.getIcon().search(b.LOADING_STATUS)>-1){g.setIcon(b.UNKNOWN_STATUS)
}})
},checkSoundness:function(){var g=this.getTree().getRootNode();
if(!g.findChild("id","structuralSound").check()){this.turnLoadingIntoUnknownStatus();
return
}Ext.Ajax.request({url:ORYX.CONFIG.ROOT_PATH+"checksoundness",method:"POST",success:function(i){var h=Ext.decode(i.responseText);
g.showErrors(h.errors);
if(h.errors.length===0){g.findChild("id","sound").check(h);
g.findChild("id","weakSound").check(h);
g.findChild("id","relaxedSound").check(h)
}},failure:function(){},params:{data:d.getSerializedDOM()}})
},items:[new Ext.tree.TreePanel({useArrows:true,autoScroll:true,rootVisible:false,animate:true,containerScroll:true,root:new b({text:"Checks",id:"source",expanded:true}),listeners:{render:function(j){var h=new b({text:"Structural Sound (Workflow Net)",id:"structuralSound",check:function(){this.checkInitialNode.update();
this.checkFinalNode.update();
this.checkConnectedNode.update(this.checkInitialNode.initialNodes,this.checkFinalNode.finalNodes);
if(this.checkInitialNode.hasErrors()||this.checkFinalNode.hasErrors()||this.checkConnectedNode.hasErrors()){this.setIcon(b.ERROR_STATUS);
this.expand();
return false
}else{this.setIcon(b.OK_STATUS);
return true
}},checkInitialNode:new b({qtip:"There must be exactly one initial place, which is the only place without any incoming edges.",update:function(){this.initialNodes=[];
Ext.each(d.facade.getCanvas().getChildShapes(),function(l){if(l.getIncomingShapes().length==0&&l.getStencil().id().search(/Place/)>-1){this.initialNodes.push(l)
}}.bind(this));
this.setText(this.initialNodes.length+" initial places found.");
this.setIcon(!this.hasErrors()?b.OK_STATUS:b.ERROR_STATUS)
},clickHandler:function(l){l.reset();
this.showOverlay(this.initialNodes)
},hasErrors:function(){return this.initialNodes.length!==1
}}),checkFinalNode:new b({qtip:"There must be exactly one final place, which is the only place without any outgoing edges.",update:function(){this.finalNodes=[];
Ext.each(d.facade.getCanvas().getChildShapes(),function(l){if(l.getOutgoingShapes().length==0&&l.getStencil().id().search(/Place/)>-1){this.finalNodes.push(l)
}}.bind(this));
this.setText(this.finalNodes.length+" final places found.");
this.setIcon(!this.hasErrors()?b.OK_STATUS:b.ERROR_STATUS)
},clickHandler:function(l){l.reset();
this.showOverlay(this.finalNodes)
},hasErrors:function(){return this.finalNodes.length!==1
}}),checkConnectedNode:new b({qtip:"Each node in the process model is on the path from the initial node to the final node.",update:function(m,l){if(m.length!==1||l.length!==1){this.setText("There must be exactly one initial and final place to perform further checks!");
this.setIcon(b.UNKNOWN_STATUS);
return
}this.notParticipatingNodes=[];
Ext.each(d.facade.getCanvas().getChildShapes(),function(n){if(n instanceof ORYX.Core.Node){this.notParticipatingNodes.push(n)
}}.bind(this));
this.passedNodes=[];
this.findNotParticipatingNodes(m[0]);
this.setText(this.notParticipatingNodes.length+" nodes that aren't on any path from beginning to end found.");
this.setIcon(!this.hasErrors()?b.OK_STATUS:b.ERROR_STATUS)
},clickHandler:function(l){l.reset();
this.showOverlay(this.notParticipatingNodes)
},findNotParticipatingNodes:function(l){this.passedNodes.push(l);
this.notParticipatingNodes.remove(l);
Ext.each(l.getOutgoingShapes(),function(m){if(!this.passedNodes.include(m)){this.findNotParticipatingNodes(m)
}}.bind(this))
},hasErrors:function(){return this.notParticipatingNodes.length!==0
}})});
h.appendChild([h.checkInitialNode,h.checkFinalNode,h.checkConnectedNode]);
var g=new b({text:"Sound",id:"sound",check:function(l){if(l.isSound){this.setIcon(b.OK_STATUS)
}else{this.setIcon(b.ERROR_STATUS);
this.expand()
}this.deadTransitionsNode.update(l.deadTransitions);
this.improperTerminatingsNode.update(l.improperTerminatings);
this.deadLocksNode.update(l.deadLocks)
},deadTransitionsNode:new a({}),improperTerminatingsNode:new f({}),deadLocksNode:new c({})});
g.appendChild([g.deadTransitionsNode,g.improperTerminatingsNode,g.deadLocksNode]);
var k=new b({text:"Weak Sound",id:"weakSound",check:function(l){if(l.isWeakSound){this.setIcon(b.OK_STATUS)
}else{this.setIcon(b.ERROR_STATUS);
this.expand()
}this.improperTerminatingsNode.update(l.improperTerminatings);
this.deadLocksNode.update(l.deadLocks)
},deadTransitionsNode:new a({}),improperTerminatingsNode:new f({}),deadLocksNode:new c({})});
k.appendChild([k.improperTerminatingsNode,k.deadLocksNode]);
var i=new b({text:"Relaxed Sound",id:"relaxedSound",check:function(l){if(l.isRelaxedSound){this.setIcon(b.OK_STATUS)
}else{this.setIcon(b.ERROR_STATUS);
this.expand()
}this.notParticipatingTransitionsNode.update(l.notParticipatingTransitions)
},notParticipatingTransitionsNode:new e({})});
i.appendChild([i.notParticipatingTransitionsNode]);
j.getRootNode().appendChild([h,g,k,i])
}}})],listeners:{close:function(g){this.checkerWindow.getTree().getRootNode().reset()
}.bind(this)}});
this.checkerWindow.show();
this.checkerWindow.check(true)
}});