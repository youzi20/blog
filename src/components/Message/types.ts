import { LiteralUnion } from '../__utils__';


export interface IMessageConfig {
    name: LiteralUnion<
    | "youzi_success",
    string
    >
    message?: string | React.ReactNode
}