import { HttpException } from '@nestjs/common'

/**
 * 参考
 * https://cloud.tencent.com/document/product/213/30435
 */
export enum ErrorCode {
  // 服务错误
  ServerError = 'ServerError',
  // 参数错误
  UnknownParameter = 'UnknownParameter',
  // 参数错误
  InvalidParameter = 'InvalidParameter',
  // 参数值错误
  InvalidParameterValue = 'InvalidParameterValue',
  // 请求超限
  RequestLimitExceeded = 'RequestLimitExceeded',
  // 资源
  ResourceNotFound = 'ResourceNotFound',
  // 不支持的操作
  UnsupportedOperation = 'UnsupportedOperation',
  // 权限不足
  UnauthorizedOperation = 'UnauthorizedOperation',
  // 操作失败
  FailedOperation = 'FailedOperation',
}

export interface ErrBody {
  code: string,
  message: string,
}

export class CommonException extends HttpException {
  code: string

  constructor({code, message }:ErrBody) {
    super(
      message,
      200
    );
    this.code = code;
  }
}

export class BadRequestException extends CommonException {
  constructor(msg?: string) {
    super({
        code: 'BadRequest',
        message: msg || '请求参数异常',
      }
    )
  }
}

export class RecordExistException extends CommonException {
  constructor(msg?: string) {
    super({
        code: 'RECORD_EXIST',
        message: msg || '记录已存在',
      }
    )
  }
}

export class RecordNotExistException extends CommonException {
  constructor(msg?: string) {
    super({
        code: 'RECORD_EXIST',
        message: msg || '记录不存在',
      }
    )
  }
}

// 没有权限访问的错误
export class UnauthorizedOperation extends CommonException {
  constructor(msg?: string) {
    super({
        code: ErrorCode.UnauthorizedOperation,
        message: msg || '未授权的操作',
      }
    )
  }
}

export class UnsupportedOperation extends CommonException {
  constructor(msg?: string) {
    super({
        code: ErrorCode.UnsupportedOperation,
        message: msg || '不支持的操作',
      }
    )
  }
}

export class FailedOperation extends CommonException {
  constructor(msg?: string) {
    super({
        code: ErrorCode.FailedOperation,
        message: msg || '操作失败',
      }
    )
  }
}