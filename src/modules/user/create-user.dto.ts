export class CreateUserDto {
  first_name: string;

  gender: string;

  image_url: string;

  last_name: string;

  locale: string;

  [platform_id: string]: string;
}
