import { GluegunCommand } from 'gluegun'
import { useValidateObject } from '../helpers/ValidateObjectHelper'
import { replaceString } from '../helpers/StringHelper'
import { DefaultErros } from '../data/Default.erros'
import { BuildPanel } from '../panels/BuildLoad.panel'
import { configSpinner } from '../data/SpinerConfig'
import { platform } from 'os'
import { DefaultSuccess } from '../data/Default.success'
import { DefaultInfos } from '../data/Default.infos'

const command: GluegunCommand = {
    name: 'builder',
    description:
        'Builder options --dir< diretório onde está o projeto > --folder< para que é gerada pela build >',
    run: async toolbox => {
        const {
            print: { error, success, muted, spin, info, warning },
            parameters: { options },
            prompt: { ask, confirm },
            generateBuild,
            generateZip,
            moveZip,
            startServer,
            system: { which }
        } = toolbox

        const os = platform()

        /*
         * valida se foi passada as option nescessarias para o comando rodar corretamente
         * nesse caso ira validar --dir --folder
         */
        const validates = useValidateObject([
            {
                match: 'dir',
                object: options,
                messageError: replaceString(
                    DefaultErros.validate.default.match,
                    '--dir',
                    DefaultErros.validate.default.message
                )
            },
            {
                match: 'folder',
                object: options,
                messageError: replaceString(
                    DefaultErros.validate.default.match,
                    '--folder',
                    DefaultErros.validate.default.message
                )
            }
        ])

        if (validates.length) {
            error(validates[0].message)
            return
        }

        const { dir, folder, port } = options

        /*
         * Pergunta qual gerenciador de pacotes ele quer usar, Yarn | Npm
         */
        const { gerenciador } = await ask([
            {
                type: 'select',
                name: 'gerenciador',
                message: 'Escolha qual gerenciador de pacote vai usar?',
                choices: ['Yarn', 'NPM']
            }
        ])

        BuildPanel()

        const spinerBuildeGenerate = spin({
            color: 'yellow',
            spinner: configSpinner.dots,
            text: 'Gerando o build'
        })

        /*
         * Entra no diretorio informado e gera o build do projeto se der error a prop status vai vir como false
         * caso contrario o build e gerado com sucesso
         */
        const buildInstance = await generateBuild(dir, gerenciador)

        /*
         * Erro ao gerar o build, retornara um erro ao usuario e finalizara o comando
         */
        if (!buildInstance.status) {
            spinerBuildeGenerate.fail(
                DefaultErros.build.sequenceErrorBuild.spinner
            )
            DefaultErros.build.sequenceErrorBuild.sequence.forEach(
                errorMessage => {
                    error(errorMessage)
                }
            )
            error(
                buildInstance.content.stdout === ''
                    ? buildInstance.content.stderr
                    : buildInstance.content.stdout
            )
            return
        }

        spinerBuildeGenerate.succeed(DefaultSuccess.build.spinner)
        success(DefaultSuccess.build.success)

        muted('\n')
        info(DefaultInfos.infos.zip.preparate)
        success(DefaultInfos.infos.zip.success)

        const zipSpiner = spin({
            color: 'yellow',
            text: `Gerando o zip do diretorio ${folder}`,
            spinner: configSpinner.dots
        })

        /*
         * Gera o zip usando a lib archiver, possibilidades de implementar o zip padrão caso o usuario tenha
         * o comando zip instalado em seu sistema.
         */
        await generateZip(dir, folder)
        zipSpiner.succeed(DefaultSuccess.zip.success)

        /*
         * Pergunta se o usuario quer subir um servidor http possibilitando baixar o zip gerado
         */
        const servidor = await confirm(
            DefaultInfos.confirm.messages.servidorConfirm
        )

        if (!servidor) {
            muted('\n')
            success(DefaultSuccess.buildAndZipSuccess)
            return
        }

        /*
         * Para subir o servidor e preciso ter o php e o ngrok instalado no sistema, caso o
         * usuario nao tenha, retornara um erro e o comando sera encerrado.
         */
        const php = which('php')
        const ngrok = which('ngrok')

        if (php === null) {
            error(DefaultErros.php.default)
            if (os === 'win32') {
                warning(DefaultErros.php.win.warning)
                DefaultErros.php.win.sequence.forEach(message => {
                    info(message)
                })
                return
            }

            warning(DefaultErros.php.linux.warning)
            info(DefaultErros.php.linux.sequence[0])
            return
        }

        if (ngrok === null) {
            error(DefaultErros.ngrok.default)
            info(DefaultErros.ngrok.info)
            return
        }

        const move = await moveZip(os === 'win32' ? 'move' : 'mv', dir, folder)
        if (move.stderr || move.stdout) {
            error(DefaultErros.zipMoveErro.default)
            return
        }

        success(DefaultSuccess.zipMove.success)

        /*
         * Subira um servidor http na porta 8000
         */
        const serve = await startServer(os, dir, folder,port)
        if (serve.stderr || serve.stdout) {
            error(DefaultErros.openServe)
            return
        } else {
            success(
                `${DefaultSuccess.server.default} ${
                    os === 'win32'
                        ? 'Verifique as novas janelas que foram abertas!'
                        : 'Verifique as novas abas que forma abertas em seu terminal!'
                }`
            )
        }
    }
}

module.exports = command
