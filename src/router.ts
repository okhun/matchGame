import {Route} from "./route";

export class Router{
    _root: any;
    _mode: any;
    _routes: any;
    // mode: string;
    // routes: never[];
    // root:string;
    constructor(){
        this.mode='history'
        this.routes=[]
        this.root='/'
    }
    get root(){
        return this._root;
    }
    set root(val){
        this._root=val;
    }
    get mode(){
        return this._mode;
    }
    set mode(val){
        this._mode=(val=="history"&& window.history.pushState)?"history":"hash"
    }
    get routes(){
        return this._routes;
    }
    set routes(val){
        this._routes=val;
    }

    add(route: { name: any; path: any; handler: any; }){
        this.routes.push(new Route(route.name,route.path,route.handler))
        return this;
    }
    navigate(route){
        route=route? route:"";
        this.match(route);
    }
    match(route){
        for(var i=0;i<this.routes.length;i++){
            let paramNames: any[]=[];
            let regexPath=this.routes[i].path.replace(/([:*])(\w+)/g,function(full,colon,name){
                paramNames.push(name);
                return '([^\/]+)';
            })+'(?:\/|S)';

            let routeMatch=route.match(new RegExp(regexPath))
            if(routeMatch!==null){
                var params=routeMatch.slice(1,routeMatch.length).reduce((params,value,index)=>{
                    if(params===null) params={};
                    params[paramNames[index]]=value;
                    return params;
                },null);
                if(params===null){
                    this.routes[i].handler()
                }else{
                    this.routes[i].handler(params);
                }
                this.location(route);
            }
        }
    }
    location(route){
        if(this.mode==='history'){
            window.history.pushState(null,null,this.root+route)
        }
        else{
            route = route.replace(/^\/,'').replace(/\/$/,'')

        }
    }

}