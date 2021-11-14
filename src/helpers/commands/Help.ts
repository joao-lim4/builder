import { Toolbox } from 'gluegun/build/types/domain/toolbox'

const Help = (toolbox: Toolbox): void => {
    const {
        print: { muted, success, highlight, warning }
    } = toolbox

    success('🚀 Builder Helper 🚀')
    muted('👀 Descrição')
    muted(
        'O comando builder foi feito com o intuito de gerar o build de um projeto automaticamente, subindo um servidor web possibilitando o download do zip diratamente em seu servidor utilizando o comando wget ou fazendo um GET diretamente na url gerada'
    )
    muted('\n')
    success('Commands')
    highlight('build')
    warning('    --- Descrição')
    muted(
        '        O comando build ira gerar o build de um projeto logo em seguida ira gerar um zip da pasta gerada e logo em seguida ira mover o zip para dentro da pasta gerada pelo buil e logo em seguida subira um servidor possibilitando o download desse zip'
    )
    muted('\n')
    warning('    --- Options')
    muted(
        '        --dir <Obrigatorio> a option --dir significa o diretorio do projeto, esse caminho deve ser um caminho relativo, algo como c:/Users/<seu user>/Desktop/Projeto/meu-projeto'
    )
    muted(
        '        --folder <Obrigatorio> a option --folder significa o diretorio gerado ao executar o buil, por exemplo no react ao rodar yarn build, um diretorio chamado build é gerado na raiz do meu projeto.'
    )
    muted('\n')
}

export { Help }
