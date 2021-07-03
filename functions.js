const puppeteer = require("puppeteer")
const { registerStep1, registerStep2, registerStep3, registerPassword } = require("./helpers/functions")

let bot = function bot(fullname, email, pass, birthDate) {

  // Funcion abre el navegador con los parametros definidos
  async function navegador(fullname, email, pass, birthDate) {

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

    await page.setDefaultNavigationTimeout(0)
    await page.bringToFront()

    // Establecer User Agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36"
    )

    // open twitter
    await page.goto("https://twitter.com/i/flow/signup", {
      timeout: 0,
      waitUntil: "domcontentloaded"
    });


    await registerStep1(page, fullname, email, birthDate)
    await registerStep2(page)
    await registerStep3(page)

    await page
      .waitForTimeout(4000)
      .then(() => console.log("Espera 4s"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    page = await browser.newPage();

    await page.bringToFront()

    await page.goto('https://box.nemesis.ml/mail/', {
      timeout: 0,
      waitUntil: "domcontentloaded"
    })


    // Espera cuatro segundos
    await page
      .waitForTimeout(4000)
      .then(() => console.log("Espera 4s"))
      .catch((e) => {
        console.log("Error: " + e)
      })

    //Escribo user
    await page
      .click('[id="rcmloginuser"]')
      .then(() => console.log("Clicked email"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page.keyboard.type(email)
      .then(() => console.log("typed email"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page.waitFor(2000).catch(e => {
      console.log("Error: " + e);
    });

    //Escribo password
    await page
      .click('[id="rcmloginpwd"]')
      .then(() => console.log("Clicked password"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page.keyboard.type(pass)
      .then(() => console.log("typed password"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page.waitFor(2000).catch(e => {
      console.log("Error: " + e);
    });

    //Escribo mes
    await page
      .click('[id="rcmloginsubmit"]')
      .then(() => console.log("Clicked login"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page
      .waitForNavigation({ waitUntil: "domcontentloaded" })
      .then(() => {
        console.log("Waited for page navigation");
      })

    await page.waitForXPath("//span[contains(., 'es tu código de verificación de Twitter')]")
    const [elemento] = await page.$x("//span[contains(., 'es tu código de verificación de Twitter')]");
    const mensaje = await page.evaluate((name) => name.textContent, elemento)

    const codigo = mensaje.split(" es tu código de verificación de Twitter")[0]

    page = (await browser.pages())[0];

    await page.bringToFront()

    await page
      .waitForSelector('.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv')
      .then(() => console.log("got Username Field"))
      .catch(e => {
        console.log("Error: " + e);
      });

    //Oprimo para cambiar a email
    await page
      .click('.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv')
      .then(() => console.log("Clicked Clicked use email"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page.keyboard.type(codigo)
      .catch(e => console.log("Error: " + e))

    await page.waitFor(2000).catch(e => {
      console.log("Error: " + e);
    });

    await page
      .waitForSelector('.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ero68b.r-vkv6oe.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr')
      .then(() => console.log("got next button"))
      .catch(e => {
        console.log("Error: " + e);
      });

    //Selecciono el segundo botón de seguir
    
    await page.click('.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ero68b.r-vkv6oe.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr')
      .catch((e) => {
        console.log("Error: 2" + e);
      });

    await registerPassword(page, pass)

    /* 
    
        // ir a la pestaña 1
        page = (await browser.pages())[1]
        await page.bringToFront()
    
        // para el campo de verificar
        await clickBoton(
          simil + "/div[2]/div[1]/div[1]/div[1]/div[2]/label[1]/div[1]",
          page
        )
    
        const verificado = codigo[0].replace(/ /g, '')
    
        // escribir el numero de verificacion
        await escribir(verificado, page)
    
        // para dar siguiente
        await clickBoton(
          simil + "/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]",
          page
        ) */
  }


  navegador(fullname, email, pass, birthDate)

}

module.exports = { bot }
