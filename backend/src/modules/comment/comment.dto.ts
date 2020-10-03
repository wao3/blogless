import { IsBoolean, IsIn, MaxLength, MinLength } from 'class-validator'

export class CommentDTO {
  _id: string

  @IsIn(['html', 'markdown'])
  contentType: 'html' | 'markdown'

  @MaxLength(400)
  @MinLength(1)
  content: string

  @MaxLength(20)
  @MinLength(1)
  nickname: string

  // 是否嵌套（是否是评论的回复）
  @IsBoolean()
  isNested: boolean

  // 评论嵌套，该数组存放的是回复的id
  comments: string[]

  // 回复的对象的id
  replyTo: string

  email: string

  isVisible: boolean
}