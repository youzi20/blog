import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { LiteralUnion } from '@/types/__utils__';

interface FormProps {
    onSubmit?: (value, error) => any
}   

interface FormItemProps {
    name?: string
    required?: boolean
    message?: string | React.ReactNode
    onChange?: (val) => void
}

interface FormInterface extends React.FC<FormProps> {
    Item: React.FC<FormItemProps>;
}

interface BaseProps {
    placeholder?: string
    type?: LiteralUnion<
        | 'text'
        | 'password',
        string
    >
    name?: string
}

type InputProps = {

} & BaseProps


const FormContext = createContext({ addFeildEffects(name, effects) { } });
const FormItemContext = createContext({ name: null, status: null });


export const Form: FormInterface = props => {
    const formNames = useRef({});
    const feildEffects = useRef<any>({});

    const { onSubmit, ...other } = props;

    const addFeildEffects = (name, effects) => {
        feildEffects.current[name] = effects;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let values, errors;
        
        // @ts-ignore
        Object.entries(feildEffects.current).forEach(([key, { onValidate }]) => {
            const value = formNames.current[key];

            const validateRes = onValidate(value);

            if (validateRes.error) {
                if (!errors) errors = {};
                errors[key] = validateRes;
            } else {
                if (!values) values = {};
                values[key] = value;
            }
        });

        onSubmit && onSubmit(values, errors);
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        formNames.current[name] = value;
        feildEffects.current[name].onChange(value);
    };

    return <FormContext.Provider value={{ addFeildEffects }}>
        <form autoComplete="off" onChange={onChange} onSubmit={handleSubmit} {...other} />
    </FormContext.Provider>
};

Form.Item = styled(({ className, name, children, required, message, onChange: propsOnChange, ...other }) => {
    const [status, setStatus] = useState("");
    const [mssage, setMessage] = useState("");
    const { addFeildEffects } = useContext(FormContext);

    const onChange = (value) => {
        onValidate(value);
        propsOnChange && propsOnChange(value);
    }

    const onValidate = (value) => {
        if (required && !value) {
            const msg = message || name + "为必填字段";

            setStatus("error");
            setMessage(msg);
            return { error: true, messge: msg };
        }

        setStatus("");
        setMessage("");
        return {}
    }

    useEffect(() => {
        if (name) {
            addFeildEffects(name, { onChange, onValidate })
        }
    }, []);

    return <div className={"youzi-form-item " + (status ? `youzi-form-${status} ` : "") + className} {...other} >
        <FormItemContext.Provider value={{ name, status }}>
            {children}
        </FormItemContext.Provider>
        {mssage && <div className="youzi-form-help">{mssage}</div>}
    </div>
})`
&:not(:last-child) {
    margin-bottom: 18px;
}

.youzi-form-help {
    font-size: 12px;
    line-height: 20px;
    margin-top: 5px;
}

&.youzi-form-error {
    .youzi-form-content{
        border-color: #ff3000;
    }

    .youzi-form-help {
        color: #ff3000;
    }
}
`;

const FormStyle = styled(({ className, placeholder, children, isFocus, ...other }) => {
    return <div className={"youzi-form-content " + className} {...other}>
        <label className={isFocus ? "youzi-form-above" : ""}>{placeholder}</label>
        {children}
    </div>
})`
position: relative;
border-radius: 4px;
border: 1px solid var(--borderColor);
background: var(--bgSecondary);
overflow: hidden;

label {
    position: absolute;
    top: 16px;
    left: 0;
    font-size: 16px;
    color: var(--textSecondary);
    line-height: 26px;
    padding-left: 12px;
    background: inherit;
    transition: all .1s ease;
    pointer-events: none;
    
    &.youzi-form-above {
        top: 0;
        width: 100%;
        font-size: 12px;
    }
}
`;


export const Input: React.FC<InputProps> = styled(({ className, placeholder, type = "text", ...other }) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");

    const { name } = useContext(FormItemContext);

    return <FormStyle placeholder={placeholder} isFocus={focus || value}>
        <div className={"youzi-form-input " + className}>
            <input
                type={type}
                name={name}
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(e) => setValue(e.target.value)}
                {...other}
            />
        </div>
    </FormStyle>
})`
input {
    display: block;
    width: 100%;
    font-size: 14px;
    color: var(--textNormal);
    padding: 28px 12px 10px 12px;
}
`;


export const Textarea: React.FC<InputProps> = styled(({ className, placeholder, ...other }) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");

    const { name } = useContext(FormItemContext);

    return <FormStyle placeholder={placeholder} isFocus={focus || value}>
        <div className={"youzi-form-textarea " + className} {...other}>
            <textarea
                rows={3}
                name={name}
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    </FormStyle>
})`
textarea {
    display: block;
    width: 100%;
    font-size: 16px;
    color: var(--textNormal);
    padding: 28px 12px 10px 12px;
}
`;

export const Submit: React.FC<InputProps> = styled(({ className, ...other }) => {
    return <button className={"youzi-form-submit " + className} type="submit" {...other} />
})`
width: 100%;
line-height: 44px;
font-size: 16px;
font-weight: bold;
color: #fff;
border-radius: 4px;
background: linear-gradient(to right, #ff9900, #fb005d);
transition: all .3s ease;
opacity: 0.75;
cursor: pointer;

&:hover {
    opacity: 1;
}
`;