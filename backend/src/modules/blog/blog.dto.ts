import { IsNotEmpty } from 'class-validator'
export class BlogDTO{
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  content:string

  // 内容类型，分为 html (富文本)和 markdown
  @IsNotEmpty()
  contentType: 'html' | 'markdown'

  // 文章类型：博客（blog），草稿（draft），页面（page）
  @IsNotEmpty()
  articleType: 'blog' | 'draft' | 'page'

  @IsNotEmpty()
  visible: boolean

  // 自定义id
  _id: string

  category: string
}