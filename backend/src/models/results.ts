export class HttpResult<T = any> {
    public readonly success: boolean;
    public readonly data: T;
    public readonly error: string;

    private constructor(success: boolean, data: T, error: string) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    public static success<T = any>(data: T) {
        return new HttpResult<T>(true ,data, "");
    }

    public static fails(error: string) {
        return new HttpResult(false, null, error);
    }
}