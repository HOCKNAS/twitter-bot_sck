const { getMonth, getDay, getYear } = require("./date");

async function registerStep1(page, fullname, email, birthDate) {
  // Espera cuatro segundos
  await page
    .waitForTimeout(4000)
    .then(() => console.log("Espera 4s"))
    .catch((e) => {
      console.log("Error: " + e)
    })

  //Espero a que carguen los inputs
  await page
    .waitForSelector('.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu')
    .then(() => console.log("got Username Field"))
    .catch(e => {
      console.log("Error: " + e);
    });

  //Oprimo para cambiar a email
  await page
    .click('.css-18t94o4.css-901oao.r-k200y.r-1n1174f.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-1wzrnnt.r-bcqeeo.r-qvutc0')
    .then(() => console.log("Clicked Clicked use email"))
    .catch(e => {
      console.log("Error: " + e);
    });

  //Empiezo a escribir nombre
  await page
    .click('.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu')
    .then(() => console.log("clicked it name"))
    .catch(e => {
      console.log("Error: " + e);
    });

  await page.keyboard.type(fullname)
    .then(() => console.log("typed username"))
    .catch(e => {
      console.log("Error: " + e);
    });

  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });

  //Empiezo a escribir correo
  let emailDiv = await page.$$('.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu');
  await emailDiv[1]
    .click('.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv')
    .then(() => console.log("clicked it email"))
    .catch(e => {
      console.log("Error: " + e);
    });
  await page.keyboard.type(email).catch(e => {
    console.log("Error: " + e);
  });

  //Escribo mes
  await page
    .click('[id="SELECTOR_1"]')
    .then(() => console.log("Clicked month"))
    .catch(e => {
      console.log("Error: " + e);
    });
  await page.keyboard.type(getMonth(birthDate)).catch(e => {
    console.log("Error: " + e);
  });

  //Escribo día
  await page
    .click('[id="SELECTOR_2"]')
    .then(() => console.log("Clicked day"))
    .catch(e => {
      console.log("Error: " + e);
    });
  await page.keyboard.type(`${getDay(birthDate)}`).catch(e => {
    console.log("Error: " + e);
  });

  console.log(getYear(birthDate), getDay(birthDate))
  //Escribo año
  await page
    .click('[id="SELECTOR_3"]')
    .then(() => console.log("Clicked year"))
    .catch(e => {
      console.log("Error: " + e);
    });
  await page.keyboard.type(`${getYear(birthDate)}`).catch(e => {
    console.log("Error: " + e);
  });

  //Presiono enter 
  await page.keyboard.press('Enter');

  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });

  await page
    .waitForSelector('.css-18t94o4.css-1dbjc4n.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ero68b.r-vkv6oe.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr')
    .then(() => console.log("got next button"))
    .catch(e => {
      console.log("Error: " + e);
    });

  await page.click('.css-18t94o4.css-1dbjc4n.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ero68b.r-vkv6oe.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr')
    .catch((e) => {
      console.log("Error: 2" + e);
    });
}

async function registerStep2(page) {
  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });


  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });


  //Selecciono el segundo botón de seguir
  let buttonContinue2 = await page.$$('.css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0');

  await buttonContinue2[0].click('.css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0')
    .catch((e) => {
      console.log("Error: 2" + e);
    });
}

async function registerStep3(page) {
  // wait till page load

  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });

  //Selecciono el segundo botón de seguir
  let buttonContinue3 = await page.$$('.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1wzrnnt.r-1pl7oy7.r-1v6e3re.r-1ny4l3l.r-1dye5f7.r-o7ynqc.r-6416eg.r-lrvibr');

  await buttonContinue3[0].click('.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1wzrnnt.r-1pl7oy7.r-1v6e3re.r-1ny4l3l.r-1dye5f7.r-o7ynqc.r-6416eg.r-lrvibr')
    .catch((e) => {
      console.log("Error: 2" + e);
    });
}

async function registerPassword(page, password) {
  // Espera cuatro segundos
  await page
    .waitForTimeout(2000)
    .then(() => console.log("Espera 4s"))
    .catch((e) => {
      console.log("Error: " + e)
    })

  //Espero a que carguen los inputs
  await page
    .waitForSelector('.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv')
    .then(() => console.log("got password"))
    .catch(e => {
      console.log("Error: " + e);
    });

  //Empiezo a escribir nombre
  await page
    .click('.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv')
    .then(() => console.log("clicked it password"))
    .catch(e => {
      console.log("Error: " + e);
    });

  /* await page.keyboard.type(password)
    .then(() => console.log("typed username"))
    .catch(e => {
      console.log("Error: " + e);
    });

  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });

  await page
    .waitForSelector('.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ero68b.r-vkv6oe.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr')
    .then(() => console.log("got next button"))
    .catch(e => {
      console.log("Error: " + e);
    });

  await page.click('.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-ero68b.r-vkv6oe.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr')
    .catch((e) => {
      console.log("Error: 2" + e);
    });
  
  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  });

  let buttonContinue2 = await page.$$('.css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0');

  await buttonContinue2[0].click('.css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0')
    .catch((e) => {
      console.log("Error: 2" + e);
    });

  await page.waitFor(2000).catch(e => {
    console.log("Error: " + e);
  }); */
}

module.exports.registerStep1 = registerStep1
module.exports.registerStep2 = registerStep2
module.exports.registerStep3 = registerStep3
module.exports.registerPassword = registerPassword