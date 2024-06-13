
//TODO revisar la api model.
export class ApiResponseModel{
    constructor(status, statusCode, data, message, error){
        this._status = status;
        this._statusCode = statusCode;
        this._data = data || [];
        this._message = message || '';
        this._error = error || [];
        this.timestamp =  new Date().toISOString();;
    }
    
    static SUCCESS = 'success';
    static ERROR = 'error';
    static FAIL = 'fail';

    get statusCode(){
        return this._statusCode;
    }

    toJSON() {
        return {
            status: this._status,
            statusCode: this._statusCode,
            data: this._data,
            message: this._message,
            error: this._error,
            timestamp: this.timestamp
        };
    }
}