const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let fileName = ''
    req.url === '/' ? fileName = 'index.html' : fileName = req.url
    
    let filePath = path.join(__dirname, 'public', fileName)

    const extensionContentPairs = {
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css'
    }

    let extName = path.extname(filePath)
    let contentType = extensionContentPairs[extName]
    console.log('FILE EXTENSION', contentType)

    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if(err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, errdata) => {
                    res.writeHead(200, {'content-type':'text/html'})
                    res.end(errdata, 'utf8')
                })
            } else {
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            res.writeHead(200, {'content-type': contentType})
            res.end(data)
        }
    })
})

server.listen(5000,() => console.log('Server running on port 5000'))