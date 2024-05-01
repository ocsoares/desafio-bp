export interface IController<R> {
    handle(...args: any[]): Promise<R>;
}
