import { IDefaultSuccess } from "../types/IDefaultSuccess";

/**
 * Objeto padrao para o retorno de success dentro da aplicacao
*/
const DefaultSuccess: IDefaultSuccess = {
    build: {
        spinner: "Build finalizada!",
        success: "🎉 Build gerada com sucesso!",
    },
    zip: {
        success: "Zip gerado com sucesso!",
    },

    buildAndZipSuccess: "🎉 Buil e Zip gerados com sucesso! Agora abra o seu diretorio para vizualizar o zip",

    zipMove: {
        success: "🎉 Arquivo movido com sucesso!"
    },

    server: {
        default: "🎉 Servidor rodando!"
    }
}


export { DefaultSuccess };