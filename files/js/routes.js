var indexController=require('../controllers/indexController')

var routes=[];
//function to add routes in the route array
function createRoute(routeOpcs,fn){
  routes.push(new Route(routeOpcs,fn));
};



createRoute({
  id: 'Home',
  path: '/',
  method: ['get','post']
},indexController.index);



module.exports=routes;
