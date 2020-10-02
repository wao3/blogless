import { 
  IsString, 
  IsBoolean,
  IsArray,
  IsIn,
} from 'class-validator'
export class BlogDTO{
  @IsString()
  title: string

  @IsString()
  content:string

  // 内容类型，分为 html (富文本)和 markdown
  @IsString()
  @IsIn(['html', 'markdown'])
  contentType: 'html' | 'markdown'

  // 文章类型：博客（blog），草稿（draft），页面（page）
  @IsString()
  @IsIn(['blog', 'draft', 'page'])
  articleType: 'blog' | 'draft' | 'page'

  @IsBoolean()
  visible: boolean

  @IsBoolean()
  enableComment: boolean

  // 自定义id
  _id: string

  category: string

  @IsArray()
  tags: string[]
}