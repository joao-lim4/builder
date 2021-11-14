interface IErrorValidate {
    status: boolean
    message: string
}

interface IValidateType {
    object: Object
    match: string
    messageError?: string
}

/**
 * @name useValidateObject
 * @description Valida um array de objeto do tipo IValidateType retornando um array de erros caso não tenha
 * dado match com alguma key do objeto passado.
 *
 * @param validates array
 * @returns array
 */

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
