export interface IExecutable<TRes> {
  execute(data?: unknown): Promise<TRes>;

  abort(): void;
}
