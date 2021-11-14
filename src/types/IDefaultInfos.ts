
interface IConfirmMessages {
    confirm: {
        messages: {
            servidorConfirm: string
        }
    }
}

interface IInfosMessages {
    infos: {
        zip: {
            preparate: string,
            success:  string
        }
    }
}

interface IDefaultInfo extends IConfirmMessages, IInfosMessages {}


export { IDefaultInfo };