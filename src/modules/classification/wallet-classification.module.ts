import { Module } from '@nestjs/common';
import ClassificationService from './wallet-classification.service';
import WalletClassificationController from './wallet-classification.controller';
import TokenConfigurationModule from '../token-configuration/token-configuration.module';




@Module({
    imports: [TokenConfigurationModule],
    providers: [ClassificationService],
    exports: [ClassificationService],
    controllers: [WalletClassificationController]
})
export class ClassificationModule { }
