import { getFooterCopy, getFullYear, getLatestNotification } from './utils'

test('getFullYear returns the current year', () => {
  expect(getFullYear()).toBe(new Date().getFullYear())
})

test('getFooterCopy returns correct string for true argument', () => {
  expect(getFooterCopy(true)).toBe('Holberton School')
})

test('getFooterCopy returns correct string for false argument', () => {
  expect(getFooterCopy(false)).toBe('Holberton School main dashboard')
})

test('getLatestNotifications returns the correct string', () => {
  expect(getLatestNotification()).toBe(
    '<strong>Urgent requirement</strong> - complete by EOD'
  )
})
