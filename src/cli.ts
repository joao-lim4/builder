import { build } from 'gluegun'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { Help } from './helpers/commands/Help'

/**
 * Create the cli and kick it off
 */
async function run(argv) {
    // create a CLI runtime
    const cli = build()
        .brand('builder')
        .src(__dirname)
        // .exclude(['print', 'system'])
        .plugins('./node_modules', { matching: 'builder-*', hidden: true })
        .help({
            name: 'help',
            alias: 'h',
            hidden: true,
            dashed: true,
            run: (toolbox: Toolbox) => Help(toolbox)
        }) // provides default for help, h, --help, -h
        .version()
        .create()

    const toolbox = await cli.run(argv)

    return toolbox
}

module.exports = { run }
