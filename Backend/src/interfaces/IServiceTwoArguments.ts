export interface IServiceTwoArguments<P, O, R> {
    execute(parameter: P, otherParameter: O): Promise<R>;
}
