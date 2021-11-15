<p align="center">
    <a href="https://github.com/joao-lim4">
        <img src="./logo.png" alt="Logo" width="150">
    </a>
    <br/>
    <h3 align="center">CLI Para gerar builds automaticamente de projetos node</h3>
    <br/>
    <p align="center">
        console.log('☕☕');
        <br />
        <a href="https://github.com/joao-lim4/builder"><strong> << View Doc >></strong></a>
    </p>
</p>


## Qual o intuito
    Sem um método mais eficiente e visando menores gastos na VM. O builder foi desenvolvido diante do seguinte problema. Qual a melhor forma de gerar o build do meu projeto e mandar para o servidor?
 
    Comecei gerando o build diretamente no servidor, mas o problema é que isso gera gastos no servidor então diante de uma dica parei de fazer isso.
 
    Também comecei a fazer o build na minha máquina local, adicionava o build no meu repositório e logo em seguida dava o pull na VM, porém eu ainda tinha os gastos do git pull.
 
    Um amigo pessoal me deu uma outra dica, onde ele gerava o build localmente, zipava e subia um servidor utilizando ngrok e diretamente na VM ele rodava wget ${url gerada pelo ngrok}/build.zip e logo em seguida ele rodava o unzip build.zip e pronto o seu build está no servidor.
 
    Diante dessa solução foi feito o builder, com o intuito de automatizar o serviço que você irá fazer na sua máquina local.

## Sobre
    O builder foi feito para que se possa gerar o build de um projeto automaticamente em seguida é gerado um zip da pasta gerada pelo build, deixando a escolha do usuário subir ou não um servidor HTTP para que ele possa baixar o zip diretamente de um VM utilizando ``` wget ou curl ```, ao baixar o zip é só descompactar ele no diretório desejado e pronto o build do seu projeto já está na sua vm.


## Requisitos para uso
    Se o seu intuito é só construir o app e gerar o zip, é só fazer a instalação e usar o CLI.
    👀 Observação
    Se você quiser disponibilizar o zip em um servidor HTTP, irá precisar do PHP e do NGROK instalados na sua máquina.
    Segue o link para instalar o NGROK https://ngrok.com/download

### Instalação

1. Instale usando npm ou yarn
```sh
    npm install -g builder-prl
```


## Usando
    builder build --dir=c:/Users/<seu user>/Desktop/Projects/<my project> --folder=build

## Help 
    Rode builder --help


## Obteve algum erro?
Entre em contato comigo me falando do erro, que resolverei assim que possível.

## Contato
[INSTAGRAM](https://www.instagram.com/joao_lim4/)
<br/>
[WHATSAPP](https://api.whatsapp.com/send/?phone=%2B5531989013076&text=Ola%20vim%20pelo%20seu%20primeiro%20projeto%20react&app_absent=0&lang=pt_br)
<br/>
limas.devs@gmail.com

# License
MIT - see LICENSE

