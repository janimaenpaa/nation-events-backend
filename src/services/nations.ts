import prisma from '../../prisma/prisma-client'

export const getNations = async () => {
  const nations = await prisma.nation.findMany()
  return nations
}
