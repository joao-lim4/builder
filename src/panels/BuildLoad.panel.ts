import { print } from "gluegun";


/**
 * Retorna o painel de buil
 */
const BuildPanel = () => {
    const { success, muted, highlight } = print;
    success("Build iniciado!! 🚀🚀");
    muted("O seu build está em andamento, essa é uma função que demora para ser executada, para evitar erros desnecessários, tente não modificar o local do projeto enquanto o comando está sendo executado!");
    muted('\n');
    highlight("Status");
    success("✔ Iniciado");
    highlight("👀 --- build --- 👀");
}


export { BuildPanel };