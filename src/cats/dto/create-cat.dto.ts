import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly size: string;
}
