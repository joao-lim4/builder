import { GluegunCommand } from 'gluegun';
import { useValidateObject } from '../helpers/ValidateObjectHelper';
import { replaceString } from '../helpers/StringHelper';
import { DefaultErros } from '../data/Default.erros';
import { BuildPanel } from '../panels/BuildLoad.panel';
import { configSpinner } from '../data/SpinerConfig';
import { platform } from 'os';


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
            spinerBuildeGenerate.fail("Erro ao gerar o build");
            error('❌ Erro ao gerar o build ❌');
            error('---------------------------');
            error(buildInstance.content.stdout === '' ? buildInstance.content.stderr : buildInstance.content.stdout);
            return;
        }

        spinerBuildeGenerate.succeed("Build finalizada!");
        success("🎉 Build gerada com sucesso!");

        muted("\n");
        info("Preparando para fazer o zip");
        success("🚀 Zip sendo prepado");
        
        const zipSpiner = spin({
            color: 'yellow',
            text: `Gerando o zip do diretorio ${folder}`,
            spinner: configSpinner.dots
        });

        await generateZip(dir, folder);
        zipSpiner.succeed("Zip gerado com sucesso!");
        
        const servidor = await confirm("Deseja subir o servidor web, possibilitando o download do zip??");

        if(!servidor) {
            muted("\n");
            success("🎉 Buil e Zip gerados com sucesso! Agora abra o seu diretorio para vizualizar o zip");
            return;
        }


        const php = which('php');
        const ngrok = which('ngrok');

        if(php === null) {
            error("Erro ao tentar subir um servidor local, não foi possivel encontrar o caminho para o binario do php");
            if(os === "win32") {
                warning("Sugestões")
                info("Rode echo $PAHT no seu CMD e verifique se o php está la.")
                info("Se não tiver nada na em seu path. tente instalar o apache por exemplo");
                info("Se ja tiver o apache, vevrifique em seus arquivos e adicione o php em seu path");
                return;
            }

            warning("Sugestões")
            info("Se não tiver o php instalado na sua maquina, tente rodar sudo apt-get install php7.4 ou a versão que você desejar");
            return;
        }

        
        if(ngrok === null) {
            error("Erro ao tentar subir um servidor local, não foi possivel encontrar o caminho para o binario do ngrok");
            info("Acesse o site https://ngrok.com/ e faça a instalação");
            return;
        }


    
        const move = await moveZip((os === "win32" ? 'move' : 'mv'), dir, folder);
        if(move.stderr || move.stdout) {
            error("Erro ao mover o arquivo, não foi possivel prosseguir com o comando!");
            return;
        }
        success("🎉 Arquivo movido com sucesso!");



        const serve = await startServerPhp(os,dir,folder);
        if(serve.stderr || serve.stdout) {
            error("Erro ao subir o serivodor.");
            return;
        }else{
            success(`🎉 Servidor rodando! ${os === "win32" ? "Verifique as nova janelas que foram abertas!" : ""}`);
        }

    }
}

module.exports = command;
