import type { NextApiRequest, NextApiResponse } from 'next'
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer')

const getAbsoluteURL = (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${path}`
  }
  return `https://${process.env.VERCEL_URL}${path}`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let {
    query: { rot, height, width }
  } = req

  // if (!model) return res.status(400).end(`No model provided`)

  let browser

  if (process.env.NODE_ENV === 'production') {
    browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      ignoreHTTPSErrors: true
    })
  } else {
    browser = await puppeteer.launch({
      headless: true
    })
  }

  const page = await browser.newPage()

  await page.setViewport({ width: width ?? 300, height: height ?? 300 })

  await page.goto(getAbsoluteURL(`${rot ? `?rot=${rot}` : ""}`))
  // await page.goto(getAbsoluteURL(""))

  await page.waitForFunction('window.status === "ready"')

  const data = await page.screenshot({
    type: 'png'
  })

  await browser.close()
  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
  res.setHeader('Content-Type', 'image/png')
  // Write the image to the response with the specified Content-Type
  res.end(data)
}
