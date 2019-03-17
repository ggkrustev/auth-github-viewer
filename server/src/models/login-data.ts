import { ApiModel, ApiModelProperty } from 'swagger-express-ts'

@ApiModel({
    description: 'Login data response',
    name: 'LoginData',
})
export class LoginData {
    @ApiModelProperty({
        description: 'User name',
        required: true,
        example: ['John Dow'],
    })
    public user: string

    @ApiModelProperty({
        description: 'JWT',
        required: true,
    })
    public token: string
}
