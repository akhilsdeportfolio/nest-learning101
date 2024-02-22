import { IsNotEmpty, Length } from 'class-validator';

export class UserData {
  @IsNotEmpty({})
  @Length(3)
  name: string;
  @IsNotEmpty({})
  @Length(10)
  breed: string;
  @IsNotEmpty({})
  age: number;
}
