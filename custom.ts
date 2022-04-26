/**
 * 表示一个抽象类型
 */
 interface Abstract<T extends object = object> extends Function {
    /** 实例原型 */
    readonly prototype: T;
  }
  
  /**
  * 表示一个可构造类型
  */
   interface Constructable<T extends object = object> extends Abstract<T> {
    new (...args: any[]): T;
  }
  
  /**
  * 表示一个 class
  */
   type Class<T extends object = object> = Abstract<T> | Constructable<T>;
  

  //  type Record<K extends string | number | symbol, T> = { [P in K]: T; }
  /**
  * 
  * 表示一个类型
  */
   type Type<T = any> = T extends object ? Class<T> : Primitive<T>;