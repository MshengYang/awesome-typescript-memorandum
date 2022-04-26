
interface Response {
  get size(): number;
  set size(value: number);
}
 
interface JSonResponse<T> {
  version: number;

  outIfStock?: T;

  readonly data: string;

  update: (args: string) => void;

  update1(args: string): void;

  (): JSonResponse;

  new (): JSonResponse;

  [key: string]: any;
}

/**
 * 借口可以继承
 */
interface Result extends Response, JSonResponse {}

// type ad= {} 

/**
 * 接口合并
 * 重要的问题，接口可以合并，所以很多时候推荐使用type 字面量，因为不会合并
 *  */
interface Result {
  error: Error;
}

let result!: Result;
result.error;
result.data;


/** 接口实现  */
// class ResultClass implements Result {

// }

/** 函数类型可以进行重载 */
interface fun {
  (args: string): number;
  (args: number): number;
}

const a:fun = (b:number)=>{
    return b
} 
/** 泛型在接口上也是适用的 */
