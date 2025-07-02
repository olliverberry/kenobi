import { Injectable } from '@nestjs/common';
import { User } from 'src/lib/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      businessUnit: 'sales',
      title: 'Sales Manager',
    },
    {
      userId: 2,
      email: 'maria@example.com',
      firstName: 'Maria',
      lastName: 'Smith',
      businessUnit: 'engineering',
      title: 'Software Engineer',
    },
    {
      userId: 3,
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      businessUnit: 'engineering',
      title: 'Software Engineer',
    },
    {
      userId: 4,
      email: 'stuart.mehrens@gmail.com',
      firstName: 'Stuart',
      lastName: 'Mehrens',
      businessUnit: 'sales-engineering',
      title: 'Senior Sales Engineer',
    },
    {
      userId: 5,
      email: 'glorence@launchdarkly.com',
      firstName: 'Greg',
      lastName: 'Lorence',
      businessUnit: 'sales-engineering',
      title: 'Sr. Manager, Solutions Engineering',
    },
  ];

  findOne(email: string, password: string): User | undefined {
    console.log(email, password);
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  create(email: string, firstName: string, lastName: string): User {
    const newUser: User = {
      userId: this.users.length + 1,
      email: email,
      firstName: firstName,
      lastName: lastName,
      businessUnit: 'Engineering',
      title: 'Software Engineer',
    };
    this.users.push(newUser);
    return newUser;
  }
}
