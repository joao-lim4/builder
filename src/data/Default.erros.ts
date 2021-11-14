import { IDefaultErros } from '../types/IDefaultErros'


/**
 * Objeto padrao para o retorno de erro dentro da aplicacao
 */
const DefaultErros: IDefaultErros = {
    validate: {
        default: {
            match: '${flag}',
            message:
                'A flag ${flag} não foi passada, essa é flag obrigatoria. Rode builder --helpe.'
        }
    },

    build: {
        sequenceErrorBuild: {
            spinner: "Erro ao gerar o build",
            sequence: [
                "Erro ao gerar o build",
                "---------------------------"
            ]
        }
    },

    php: {
        default: "Erro ao tentar subir um servidor local, não foi possivel encontrar o caminho para o binario do php",
        win: {
            warning: "Sugestões",
            sequence: [
                "Rode echo $PAHT no seu CMD e verifique se o php está la.",
                "Se não tiver nada na em seu path. tente instalar o apache por exemplo",
                "Se ja tiver o apache, vevrifique em seus arquivos e adicione o php em seu path"
            ]
        },
        linux: {
            warning: "Sugestões",
            sequence: [
                "Se não tiver o php instalado na sua maquina, tente rodar sudo apt-get install php7.4 ou a versão que você desejar"
            ]
        },
    },

    ngrok: {
        default: "Erro ao tentar subir um servidor local, não foi possivel encontrar o caminho para o binario do ngrok",
        info: "Acesse o site https://ngrok.com/ e faça a instalação"
    },

    zipMoveErro: {
        default: "Erro ao mover o arquivo, não foi possivel prosseguir com o comando!"
    },

    openServe: "Erro ao subir o serivodor!"
}

export { DefaultErros }
