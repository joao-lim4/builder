import { IDefaultSuccess } from "../types/IDefaultSuccess";

/**
 * Objeto padrão para o retorno de success dentro da aplicação
*/
const DefaultSuccess: IDefaultSuccess = {
    build: {
        spinner: "Build finalizada!",
        success: "🎉 Build gerada com sucesso!",
    },
    zip: {
        success: "Zip gerado com sucesso!",
    },

    buildAndZipSuccess: "🎉 Build e Zip gerados com sucesso! Agora abra o seu diretório para visualizar o zip",

    zipMove: {
        success: "🎉 Arquivo movido com sucesso!"
    },

    server: {
        default: "🎉 Servidor rodando!"
    }
}


export { DefaultSuccess };