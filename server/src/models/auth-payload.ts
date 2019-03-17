import { ApiModel, ApiModelProperty } from 'swagger-express-ts'

@ApiModel({
    description: 'Authentication payload',
    name: 'AuthPayload',
})
export class AuthPayload {
    @ApiModelProperty({
        description: 'User email',
        required: true,
        example: ['john@test.com'],
    })
    public username: string

    @ApiModelProperty({
        description: 'User password',
        required: true,
        example: ['123456789'],
    })
    public password: string
}
