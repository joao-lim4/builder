import { print } from "gluegun";



const BuildPanel = () => {
    const { success, muted, highlight } = print;
    success("Build iniciado!! 🚀🚀");
    muted("O seu build esta em andamento, essa é uma função que demora para ser executada, para evitar erros desnecessarios, tente não modificar o local do projeto enquanto o comando está sendo executado!");
    muted('\n');
    highlight("Status");
    success("✔ Iniciado");
    highlight("👀 --- build --- 👀");
}


export { BuildPanel };