export interface Clickable {
    onClick?: <T>(params: T) => void;
    onClickSuccess?: <T>(params: T) => void;
    onClickError?: <T>(params: T) => void;
}