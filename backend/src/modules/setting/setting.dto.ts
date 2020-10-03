import { IsNotEmpty } from 'class-validator'

export class SettingDTO {
  _id: string

  @IsNotEmpty()
  data: any
}