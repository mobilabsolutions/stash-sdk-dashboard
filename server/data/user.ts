import * as bcrypt from 'bcrypt'

const users = [
  {
    username: 'christoph@mobilabsolutions.com',
    password: '$2b$10$AoJGHTiWWEIEDupFQe3jhe42vW5QNbGYwo4W4ePmC6PVeiUeB1bZq',
    firstname: 'Christoph',
    lastname: 'Stock',
    email: 'christoph@mobilabsolutions.com',
    locale: 'de-DE',
    merchantId: 'mobilab'
  }
]

export async function getUserById(userId: string) {
  const user = users.find(item => item.username === userId)
  if (!user) return null

  const result = { ...user }
  delete result.password
  return result
}

export async function findUser(username: string, password: string) {
  const user = users.find(
    item => item.username.toUpperCase() === username.toUpperCase()
  )
  if (!user) return null

  const match = await bcrypt.compare(password, user.password)

  return match ? user : null
}

export async function updateUser(userId: string, updateData: object) {
  const user = users.find(item => item.username === userId)
  if (!user) return false

  Object.keys(updateData).forEach(key => {
    if (updateData[key]) user[key] = updateData[key]
  })
  return true
}

export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  const user = users.find(item => item.username === userId)
  if (!user) return false

  const match = await bcrypt.compare(oldPassword, user.password)
  if (!match) return false

  const newHash = await bcrypt.hash(newPassword, 10)

  Object.assign(user, { password: newHash })
  return true
}
