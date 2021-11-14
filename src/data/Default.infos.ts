import { IDefaultInfo } from "../types/IDefaultInfos";

/**
 * Objeto padrão para o retorno de infos dentro da aplicação
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
            success: "🚀 Zip sendo preparado"
        }
    }
}


export { DefaultInfos };