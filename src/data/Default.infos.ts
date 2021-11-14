import { IDefaultInfo } from "../types/IDefaultInfos";

/**
 * Objeto padrao para o retorno de infos dentro da aplicacao
 */
const DefaultInfos: IDefaultInfo = {
    confirm: {
        messages: {
            servidorConfirm: "Deseja subir o servidor web, possibilitando o download do zip??"
        }
    },

    infos: {
        zip: {
            preparate: "Preparando para fazer o zip",
            success: "🚀 Zip sendo prepado"
        }
    }
}


export { DefaultInfos };