/** 高频使用的类型 */

/** Partial<Type>构造全部类型的子集  */
interface A{
    x:number;
    y:number
}

let todo : Partial<A>

todo = {
    x:1
} /** oK */

/** required */
interface B {
    x?: number;
    y: number;
}

let obj1 :  Required<B>;

// obj1 = {y: 1}

/** Readonly<Type> */

let obj2 :  Readonly<B>

// obj2.x = 1;

/** Record<T,K> 一般不用object 而用这个 */

// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
// object
const a: Record<string,string> = {'syaf':'sbfjasg'};



/** ReturnType<T> */
function add1(a: number, b: number) {
    
    return a + b;
  }
  
let c :ReturnType<typeof add1>;

/** Parameters<Type>，获取函数的操作类型 */

let d:Parameters<typeof add1>


/** 其他各种类型，查看相关文档 */
