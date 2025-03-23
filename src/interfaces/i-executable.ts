export interface IExecutable<TRes> {
  execute(data?: any): Promise<TRes>;
}
