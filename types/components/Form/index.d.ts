import React from 'react';
import { LiteralUnion } from '../../types';
interface BaseProps {
    placeholder?: string;
    type?: LiteralUnion<'text' | 'password', string>;
    name?: string;
}
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    Item: React.FC<{}>;
    onSubmit: (values: any, errors: any) => void;
}
declare type InputProps = {} & BaseProps;
export declare const Input: React.FC<InputProps>;
export declare const Textarea: React.FC<InputProps>;
export declare const Submit: React.FC<InputProps>;
export declare const Form: React.FC<FormProps>;
export {};
