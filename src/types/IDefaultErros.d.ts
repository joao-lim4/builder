interface IValidateMessage {
    validate: {
        default: {
            message: string
            match: string
        }
    }
}

interface IPhpNotFound {
    php: {
        default: string,
        win: {
            warning: string,
            sequence: Array<string>
        }
        linux: {
            warning: string,
            sequence: Array<string>
        }
    }
}

interface INgrokNotFound {
    ngrok: {
        default: string,
        info: string,
    }
}

interface ICommandsNotFound extends IPhpNotFound, INgrokNotFound {}

interface IMoveZipError {
    zipMoveErro: {
        default: string
    }
}


interface IBuildErrorMessage {
    build: {
        sequenceErrorBuild: {
            spinner: string,
            sequence: Array<string>
        }
    }
}

interface IServidorError {
    openServe: string,
}

interface IDefaultErros extends 
    IValidateMessage, 
    IBuildErrorMessage, 
    ICommandsNotFound, 
    IMoveZipError,
    IServidorError
{}

export { IDefaultErros }
