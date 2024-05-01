export interface IService<P, R> {
    execute(parameter?: P): Promise<R>;
}
