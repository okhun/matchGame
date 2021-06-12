export class Route{
    _name: any;
    _path: any;
    _handler: any;
    constructor(name: any,path: any,handler: any){
        this.name=name,
        this.path=path,
        this.handler=handler
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name=name;
    }
    get path(){
        return this._path
    }
    set path(path){
        this._path=path;
    }
      get handler(){
        return this._handler
    }
    set handler(handler){
        this._handler=handler;
    }
}