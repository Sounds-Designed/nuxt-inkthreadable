export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin', nitroApp)

  nitroApp.hooks.hook('request', (event) => {
    console.log('on request', event.path)
  })

  nitroApp.hooks.hook('render:response', (response, { event }) => {
    console.log('on response', event.path, { response })

    return response
  })

  nitroApp.hooks.hook('afterResponse', (event, { body }) => {
    console.log('on after response', event.path, { body })
  })
})
