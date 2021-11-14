import { GluegunToolbox } from 'gluegun'
import * as fs from 'fs'
import { create } from 'archiver'
import { replaceBars, replaceLastChar } from '../helpers/StringHelper'

module.exports = (toolbox: GluegunToolbox) => {
    const { system } = toolbox

    interface IBuilder {
        status: boolean
        content: any
    }

    /**
     * @name runTryBuild
     * @description Isolamento do try catch para rodar o comando que vai gerar a build
     *
     * @param command string
     * @returns Promise<Ibuilder>
     */
    async function runTryBuild(command: string): Promise<IBuilder> {
        try {
            const builderCommand = await system.run(command, { trim: true })
            return {
                status: true,
                content: builderCommand
            }
        } catch (error) {
            return {
                status: false,
                content: error
            }
        }
    }

    /**
     * @name generateBuild 
     * @description Gerará a build do projeto com base no gerenciador de pacotes informado pelo usuário caso o diretório passado não seja válido, retornará um erro e o comando será encerrado.
     * 
     * @param dir string
     * @param packageManager string
     * @returns
     */
    async function generateBuild(
        dir: string,
        packageManager: string
    ): Promise<IBuilder> {
        const typePackageManager = packageManager.toUpperCase()
        if (typePackageManager === 'NPM') {
            return runTryBuild(`cd ${dir} && npm run build --verbose`)
        } else {
            return runTryBuild(`cd ${dir} && yarn build --verbose`)
        }
    }

    /**
     * @name generateZip
     * @description generateZip gera um zip do build gerado, caso não seja possível gerar o zip um erro será retornado
     * e o comando será encerrado.
     * 
     * @param dir string
     * @param folder string
     * @returns Promise<any>
     */
    async function generateZip(dir: string, folder: string): Promise<any> {
        const stream = fs.createWriteStream(
            `${replaceLastChar(dir, '/')}${folder}.zip`
        )
        const archive = create('zip', {
            zlib: { level: 9 }
        })

        return new Promise((resolve: any, reject) => {
            archive
                .directory(`${dir}/${folder}`, false)
                .on('error', err => reject(err))
                .pipe(stream)

            stream.on('close', () => resolve())
            archive.finalize()
        })
    }

    /**
     * @name moveZip
     * @description O comando moveZip irá mover o zip gerado para a dentro da pasta gerada pelo build do projeto
     * o moveZip usa comandos nativos do sistema, para win será usado o comando move e para o linux será usado o
     * comando mv
     *
     * @param command string
     * @param dir string
     * @param folder string
     * @returns Promise
     */
    async function moveZip(
        command: string,
        dir: string,
        folder: string
    ): Promise<any> {
        try {
            if (command === 'mv') {
                return await system.run(
                    `${command} ${dir}/${folder}.zip ./${folder}`,
                    { trim: true }
                )
            }

            return await system.run(
                `${command} ${replaceBars(dir)}//\\${folder}.zip ${replaceBars(
                    dir
                )}//\\${folder}`,
                { trim: true }
            )
        } catch (error) {
            return error
        }
    }

    /**
     * @name startServer
     * @description startServer irá subir um servidor http disponibilizando o zip gerado para download
     * para baixar o zip é só fazer um GET para a rota gerada pelo ngrok passando /build.zip que o seu
     * zip será baixado.
     * No win será aberto duas janelas onde estará rodando os servers tanto o local que usa php quanto o
     * server gerado pelo ngrok
     * 
     * @param os string
     * @param dir string
     * @param folder string
     * @param port string
     * @returns Promise
     */
    async function startServer(
        os: string,
        dir: string,
        folder: string,
        port?: string
    ): Promise<any> {
        try {
            if(os === "win32") {
                system.run(
                    `start /min  "" php -S localhost:${
                        port ? port : '8000'
                    } -t ${dir}/${folder}/ &`,
                    { trim: true }
                )

                system.run(`start /min "" ngrok http 8000`)

                return true
            }

            system.run(
                `php -S localhost:${port ? port : '8000'} -t ${dir}/${folder}/ &
                `,
                { trim: true }
            )

            system.run('ngrok http 8000')

            return true
        } catch (error) {
            console.log(error)
            return error
        }
    }

    toolbox.generateBuild = (
        dir: string,
        packageManager: string
    ): Promise<IBuilder> => generateBuild(dir, packageManager)
    toolbox.generateZip = (dir: string, folder: string): Promise<any> =>
        generateZip(dir, folder)
    toolbox.moveZip = (
        command: string,
        dir: string,
        folder: string
    ): Promise<any> => moveZip(command, dir, folder)
    toolbox.startServer = (
        os: string,
        dir: string,
        folder: string,
        port?: string
    ): Promise<any> => startServer(os, dir, folder, port)
}
