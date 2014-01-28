if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.FormEditing=Clazz.extend({construct:function(a){this.facade=a;
if(ORYX.READONLY!=true){if(ORYX.PRESET_PERSPECTIVE!="ruleflow"){this.facade.offer({name:"Edit Process Form",functionality:this.editProcessForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:"Edit Process Form",index:1,minShape:0,maxShape:0,isEnabled:function(){return ORYX.READONLY!=true
}.bind(this)});
this.facade.offer({name:"Edit Task Form",functionality:this.editTaskForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:"Edit Task Form",index:2,minShape:1,maxShape:1,isEnabled:function(){return ORYX.READONLY!=true
}.bind(this)});
this.facade.offer({name:"Generate Task Form",functionality:this.generateTaskForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:"Generate Task Form",index:3,minShape:1,maxShape:1,isEnabled:function(){return ORYX.READONLY!=true
}.bind(this)});
this.facade.offer({name:"Generate all Forms",functionality:this.generateTaskForms.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:"Generate all Forms",index:4,minShape:0,maxShape:0,isEnabled:function(){return ORYX.READONLY!=true
}.bind(this)})
}}},generateTaskForm:function(){var a=ORYX.Config.FACADE.getSelection();
if(a){if(a.length!=1){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Invalid number of nodes selected..",title:""})
}else{var c=a[0].properties["oryx-tasktype"];
if(c&&c=="User"){var b=a[0].properties["oryx-taskname"];
if(b&&b.length>0){b=b.replace(/\&/g,"");
b=b.replace(/\s/g,"");
Ext.Ajax.request({url:ORYX.PATH+"taskforms",method:"POST",success:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:"Successfully generated task form template.",title:""})
}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"<p>Failed to generate task form template.</p>",title:""})
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,taskid:a[0].resourceId}})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Task Name not specified.",title:""})
}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Selected node is not User Task.",title:""})
}}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"No task selected.",title:""})
}},editTaskForm:function(){var a=ORYX.Config.FACADE.getSelection();
if(a){if(a.length!=1){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Invalid number of nodes selected..",title:""})
}else{var c=a[0].properties["oryx-tasktype"];
if(c&&c=="User"){var b=a[0].properties["oryx-taskname"];
if(b&&b.length>0){b=b.replace(/\&/g,"");
b=b.replace(/\s/g,"");
ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Task Name not specified.",title:""})
}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Selected node is not User Task.",title:""})
}}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"No task selected.",title:""})
}},editProcessForm:function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.id");
if(b&&b!=""){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Process Id not specified.",title:""})
}},generateTaskForms:function(){Ext.Ajax.request({url:ORYX.PATH+"taskforms",method:"POST",success:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:"Successfully generated process and task form templates.",title:""})
}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"<p>Failed to generate process and task form templates.</p>",title:""})
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING}});
ORYX.CONFIG.TASKFORMS_URL=function(b,a){if(b===undefined){b=ORYX.UUID
}if(a===undefined){a=ORYX.PROFILE
}return ORYX.PATH+"taskforms?uuid="+b+"&profile="+a
}
}});