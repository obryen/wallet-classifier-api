import { INestApplication } from "@nestjs/common";
import { APIKeyGuard } from "../guards/api-key.guard";

export default function (app: INestApplication) {
    app.useGlobalGuards(new APIKeyGuard());
}
