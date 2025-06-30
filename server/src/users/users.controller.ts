import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '../lib/api-response.interface';

@Controller('users')
export class UsersController {
    private readonly users: any[] = [
        {
            kind: "multi",
            user: {
                key: "stuart@semgrep.com",
                email: "stuart@semgrep.com",
                name: "Stuart",
                lastName: "Mehrens",
                businessUnit: "sales-engineering",
            },
            organization: {
                key: "semgrep",
                name: "Semgrep",
            }
        },
        {
            kind: "multi",
            user: {
                key: "anakin@semgrep.com",
                email: "anakin@semgrep.com",
                name: "Anakin",
                lastName: "Skywalker",
                businessUnit: "sales-engineering",
            },
            organization: {
                key: "semgrep",
                name: "Semgrep",
            }
        },
        {
            kind: "multi",
            user: {
                key: "luke@semgrep.com",
                email: "luke@semgrep.com",
                name: "Luke",
                lastName: "Skywalker",
                businessUnit: "sales",
            },
            organization: {
                key: "semgrep",
                name: "Semgrep",
            }
        },
        {
            kind: "multi",
            user: {
                key: "leia@semgrep.com",
                email: "leia@semgrep.com",
                name: "Leia",
                lastName: "Organa",
                businessUnit: "engineering",
            },
            organization: {
                key: "semgrep",
                name: "Semgrep",
            }
        },
        {
            kind: "multi",
            user: {
                key: "han@semgrep.com",
                email: "han@semgrep.com",
                name: "Han",
                lastName: "Solo",
                businessUnit: "engineering",
            },
            organization: {
                key: "semgrep",
                name: "Semgrep",
            }
        }
    ]

    @Get('random')
    getRandomUser(): ApiResponse<any> {
        return {
            success: true,
            data: this.users[Math.floor(Math.random() * this.users.length)]
        }
    }
}
