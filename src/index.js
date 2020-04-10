import '@babel/polyfill/noConflict'
import colors from 'colors'
import server from './server'
server.start({ port: process.env.PORT || 4000 }, () => {
    console.log(
        `Server is running on port ${colors.blue('=>')} ${colors.red(
            'http://localhost:4000',
        )} ${colors.blue('<=')} & Prisma : ${colors.green('http://localhost:4466')}`,
    )
})
