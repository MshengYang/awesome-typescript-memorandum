
function StyleTheme(constructor:{ new (...args: any[]): {} }):any{
    return class  extends constructor {
        Theme = 'dark';
    }
}
function require(){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(propertyKey)
      };
}

function params(target: Object, propertyKey: string | symbol, parameterIndex: number){
    console.log(parameterIndex)
}

@StyleTheme
class Info{

    private age = 16
    
    @require()
    save(){
        return 111;
    } 

    off(@params args:string){
        return args
    }
}

const newInfo  = new Info()


newInfo.off('1asfas')

console.log((newInfo as any).Theme)


newInfo.save()
