import puppeteer, { Page } from 'puppeteer'

const TIMEOUT_DURATION = 3000;

const scrapeMonthData = async (page: Page) => {
    return await page.evaluate(() => {
        const raw_events = document.querySelectorAll('.calendar-day:not(.calendar-day-empty)')
        const events = Array.from(raw_events)
        const monthAndYear = document.querySelector('#sc_calendar_title')?.innerHTML

        return events.map((event) => {
            return { html: event.innerHTML, monthAndYear }
        })
    })
}

const scrapeHoCalendar = async (url: string) => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.setViewport({
            width: 1920,
            height: 1080,
        })

        await page.goto(url)

        const dataFirstMonth = await scrapeMonthData(page)

        await page.click('#sc_event_nav_next')

        await new Promise((resolve) => setTimeout(resolve, TIMEOUT_DURATION))

        const dataSecondMonth = await scrapeMonthData(page)

        await browser.close()

        return [...dataFirstMonth, ...dataSecondMonth]
    } catch (error) {
        console.error(`Failed to scrape data: ${error}`)
        return []
    }
}

export const scrapeCustomCalendar = async (url: string) => {
    if (!url) return []

    const hoEvents = await scrapeHoCalendar(url)
    console.log(hoEvents)
    return hoEvents
}