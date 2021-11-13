import { IDefaultErros } from '../types/IDefaultErros'

const DefaultErros: IDefaultErros = {
    validate: {
        default: {
            match: '${flag}',
            message:
                'A flag ${flag} não foi passada, essa é flag obrigatoria. Rode builder --helpe.'
        }
    }
}

export { DefaultErros }
