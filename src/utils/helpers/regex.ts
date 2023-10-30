export const lettersAndNumbersRegex = /^[a-zA-Z0-9]+$/;
export const lettersAndNumbersDashUnderscoreRegex = /^[a-zA-Z0-9_-]+$/;
export const lettersNumbersSpaceRegex = /^[a-zA-Z0-9 _-]+$/;
export const lettersAndSpaceRegex = /^(?!\s+$)[a-zA-Z ]+$/;
export const numberRegex = /^\d+$/;
export const addressRegex = /^(?!\s+$)[a-zA-Z0-9$&+,:;=?@# ]+$/;
export const emailRegex = /^\S+@\S+\.\S+$/;

export const EMAIL_REGEX =
  /^\s*(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
export const LETTER_REGEX = /^[a-zA-Z\s]+$/;
export const PHONE_NUMBER = /(^\s*[+]62|)+([\d ]*$)/;
export const PHONE_REGEX = /^\+?[0-9]*?$/;
export const INT_NUMBER = /^[0-9]*?$/;
export const FLOAT_NUMBER = /^[0-9]*?\.?[0-9]*?$/;
export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const NUMBER_REGEX = /^-?\d*(\.\d*)?$/;
export const numberWithPrefix = /(^\s*[+]62|)+([\d ]*$)/;
export const NUMBER_PERCENT = /([\d ]*$|)?\%$/;
