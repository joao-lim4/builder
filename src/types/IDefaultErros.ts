interface IValidateMessage {
    default: {
        message: string
        match: string
    }
}

interface IDefaultErros {
    validate: IValidateMessage
}

export { IDefaultErros }
