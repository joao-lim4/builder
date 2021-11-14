
interface IBuildSuccess {
    build: {
        spinner: string,
        success: string
    }
}

interface IZipSuccess {
    zip: {
        success: string,
    }
}

interface IMoveSuccess {
    zipMove: {
        success: string,
    }
}

interface ISuccessMessages {
    buildAndZipSuccess: string
}   

interface IServerSuccess {
    server: {
        default: string
    }
}

interface IDefaultSuccess extends IBuildSuccess, IZipSuccess, ISuccessMessages, IMoveSuccess, IServerSuccess {};


export { IDefaultSuccess };