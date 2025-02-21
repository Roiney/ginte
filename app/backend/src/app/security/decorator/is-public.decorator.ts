import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
