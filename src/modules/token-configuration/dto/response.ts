import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import TokenConfigurationEntity from "../token-configuration.entity";



export class GetTokenConfigurationResponseDTO {
  @ApiProperty({
    isArray: true,
  })
  tokenConfigruations: TokenConfigurationEntity[];
}

export class CreateTokenConfigurationDTO {
  @ApiProperty()
  tokenConfigruation: TokenConfigurationEntity;
}

export class TokenConfigurationDTO {
  @ApiProperty()
  tokenConfigruation: TokenConfigurationEntity;
}
