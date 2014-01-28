if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Config.Dictionary={};
if(!ORYX.Dictionary){ORYX.Dictionary={}
}ORYX.Dictionary.DictionaryDef=Ext.data.Record.create([{name:"name"},{name:"aliases"},{name:"description"}]);
ORYX.Dictionary.DictionaryProxy=new Ext.data.MemoryProxy({root:[]});
ORYX.Dictionary.Dictionaryitems=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},ORYX.Dictionary.DictionaryDef),proxy:ORYX.Dictionary.DictionaryProxy,sorters:[{property:"name",direction:"ASC"}]});
ORYX.Dictionary.Dictionaryitems.load();
ORYX.Plugins.Dictionary=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DICTIONARY_ADD,this.initAndShowDictionary.bind(this));
this.initDictionary();
this.facade.offer({name:"Dictionary",functionality:this.initAndShowDictionary.bind(this),group:ORYX.I18N.View.jbpmgroup,icon:ORYX.BASE_FILE_PATH+"images/dictionary.png",description:"Process dictionary",index:8,minShape:0,maxShape:0,isEnabled:function(){return true
}.bind(this)})
},initAndShowDictionary:function(a){this.initDictionary(this.showDictionary,a)
},initDictionary:function(b,a){Ext.Ajax.request({url:ORYX.PATH+"dictionary",method:"POST",success:function(d){try{ORYX.Dictionary.Dictionaryitems.removeAll();
var m=Ext.decode(d.responseText);
if(m.length>0&&m!="false"){for(var g=0;
g<m.length;
g++){var f=m[g];
var l="";
var n="";
var c="";
for(var o in f){var k=o;
var h=f[o];
if(k=="name"){if(h){l=h
}}else{if(k=="aliases"){if(h){n=h
}}else{if(k=="description"){if(h){c=h
}}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error reading Process Dictionary. Invalid item: "+k,title:""})
}}}}ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:l,aliases:n,description:c}))
}}if(a&&a.entry){if(a.entry.length>0){ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:a.entry,aliases:"",description:""}))
}}ORYX.Dictionary.Dictionaryitems.commitChanges();
if(b){b()
}}catch(j){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error loading Process Dictionary: "+j,title:""})
}}.bind(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error loading Process Dictionary.",title:""})
},params:{action:"load",profile:ORYX.PROFILE,uuid:ORYX.UUID}})
},showDictionary:function(){var k=new Extensive.grid.ItemDeleter();
var g=Ext.id();
var a=new Ext.grid.EditorGridPanel({store:ORYX.Dictionary.Dictionaryitems,id:g,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"name",header:"Name",width:100,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:false})},{id:"aliases",header:"Aliases",width:100,dataIndex:"aliases",editor:new Ext.form.TextField({allowBlank:true})},{id:"description",header:"Description",width:100,dataIndex:"description",editor:new Ext.form.TextField({allowBlank:true})},k]),selModel:k,autoHeight:true,tbar:[{text:"Add New Entry",handler:function(){ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:"",aliases:"",description:""}));
a.fireEvent("cellclick",a,ORYX.Dictionary.Dictionaryitems.getCount()-1,1,null)
}}],clicksToEdit:1});
var n=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(n.evalJSON(),"$.properties.documentation");
var o="";
if(b&&b[0].length>0){o=b[0]
}else{o="No process documentation specified."
}var l=new Ext.Button({text:"Process Documentation",handler:function(){Ext.getCmp("processdocs").setValue(o)
}});
var j=new Ext.Panel({title:"<center>From Documentation</center>",bodyStyle:"padding:5px",autoScroll:false,height:60,items:[l],layoutConfig:{padding:"5",align:"middle"}});
var e=new Ext.Panel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",autoScroll:false,items:[{fieldLabel:"Select",name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;width:100px",itemCls:"ext_specific_window_overflow"}]});
var d=new Ext.Panel({title:"<center>From File</center>",bodyStyle:"padding:5px",autoScroll:false,height:60,items:[e],layoutConfig:{padding:"5",align:"middle"}});
var i=new Ext.Panel({header:false,width:"100%",layout:"column",border:false,layoutConfig:{columns:2,pack:"center",align:"middle"},items:[{columnWidth:0.3,items:j},{columnWidth:0.7,items:d}]});
var c=new Ext.Panel({title:'<center>Highlight text and click on "Add"</center>',width:"100%",height:350,layout:"column",autoScroll:false,bodyStyle:"padding:5px",items:[{id:"processdocs",xtype:"textarea",hideLabel:true,name:"processtextbox",grow:false,width:"100%",height:280,preventScrollbars:false,style:{overflow:"auto"}}],tbar:[{text:"Add",handler:function(){var q=document.getElementById("processdocs");
var p=q.value.substring(q.selectionStart,q.selectionEnd);
if(p&&p.length>0){ORYX.Dictionary.Dictionaryitems.add(new ORYX.Dictionary.DictionaryDef({name:p,aliases:"",description:""}))
}}}]});
var f=new Ext.Panel({id:"processdocspanel",title:"<center>Extract Dictionary entries</center>",layout:"column",items:[i,c],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var h=new Ext.Panel({header:false,layout:"column",items:[{columnWidth:0.4,items:a},{columnWidth:0.6,items:f}]});
var m=new Ext.Window({layout:"anchor",autoCreate:true,title:"Process Dictionary Editor",height:530,width:960,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{fn:function(){m.hide()
}.bind(this)}],items:[h],listeners:{hide:function(){m.destroy()
}.bind(this)},buttons:[{text:"Save",handler:function(){ORYX.Dictionary.Dictionaryitems.commitChanges();
var q=new Array();
var p="";
var r=ORYX.Dictionary.Dictionaryitems.getRange();
for(var s=0;
s<r.length;
s++){q.push(r[s].data)
}p=Ext.util.JSON.encode(q);
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:"Storing Process Dictionary.",title:""});
Ext.Ajax.request({url:ORYX.PATH+"dictionary",method:"POST",success:function(t){try{m.hide()
}catch(u){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error saving Process Dictionary :\n"+u,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error saving Process Dictionary",title:""})
},params:{action:"save",profile:ORYX.PROFILE,uuid:ORYX.UUID,dvalue:p}})
}.bind(this)},{text:"Cancel",handler:function(){m.hide()
}.bind(this)}]});
m.show();
e.items.items[0].getEl().dom.addEventListener("change",function(q){var p=new FileReader();
p.onload=function(r){Ext.getCmp("processdocs").setValue(r.target.result)
};
p.readAsText(q.target.files[0],"UTF-8")
},true)
},_tobr:function(a){return a.replace(/(\r\n|[\r\n])/g,"<br />")
}});