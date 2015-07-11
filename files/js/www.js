var project = require('pillars');
var routes = require('./routes/routes')
var jade = require('jade');

project.services.get('http').configure({port:3000}).start();

for(var i=0; i<routes.length;i++){
  project.routes.add(routes[i]);
  console.log("path:"+routes[0].path);
}


// Internacionalization config
i18n.languages = ['es'];

//public directory route
var public = new Route({
  id:'public',
  path:'/*:path',
  directory:{
    path:'./www',
    listing:true
  }
});
project.routes.add(public);

//setup template views
var templated = global.templated;
templated.addEngine('jade',function compiler(source,path){
  return jade.compile(source,{filename:path,pretty:false,debug:false,compileDebug:false});
});