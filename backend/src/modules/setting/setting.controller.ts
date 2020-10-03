import { 
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SettingService } from './setting.service'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard'
import { SettingDTO } from './setting.dto';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService){} 

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.settingService.getOne(id);
  }

  @Get()
  async getAll() {
    return await this.settingService.getAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateOne(@Param('id') id: string, @Body() setting: SettingDTO) {
    return await this.settingService.updateOne(id, setting);
  }
}