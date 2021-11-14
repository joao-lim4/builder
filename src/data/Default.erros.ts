import { IDefaultErros } from '../types/IDefaultErros'


/**
 * Objeto padrão para o retorno de erro dentro da aplicação
 */
const DefaultErros: IDefaultErros = {
    validate: {
        default: {
            match: '${flag}',
            message:
                'A flag ${flag} não foi passada, essa é flag obrigatória. Rode builder --help.'
        }
    },

    build: {
        sequenceErrorBuild: {
            spinner: "Erro fatal ao gerar o build",
            sequence: [
                "Erro ao gerar o build",
                "---------------------------"
            ]
        }
    },

    php: {
        default: "Erro ao tentar subir um servidor local, não foi possível encontrar o caminho para o binário do php",
        win: {
            warning: "Sugestões",
            sequence: [
                "Rode echo $PAHT no seu CMD e verifique se o php está lá.",
                "Se não tiver nada na em seu path. Tente instalar o apache por exemplo",
                "Se já tiver o apache, verifique em seus arquivos e adicione o php em seu path"
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
        default: "Erro ao tentar subir um servidor local, não foi possível encontrar o caminho para o binário do ngrok",
        info: "Acesse o site https://ngrok.com/ e faça a instalação"
    },

    zipMoveErro: {
        default: "Erro ao mover o arquivo, não foi possivel prosseguir com o comando!"
    },

    openServe: "Erro ao subir o servidor!"
}

export { DefaultErros }
