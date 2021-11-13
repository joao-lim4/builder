interface IErrorValidate {
    status: boolean
    message: string
}

interface IValidateType {
    object: Object
    match: string
    messageError?: string
}

const useValidateObject = (
    validates: Array<IValidateType>
): Array<IErrorValidate> => {
    const returnData: IErrorValidate[] = []

    if (validates.length) {
        validates.forEach(validate => {
            if (validate.match in validate.object === false) {
                returnData.push({
                    message: validate.messageError
                        ? validate.messageError
                        : `O campo ${validate.match} não foi encontrado`,
                    status: false
                })
            }
        })
    }

    return returnData
}

export { useValidateObject }
