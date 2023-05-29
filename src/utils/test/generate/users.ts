// Third-party dependencies
import { faker } from "@faker-js/faker"

// Current project dependencies
import User from "@/models/User"
import { IRegisterUser, IUser } from "@/ts/interfaces/user"
import connectWithRetry from "@/database"
import { generateUsername } from "@/utils/basic"

export const fakeUsersPassword = "this is a super password"

export const generateFakeUser = (): IRegisterUser => {
  const email = `${faker.person.fullName()}_${faker.number.int({
    min: 1,
    max: 100,
  })}@gmail.com`
    .toLocaleLowerCase()
    .replace(" ", "")

  return {
    firstname: faker.person.firstName("male"),
    lastname: faker.person.lastName("male"),
    email,
    password: fakeUsersPassword,
    confirmPassword: fakeUsersPassword,
  }
}

export const generateFakeUsers = (limit: number): IRegisterUser[] => {
  const users: IRegisterUser[] = []

  for (let i = 0; i < limit; i++) {
    const user = generateFakeUser()

    users.push(user)
  }

  return users
}

export const uploadFakeUsersToDB = async (
  users: IRegisterUser[]
): Promise<IUser[]> => {
  try {
    await connectWithRetry()

    await User.deleteMany({})

    interface userWithUsername extends IRegisterUser {
      username: string
    }

    const usersWithUsername: userWithUsername[] = []

    for (let i = 0; i < users.length; i++) {
      const userWithUsername: userWithUsername = {
        ...users[i],
        username: generateUsername(),
      }

      usersWithUsername.push(userWithUsername)
    }

    await User.insertMany(usersWithUsername)

    const usersDB = await User.find({})

    return usersDB
  } catch (error) {
    console.log("🚀 ~ file: users.ts:71 ~ error:", error)
  }

  return []
}
