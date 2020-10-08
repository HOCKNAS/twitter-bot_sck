const puppeteer = require("puppeteer")

let bot = function bot(fullname, email, pass) {
  
  // Funcion abre el navegador con los parametros definidos
  async function navegador(fullname, email, pass) {
    // Opciones del navegador
    const chromeOptions = {
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ["--incognito", "--start-maximized"],
    }

    // Se inicia el navegador aplicando las chromeOptions
    const browser = await puppeteer.launch(chromeOptions)

    // Se ubica en la primer pestaña de incognito
    let page = (await browser.pages())[0]

    await page.bringToFront()

    // Establecer User Agent
    // await page.setUserAgent(
    //   "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    // )

    // Establece el tiempo de espera para todas las paginas en 10 segundos
    await page.setDefaultNavigationTimeout(10000)

    // Va a DuckDuckGo y busca Help Center de Twitter
    await page.goto(
      "https://duckduckgo.com/?q=help+center+twitter+g!+español&kaf=1&kd=-1&kh=1&kg=p&k5=2&ko-1&kam=osm&kae=t&k7=000000",
      {
        timeout: 0,
        waitUntil: "domcontentloaded",
      }
    )

    // Espera a que cargue la página completamente
    await page
      .waitForNavigation({ waitUntil: "domcontentloaded" })
      .catch((e) => {
        console.log("La pagina esta demorada")
      })

    // Espera cuatro segundos
    await page
      .waitForTimeout(4000)
      .then(() => console.log("Espera 4s"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    // para ir a Help Center
    await clickBoton(
      "//span[contains(text(),'Centro de ayuda - Twitter Help Center')]",
      page
    )

    // para ir a iniciar sesion
    await clickBoton(
      "//header/div[1]/div[1]/div[2]/div[1]/ul[2]/li[2]/ul[1]/li[1]",
      page
    )

    // cambiar de pestaña
    page = (await browser.pages())[1]

    await page.bringToFront()

    // para ir a registrarse
    await clickBoton(
      "//body/div[@id='react-root']/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[2]/div[1]/a[2]",
      page
    )

    let simil =
      "//body/div[@id='react-root']/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]"

    // para ir al campo de nombre
    await clickBoton(
      simil + "/div[2]/div[1]/div[1]/div[2]/label[1]/div[1]",
      page
    )

    // escribir el nombre
    await escribir(fullname, page)

    // para cambiar de celular a correo
    await clickBoton(simil + "/div[2]/div[1]/div[1]/div[4]", page)

    // para ir al campo correo
    await clickBoton(
      simil + "/div[2]/div[1]/div[1]/div[3]/label[1]/div[1]",
      page
    )

    // escribir el correo
    await escribir(email, page)

    // para ir al campo mes
    await clickBoton(
      simil +
        "/div[2]/div[1]/div[1]/div[5]/div[3]/div[1]/div[1]/div[2]/select[1]",
      page
    )

    // escribir el mes
    await escribir("ENERO", page)

    // para ir al campo dia
    await clickBoton(
      simil +
        "/div[2]/div[1]/div[1]/div[5]/div[3]/div[1]/div[2]/div[2]/select[1]",
      page
    )

    // escribir el dia
    await escribir("12", page)

    // escribir el año
    await clickBoton(
      simil +
        "/div[2]/div[1]/div[1]/div[5]/div[3]/div[1]/div[3]/div[2]/select[1]",
      page
    )

    // escribir el dia
    await escribir("1999", page)

    // para dar siguiente
    await clickBoton(
      simil + "/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]",
      page
    )

    // para casilla verificacion
    await clickBoton(
      simil + "/div[2]/div[1]/div[1]/label[1]/div[2]/div[1]",
      page
    )

    // para dar siguiente
    await clickBoton(
      simil + "/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]",
      page
    )

    // para en el boton de registrar
    await clickBoton(simil + "/div[2]/div[1]/div[1]/div[1]/div[5]", page)

    // ir a la pestaña 1
    page = (await browser.pages())[0]

    await page.bringToFront()

    // ir al servidor de correo
    await page.goto("https://box.boxmail.gq/mail/", {
      timeout: 0,
      waitUntil: "domcontentloaded",
    })

    // click en el cambo de usuario
    await clickBoton("//input[@id='rcmloginuser']", page)

    // escribir el usuario
    await escribir(email, page)

    // click en el campo de contraseña
    await clickBoton("//input[@id='rcmloginpwd']", page)

    // escribir el usuario
    await escribir(pass, page)

    // click en el boton de iniciar sesion
    await clickBoton("//button[@id='rcmloginsubmit']", page)

    // click en el campo de contraseña
    await clickBoton(
      "//span[contains(text(),'es tu código de verificación de Twitter')]",
      page
    )

    const [elemento] = await page.$x(
      "//span[contains(text(),'es tu código de verificación de Twitter')]"
    )

    const mensaje = await page.evaluate((name) => name.textContent, elemento)

    const codigo = mensaje.split("es tu código de verificación de Twitter")

    console.log("codigo de verificacion: " + codigo[0])

    // ir a la pestaña 1
    page = (await browser.pages())[1]
    await page.bringToFront()

    // para el campo de verificar
    await clickBoton(
      simil + "/div[2]/div[1]/div[1]/div[1]/div[2]/label[1]/div[1]",
      page
    )
    
    const verificado = codigo[0].replace(/ /g,'')

    // escribir el numero de verificacion
    await escribir(verificado, page)

    // para dar siguiente
    await clickBoton(
      simil + "/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]",
      page
    )
  }

  // Funcion escribe sobre el elemento ingresado
  async function escribir(contenido, xpage) {
    await xpage.keyboard
      .type(contenido)
      .then(() => console.log("texto escrito"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    // Espera cuatro segundos
    await xpage
      .waitForTimeout(4000)
      .then(() => console.log("Listo !"))
      .catch((e) => {
        console.log("Error: " + e)
      })
  }

  // Funcion da click a los botones ingresados
  async function clickBoton(xpath, xpage) {
    let elementXPath

    let page = xpage

    // Busca el elemento del selector
    await page
      .waitForXPath(xpath)
      .then(() => console.log("buscar elemento "))
      .catch((e) => {
        console.log("Error: " + e)
      })

    // Espera cuatro segundos
    await page
      .waitForTimeout(4000)
      .then(() => console.log("Espera 4s"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    // CLick sobre el elemento
    elementXPath = await page.$x(xpath)
    await elementXPath[0]
      .click()
      .then(() => console.log("click sobre el elemento"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    // Espera cuatro segundos
    await page
      .waitForTimeout(4000)
      .then(() => console.log("Listo !"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    // Espera que cargue la pagina
    await page.waitForNavigation({ waitUntil: "load" }).catch((e) => {
      console.log("La pagina esta demorada")
    })
  }

  navegador(fullname, email, pass)

}

module.exports = { bot}
