import { Module } from '@nestjs/common';
import { ControllerModule } from './application/controllers/controller.module'; 
import { PrismaService } from './application/database/prisma.client';

@Module({
  imports: [ControllerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
