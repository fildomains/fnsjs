import { ethers } from 'ethers'

export const formatHashed = (name: string): string =>
  name.replace(/(\[)(.{64})(\])/g, '0x$2')

export const truncateFormat = (name: string): string =>
  name.replace(/(\[.{3})(.{58})(.{3}\])/g, '$1...$3')

export const bracketFormat = (name: string): string =>
  name.replace(/(0x)(.{64})(?=\.)/g, '[$2]')

export const getWeek = async function (
  provider: ethers.providers.JsonRpcProvider,
) {
  const blockNumber = await provider.getBlockNumber()
  const block = await provider.getBlock(blockNumber)
  const day = Math.floor(block.timestamp / (24 * 3600) + 4)

  return Math.floor(day / 7)
}

export const getDay = async function (
  provider: ethers.providers.JsonRpcProvider,
) {
  const blockNumber = await provider.getBlockNumber()
  const block = await provider.getBlock(blockNumber)
  const timestamp = block.timestamp * 1000

  return new Date(timestamp).getDay()
}

export const advanceTime = async function (
  provider: ethers.providers.JsonRpcProvider,
  delay: number,
) {
  await provider.send('evm_increaseTime', [delay])
}
