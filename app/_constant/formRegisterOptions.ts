import { RegisterOptions } from 'react-hook-form';

export const emailResisterOptions: RegisterOptions = {
    pattern: {
        value: /[\w.-]+@([\w-]+.)com(.tw)*/gs,
        message: '請輸入正確的 Email 格式',
    },
};
