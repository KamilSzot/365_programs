import * as cheerio from 'cheerio'
import * as fs from 'fs'

let $ = cheerio.load(fs.readFileSync('cpus.html').toString());

var cpus = $('tbody[aria-live="polite"][aria-relevant="all"] tr')
    .toArray()
    .map((row) => {
        return {
            name: $('td:nth-child(1) a:nth-child(2)', row).text(),
            power: Number($('td:nth-child(3)', row).text()),
            single: Number($('td:nth-child(5)', row).text()),
            price: Number($('td:nth-child(2)', row).text().replace('$','')),
            type: $('td:nth-child(11)', row).text(),
        };        
    })
    .filter((cpu) => cpu.name.indexOf('1090T')>=0 || (cpu.power && cpu.price && !isNaN(cpu.power) && !isNaN(cpu.price) && !isNaN(cpu.single)))


fs.writeFileSync("src/cpus.json", JSON.stringify({default: cpus }));