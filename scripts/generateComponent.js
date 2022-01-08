/* eslint-disable */

const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const resolve = (...file) => path.resolve(__dirname, ...file)
const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const errorLog = (error) => console.log(chalk.red(`${error}`))
const { vueTemplate } = require('./template')

log('请输入要生成的组件名称、如需生成全局组件，请加 global/ 前缀')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (err) => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

let componentName = ''
process.stdin.on('data', async (chunk) => {
  const inputName = String(chunk).trim().toString()
  /**
   * 组件目录路径
   */
  const componentDirectory = resolve('../src/components')

  /**
   * vue组件路径
   */
  const componentVueName = resolve(componentDirectory, `${inputName}.vue`)

  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
    } else {
      componentName = inputName
    }
    log(`正在生成 vue 文件 ${componentVueName}`)
    await generateFile(componentVueName, vueTemplate(componentName))
    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

