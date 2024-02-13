import { PrismaClient } from '@prisma/client'
import { nations } from '../src/nationsData'

const prisma = new PrismaClient()

async function main() {
  for (const nation of nations) {
    await prisma.nation.create({
      data: {
        abbreviation: nation.abbreviation,
        customCalendarUrl: nation.customCalendarUrl,
        icalUrl: nation.icalUrl,
        googleCalendarId: nation.googleCalendarId,
        kideUrl: nation.kideUrl,
        name: nation.name,
        url: nation.url,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
