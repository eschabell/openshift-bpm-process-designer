if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.SavePlugin=Clazz.extend({construct:function(a){this.facade=a;
this.vt;
this.facade.offer({name:ORYX.I18N.Save.save,functionality:this.save.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.saveDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return ORYX.REPOSITORY_ID!="guvnor"
}.bind(this)});
this.facade.offer({name:"Enable autosave",functionality:this.enableautosave.bind(this),group:ORYX.I18N.Save.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:"Enable autosave",index:2,minShape:0,maxShape:0,isEnabled:function(){return !ORYX.AUTOSAVE_ENABLED
}.bind(this)});
this.facade.offer({name:"Disable autosave",functionality:this.disableautosave.bind(this),group:ORYX.I18N.Save.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:"Disable autosave",index:3,minShape:0,maxShape:0,isEnabled:function(){return ORYX.AUTOSAVE_ENABLED
}.bind(this)});
this.facade.offer({name:"Copy",functionality:this.copyassetnotify.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/page_copy.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:"Copy asset",index:4,minShape:0,maxShape:0,isEnabled:function(){return ORYX.REPOSITORY_ID!="guvnor"
}.bind(this)});
this.facade.offer({name:"Rename",functionality:this.renameassetnotify.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/rename.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:"Rename asset",index:5,minShape:0,maxShape:0,isEnabled:function(){return ORYX.REPOSITORY_ID!="guvnor"
}.bind(this)});
this.facade.offer({name:"Delete",functionality:this.deleteassetnotify.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/delete2.gif",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:"Delete asset",index:6,minShape:0,maxShape:0,isEnabled:function(){return ORYX.REPOSITORY_ID!="guvnor"
}.bind(this)});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,this.setUnsaved.bind(this));
window.onunload=this.unloadWindow.bind(this)
},setUnsaved:function(){ORYX.PROCESS_SAVED=false
},save:function(){if(!ORYX.PROCESS_SAVED){Ext.Ajax.request({url:ORYX.PATH+"assetservice",method:"POST",success:function(d){try{if(d.responseText&&d.responseText.length>0){var h=d.responseText.evalJSON();
if(h.errors&&h.errors.lengt>0){var i=h.errors;
for(var f=0;
f<i.length;
f++){var b=i[f];
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:b.message,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:"Successfully saved business process",title:"",timeOut:1000,extendedTimeOut:1000});
ORYX.PROCESS_SAVED=true;
if(ORYX.CONFIG.STORESVGONSAVE&&ORYX.CONFIG.STORESVGONSAVE=="true"){var c=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
var k=DataManager.serialize(ORYX.EDITOR.getCanvas().getRootNode().cloneNode(true));
var l=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(l.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:"Successfully saved business process image",title:""})
}.bind(this),failure:function(e,j){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to save business process image.",title:""})
}.bind(this),params:{fsvg:Base64.encode(c),rsvg:Base64.encode(k),uuid:ORYX.UUID,profile:ORYX.PROFILE,transformto:"svg",processid:a}})
}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to save: "+g,title:""})
}}catch(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to save: "+g,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to save.",title:""})
}.bind(this),params:{action:"updateasset",profile:ORYX.PROFILE,assetcontent:ORYX.EDITOR.getSerializedJSON(),pp:ORYX.PREPROCESSING,assetid:ORYX.UUID,assetcontenttransform:"jsontobpmn2"}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:"Process contains no changes since last save.",title:""})
}},saveSync:function(){if(!ORYX.PROCESS_SAVED){var k=ORYX.EDITOR.getSerializedJSON();
var a=new XMLHttpRequest;
var b=ORYX.PATH+"assetservice";
var d="action=updateasset&profile="+ORYX.PROFILE+"&pp="+ORYX.PREPROCESSING+"&assetid="+ORYX.UUID+"&assetcontenttransform=jsontobpmn2&assetcontent="+encodeURIComponent(k);
a.open("POST",b,false);
a.setRequestHeader("Content-type","application/x-www-form-urlencoded");
a.send(d);
if(a.status==200){try{if(a.responseText&&a.responseText.length>0){var h=a.responseText.evalJSON();
if(h.errors&&h.errors.lengt>0){var i=h.errors;
for(var f=0;
f<i.length;
f++){var c=i[f];
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:c.message,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:"Successfully saved business process",title:"",timeOut:1000,extendedTimeOut:1000});
ORYX.PROCESS_SAVED=true
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to save: "+g,title:""})
}}catch(g){alert("error : "+g)
}}}},enableautosave:function(){ORYX.AUTOSAVE_ENABLED=true;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.vt=window.setInterval((function(){this.save()
}).bind(this),30000);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:"Autosave has been enabled.",title:""})
},disableautosave:function(){ORYX.AUTOSAVE_ENABLED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
window.clearInterval(this.vt);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:"Autosave has been disabled.",title:""})
},deleteassetnotify:function(){Ext.MessageBox.confirm("Delete process confirmation","Are you sure you want to delete this process?",function(a){if(a=="yes"){parent.designersignalassetdelete(ORYX.UUID)
}}.bind(this))
},copyassetnotify:function(){Ext.MessageBox.confirm("Copy process confirmation","Would you like to save your changes before copying?",function(a){if(a=="yes"){this.save();
parent.designersignalassetcopy(ORYX.UUID)
}else{parent.designersignalassetcopy(ORYX.UUID)
}}.bind(this))
},renameassetnotify:function(){Ext.MessageBox.confirm("Rename process confirmation","Would you like to save your changes before renaming?",function(a){if(a=="yes"){this.save();
parent.designersignalassetrename(ORYX.UUID)
}else{parent.designersignalassetrename(ORYX.UUID)
}}.bind(this))
},unloadWindow:function(){this.saveSync()
}});