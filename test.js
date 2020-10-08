const puppeteer = require("puppeteer");

let bot = function bot(user, pass) {
  // Funcion abre el navegador con los parametros definidos
  async function navegador() {
    // Opciones del navegador
    const chromeOptions = {
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ["--incognito", "--start-maximized"],
    };

    // Se inicia el navegador aplicando las chromeOptions
    const browser = await puppeteer.launch(chromeOptions);

    // Se ubica en la primer pestaña de incognito
    let page = (await browser.pages())[0];

    // Establecer User Agent
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    // Establece el tiempo de espera para todas las paginas en 10 segundos
    await page.setDefaultNavigationTimeout(10000);

    // ir a la pestaña 1
    page = (await browser.pages())[0];

    await page.bringToFront()

    // ir al servidor de correo
    await page.goto("https://box.boxmail.gq/mail/", {
      timeout: 0,
      waitUntil: "domcontentloaded",
    });

    // click en el cambo de usuario
    await clickBoton("//input[@id='rcmloginuser']", page);

    // escribir el usuario
    await escribir("user1@boxmail.gq", page);

    // click en el campo de contraseña
    await clickBoton("//input[@id='rcmloginpwd']", page);

    // escribir el usuario
    await escribir("Ab12345@", page);

    // click en el boton de iniciar sesion
    await clickBoton("//button[@id='rcmloginsubmit']", page);

    // click en el correo de confirmacion
    await clickBoton("//span[contains(text(),'es tu código de verificación de Twitter')]", page);

    const [elemento] = await page.$x("//span[contains(text(),'es tu código de verificación de Twitter')]")

    const mensaje = await page.evaluate(name => name.textContent, elemento);

    const codigo = mensaje.split("es tu código de verificación de Twitter")

    console.log("codigo de verificacion: " + codigo[0])


  }

  // Funcion escribe sobre el elemento ingresado
  async function escribir(contenido, xpage) {
    await xpage.keyboard
      .type(contenido)
      .then(() => console.log("texto escrito"))
      .catch((e) => {
        console.log("Error: " + e);
      });

    // Espera cuatro segundos
    await xpage
      .waitForTimeout(4000)
      .then(() => console.log("Listo !"))
      .catch((e) => {
        console.log("Error: " + e);
      });
  }

  // Funcion da click a los botones ingresados
  async function clickBoton(xpath, xpage) {
    let elementXPath;

    let page = xpage;

    // Busca el elemento del selector
    await page
      .waitForXPath(xpath)
      .then(() => console.log("buscar elemento "))
      .catch((e) => {
        console.log("Error: " + e);
      });

    // Espera cuatro segundos
    await page
      .waitForTimeout(4000)
      .then(() => console.log("Espera 4s"))
      .catch((e) => {
        console.log("Error: " + e);
      });

    // CLick sobre el elemento
    elementXPath = await page.$x(xpath);
    await elementXPath[0]
      .click()
      .then(() => console.log("click sobre el elemento"))
      .catch((e) => {
        console.log("Error: " + e);
      });

    // Espera cuatro segundos
    await page
      .waitForTimeout(4000)
      .then(() => console.log("Listo !"))
      .catch((e) => {
        console.log("Error: " + e);
      });

    // Espera que cargue la pagina
    await page.waitForNavigation({ waitUntil: "load" }).catch((e) => {
      console.log("La pagina esta demorada");
    });
  }

  navegador();
};

bot();

module.exports = { bot };
