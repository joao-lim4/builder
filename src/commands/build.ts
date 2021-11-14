import { GluegunCommand } from 'gluegun';
import { useValidateObject } from '../helpers/ValidateObjectHelper';
import { replaceString } from '../helpers/StringHelper';
import { DefaultErros } from '../data/Default.erros';
import { BuildPanel } from '../panels/BuildLoad.panel';
import { configSpinner } from '../data/SpinerConfig';
import { platform } from 'os';
import { DefaultSuccess } from '../data/Default.success';
import { DefaultInfos } from '../data/Default.infos';


const command: GluegunCommand = {
    name: 'builder',
    description:
        'Builder aplication flags -s<enable server aplication using ngrok> -g<genreciador de pacote> --dir<directory onde esta o projeto> --folder< pasta para onde vai o depois que o build é gerado >',
    run: async toolbox => {
        const {
            print: { error, success,muted, spin, info, warning },
            parameters: { options },
            prompt: { ask, confirm },
            generateBuild,
            generateZip,
            moveZip,
            startServerPhp,
            system: { which },
        } = toolbox;

        const os = platform();

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
            },
        ]);

        if (validates.length) {
            error(validates[0].message);
            return;
        }

        const { dir,folder } = options;
        
        const { gerenciador } = await ask([{
            type: 'select',
            name: 'gerenciador',
            message: 'Escolha qual gerenciador de pacote vai usar?',
            choices: ['Yarn', 'NPM'],
        }]);

        BuildPanel();
        
        const spinerBuildeGenerate = spin({
            color: "yellow",
            spinner: configSpinner.dots,
            text: "Gerando o build"
        });

        const buildInstance = await generateBuild(dir,gerenciador);

        if (!buildInstance.status) {
            spinerBuildeGenerate.fail(DefaultErros.build.sequenceErrorBuild.spinner);
            DefaultErros.build.sequenceErrorBuild.sequence.forEach((errorMessage) => {
                error(errorMessage);
            });
            error(buildInstance.content.stdout === '' ? buildInstance.content.stderr : buildInstance.content.stdout);
            return;
        }

        spinerBuildeGenerate.succeed(DefaultSuccess.build.spinner);
        success(DefaultSuccess.build.success);

        muted("\n");
        info(DefaultInfos.infos.zip.preparate);
        success(DefaultInfos.infos.zip.success);
        
        const zipSpiner = spin({
            color: 'yellow',
            text: `Gerando o zip do diretorio ${folder}`,
            spinner: configSpinner.dots
        });

        await generateZip(dir, folder);
        zipSpiner.succeed(DefaultSuccess.zip.success);
        
        const servidor = await confirm(DefaultInfos.confirm.messages.servidorConfirm);

        if(!servidor) {
            muted("\n");
            success(DefaultSuccess.buildAndZipSuccess);
            return;
        }


        const php = which('php');
        const ngrok = which('ngrok');

        if(php === null) {
            error(DefaultErros.php.default);
            if(os === "win32") {
                warning(DefaultErros.php.win.warning);
                DefaultErros.php.win.sequence.forEach((message) => {
                    info(message);
                });
                return;
            }

            warning(DefaultErros.php.linux.warning)
            info(DefaultErros.php.linux.sequence[0]);
            return;
        }

        
        if(ngrok === null) {
            error(DefaultErros.ngrok.default);
            info(DefaultErros.ngrok.info);
            return;
        }


    
        const move = await moveZip((os === "win32" ? 'move' : 'mv'), dir, folder);
        if(move.stderr || move.stdout) {
            error(DefaultErros.zipMoveErro.default);
            return;
        }

        success(DefaultSuccess.zipMove.success);



        const serve = await startServerPhp(os,dir,folder);
        if(serve.stderr || serve.stdout) {
            error(DefaultErros.openServe);
            return;
        }else{
            success(`${DefaultSuccess.server.default} ${os === "win32" ? "Verifique as nova janelas que foram abertas!" : ""}`);
        }

    }
}

module.exports = command;
