import { GluegunToolbox } from 'gluegun';
import * as fs  from 'fs';
import { create  } from 'archiver';
import { replaceBars, replaceLastChar } from '../helpers/StringHelper';

module.exports = (toolbox: GluegunToolbox) => {
    const { system } = toolbox

    interface IBuilder {
        status: boolean
        content: any
    }

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

    async function generateBuild(dir:string,packageManager: string): Promise<IBuilder> {
        const typePackageManager = packageManager.toUpperCase()
        if (typePackageManager === 'NPM') {
            return runTryBuild(`cd ${dir} && npm run build --verbose`);
        } else {
            return runTryBuild(`cd ${dir} && yarn build --verbose`);
        }
    }

    async function generateZip(dir: string, folder: string,): Promise<any> {
        const stream = fs.createWriteStream(`${replaceLastChar(dir, '/')}${folder}.zip`);
        const archive = create('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        
        return new Promise((resolve: any, reject) => {
            archive
                .directory(`${dir}/${folder}`, false)
                .on('error', err => reject(err))
                .pipe(stream)
            ;
    
            stream.on('close', () => resolve());
            archive.finalize();
        });
    }

    async function moveZip(command: string, dir:string, folder:string): Promise<any> {   
        try {
            if(command === "mv") {
                return await system.run(`${command} ${dir}/${folder}.zip ./${folder}`, {trim: true});
            }

            return await system.run(`${command} ${replaceBars(dir)}//\\${folder}.zip ${replaceBars(dir)}//\\${folder}`, {trim: true});
        } catch (error) {
            return error;
        }
    }

    // async function startNgrok(port:string) {
    //     await system.run(`start /min  "" ngrok http 8000`, {trim: true});
    // }


    async function startServerPhp(os:string,dir:string, folder:string, port?:string):Promise<any> {
        try {
            /**
             * aqui eu verifico se o os e um win pois se for true irei rodar comandos diferentes
             */
            if(os === "win32") {
                /**
                 * Atualmente ao passar por aqui uma nova janela é aberta contendo o conteudo do comando
                 * mesmo assim o meu cli ainda continua trava experando que esse comando seja encerrado
                 */
                system.run(
                    `start /min  "" php -S localhost:${port ? port : "8000"} -t ${dir}/${folder}/ &`, 
                    {trim: true}
                );

                system.run(`start /min "" ngrok http 8000`);

                return true;
            }

            system.run(
                `php -S localhost:${port ? port : "8000"} -t ${dir}/${folder}/ &
                `, {trim: true}
            );

            system.run("ngrok http 8000");

            return true;

        } catch (error) {
            console.log(error)
            return error;
        }
    }

    toolbox.generateBuild = (dir: string, packageManager: string): Promise<IBuilder> => generateBuild(dir,packageManager);
    toolbox.generateZip = (dir: string, folder: string): Promise<any> => generateZip(dir,folder);
    toolbox.moveZip = (command: string,dir: string, folder: string): Promise<any> =>  moveZip(command, dir,folder);
    toolbox.startServerPhp = (os:string,dir:string, folder:string,port?:string): Promise<any> =>  startServerPhp(os,dir,folder,port);
}
