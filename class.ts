/** typescript 一个强大的地方就是对面向对象的支持，使开发大型应用更加丝滑 */
abstract class UserInfo {
    abstract getName():string;

    getSex(){
        return '1'
    }
}
class HumanAction {
   run(){
   }
   call(){}
}
class User<T> extends HumanAction implements UserInfo {
   /** implements抽象类的方法必须实现 */
   public getName(): string {
       return 'user'
   }

   public getSex(): string {
       return '1'
   }

   readonly age = 16
   /** 私有成员 */
   private id?: number;
   /** name */
   public name!: string;
    /** 静态成员 */
   static role = 'mate';
   /** 获取用户id */
   get useId(){
       return this.id
   }
   /** 构造起 */
   constructor(){
       super();
   }

   /** set方法 */
   set useId(args:number){
       this.id = args
   }
   /** 函数重载 */
   add(a: string, b: number): string;
   add(a: number, b: string): string;

   add(a: any, b: any) {
     if (typeof a === "string" || typeof b === "string") {
       return a.toString() + b.toString();
     }
     return a + b;
   }

   protected request = ()=>{
       return '111';
   }

}  


const data: User<string> = new User() 

User.role

console.log(data)
